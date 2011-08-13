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

temporarilySet = (observable, value, watched) ->
  observable(value)

  callback = ->
    watch.dispose()
    observable(null)

  watch = if watched.immediate
    watched.immediateSubscribe callback
  else
    watched.subscribe callback

class Boinc extends BoincDev
  type : 'boinc'

  description : 'BOINC project'

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
        temporarilySet @error, 'Invalid project url', @projecturl

  # Get the authkey using WebRPC call 'lookup_account'
  # see http://boinc.berkeley.edu/trac/wiki/WebRpc#lookup_account
  getAuthkey : =>
    if @username().length == 0 or @password().length == 0
      return

    setTimeout ( => @authkey.immediate 'x'), 1000

  # Check if the authkey is OK using WebRPC call 'am_get_info'
  # see http://boinc.berkeley.edu/trac/wiki/WebRpc#am_get_info
  checkAuthkey : =>
    if @authkey().length == 0 or @scheduler().length == 0
      @ok false
      return

    setTimeout ( =>
      @ok (@authkey() == 'x')
      temporarilySet @error, 'Bad authkey', @authkey unless @ok()
    ), 1000

  constructor : ->
    super()

    # New user-facing input fields
    @projecturl = delayedObservable 'http://ui.hpc.iit.bme.hu/wcdemo/'
    @scheduler = ko.observable 'http://ui.hpc.iit.bme.hu/wcdemo_cgi/cgi'
    @authkey = delayedObservable '1d0f37563ceb7d1ed372a932dcdb5d85'
    @username = delayedObservable ''
    @password = delayedObservable ''

    # Error string
    @error = ko.observable ''

    # Create button disabled
    @ok false

    @projecturl.immediateSubscribe =>
      @scheduler ''
      @username.immediate ''
      @password.immediate ''
      @authkey.immediate ''
    @username.immediateSubscribe => @authkey.immediate ''
    @password.immediateSubscribe => @authkey.immediate ''

    @projecturl.subscribe @getSchedulerUrl
    @username.subscribe @getAuthkey
    @password.subscribe @getAuthkey
    @authkey.subscribe @checkAuthkey


Worksource.prototype.register(Boinc)
