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

  running : ko.observable true

  threads : ko.observable 1

  worksources : ko.observableArray []

  templates : []

  client: undefined

  watch_worksource : (worksource, livingCallback, deadCallback) =>
    previousWorksource = worksource.worksource()

    watch = worksource.worksource.subscribe (newWorksource) =>
      if (previousWorksource is undefined) and \
         (newWorksource isnt undefined)
        @client.addWorksource newWorksource
        livingCallback?()

      else if (previousWorksource isnt undefined) and \
              (newWorksource is undefined)
        @client.removeWorksource previousWorksource
        @worksources.remove worksource
        deadCallback?()

        watch.dispose()

      previousWorksource = newWorksource

  register_templates : (templates) =>
    instantiateTemplate = (template) =>
      templateInstance = new template.type(template.parameters)
      @worksources.unshift templateInstance

      @watch_worksource templateInstance, =>
        instantiateTemplate template

    templates.map instantiateTemplate

    # Save the most important properties to the @templates variable
    @templates = templates.map (template) -> template.parameters

  start : =>
    for worksource in @client.getWorksources()
      if worksource instanceof gridbee.worksource.boinc.BoincWorkSource
        worksource = new BoincWorksource(worksource)
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

  constructor : (@client, templates) ->
    @register_templates templates

    @client.onLog.subscribe log('main')

client = new gridbee.core.control.Client("GridBee")

window.gears = new Gears(client, templates)

$ ->
  ko.applyBindings window.gears

  window.gears.start()
