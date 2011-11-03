class Boinc extends Worksource
  type : 'boinc'

  description : 'BOINC project'

  constructor : (@worksource) ->
    # Parent constructor
    super(@worksource)

    # Load data fields from the passed worksource
    @projecturl = ko.observable(@worksource.projecturl)
    @projectname = ko.observable(@worksource.projectname)
    @scheduler = ko.observable(@worksource.getSchedulerUrl())

    @username = ko.observable(@worksource.username)
    @authkey = ko.observable(@worksource.getAuthkey())

    @name = @projectname() ? @projecturl() ? @scheduler

    @overview = [
      {name : 'Scheduler', observable : @scheduler},
      {name : 'Authkey', observable : @authkey}
    ]

    # Load the workunits of the passed worksource
    for workunit in @worksource.getWorkUnits()
      @workunits.push new BoincWorkunit(workunit)

    # Watch new workunits, and workunit removals
    @worksource.onAddWorkunit.subscribe (addedWorkunit) =>
      @workunits.push new BoincWorkunit(addedWorkunit)

    @worksource.onRemoveWorkunit.subscribe (removedWorkunit) =>
      for candidate in @workunits()
        if candidate.workunit == removedWorkunit
          @workunits.remove candidate

    return
