# Augmenting observable class
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

observableClass.immediate = (newValue) ->
  window.o = observable = this

  observable.nodelay = true
  returnValue = observable(newValue)
  observable.nodelay = false

  return returnValue

observableClass.temporarily = (value, resetValue, resetTriggerObservables) ->
  this(value)

  callback = =>
    for w in watches
      w.dispose()
    this resetValue

  watches = for o in resetTriggerObservables
    o.subscribe callback

# Augmenting observableArray class
observeArray = (parameters) ->
  previousArray = parameters.array().map (a) -> a

  parameters.array.subscribe (newArray) ->
    for item in newArray
      if item not in previousArray
        parameters.onAdd item

    for item in previousArray
      if item not in newArray
        parameters.onRemove item

    previousArray = newArray.map (a) -> a

  return parameters

observableArrayClass = (ko.observableArray()).__proto__

observableArrayClass.bindDom = (parameters) ->
  parameters.parent = $(parameters.parent)

  add = (item, addFunction) ->
    if not item.dom?
      item.dom = parameters.template.tmpl(item)
      ko.applyBindings item, item.dom[0]

    if addFunction?
      addFunction item, item.dom, parameters.parent
    else
      parameters.parent.append(item.dom)

  remove = (item, removeFunction) ->
      if removeFunction?
        removeFunction item, item.dom, parameters.parent
      else
        item.dom.detach()

  observeArray
    array : this
    onAdd : (item) -> add(item, parameters.add)
    onRemove : (item) -> remove(item, parameters.remove)

  this().map (item) -> add(item, parameters.initialAdd ? parameters.add)

observableArrayClass.temporarilyAdd = (values, removeTriggerObservables) ->
  for value in values
    this.push value

  callback = =>
    for w in watches
      w.dispose()
    for value in values
      this.remove value

  watches = for o in removeTriggerObservables
    o.subscribe callback
