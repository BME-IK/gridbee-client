class BoincNewWorksourceForm extends NewWorksourceForm
  constructor: (@parameters) ->
    # Parent constructor
    super('boinc', parameters.formtitle, parameters.description)

    # Set the form field to the default values
    @reset()

    # UI behavior:
    # Reset every field if the user changes the project url
    # Reset authkey if the user changes the password or the username
    @projecturl.immediateSubscribe =>
      @projectname ''
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
    modelWorksource = new BoincWorkSource(@scheduler(), @authkey())
    modelWorksource.projecturl = @projecturl()
    modelWorksource.projectname = @projectname()
    modelWorksource.username = @username()
    @worksource new Boinc(modelWorksource)

    @reset()

  # Reset all input fields
  reset : =>
    # Possible user-facing input fields
    @projecturl = delayedObservable(@parameters.projecturl ? '')
    @projectname = ko.observable(@parameters.projectname ? '')
    @scheduler = ko.observable(@parameters.scheduler ? '')

    @username = delayedObservable(@parameters.username ? '')
    @password = delayedObservable(@parameters.password ? '')
    @authkey = delayedObservable(@parameters.authkey ? '')

    # Disable 'Add BOINC project' button
    @ok = ko.observable(@parameters.ok ? false)

    # List of hidden fields
    @hide = @parameters.hide ? [];

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
