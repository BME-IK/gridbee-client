max_id = 0

class Worksource
  # Unique identifier. Simplifies the GUI.
  id : null

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

  # Set this to true after the worksource starts working
  # It will be set back to false when the user deletes the worksource
  living : ko.observable false

  # The framework worksource object
  worksource : undefined

  # A [{name : 'name', observable : }] list of the most important data
  # to be shown in an overview display
  overview : ko.observableArray []

  constructor : (@worksource) ->
    # Generating unique id.
    @id = max_id++

    # Initializing a new instance of observable variables
    @name = ko.observable null
    @workunits = ko.observableArray []
    @living = ko.observable true
