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

handleLogDiv = (logDiv, showButton, hideButton) ->
  showButton.click ->
    logDiv.addClass('active')
          .siblings().removeClass('active')
  hideButton.click ->
    logDiv.removeClass('active')

watchWorkunitList = (workunitList, workunitListDom) ->
  workunitList.bindDom
    parent     : $(workunitListDom)
    template   : $('#workunit')

    add        : (item, dom, parent) ->
      dom.appendTo parent

      logdiv = $('#workunit-log').tmpl(item).appendTo($('#logs'))
      ko.applyBindings item, logdiv[0]

      handleLogDiv logdiv, dom.children('.show-log'), logdiv.children('.close')

    remove     : (item, dom, parent) ->
      dom.detach()

watchWorksourceList = (worksourceList) ->
  worksourceList.bindDom
    parent     : $('#worksourcelist')
    template   : $('#worksource')

    add        : (item, dom, parent) ->
      dom.insertBefore parent.children('li').last()
      dom.addClass('selected')
      $('#templatelist').parent().removeClass('selected')
      setTimeout (-> dom.removeClass('overlap')), 0

      watchWorkunitList item.workunits, dom.children('.workunitlist')[0]

    initialAdd : (item, dom, parent) ->
      dom.insertBefore parent.children('li').last()

      watchWorkunitList item.workunits, dom.children('.workunitlist')[0]

    remove     : (item, dom, parent) ->
      dom.addClass 'hide'
      setTimeout (-> dom.detach()), 500

watchTemplateList = (templateList) ->
  elementAfterLastRemoved = []

  templateList.bindDom
    parent     : $('#templatelist> ul')
    template   : $('#worksource')
    initialAdd : undefined

    add        : (item, dom, parent) ->
      if elementAfterLastRemoved.length is 0
        dom.appendTo parent
      else
        dom.insertBefore elementAfterLastRemoved

    remove     : (item, dom, parent) ->
      elementAfterLastRemoved = dom.next()
      dom.detach()
      dom.addClass 'overlap'

templateListPager = ->
  up = $('#templatelist .up')
  down = $('#templatelist .down')

  selected = 0

  select = (id) ->
    console.log id

    maxId = $('#templatelist> ul> li').length - 1
    return if (id < 0 or id > maxId)

    up.addClass('hide')      if (selected is 1) and (id is 0)
    up.removeClass('hide')   if (selected is 0) and (id is 1)
    down.addClass('hide')    if (selected is maxId - 1) and (id is maxId)
    down.removeClass('hide') if (selected is maxId)     and (id is maxId - 1)

    selected = id
    $('#templatelist> ul').css('top', selected * (-100) + '%')
    $('#templatelist> ul> li:first').css('margin-top', selected * (-20) + '%')

  up.click -> select(selected - 1)
  down.click -> select(selected + 1)

formHelper = ->
  checkNonEmptyInputs = (e) ->
    return if e.target.tagName.toLowerCase() isnt 'input'

    input = $(e.target)
    input_and_label = input.add input.prev('label')

    if e.charCode isnt 0
      input_and_label.addClass 'nonempty'
    else
      if input.val().length > 0
        input_and_label.addClass 'nonempty'
      else
        input_and_label.removeClass 'nonempty'

  document.addEventListener('keypress', checkNonEmptyInputs, false);
  document.addEventListener('keyup', checkNonEmptyInputs, false);

worksourceSelect = ->
  selectWorksource = (worksource) ->
    worksource = $(worksource)
    worksource.addClass('selected')
    worksource.siblings().removeClass('selected')

    firstWorksource = $($('#worksourcelist> li')[0])
    diff = worksource.offset().left - firstWorksource.offset().left
    #center = leftEdge + firstWorksource[0].offsetWidth / 30 * 15

    setTimeout (->
      if not worksource.hasClass('hide')
        $(document.body).animate({scrollLeft: diff}, 1000)
    ), 0

  worksourcelist = $('#worksourcelist')[0]
  click = (e) ->
    card = e.target

    while card.parentNode != worksourcelist
      card = card.parentNode
      return if card is null

    #return if (' ' + card.className + ' ').indexOf(' selected ') > -1

    selectWorksource(card)

    #e.stopPropagation()

  worksourcelist.addEventListener('click', click, true);

  # Always select the worksource in the middle of the screen while scrolling
  # Scrolling is too slow for it to be usable (box-shadow performance problem)
  interval = undefined
  scroll = undefined

  check = ->
    if not interval?
      $(document.body).unbind 'scroll'
      interval = setInterval check, 1000

    else if scroll == document.body.scrollLeft
      $(document.body).bind 'scroll', check
      clearInterval interval
      interval = undefined
      return

    scroll = document.body.scrollLeft

    selected = Math.round(
      scroll /
      (document.getElementById('templatelist').children[0].offsetWidth / 30 * 36)
    )

    element = $($('#worksourcelist').children()[n])
    element.addClass('selected').siblings().removeClass('selected')

  #$(document.body).bind 'scroll', check

$ ->
  ko.applyBindings window.gears, $('#header')[0]

  handleLogDiv $('#log-main'), $('#logbutton .icon'), $('#log-main .close')

  watchWorksourceList(gears.worksources)
  watchTemplateList(gears.templates)

  templateListPager()

  formHelper()

  worksourceSelect()

