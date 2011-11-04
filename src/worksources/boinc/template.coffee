observableClass = (ko.observable()).__proto__

observableClass.delayedSubscribe = (callback) ->
  observable = this;

  timeout = undefined

  observable.subscribe (newValue) ->
    clearTimeout timeout if timeout?

    if observable.nodelay is true
      callback(newValue)
    else
      timeout = setTimeout (-> callback(newValue)), 1000

observableClass.immediate = (newValue) ->
  window.o = observable = this

  observable.nodelay = true
  returnValue = observable(newValue)
  observable.nodelay = false

  return returnValue

temporarilyAdd = (observable, values, removeTriggerObservables) ->
  for value in values
    observable.push value

  callback = ->
    for w in watches
      w.dispose()
    for value in values
      observable.remove value

  watches = for o in towatch
    o.subscribe callback

class BoincTemplate extends BoincWorksource
  constructor: (parameters) ->
    # Parent constructor
    super()

    # Standard template parameters
    @formtitle = parameters.formtitle
    @description = parameters.description
    @templatename = parameters.templatename

    # Optional template parameters
    @ok = ko.observable(parameters.ok ? false)
    @hide = parameters.hide ? [];

    # List of fields containing wrong parameters
    @error = ko.observableArray []

    # Set the form fields to the given default values
    for property in ['projecturl', 'projectname', 'scheduler', \
                     'username', 'password', 'authkey']
      this[property](parameters[property]) if parameters[property]?

    # UI behavior:
    # Reset every field if the user changes the project url
    # Reset authkey if the user changes the password or the username
    @projecturl.subscribe =>
      @projectname.immediate ''
      @scheduler.immediate ''
      @username.immediate ''
      @password.immediate ''
      @authkey.immediate ''
    @username.subscribe => @authkey.immediate ''
    @password.subscribe => @authkey.immediate ''

    # WebRPC binding
    @projecturl.delayedSubscribe =>
      @webrpc = new web2grid.worksource.boinc.webrpc.BoincWebRPC(@projecturl())
      @getSchedulerUrl()
      @getProjectname()
    @username.delayedSubscribe @getAuthkey
    @password.delayedSubscribe @getAuthkey
    @authkey.delayedSubscribe @checkAuthkey

  # Create a workunit instance in the model
  create : =>
    BoincWorkSource = web2grid.worksource.boinc.BoincWorkSource
    modelWorksource = new BoincWorkSource(@scheduler(), @authkey())
    modelWorksource.projecturl = @projecturl()
    modelWorksource.projectname = @projectname()
    modelWorksource.username = @username()
    @worksource modelWorksource

  # Extract scheduler url from the project's master url
  getSchedulerUrl : =>
    if @projecturl().length == 0
      return

    $.ajax
      url : @projecturl()

      success : (data, status) =>
        # Extracting scheduler urls,
        # see http://boinc.berkeley.edu/trac/wiki/ServerComponents
        links = data.match /<link rel="boinc_scheduler" [^>]*>/g
        url_re = /[^"]*(?="\s*>$)/
        schedulers = link.match url_re for link in links

        # We will use the first scheduler
        @scheduler.immediate schedulers[0]

      error : =>
        temporarilyAdd @error, ['projecturl'], [@projecturl]

  # Get the authkey using WebRPC call 'lookup_account'
  # see http://boinc.berkeley.edu/trac/wiki/WebRpc#lookup_account
  getAuthkey : =>
    if @username().length == 0 or @password().length == 0
      return

    request = @webrpc.lookupAccount(@username(), @password())
    request.onComplete.subscribe (userInfo) =>
      @authkey.immediate userInfo.Auth
    request.onError.subscribe (error) =>
      temporarilyAdd @error, ['username', 'password'], [@username, @password]

  # Check if the authkey is OK using WebRPC call 'am_get_info'
  # see http://boinc.berkeley.edu/trac/wiki/WebRpc#am_get_info
  checkAuthkey : =>
    if @authkey().length == 0 or @scheduler().length == 0
      @ok false
      return

    request = @webrpc.getAccountInfo(@authkey())
    request.onComplete.subscribe (accInfo) =>
      @ok true
    request.onError.subscribe (error) =>
      @ok false
      temporarilyAdd @error, ['authkey'], [@authkey]

  # Get the name of the project
  getProjectname : =>
    if @projecturl().length == 0
      @projectname ''

    request = @webrpc.projectConfiguration()
    request.onComplete.subscribe (projectInfo) =>
      @projectname projectInfo.name
