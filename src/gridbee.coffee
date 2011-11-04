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

  newworksourceforms : ko.observableArray []

  client: undefined

  watch_death : (worksource) =>
    death_watch = worksource.living.subscribe (living) =>
      if living is false
        # The worksource has died
        @client.removeWorksource worksource.worksource
        @worksources.remove worksource

        death_watch.dispose()

  start : =>
    for worksource in @client.getWorksources()
      if worksource instanceof web2grid.worksource.boinc.BoincWorkSource
        worksource = new Boinc(worksource)
      else
        continue

      @worksources.push worksource

      @watch_death worksource

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

  constructor : (@client, @newworksourceforms) ->
    @client.onLog.subscribe log('main')

    for newworksourceform in @newworksourceforms()

      newworksourceform.worksource.subscribe (newworksource) =>
        @client.addWorksource newworksource.worksource
        @worksources.push newworksource

        @watch_death newworksource

client = new web2grid.core.control.Client("GridBee")

if (client.getWorksources().length == 0)
  client.addBoincWorkSource "http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi", \
                            "2962b0b8970c4ca693d953da648724cd"

window.gears = new Gears(client, templates)

$ ->
  ko.applyBindings window.gears

  window.gears.start()
