class Gears
  log : null

  running : ko.observable false

  threads : ko.observable 2

  worksources : ko.observableArray []

  skeletons : {}

  register_skeleton : (constructor) =>
    type = constructor.prototype.type
    @skeletons[type] = ko.observable(null)

    # Create a new skeleton instance, and when it becomes
    # alive push it to the worksource array
    newinstance = () =>
      console.log 'Creating new instance for', type
      skeleton = new constructor()
      @skeletons[type] skeleton
      skeleton.living.subscribe (living) =>
        if living is true
          # The worksource is ready to work
          @worksources.push skeleton
          newinstance()
        else
          # The worksource has died
          @worksources.remove skeleton

    newinstance()

  constructor : ->
    for constructor in Worksource.prototype.types
      @register_skeleton(constructor)

window.gears = new Gears()

$ ->
  for constructor in Worksource.prototype.types
    $('#skeleton').tmpl(constructor.prototype).appendTo('#skeletons')
  ko.applyBindings window.gears
