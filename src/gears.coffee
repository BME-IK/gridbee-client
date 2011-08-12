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
        if living
          @worksources.push skeleton
          newinstance()

    newinstance()

  constructor : ->
    for constructor in Worksource.prototype.types
      @register_skeleton(constructor)

window.gears = new Gears()

$ ->
  for constructor in Worksource.prototype.types
    $('#skeleton').tmpl(constructor.prototype).appendTo('#skeletons')
  ko.applyBindings window.gears
