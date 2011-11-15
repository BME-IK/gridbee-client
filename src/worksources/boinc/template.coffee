class BoincTemplate extends BoincWorksource
  isHidden : (field) => (field in @hide)

  constructor : (parameters) ->
    # Parent constructor
    super()

    @template true

    # Standard template parameters
    @formtitle = parameters.formtitle
    @description = parameters.description
    @templatename = parameters.templatename

    # Optional template parameters
    @ok = ko.observable(parameters.ok ? false)
    @hide = parameters.hide ? [];

    # List of fields containing wrong parameters
    @projecturlStatus = ko.observable undefined
    @schedulerStatus = ko.observable undefined
    @usernameStatus = ko.observable undefined
    @passwordStatus = ko.observable undefined
    @authkeyStatus = ko.observable undefined
    @error = ko.observableArray []

    # Set the form fields to the given default values
    for property in ['projecturl', 'projectname', 'scheduler', \
                     'username', 'password', 'authkey']
      this[property](parameters[property]) if parameters[property]?

    # UI behavior:
    # Reset every field if the user changes the project url
    # Reset authkey if the user changes the password or the username
    @projecturl.subscribe =>
      @projecturlStatus undefined
      @schedulerStatus undefined
      @usernameStatus undefined
      @passwordStatus undefined
      @authkeyStatus undefined
      @projectname.immediate ''
      @scheduler.immediate ''
      @username.immediate ''
      @password.immediate ''
      @authkey.immediate ''
    @username.subscribe =>
      @usernameStatus undefined
      @passwordStatus undefined
      @authkeyStatus undefined
      @authkey.immediate ''
    @password.subscribe =>
      @usernameStatus undefined
      @passwordStatus undefined
      @authkeyStatus undefined
      @authkey.immediate ''
    @authkey.subscribe =>
      @authkeyStatus undefined
      @ok false

    # WebRPC binding
    @projecturl.delayedSubscribe =>
      @webrpc = new gridbee.worksource.boinc.webrpc.BoincWebRPC(@projecturl())
      @getSchedulerUrl()
      @getProjectname()
    @username.delayedSubscribe @getAuthkey
    @password.delayedSubscribe @getAuthkey
    @authkey.delayedSubscribe @checkAuthkey

  # Create a workunit instance in the model
  create : =>
    BoincWorkSource = gridbee.worksource.boinc.BoincWorkSource
    modelWorksource = new BoincWorkSource(@scheduler(), @authkey())
    modelWorksource.projecturl = @projecturl()
    modelWorksource.projectname = @projectname()
    modelWorksource.username = @username()
    @worksource modelWorksource
    @template false

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

        @projecturlStatus true
        @schedulerStatus true

      error : =>
        @projecturlStatus.temporarily false, undefined, [@projecturl]

  # Get the authkey using WebRPC call 'lookup_account'
  # see http://boinc.berkeley.edu/trac/wiki/WebRpc#lookup_account
  getAuthkey : =>
    if @username().length == 0 or @password().length == 0
      return

    request = @webrpc.lookupAccount(@username(), @password())

    request.onComplete.subscribe (userInfo) =>
      @authkey.immediate userInfo.Auth

      @usernameStatus true
      @passwordStatus true

    request.onError.subscribe (error) =>
      @authkey.immediate ''
      @authkeyStatus undefined

      @usernameStatus false
      @passwordStatus false

  # Check if the authkey is OK using WebRPC call 'am_get_info'
  # see http://boinc.berkeley.edu/trac/wiki/WebRpc#am_get_info
  checkAuthkey : =>
    if @authkey().length == 0 or @scheduler().length == 0
      @ok false
      return

    request = @webrpc.getAccountInfo(@authkey())
    request.onComplete.subscribe (accInfo) =>
      @ok true
      @authkeyStatus true
    request.onError.subscribe (error) =>
      @ok false
      @authkeyStatus false

  # Get the name of the project
  getProjectname : =>
    if @projecturl().length == 0
      @projectname ''

    request = @webrpc.projectConfiguration()
    request.onComplete.subscribe (projectInfo) =>
      @projectname projectInfo.name
