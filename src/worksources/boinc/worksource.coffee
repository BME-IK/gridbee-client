class BoincWorksource extends Worksource
  type : 'boinc'

  description : 'BOINC project'

  constructor : (worksource) ->
    # Parent constructor
    super()

    # User-facing data fields
    @projecturl = ko.observable ''
    @projectname = ko.observable ''
    @scheduler = ko.observable ''

    @username = ko.observable ''
    @password = ko.observable ''
    @authkey = ko.observable ''

    @name = ko.dependentObservable =>
      if @projectname().length > 0
        @projectname()
      else if @projecturl().length > 0
        @projecturl()
      else if @scheduler().length > 0
        @scheduler()

    # If the worksource is set, start operating
    @worksource.subscribe =>
      throw 1 if @worksource() instanceof BoincWorksource
      @start() if @worksource() isnt undefined

    # Set the worksource
    @worksource worksource

  start : =>
    console.log @worksource()
    # Load data fields from the passed worksource
    @projecturl @worksource().projecturl
    @projectname @worksource().projectname
    @scheduler @worksource().getSchedulerUrl()

    @username @worksource().username
    @authkey @worksource().getAuthkey()

    # Load the workunits of the passed worksource
    for workunit in @worksource().getWorkUnits()
      @workunits.push new BoincWorkunit(workunit)

    # Watch new workunits, and workunit removals
    @worksource().onAddWorkunit.subscribe (addedWorkunit) =>
      @workunits.push new BoincWorkunit(addedWorkunit)

    @worksource().onRemoveWorkunit.subscribe (removedWorkunit) =>
      for candidate in @workunits()
        if candidate.workunit == removedWorkunit
          @workunits.remove candidate
