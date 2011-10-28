log = (logname) -> (entry) ->
  severityLevels = {}
  severityLevels[henkolib.log.LogLevel.L0_Critical]    = 'critical'
  severityLevels[henkolib.log.LogLevel.L1_Error]       = 'error'
  severityLevels[henkolib.log.LogLevel.L2_Warning]     = 'warning'
  severityLevels[henkolib.log.LogLevel.L3_Notice]      = 'notice'
  severityLevels[henkolib.log.LogLevel.L4_Information] = 'information'
  severityLevels[henkolib.log.LogLevel.L5_Debug]       = 'debug'

  line  =    "<div class=\"logentry #{severityLevels[entry.level]}\">"
  line +=      "<span class=\"time\"> #{entry.time.toString().substr(11)} </span>"
  line +=      "<span class=\"source\"> #{entry.source.getScreenName()} </span>" if entry.source?
  line +=      entry.message
  line +=      "<span class=\"data\"><pre> #{entry.data} </pre></span>" if entry.data?
  line +=    "</div>"

  $('.log-' + logname).append line

class Gears
  log : null

  running : ko.observable false

  threads : ko.observable 2

  worksources : ko.observableArray []

  client: undefined

  skeletons : {}

  watch_worksource : (worksource, livingCallback, deadCallback) =>
    watch = worksource.living.subscribe (living) =>
      if living is true
        # The worksource was a skeleton and now it is living
        @client.addWorksource worksource.worksource
        @worksources.push worksource
        livingCallback?()
      else
        # The worksource has died
        @client.removeWorksource worksource.worksource
        @worksources.remove worksource
        deadCallback?()

        watch.dispose()


  register_skeletons : () =>
    # Create a new skeleton instance. When it becomes alive
    # push it to the worksource array, and create another skeleton.
    newskeleton = (type, constructor) =>
      skeleton = new constructor()
      @skeletons[type] skeleton

      @watch_worksource skeleton, (-> newskeleton type, constructor)

    # Iterate through worksource types, and create skeleton for each
    for constructor in Worksource.prototype.types
      type = constructor.prototype.type
      @skeletons[type] = ko.observable(null)

      newskeleton(type, constructor)

  start : =>
    for worksource in @client.getWorksources()
      if worksource instanceof web2grid.worksource.boinc.BoincWorkSource
        worksource = new Boinc(worksource)
      else
        continue

      @worksources.push worksource

      @watch_worksource worksource

    if @running()
      @client.start()
    @running.subscribe =>
      if @running()
        @client.start()
      else
        @client.stop()

    @client.setThreadNumber @threads()
    @threads.subscribe =>
      @client.setThreadNumber @threads()

  constructor : (@client) ->
    @client.onLog.subscribe log('main')

    @register_skeletons()

client = new web2grid.core.control.Client("GridBee")

window.gears = new Gears(client)

$ ->
  for constructor in Worksource.prototype.types
    $('#skeleton').tmpl(constructor.prototype).appendTo('#skeletons')
  ko.applyBindings window.gears

  window.gears.start()
