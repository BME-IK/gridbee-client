(function() {
  var BoincTemplate, BoincWorksource, BoincWorkunit, Gears, Worksource, Workunit, client, formHelper, handleLogDiv, log, max_id, observableArrayClass, observableClass, observeArray, templateListPager, watchTemplateList, watchWorksourceList, watchWorkunitList, worksourceSelect;
  var __hasProp = Object.prototype.hasOwnProperty, __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (__hasProp.call(this, i) && this[i] === item) return i; } return -1; }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  observableClass = (ko.observable()).__proto__;

  observableClass.delayedSubscribe = function(callback) {
    var observable, timeout;
    observable = this;
    timeout = void 0;
    return observable.subscribe(function(newValue) {
      if (timeout != null) clearTimeout(timeout);
      if (observable.nodelay === true) {
        return callback(newValue);
      } else {
        return timeout = setTimeout((function() {
          return callback(newValue);
        }), 1000);
      }
    });
  };

  observableClass.immediate = function(newValue) {
    var observable, returnValue;
    window.o = observable = this;
    observable.nodelay = true;
    returnValue = observable(newValue);
    observable.nodelay = false;
    return returnValue;
  };

  observableClass.temporarily = function(value, resetValue, resetTriggerObservables) {
    var callback, o, watches;
    var _this = this;
    this(value);
    callback = function() {
      var w, _i, _len;
      for (_i = 0, _len = watches.length; _i < _len; _i++) {
        w = watches[_i];
        w.dispose();
      }
      return _this(resetValue);
    };
    return watches = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = resetTriggerObservables.length; _i < _len; _i++) {
        o = resetTriggerObservables[_i];
        _results.push(o.subscribe(callback));
      }
      return _results;
    })();
  };

  observeArray = function(parameters) {
    var previousArray;
    previousArray = parameters.array().map(function(a) {
      return a;
    });
    parameters.array.subscribe(function(newArray) {
      var item, _i, _j, _len, _len2;
      for (_i = 0, _len = newArray.length; _i < _len; _i++) {
        item = newArray[_i];
        if (__indexOf.call(previousArray, item) < 0) parameters.onAdd(item);
      }
      for (_j = 0, _len2 = previousArray.length; _j < _len2; _j++) {
        item = previousArray[_j];
        if (__indexOf.call(newArray, item) < 0) parameters.onRemove(item);
      }
      return previousArray = newArray.map(function(a) {
        return a;
      });
    });
    return parameters;
  };

  observableArrayClass = (ko.observableArray()).__proto__;

  observableArrayClass.bindDom = function(parameters) {
    var add, remove;
    parameters.parent = $(parameters.parent);
    add = function(item, addFunction) {
      if (!(item.dom != null)) {
        item.dom = parameters.template.tmpl(item);
        ko.applyBindings(item, item.dom[0]);
      }
      if (addFunction != null) {
        return addFunction(item, item.dom, parameters.parent);
      } else {
        return parameters.parent.append(item.dom);
      }
    };
    remove = function(item, removeFunction) {
      if (removeFunction != null) {
        return removeFunction(item, item.dom, parameters.parent);
      } else {
        return item.dom.detach();
      }
    };
    observeArray({
      array: this,
      onAdd: function(item) {
        return add(item, parameters.add);
      },
      onRemove: function(item) {
        return remove(item, parameters.remove);
      }
    });
    return this().map(function(item) {
      var _ref;
      return add(item, (_ref = parameters.initialAdd) != null ? _ref : parameters.add);
    });
  };

  observableArrayClass.temporarilyAdd = function(values, removeTriggerObservables) {
    var callback, o, value, watches, _i, _len;
    var _this = this;
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      value = values[_i];
      this.push(value);
    }
    callback = function() {
      var value, w, _j, _k, _len2, _len3, _results;
      for (_j = 0, _len2 = watches.length; _j < _len2; _j++) {
        w = watches[_j];
        w.dispose();
      }
      _results = [];
      for (_k = 0, _len3 = values.length; _k < _len3; _k++) {
        value = values[_k];
        _results.push(_this.remove(value));
      }
      return _results;
    };
    return watches = (function() {
      var _j, _len2, _results;
      _results = [];
      for (_j = 0, _len2 = removeTriggerObservables.length; _j < _len2; _j++) {
        o = removeTriggerObservables[_j];
        _results.push(o.subscribe(callback));
      }
      return _results;
    })();
  };

  log = function(logname) {
    return function(entry) {
      var line, severityLevels;
      severityLevels = {};
      severityLevels[henkolib.log.LogLevel.L0_Critical] = 'critical';
      severityLevels[henkolib.log.LogLevel.L1_Error] = 'error';
      severityLevels[henkolib.log.LogLevel.L2_Warning] = 'warning';
      severityLevels[henkolib.log.LogLevel.L3_Notice] = 'notice';
      severityLevels[henkolib.log.LogLevel.L4_Information] = 'information';
      severityLevels[henkolib.log.LogLevel.L5_Debug] = 'debug';
      line = "<div class=\"logentry " + severityLevels[entry.level] + "\">";
      line += "<span class=\"time\"> " + (entry.time.toString().substr(11)) + " </span>";
      if (entry.source != null) {
        line += "<span class=\"source\"> " + (entry.source.getScreenName()) + " </span>";
      }
      line += entry.message;
      if (entry.data != null) {
        line += "<span class=\"data\"><pre> " + entry.data + " </pre></span>";
      }
      line += "</div>";
      return $('.log-' + logname).append(line);
    };
  };

  handleLogDiv = function(logDiv, showButton, hideButton) {
    var active, toggle;
    active = false;
    toggle = function() {
      active = !active;
      if (active) {
        return logDiv.addClass('active').siblings().removeClass('active');
      } else {
        return logDiv.removeClass('active');
      }
    };
    showButton.click(toggle);
    return hideButton.click(toggle);
  };

  watchWorkunitList = function(workunitList, workunitListDom) {
    return workunitList.bindDom({
      parent: $(workunitListDom),
      template: $('#workunit'),
      add: function(item, dom, parent) {
        var logdiv;
        dom.appendTo(parent);
        logdiv = $('#workunit-log').tmpl(item).appendTo($('#logs'));
        ko.applyBindings(item, logdiv[0]);
        return handleLogDiv(logdiv, dom.children('.show-log'), logdiv.children('.close'));
      },
      remove: function(item, dom, parent) {
        return dom.detach();
      }
    });
  };

  watchWorksourceList = function(worksourceList) {
    return worksourceList.bindDom({
      parent: $('#worksourcelist'),
      template: $('#worksource'),
      add: function(item, dom, parent) {
        dom.insertBefore(parent.children('li').last());
        dom.addClass('selected');
        $('#templatelist').parent().removeClass('selected');
        setTimeout((function() {
          return dom.removeClass('overlap');
        }), 0);
        return watchWorkunitList(item.workunits, dom.children('.workunitlist')[0]);
      },
      initialAdd: function(item, dom, parent) {
        dom.insertBefore(parent.children('li').last());
        return watchWorkunitList(item.workunits, dom.children('.workunitlist')[0]);
      },
      remove: function(item, dom, parent) {
        dom.addClass('hide');
        return setTimeout((function() {
          return dom.detach();
        }), 500);
      }
    });
  };

  watchTemplateList = function(templateList) {
    var elementAfterLastRemoved;
    elementAfterLastRemoved = [];
    return templateList.bindDom({
      parent: $('#templatelist> ul'),
      template: $('#worksource'),
      initialAdd: void 0,
      add: function(item, dom, parent) {
        if (elementAfterLastRemoved.length === 0) {
          return dom.appendTo(parent);
        } else {
          return dom.insertBefore(elementAfterLastRemoved);
        }
      },
      remove: function(item, dom, parent) {
        elementAfterLastRemoved = dom.next();
        dom.detach();
        return dom.addClass('overlap');
      }
    });
  };

  templateListPager = function() {
    var down, select, selected, up;
    up = $('#templatelist .up');
    down = $('#templatelist .down');
    selected = 0;
    select = function(id) {
      var maxId;
      console.log(id);
      maxId = $('#templatelist> ul> li').length - 1;
      if (id < 0 || id > maxId) return;
      if ((selected === 1) && (id === 0)) up.addClass('hide');
      if ((selected === 0) && (id === 1)) up.removeClass('hide');
      if ((selected === maxId - 1) && (id === maxId)) down.addClass('hide');
      if ((selected === maxId) && (id === maxId - 1)) down.removeClass('hide');
      selected = id;
      $('#templatelist> ul').css('top', selected * (-100) + '%');
      return $('#templatelist> ul> li:first').css('margin-top', selected * (-20) + '%');
    };
    up.click(function() {
      return select(selected - 1);
    });
    return down.click(function() {
      return select(selected + 1);
    });
  };

  formHelper = function() {
    var checkNonEmptyInputs;
    checkNonEmptyInputs = function(e) {
      var input, input_and_label;
      if (e.target.tagName.toLowerCase() !== 'input') return;
      input = $(e.target);
      input_and_label = input.add(input.prev('label'));
      if (e.charCode !== 0) {
        return input_and_label.addClass('nonempty');
      } else {
        if (input.val().length > 0) {
          return input_and_label.addClass('nonempty');
        } else {
          return input_and_label.removeClass('nonempty');
        }
      }
    };
    document.addEventListener('keypress', checkNonEmptyInputs, false);
    return document.addEventListener('keyup', checkNonEmptyInputs, false);
  };

  worksourceSelect = function() {
    var check, click, interval, scroll, selectWorksource, worksourcelist;
    selectWorksource = function(worksource) {
      var diff, firstWorksource;
      worksource = $(worksource);
      worksource.addClass('selected');
      worksource.siblings().removeClass('selected');
      firstWorksource = $($('#worksourcelist> li')[0]);
      diff = worksource.offset().left - firstWorksource.offset().left;
      return setTimeout((function() {
        if (!worksource.hasClass('hide')) {
          return $(document.body).animate({
            scrollLeft: diff
          }, 1000);
        }
      }), 0);
    };
    worksourcelist = $('#worksourcelist')[0];
    click = function(e) {
      var card;
      card = e.target;
      while (card.parentNode !== worksourcelist) {
        card = card.parentNode;
        if (card === null) return;
      }
      return selectWorksource(card);
    };
    worksourcelist.addEventListener('click', click, true);
    interval = void 0;
    scroll = void 0;
    return check = function() {
      var element, selected;
      if (!(interval != null)) {
        $(document.body).unbind('scroll');
        interval = setInterval(check, 1000);
      } else if (scroll === document.body.scrollLeft) {
        $(document.body).bind('scroll', check);
        clearInterval(interval);
        interval = void 0;
        return;
      }
      scroll = document.body.scrollLeft;
      selected = Math.round(scroll / (document.getElementById('templatelist').children[0].offsetWidth / 30 * 36));
      element = $($('#worksourcelist').children()[n]);
      return element.addClass('selected').siblings().removeClass('selected');
    };
  };

  $(function() {
    ko.applyBindings(window.gears, $('#header')[0]);
    handleLogDiv($('#log-main'), $('#logbutton'), $('#log-main .close'));
    watchWorksourceList(gears.worksources);
    watchTemplateList(gears.templates);
    templateListPager();
    formHelper();
    return worksourceSelect();
  });

  Worksource = (function() {

    Worksource.prototype.type = null;

    Worksource.prototype.description = null;

    Worksource.prototype.name = ko.observable(null);

    Worksource.prototype.workunits = ko.observableArray([]);

    Worksource.prototype.worksource = ko.observable(void 0);

    Worksource.prototype.worksource_id = ko.observable(void 0);

    Worksource.prototype.living = function() {
      return this.worksource() != null;
    };

    function Worksource() {
      this.living = __bind(this.living, this);      this.id = max_id++;
      this.worksource = ko.observable(void 0);
      this.name = ko.observable(null);
      this.workunits = ko.observableArray([]);
      this.template = ko.observable(false);
    }

    return Worksource;

  })();

  max_id = 0;

  Workunit = (function() {

    Workunit.prototype.id = null;

    Workunit.prototype.status = ko.observable('');

    Workunit.prototype.progress = ko.observable(0);

    function Workunit(workunit) {
      this.workunit = workunit;
      this.id = max_id++;
      this.status = ko.observable('');
      this.progress = ko.observable(0);
    }

    return Workunit;

  })();

  BoincWorksource = (function() {

    __extends(BoincWorksource, Worksource);

    BoincWorksource.prototype.type = 'boinc';

    BoincWorksource.prototype.description = 'BOINC project';

    function BoincWorksource(worksource) {
      this.start = __bind(this.start, this);
      var _this = this;
      BoincWorksource.__super__.constructor.call(this);
      this.projecturl = ko.observable('');
      this.projectname = ko.observable('');
      this.scheduler = ko.observable('');
      this.username = ko.observable('');
      this.password = ko.observable('');
      this.authkey = ko.observable('');
      this.worksource_id = this.scheduler;
      this.name = ko.dependentObservable(function() {
        if (_this.projectname().length > 0) {
          return _this.projectname();
        } else if (_this.projecturl().length > 0) {
          return _this.projecturl();
        } else if (_this.scheduler().length > 0) {
          return _this.scheduler();
        }
      });
      this.worksource.subscribe(function() {
        if (_this.worksource() instanceof BoincWorksource) throw 1;
        if (_this.worksource() !== void 0) return _this.start();
      });
      this.worksource(worksource);
    }

    BoincWorksource.prototype.start = function() {
      var workunit, _i, _len, _ref;
      var _this = this;
      this.projecturl(this.worksource().projecturl);
      this.projectname(this.worksource().projectname);
      this.scheduler(this.worksource().getSchedulerUrl());
      this.username(this.worksource().username);
      this.authkey(this.worksource().getAuthkey());
      _ref = this.worksource().getWorkUnits();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        workunit = _ref[_i];
        this.workunits.push(new BoincWorkunit(workunit));
      }
      this.worksource().onAddWorkunit.subscribe(function(addedWorkunit) {
        return _this.workunits.push(new BoincWorkunit(addedWorkunit));
      });
      return this.worksource().onRemoveWorkunit.subscribe(function(removedWorkunit) {
        var candidate, _j, _len2, _ref2, _results;
        _ref2 = _this.workunits();
        _results = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          candidate = _ref2[_j];
          if (candidate.workunit === removedWorkunit) {
            _results.push(_this.workunits.remove(candidate));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    };

    return BoincWorksource;

  })();

  BoincWorkunit = (function() {

    __extends(BoincWorkunit, Workunit);

    function BoincWorkunit(workunit) {
      var _this = this;
      this.workunit = workunit;
      BoincWorkunit.__super__.constructor.call(this, this.workunit);
      this.progress(this.workunit.getProgress());
      this.workunit.onProgressChange.subscribe(function() {
        return _this.progress(_this.workunit.getProgress());
      });
      this.status(this.workunit.getStatusString());
      this.workunit.onStatusChange.subscribe(function() {
        return _this.status(_this.workunit.getStatusString());
      });
      this.workunit.onLog.subscribe(log('workunit-' + this.id));
    }

    return BoincWorkunit;

  })();

  BoincTemplate = (function() {

    __extends(BoincTemplate, BoincWorksource);

    BoincTemplate.prototype.isHidden = function(field) {
      return __indexOf.call(this.hide, field) >= 0;
    };

    function BoincTemplate(parameters) {
      this.getProjectname = __bind(this.getProjectname, this);
      this.checkAuthkey = __bind(this.checkAuthkey, this);
      this.getAuthkey = __bind(this.getAuthkey, this);
      this.getSchedulerUrl = __bind(this.getSchedulerUrl, this);
      this.create = __bind(this.create, this);
      this.isHidden = __bind(this.isHidden, this);
      var property, _i, _len, _ref, _ref2, _ref3;
      var _this = this;
      BoincTemplate.__super__.constructor.call(this);
      this.template(true);
      this.formtitle = parameters.formtitle;
      this.description = parameters.description;
      this.templatename = parameters.templatename;
      this.ok = ko.observable((_ref = parameters.ok) != null ? _ref : false);
      this.hide = (_ref2 = parameters.hide) != null ? _ref2 : [];
      this.projecturlStatus = ko.observable(void 0);
      this.schedulerStatus = ko.observable(void 0);
      this.usernameStatus = ko.observable(void 0);
      this.passwordStatus = ko.observable(void 0);
      this.authkeyStatus = ko.observable(void 0);
      this.error = ko.observableArray([]);
      _ref3 = ['projecturl', 'projectname', 'scheduler', 'username', 'password', 'authkey'];
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        property = _ref3[_i];
        if (parameters[property] != null) this[property](parameters[property]);
      }
      this.projecturl.subscribe(function() {
        _this.projecturlStatus(void 0);
        _this.schedulerStatus(void 0);
        _this.usernameStatus(void 0);
        _this.passwordStatus(void 0);
        _this.authkeyStatus(void 0);
        _this.projectname.immediate('');
        _this.scheduler.immediate('');
        _this.username.immediate('');
        _this.password.immediate('');
        return _this.authkey.immediate('');
      });
      this.username.subscribe(function() {
        _this.usernameStatus(void 0);
        _this.passwordStatus(void 0);
        _this.authkeyStatus(void 0);
        return _this.authkey.immediate('');
      });
      this.password.subscribe(function() {
        _this.usernameStatus(void 0);
        _this.passwordStatus(void 0);
        _this.authkeyStatus(void 0);
        return _this.authkey.immediate('');
      });
      this.authkey.subscribe(function() {
        _this.authkeyStatus(void 0);
        return _this.ok(false);
      });
      this.projecturl.delayedSubscribe(function() {
        _this.webrpc = new gridbee.worksource.boinc.webrpc.BoincWebRPC(_this.projecturl());
        _this.getSchedulerUrl();
        return _this.getProjectname();
      });
      this.username.delayedSubscribe(this.getAuthkey);
      this.password.delayedSubscribe(this.getAuthkey);
      this.authkey.delayedSubscribe(this.checkAuthkey);
    }

    BoincTemplate.prototype.create = function() {
      var BoincWorkSource, modelWorksource;
      BoincWorkSource = gridbee.worksource.boinc.BoincWorkSource;
      modelWorksource = new BoincWorkSource(this.scheduler(), this.authkey());
      modelWorksource.projecturl = this.projecturl();
      modelWorksource.projectname = this.projectname();
      modelWorksource.username = this.username();
      this.worksource(modelWorksource);
      return this.template(false);
    };

    BoincTemplate.prototype.getSchedulerUrl = function() {
      var _this = this;
      if (this.projecturl().length === 0) return;
      return $.ajax({
        url: this.projecturl(),
        success: function(data, status) {
          var link, links, schedulers, url_re, _i, _len;
          links = data.match(/<link rel="boinc_scheduler" [^>]*>/g);
          url_re = /[^"]*(?="\s*>$)/;
          for (_i = 0, _len = links.length; _i < _len; _i++) {
            link = links[_i];
            schedulers = link.match(url_re);
          }
          _this.scheduler.immediate(schedulers[0]);
          _this.projecturlStatus(true);
          return _this.schedulerStatus(true);
        },
        error: function() {
          return _this.projecturlStatus.temporarily(false, void 0, [_this.projecturl]);
        }
      });
    };

    BoincTemplate.prototype.getAuthkey = function() {
      var request;
      var _this = this;
      if (this.username().length === 0 || this.password().length === 0) return;
      request = this.webrpc.lookupAccount(this.username(), this.password());
      request.onComplete.subscribe(function(userInfo) {
        _this.authkey.immediate(userInfo.Auth);
        _this.usernameStatus(true);
        return _this.passwordStatus(true);
      });
      return request.onError.subscribe(function(error) {
        _this.authkey.immediate('');
        _this.authkeyStatus(void 0);
        _this.usernameStatus(false);
        return _this.passwordStatus(false);
      });
    };

    BoincTemplate.prototype.checkAuthkey = function() {
      var request;
      var _this = this;
      if (this.authkey().length === 0 || this.scheduler().length === 0) {
        this.ok(false);
        return;
      }
      request = this.webrpc.getAccountInfo(this.authkey());
      request.onComplete.subscribe(function(accInfo) {
        _this.ok(true);
        return _this.authkeyStatus(true);
      });
      return request.onError.subscribe(function(error) {
        _this.ok(false);
        return _this.authkeyStatus(false);
      });
    };

    BoincTemplate.prototype.getProjectname = function() {
      var request;
      var _this = this;
      if (this.projecturl().length === 0) this.projectname('');
      request = this.webrpc.projectConfiguration();
      return request.onComplete.subscribe(function(projectInfo) {
        return _this.projectname(projectInfo.name);
      });
    };

    return BoincTemplate;

  })();

  if (typeof templates === "undefined" || templates === null) templates = [];

  templates.push({
    type: BoincTemplate,
    parameters: {
      templatename: 'boinc-bvp6-demo',
      formtitle: 'Bvp6 demo project',
      description: 'This is a demo project that demonstrates the ease of use our client program. It calculates something related to pebbles.',
      hide: ['projecturl', 'scheduler', 'authkey', 'username_password'],
      ok: true,
      projectname: 'Bvp6 demo project',
      projecturl: 'http://bvp6.hpc.iit.bme.hu/w2g/',
      scheduler: 'http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi',
      authkey: '2962b0b8970c4ca693d953da648724cd'
    }
  });

  templates.push({
    type: BoincTemplate,
    parameters: {
      templatename: 'boinc-userpass',
      formtitle: 'Custom BOINC project',
      description: 'Specify the project url of the BOINC project, and the user\'s credentials to participate in the project.',
      hide: ['scheduler', 'authkey'],
      ok: false,
      projectname: 'Custom BOINC project'
    }
  });

  templates.push({
    type: BoincTemplate,
    parameters: {
      templatename: 'boinc',
      formtitle: 'Custom BOINC project',
      description: 'Specify the project url of the BOINC project, and the user\'s credentials to participate in the project.',
      ok: false,
      projectname: 'Custom BOINC project'
    }
  });

  Gears = (function() {

    Gears.prototype.log = null;

    Gears.prototype.running = ko.observable(true);

    Gears.prototype.threads = ko.observable(1);

    Gears.prototype.worksources = ko.observableArray([]);

    Gears.prototype.templates = ko.observableArray([]);

    Gears.prototype.client = void 0;

    Gears.prototype.watch_worksource = function(worksource, livingCallback, deadCallback) {
      var previousWorksource, watch;
      var _this = this;
      previousWorksource = worksource.worksource();
      return watch = worksource.worksource.subscribe(function(newWorksource) {
        if ((previousWorksource === void 0) && (newWorksource !== void 0)) {
          _this.client.addWorksource(newWorksource);
          if (typeof livingCallback === "function") livingCallback();
        } else if ((previousWorksource !== void 0) && (newWorksource === void 0)) {
          _this.client.removeWorksource(previousWorksource);
          _this.worksources.remove(worksource);
          if (typeof deadCallback === "function") deadCallback();
          watch.dispose();
        }
        return previousWorksource = newWorksource;
      });
    };

    Gears.prototype.register_templates = function(templates) {
      var instantiateTemplate;
      var _this = this;
      instantiateTemplate = function(template) {
        var templateInstance;
        templateInstance = new template.type(template.parameters);
        _this.templates.push(templateInstance);
        return _this.watch_worksource(templateInstance, function() {
          _this.templates.remove(templateInstance);
          _this.worksources.push(templateInstance);
          return instantiateTemplate(template);
        });
      };
      return templates.map(instantiateTemplate);
    };

    Gears.prototype.start = function() {
      var worksource, _i, _len, _ref;
      var _this = this;
      _ref = this.client.getWorksources();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        worksource = _ref[_i];
        if (worksource instanceof gridbee.worksource.boinc.BoincWorkSource) {
          worksource = new BoincWorksource(worksource);
        } else {
          continue;
        }
        this.worksources.push(worksource);
        this.watch_worksource(worksource);
      }
      if (this.running()) this.client.start();
      this.running.subscribe(function() {
        if (_this.running()) {
          return _this.client.start();
        } else {
          return _this.client.stop();
        }
      });
      this.client.setThreadNumber(this.threads());
      return this.threads.subscribe(function() {
        return _this.client.setThreadNumber(_this.threads());
      });
    };

    function Gears(client, templates) {
      this.client = client;
      this.start = __bind(this.start, this);
      this.register_templates = __bind(this.register_templates, this);
      this.watch_worksource = __bind(this.watch_worksource, this);
      this.register_templates(templates);
      this.client.onLog.subscribe(log('main'));
    }

    return Gears;

  })();

  client = new gridbee.core.control.Client("GridBee");

  window.gears = new Gears(client, templates);

  gears.start();

}).call(this);
