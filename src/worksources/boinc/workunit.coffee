class BoincWorkunit extends Workunit
  constructor: (@workunit) ->
    super(@workunit)

    @progress @workunit.getProgress()
    @workunit.onProgressChange.subscribe =>
      @progress @workunit.getProgress()

    @status @workunit.getStatusString()
    @workunit.onStatusChange.subscribe =>
      @status @workunit.getStatusString()

    @workunit.onLog.subscribe log('workunit-' + @id)
