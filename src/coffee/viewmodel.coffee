window.viewModel =
  running : ko.observable false

  threads : ko.observable 2

  worksources : ko.observableArray [
    # example
    {
      name : 'Boinc project 1'
      type : 'boinc'
      worksource : {}
      workunits : ko.observableArray []
      # worksource type specific details:
      scheduler : 'www.x.com'
      authkey : 'xxxx'
    }
  ]

  worksourcetypes : {}
  # example:
  #  boinc :
  #    icon : 'http://boinc.berkeley.edu/logo/www_logo.gif'
  #    description : 'BOINC project'
  #    parameters :
  #      url : ko.observable ''
  #      authkey : ko.observable ''
  #      username : ko.observable ''
  #      password : ko.observable ''
  #    ok : ko.observable true

