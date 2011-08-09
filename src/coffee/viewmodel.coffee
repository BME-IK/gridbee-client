# Utility functions
window.notifyIfTypingEnds = (observable, callback) ->
  t = null

  observable.subscribe ->
    if t
      clearTimeout t
    t = setTimeout (-> callback observable()), 1000

highlightlog = (text) ->
  '<div class="logentry">' + text + '</div>'

window.log = (name) ->
  content = ''
  (update) ->
    if typeof(update) != 'string'
      return content
    content += update
    $('.log-' + name).append highlightlog update

# The viewModel
window.viewModel =
  log : log 'main'

  running : ko.observable false

  threads : ko.observable 2

  worksources : ko.observableArray []

  worksourcetypes : {}

# Examples
worksource =
  name : 'Boinc project 1'
  type : 'boincdev'
  worksource : {}
  workunits : ko.observableArray [{
    workunit : {name : 'x'}
    state : 'Downloading...'
    console : log('x')
  }]
  # worksource type specific details:
  scheduler : 'www.x.com'
  authkey : 'xxxx'

worksourcetype =
  icon : 'http://boinc.berkeley.edu/logo/www_logo.gif'
  description : 'BOINC project'
  parameters :
    url : ko.observable ''
    authkey : ko.observable ''
    username : ko.observable ''
    password : ko.observable ''
  ok : ko.observable true

viewModel.worksources.push worksource
#viewModel.worksourcetypes.push worksourcetype
