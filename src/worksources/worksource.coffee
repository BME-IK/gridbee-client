max_id = 0

class Worksource
  # Worksource type: this should be the same as the directory name
  type : null

  # Human readable description of the worksource type, e.g. "Boinc project"
  description : null

  # Name of the actual worksource instance, e.g. "SETI Boinc project"
  # see http://knockoutjs.com/documentation/observables.html
  name : ko.observable null

  # Workunits of the actual worksource instance. It's an observable array
  # see http://knockoutjs.com/documentation/observableArrays.html
  workunits : ko.observableArray []

  # The framework worksource object
  worksource : ko.observable undefined

  # A [{name : 'name', observable : }] list of the most important data
  # to be shown in an overview display
  overview : ko.observableArray []

  constructor : () ->
    # Generating unique id.
    @id = max_id++

    # Initializing a new instance of observable variables
    @worksource = ko.observable undefined
    @name = ko.observable null
    @workunits = ko.observableArray []
