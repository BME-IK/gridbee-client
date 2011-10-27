class Gears
  log : null

  running : ko.observable false

  threads : ko.observable 2

  worksources : ko.observableArray []

  client: undefined

  skeletons : {}

  watch_worksource : (worksource) =>
    watch = worksource.living.subscribe (living) =>
      if living is true
        # The worksource was a skeleton and now it is living
        @client.addWorksource worksource.worksource
        @worksources.push worksource
        newinstance()
      else
        # The worksource has died
        @client.removeWorksource worksource.worksource
        @worksources.remove worksource
        watch.dispose()


  register_skeleton : (constructor) =>
    type = constructor.prototype.type
    @skeletons[type] = ko.observable(null)

    # Create a new skeleton instance, and when it becomes
    # alive push it to the worksource array
    newinstance = () =>
      console.log 'Creating new instance for', type
      skeleton = new constructor()
      @skeletons[type] skeleton
      watch_worksource skeleton

    newinstance()

  start : =>
    for worksource in @client.getWorksources()
      if worksource instanceof web2grid.worksource.boinc.BoincWorkSource
        worksource = new Boinc(worksource)
      else
        continue

      @worksources.push worksource

      watch_worksource worksource

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

    for constructor in Worksource.prototype.types
      @register_skeleton(constructor)

# TODO: Adopt the exportAsHtml style logging
log = (logname) -> (entry) ->
  $('.log-' + logname).append \
    '<div class="logentry">' + \
      '<span class="time">' + entry.time.toString().substr(11) + '</span>' + \
      entry.message + \
    '</div>'

client = new web2grid.core.control.Client("GridBee")

window.gears = new Gears(client)

$ ->
  for constructor in Worksource.prototype.types
    $('#skeleton').tmpl(constructor.prototype).appendTo('#skeletons')
  ko.applyBindings window.gears

  window.gears.start()
