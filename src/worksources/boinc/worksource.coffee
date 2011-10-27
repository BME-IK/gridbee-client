delayedObservable = (initialValue) ->
  observable = ko.observable initialValue

  # Redefining the old subscribe function so
  # that it will only fire after the user ended typing
  observable.immediateSubscribe = observable.subscribe
  callbacks = []
  nodelay = false

  observable.subscribe = (callback) ->
    callbacks.push callback
    t = null

    observable.immediateSubscribe ->
      if t
        clearTimeout t
      t = setTimeout (-> callback observable()), 1000 unless nodelay

  # Set value, and call subscribers now
  observable.immediate = (newValue) ->
    nodelay = true
    observable newValue
    nodelay = false
    for callback in callbacks
      callback newValue

  observable

temporarilySet = (observable, value, towatch) ->
  observable(value)

  callback = ->
    for w in watches
      w.dispose()
    observable(null)

  watches = for o in towatch
    if o.immediate
      o.immediateSubscribe callback
    else
      o.subscribe callback

class Boinc extends Worksource
  type : 'boinc'

  description : 'BOINC project'

  constructor : (@client, @worksource) ->
    # Parent constructor
    super(@worksource)

    # User-facing input fields
    @projecturl = delayedObservable ''
    @username = delayedObservable ''
    @password = delayedObservable ''
    @authkey = delayedObservable ''

    # Derived input fields
    @projectname = ko.observable ''
    @scheduler = ko.observable ''

    # If there is a worksource, then it is living, else it is a skeleton
    @living(@worksource?)

    if @worksource?
      # Load properties from the passed worksource
      @name (@worksource.projectname ? @worksource.getSchedulerUrl())
      @projectname @name()
      @projecturl @worksource.projecturl
      @scheduler @worksource.getSchedulerUrl()
      @authkey @worksource.getAuthkey()

      # Load the workunits of the passed worksource
      for workunit in @worksource.getWorkUnits()
        @workunits.push new BoincWorkunit(workunit)

      # And watch for the changes
      @watchWorkunits()

      return

    # Set the default values for the skeleton
    @name 'Bvp6 demo'
    @projectname @name()
    @projecturl 'http://bvp6.hpc.iit.bme.hu/w2g'
    @scheduler 'http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi'
    @authkey '2962b0b8970c4ca693d953da648724cd'

    # Enable 'Create button' for the default values
    @ok true

    # UI behavior:
    # Reset every field if the user changes the project url
    # Reset authkey if the user changes the password or the username
    @projecturl.immediateSubscribe =>
      @scheduler ''
      @username.immediate ''
      @password.immediate ''
      @authkey.immediate ''
    @username.immediateSubscribe => @authkey.immediate ''
    @password.immediateSubscribe => @authkey.immediate ''

    # WebRPC binding
    @projecturl.subscribe =>
      @webrpc = new web2grid.worksource.boinc.webrpc.BoincWebRPC(@projecturl())
      @getSchedulerUrl()
      @getProjectname()
    @username.subscribe @getAuthkey
    @password.subscribe @getAuthkey
    @authkey.subscribe @checkAuthkey

  # Create a workunit instance in the model
  create : =>
    BoincWorkSource = web2grid.worksource.boinc.BoincWorkSource
    @worksource = new BoincWorkSource(@scheduler(), @authkey())
    @watchWorkunits()

    @living true

  # Watch new workunits, and workunit removals
  watchWorkunits : =>
    @worksource.onAddWorkunit.subscribe (addedWorkunit) =>
      @workunits.push new BoincWorkunit(addedWorkunit)

    @worksource.onRemoveWorkunit.subscribe (removedWorkunit) =>
      for candidate in @workunits()
        if candidate.workunit == removedWorkunit
          @workunits.remove candidate

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
        @scheduler schedulers[0]

      error : =>
        temporarilySet @error, 'Invalid project url', [@projecturl]

  # Get the authkey using WebRPC call 'lookup_account'
  # see http://boinc.berkeley.edu/trac/wiki/WebRpc#lookup_account
  getAuthkey : =>
    if @username().length == 0 or @password().length == 0
      return

    request = @webrpc.lookupAccount(@username(), @password())
    request.onComplete.subscribe (userInfo) =>
      @authkey.immediate userInfo.Auth
    request.onError.subscribe (error) =>
      temporarilySet @error, 'Invalid username and/or password', [@username, @password] unless @ok()

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
      temporarilySet @error, 'Invalid authkey', [@authkey] unless @ok()

  # Get the name of the project
  getProjectname : =>
    if @projecturl().length == 0
      @projectname ''

    request = @webrpc.projectConfiguration()
    request.onComplete.subscribe (projectInfo) =>
      @projectname projectInfo.name


Worksource.prototype.register(Boinc)
