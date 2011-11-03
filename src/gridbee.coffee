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

  newworksourceforms : undefined

  client: undefined

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

  constructor : (@client, @newworksourceforms) ->
    @client.onLog.subscribe log('main')

    for newworksourceform in @newworksourceforms()

      newworksourceform.worksource.subscribe (newworksource) =>
        @client.addWorksource newworksource.worksource
        @worksources.push newworksource

        death_watch = worksource.living.subscribe (living) =>
          if living is false
            # The worksource has died
            @client.removeWorksource worksource.worksource
            @worksources.remove worksource

            death_watch.dispose()

# NewWorksourceForms :
bvp6 = new BoincNewWorksourceForm
  formtitle : 'Add Bvp6 demo project'
  description : 'Description'
  projectname : 'Bvp6 demo'
  projecturl : 'http://bvp6.hpc.iit.bme.hu/w2g'
  scheduler : 'http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi'
  authkey : '2962b0b8970c4ca693d953da648724cd'
  hide : ['projecturl', 'scheduler', 'authkey', 'username_password']
  ok : true

empty = new BoincNewWorksourceForm
  formtitle : 'Add BOINC project'
  description : 'Description'
  hide : ['scheduler', 'authkey']
  ok : false

empty_dev = new BoincNewWorksourceForm
  formtitle : 'Add BOINC project (for developers)'
  description : 'Description'
  ok : false

client = new web2grid.core.control.Client("GridBee")

if (client.getWorksources().length == 0)
  client.addBoincWorkSource "http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi", \
                            "2962b0b8970c4ca693d953da648724cd"

window.gears = new Gears(client, NewWorksourceForm.prototype.newworksourceforms)

$ ->
  ko.applyBindings window.gears

  window.gears.start()
