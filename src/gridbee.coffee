class Gears
  log : null

  running : ko.observable true

  threads : ko.observable 1

  worksources : ko.observableArray []

  templates : ko.observableArray []

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
      @templates.push templateInstance

      @watch_worksource templateInstance, =>
        @templates.remove templateInstance
        @worksources.push templateInstance
        instantiateTemplate template

    templates.map instantiateTemplate

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

gears.start()
