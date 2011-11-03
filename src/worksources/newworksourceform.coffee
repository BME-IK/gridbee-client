delayedObservable = (initialValue) ->
  observable = ko.observable initialValue

  # Redefining the old subscribe function so
  # that it will only fire after the user ended typing
  observable.immediateSubscribe = observable.subscribe
  callbacks = []
  nodelay = false

  observable.subscribe = (callback) ->
    callbacks.push callback
    t = null

    observable.immediateSubscribe ->
      if t
        clearTimeout t
      t = setTimeout (-> callback observable()), 1000 unless nodelay

  # Set value, and call subscribers now
  observable.immediate = (newValue) ->
    nodelay = true
    observable newValue
    nodelay = false
    for callback in callbacks
      callback newValue

  observable

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
