window.boinc =
  icon : 'http://boinc.berkeley.edu/logo/www_logo.gif'
  description : 'BOINC project'
  parameters :
    projecturl : ko.observable ''
    schedulerurl : ko.observable false
    authkey : ko.observable ''
    username : ko.observable ''
    password : ko.observable ''
  ok : ko.observable false
  error : ko.observable ''

boinc.userPassInputEnabled = ko.dependentObservable (
  -> this.parameters.schedulerurl() != false)
  boinc

boinc.authkeyInputEnabled = ko.dependentObservable (
  -> this.parameters.schedulerurl() != false and
     this.parameters.username().length == 0 and
     this.parameters.password().length == 0)
  boinc

boinc.projectUrlOk = ko.dependentObservable (
  -> this.userPassInputEnabled())
  boinc

boinc.userPassOk = ko.dependentObservable (
  -> this.parameters.authkey().length != 0 and
     this.parameters.username().length != 0 and
     this.parameters.password().length != 0)
  boinc

viewModel.worksourcetypes.boinc = window.boinc

checkProjecturl = (projecturl) ->
  # Generate scheduler URL from project URL
  if projecturl.length > 0
    boinc.parameters.schedulerurl projecturl
  else
    boinc.parameters.schedulerurl false
    boinc.error 'Not valid project url'

checkCredentials = ->
  # Generate authkey from username and password
  username = boinc.parameters.username()
  password = boinc.parameters.password()
  if username == 'x' and password == 'y'
    boinc.parameters.authkey('z')
  else
    boinc.parameters.authkey('')
    boinc.ok false
    boinc.error 'Wrong username or password'


checkAuthkey = (authkey) ->
  if authkey.length == 0
    boinc.ok false
    return

  if authkey == 'z'
    boinc.ok true
  else
    boinc.ok false
    boinc.error 'Wrong authkey.'

notifyIfTypingEnds boinc.parameters.projecturl, checkProjecturl
notifyIfTypingEnds boinc.parameters.username, checkCredentials
notifyIfTypingEnds boinc.parameters.password, checkCredentials
notifyIfTypingEnds boinc.parameters.authkey, checkAuthkey

boinc.create = ->
  console.log 'BOINC worksource created'