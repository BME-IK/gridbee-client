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

  # Set this to true after the worksource starts working
  # It will be set back to false when the user deletes the worksource
  living : ko.observable false

  constructor : ->
    # Hiding @types, and @register from the derived class
    @types = undefined
    @register = undefined

    # Initializing a new instance of observable variables
    @name = ko.observable null
    @workunits = ko.observableArray []
    @living = ko.observable false

  # List of registered worksource types. This is handled by
  # the Worksource class, don't touch it
  types : []

  register : (cls) ->
    # Store the constructor in the types object
    Worksource.prototype.types.push cls
