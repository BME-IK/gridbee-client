observableClass = (ko.observable()).__proto__

observableClass.delayedSubscribe = (callback) ->
  observable = this;

  timeout = undefined

  observable.subscribe (newValue) ->
    clearTimeout timeout if timeout?

    if observable.nodelay is true
      callback(newValue)
    else
      timeout = setTimeout (-> callback(newValue)), 1000

observableClass.immediateSet = (newValue) ->
  window.o = observable = this

  observable.nodelay = true
  returnValue = observable(newValue)
  observable.nodelay = false

  return returnValue

temporarilySet = (observable, value, towatch) ->
  observable(value)

  callback = ->
    for w in watches
      w.dispose()
    observable(null)

  watches = for o in towatch
    if o.immediate
      o.immediateSubscribe callback
    else
      o.subscribe callback

class NewWorksourceForm
  # Static variable. Stores the registered NewWorksourceForms
  newworksourceforms : ko.observableArray []

  constructor : (@type, formtitle, description) ->
    @formtitle = ko.observable formtitle
    @description = ko.observable description

    @worksource = ko.observable undefined

    @newworksourceforms.push this
