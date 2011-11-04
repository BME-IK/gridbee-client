(function() {
  var BoincTemplate, BoincWorksource, BoincWorkunit, Gears, Worksource, Workunit, client, log, max_id, observableClass, temporarilyAdd;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  max_id = 0;
  Worksource = (function() {
    Worksource.prototype.type = null;
    Worksource.prototype.description = null;
    Worksource.prototype.name = ko.observable(null);
    Worksource.prototype.workunits = ko.observableArray([]);
    Worksource.prototype.worksource = ko.observable(void 0);
    Worksource.prototype.overview = ko.observableArray([]);
    function Worksource() {
      this.id = max_id++;
      this.worksource = ko.observable(void 0);
      this.name = ko.observable(null);
      this.workunits = ko.observableArray([]);
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
      this.start = __bind(this.start, this);      BoincWorksource.__super__.constructor.call(this);
      this.projecturl = ko.observable('');
      this.projectname = ko.observable('');
      this.scheduler = ko.observable('');
      this.username = ko.observable('');
      this.password = ko.observable('');
      this.authkey = ko.observable('');
      this.worksource.subscribe(__bind(function() {
        if (this.worksource() instanceof BoincWorksource) {
          throw 1;
        }
        if (this.worksource() !== void 0) {
          return this.start();
        }
      }, this));
      this.worksource(worksource);
    }
    BoincWorksource.prototype.start = function() {
      var workunit, _i, _len, _ref, _ref2, _ref3;
      console.log(this.worksource());
      this.projecturl = ko.observable(this.worksource().projecturl);
      this.projectname = ko.observable(this.worksource().projectname);
      this.scheduler = ko.observable(this.worksource().getSchedulerUrl());
      this.username = ko.observable(this.worksource().username);
      this.authkey = ko.observable(this.worksource().getAuthkey());
      this.name = (_ref = (_ref2 = this.projectname()) != null ? _ref2 : this.projecturl()) != null ? _ref : this.scheduler;
      this.overview = [
        {
          name: 'Scheduler',
          observable: this.scheduler
        }, {
          name: 'Authkey',
          observable: this.authkey
        }
      ];
      _ref3 = this.worksource().getWorkUnits();
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        workunit = _ref3[_i];
        this.workunits.push(new BoincWorkunit(workunit));
      }
      this.worksource().onAddWorkunit.subscribe(__bind(function(addedWorkunit) {
        return this.workunits.push(new BoincWorkunit(addedWorkunit));
      }, this));
      return this.worksource().onRemoveWorkunit.subscribe(__bind(function(removedWorkunit) {
        var candidate, _j, _len2, _ref4, _results;
        _ref4 = this.workunits();
        _results = [];
        for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
          candidate = _ref4[_j];
          _results.push(candidate.workunit === removedWorkunit ? this.workunits.remove(candidate) : void 0);
        }
        return _results;
      }, this));
    };
    return BoincWorksource;
  })();
  BoincWorkunit = (function() {
    __extends(BoincWorkunit, Workunit);
    function BoincWorkunit(workunit) {
      this.workunit = workunit;
      BoincWorkunit.__super__.constructor.call(this, this.workunit);
      this.progress(this.workunit.getProgress());
      this.workunit.onProgressChange.subscribe(__bind(function() {
        return this.progress(this.workunit.getProgress());
      }, this));
      this.status(this.workunit.getStatusString());
      this.workunit.onStatusChange.subscribe(__bind(function() {
        return this.status(this.workunit.getStatusString());
      }, this));
      this.workunit.onLog.subscribe(log('workunit-' + this.id));
    }
    return BoincWorkunit;
  })();
  observableClass = (ko.observable()).__proto__;
  observableClass.delayedSubscribe = function(callback) {
    var observable, timeout;
    observable = this;
    timeout = void 0;
    return observable.subscribe(function(newValue) {
      if (timeout != null) {
        clearTimeout(timeout);
      }
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
  temporarilyAdd = function(observable, values, removeTriggerObservables) {
    var callback, o, value, watches, _i, _len;
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      value = values[_i];
      observable.push(value);
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
        _results.push(observable.remove(value));
      }
      return _results;
    };
    return watches = (function() {
      var _j, _len2, _results;
      _results = [];
      for (_j = 0, _len2 = towatch.length; _j < _len2; _j++) {
        o = towatch[_j];
        _results.push(o.subscribe(callback));
      }
      return _results;
    })();
  };
  BoincTemplate = (function() {
    __extends(BoincTemplate, BoincWorksource);
    function BoincTemplate(parameters) {
      this.getProjectname = __bind(this.getProjectname, this);
      this.checkAuthkey = __bind(this.checkAuthkey, this);
      this.getAuthkey = __bind(this.getAuthkey, this);
      this.getSchedulerUrl = __bind(this.getSchedulerUrl, this);
      this.create = __bind(this.create, this);
      var property, _i, _len, _ref, _ref2, _ref3;
      BoincTemplate.__super__.constructor.call(this);
      this.formtitle = parameters.formtitle;
      this.description = parameters.description;
      this.templatename = parameters.templatename;
      this.ok = ko.observable((_ref = parameters.ok) != null ? _ref : false);
      this.hide = (_ref2 = parameters.hide) != null ? _ref2 : [];
      this.error = ko.observableArray([]);
      _ref3 = ['projecturl', 'projectname', 'scheduler', 'username', 'password', 'authkey'];
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        property = _ref3[_i];
        if (parameters[property] != null) {
          this[property](parameters[property]);
        }
      }
      this.projecturl.subscribe(__bind(function() {
        this.projectname.immediate('');
        this.scheduler.immediate('');
        this.username.immediate('');
        this.password.immediate('');
        return this.authkey.immediate('');
      }, this));
      this.username.subscribe(__bind(function() {
        return this.authkey.immediate('');
      }, this));
      this.password.subscribe(__bind(function() {
        return this.authkey.immediate('');
      }, this));
      this.projecturl.delayedSubscribe(__bind(function() {
        this.webrpc = new web2grid.worksource.boinc.webrpc.BoincWebRPC(this.projecturl());
        this.getSchedulerUrl();
        return this.getProjectname();
      }, this));
      this.username.delayedSubscribe(this.getAuthkey);
      this.password.delayedSubscribe(this.getAuthkey);
      this.authkey.delayedSubscribe(this.checkAuthkey);
    }
    BoincTemplate.prototype.create = function() {
      var BoincWorkSource, modelWorksource;
      BoincWorkSource = web2grid.worksource.boinc.BoincWorkSource;
      modelWorksource = new BoincWorkSource(this.scheduler(), this.authkey());
      modelWorksource.projecturl = this.projecturl();
      modelWorksource.projectname = this.projectname();
      modelWorksource.username = this.username();
      return this.worksource(modelWorksource);
    };
    BoincTemplate.prototype.getSchedulerUrl = function() {
      if (this.projecturl().length === 0) {
        return;
      }
      return $.ajax({
        url: this.projecturl(),
        success: __bind(function(data, status) {
          var link, links, schedulers, url_re, _i, _len;
          links = data.match(/<link rel="boinc_scheduler" [^>]*>/g);
          url_re = /[^"]*(?="\s*>$)/;
          for (_i = 0, _len = links.length; _i < _len; _i++) {
            link = links[_i];
            schedulers = link.match(url_re);
          }
          return this.scheduler.immediate(schedulers[0]);
        }, this),
        error: __bind(function() {
          return temporarilyAdd(this.error, ['projecturl'], [this.projecturl]);
        }, this)
      });
    };
    BoincTemplate.prototype.getAuthkey = function() {
      var request;
      if (this.username().length === 0 || this.password().length === 0) {
        return;
      }
      request = this.webrpc.lookupAccount(this.username(), this.password());
      request.onComplete.subscribe(__bind(function(userInfo) {
        return this.authkey.immediate(userInfo.Auth);
      }, this));
      return request.onError.subscribe(__bind(function(error) {
        return temporarilyAdd(this.error, ['username', 'password'], [this.username, this.password]);
      }, this));
    };
    BoincTemplate.prototype.checkAuthkey = function() {
      var request;
      if (this.authkey().length === 0 || this.scheduler().length === 0) {
        this.ok(false);
        return;
      }
      request = this.webrpc.getAccountInfo(this.authkey());
      request.onComplete.subscribe(__bind(function(accInfo) {
        return this.ok(true);
      }, this));
      return request.onError.subscribe(__bind(function(error) {
        this.ok(false);
        return temporarilyAdd(this.error, ['authkey'], [this.authkey]);
      }, this));
    };
    BoincTemplate.prototype.getProjectname = function() {
      var request;
      if (this.projecturl().length === 0) {
        this.projectname('');
      }
      request = this.webrpc.projectConfiguration();
      return request.onComplete.subscribe(__bind(function(projectInfo) {
        return this.projectname(projectInfo.name);
      }, this));
    };
    return BoincTemplate;
  })();
  if (typeof templates === "undefined" || templates === null) {
    templates = [];
  }
  templates.push({
    type: BoincTemplate,
    parameters: {
      templatename: 'boinc-bvp6-demo',
      formtitle: 'Add Bvp6 demo project',
      description: 'Description',
      hide: ['projecturl', 'scheduler', 'authkey', 'username_password'],
      ok: true,
      projectname: 'Bvp6 demo',
      projecturl: 'http://bvp6.hpc.iit.bme.hu/w2g',
      scheduler: 'http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi',
      authkey: '2962b0b8970c4ca693d953da648724cd'
    }
  });
  templates.push({
    type: BoincTemplate,
    parameters: {
      templatename: 'boinc-userpass',
      formtitle: 'Add BOINC project',
      description: 'Description',
      hide: ['scheduler', 'authkey'],
      ok: false,
      projectname: 'New BOINC project'
    }
  });
  templates.push({
    type: BoincTemplate,
    parameters: {
      templatename: 'boinc',
      formtitle: 'Add BOINC project (for developers)',
      description: 'Description',
      ok: false,
      projectname: 'New BOINC project'
    }
  });
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
  Gears = (function() {
    Gears.prototype.log = null;
    Gears.prototype.running = ko.observable(false);
    Gears.prototype.threads = ko.observable(2);
    Gears.prototype.worksources = ko.observableArray([]);
    Gears.prototype.templates = ko.observableArray([]);
    Gears.prototype.client = void 0;
    Gears.prototype.watch_worksource = function(worksource, livingCallback, deadCallback) {
      var previousWorksource, watch;
      previousWorksource = worksource.worksource();
      return watch = worksource.worksource.subscribe(__bind(function(newWorksource) {
        if ((previousWorksource === void 0) && (newWorksource !== void 0)) {
          this.client.addWorksource(newWorksource);
          this.worksources.push(worksource);
          if (typeof livingCallback === "function") {
            livingCallback();
          }
        } else if ((previousWorksource !== void 0) && (newWorksource === void 0)) {
          this.client.removeWorksource(previousWorksource);
          this.worksources.remove(worksource);
          if (typeof deadCallback === "function") {
            deadCallback();
          }
          watch.dispose();
        }
        return previousWorksource = newWorksource;
      }, this));
    };
    Gears.prototype.register_templates = function(templates) {
      var instantiateTemplate;
      instantiateTemplate = __bind(function(template) {
        var templateInstance;
        templateInstance = new template.type(template.parameters);
        this.templates.push(templateInstance);
        return this.watch_worksource(templateInstance, __bind(function() {
          this.templates.remove(templateInstance);
          return instantiateTemplate(template);
        }, this));
      }, this);
      return templates.map(instantiateTemplate);
    };
    Gears.prototype.start = function() {
      var worksource, _i, _len, _ref;
      _ref = this.client.getWorksources();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        worksource = _ref[_i];
        if (worksource instanceof web2grid.worksource.boinc.BoincWorkSource) {
          worksource = new BoincWorksource(worksource);
        } else {
          continue;
        }
        this.worksources.push(worksource);
        this.watch_worksource(worksource);
      }
      if (this.running()) {
        this.client.start();
      }
      this.running.subscribe(__bind(function() {
        if (this.running()) {
          return this.client.start();
        } else {
          return this.client.stop();
        }
      }, this));
      this.client.setThreadNumber(this.threads());
      return this.threads.subscribe(__bind(function() {
        return this.client.setThreadNumber(this.threads());
      }, this));
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
  client = new web2grid.core.control.Client("GridBee");
  if (client.getWorksources().length === 0) {
    client.addBoincWorkSource("http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi", "2962b0b8970c4ca693d953da648724cd");
  }
  window.gears = new Gears(client, templates);
  $(function() {
    ko.applyBindings(window.gears);
    return window.gears.start();
  });
}).call(this);
