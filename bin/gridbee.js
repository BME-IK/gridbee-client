(function() {
  var Boinc, BoincNewWorksourceForm, BoincWorkunit, Gears, NewWorksourceForm, Worksource, Workunit, bvp6, client, delayedObservable, empty, empty_dev, log, max_id, temporarilySet;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  max_id = 0;
  Worksource = (function() {
    Worksource.prototype.id = null;
    Worksource.prototype.type = null;
    Worksource.prototype.description = null;
    Worksource.prototype.name = ko.observable(null);
    Worksource.prototype.workunits = ko.observableArray([]);
    Worksource.prototype.living = ko.observable(false);
    Worksource.prototype.worksource = void 0;
    Worksource.prototype.overview = ko.observableArray([]);
    function Worksource(worksource) {
      this.worksource = worksource;
      this.id = max_id++;
      this.name = ko.observable(null);
      this.workunits = ko.observableArray([]);
      this.living = ko.observable(true);
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
  delayedObservable = function(initialValue) {
    var callbacks, nodelay, observable;
    observable = ko.observable(initialValue);
    observable.immediateSubscribe = observable.subscribe;
    callbacks = [];
    nodelay = false;
    observable.subscribe = function(callback) {
      var t;
      callbacks.push(callback);
      t = null;
      return observable.immediateSubscribe(function() {
        if (t) {
          clearTimeout(t);
        }
        if (!nodelay) {
          return t = setTimeout((function() {
            return callback(observable());
          }), 1000);
        }
      });
    };
    observable.immediate = function(newValue) {
      var callback, _i, _len, _results;
      nodelay = true;
      observable(newValue);
      nodelay = false;
      _results = [];
      for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
        callback = callbacks[_i];
        _results.push(callback(newValue));
      }
      return _results;
    };
    return observable;
  };
  temporarilySet = function(observable, value, towatch) {
    var callback, o, watches;
    observable(value);
    callback = function() {
      var w, _i, _len;
      for (_i = 0, _len = watches.length; _i < _len; _i++) {
        w = watches[_i];
        w.dispose();
      }
      return observable(null);
    };
    return watches = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = towatch.length; _i < _len; _i++) {
        o = towatch[_i];
        _results.push(o.immediate ? o.immediateSubscribe(callback) : o.subscribe(callback));
      }
      return _results;
    })();
  };
  NewWorksourceForm = (function() {
    NewWorksourceForm.prototype.newworksourceforms = ko.observableArray([]);
    function NewWorksourceForm(type, formtitle, description) {
      this.type = type;
      this.formtitle = ko.observable(formtitle);
      this.description = ko.observable(description);
      this.worksource = ko.observable(void 0);
      this.newworksourceforms.push(this);
    }
    return NewWorksourceForm;
  })();
  Boinc = (function() {
    __extends(Boinc, Worksource);
    Boinc.prototype.type = 'boinc';
    Boinc.prototype.description = 'BOINC project';
    function Boinc(worksource) {
      var workunit, _i, _len, _ref, _ref2, _ref3;
      this.worksource = worksource;
      Boinc.__super__.constructor.call(this, this.worksource);
      this.projecturl = ko.observable(this.worksource.projecturl);
      this.projectname = ko.observable(this.worksource.projectname);
      this.scheduler = ko.observable(this.worksource.getSchedulerUrl());
      this.username = ko.observable(this.worksource.username);
      this.authkey = ko.observable(this.worksource.getAuthkey());
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
      _ref3 = this.worksource.getWorkUnits();
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        workunit = _ref3[_i];
        this.workunits.push(new BoincWorkunit(workunit));
      }
      this.worksource.onAddWorkunit.subscribe(__bind(function(addedWorkunit) {
        return this.workunits.push(new BoincWorkunit(addedWorkunit));
      }, this));
      this.worksource.onRemoveWorkunit.subscribe(__bind(function(removedWorkunit) {
        var candidate, _j, _len2, _ref4, _results;
        _ref4 = this.workunits();
        _results = [];
        for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
          candidate = _ref4[_j];
          _results.push(candidate.workunit === removedWorkunit ? this.workunits.remove(candidate) : void 0);
        }
        return _results;
      }, this));
      return;
    }
    return Boinc;
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
  BoincNewWorksourceForm = (function() {
    __extends(BoincNewWorksourceForm, NewWorksourceForm);
    function BoincNewWorksourceForm(parameters) {
      this.parameters = parameters;
      this.getProjectname = __bind(this.getProjectname, this);
      this.checkAuthkey = __bind(this.checkAuthkey, this);
      this.getAuthkey = __bind(this.getAuthkey, this);
      this.getSchedulerUrl = __bind(this.getSchedulerUrl, this);
      this.reset = __bind(this.reset, this);
      this.create = __bind(this.create, this);
      BoincNewWorksourceForm.__super__.constructor.call(this, 'boinc', parameters.formtitle, parameters.description);
      this.reset();
      this.projecturl.immediateSubscribe(__bind(function() {
        this.projectname('');
        this.scheduler('');
        this.username.immediate('');
        this.password.immediate('');
        return this.authkey.immediate('');
      }, this));
      this.username.immediateSubscribe(__bind(function() {
        return this.authkey.immediate('');
      }, this));
      this.password.immediateSubscribe(__bind(function() {
        return this.authkey.immediate('');
      }, this));
      this.projecturl.subscribe(__bind(function() {
        this.webrpc = new web2grid.worksource.boinc.webrpc.BoincWebRPC(this.projecturl());
        this.getSchedulerUrl();
        return this.getProjectname();
      }, this));
      this.username.subscribe(this.getAuthkey);
      this.password.subscribe(this.getAuthkey);
      this.authkey.subscribe(this.checkAuthkey);
    }
    BoincNewWorksourceForm.prototype.create = function() {
      var BoincWorkSource, modelWorksource;
      BoincWorkSource = web2grid.worksource.boinc.BoincWorkSource;
      modelWorksource = new BoincWorkSource(this.scheduler(), this.authkey());
      modelWorksource.projecturl = this.projecturl();
      modelWorksource.projectname = this.projectname();
      modelWorksource.username = this.username();
      this.worksource(new Boinc(modelWorksource));
      return this.reset();
    };
    BoincNewWorksourceForm.prototype.reset = function() {
      var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
      this.projecturl = delayedObservable((_ref = this.parameters.projecturl) != null ? _ref : '');
      this.projectname = ko.observable((_ref2 = this.parameters.projectname) != null ? _ref2 : '');
      this.scheduler = ko.observable((_ref3 = this.parameters.scheduler) != null ? _ref3 : '');
      this.username = delayedObservable((_ref4 = this.parameters.username) != null ? _ref4 : '');
      this.password = delayedObservable((_ref5 = this.parameters.password) != null ? _ref5 : '');
      this.authkey = delayedObservable((_ref6 = this.parameters.authkey) != null ? _ref6 : '');
      this.ok = ko.observable((_ref7 = this.parameters.ok) != null ? _ref7 : false);
      return this.hide = (_ref8 = this.parameters.hide) != null ? _ref8 : [];
    };
    BoincNewWorksourceForm.prototype.getSchedulerUrl = function() {
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
          return this.scheduler(schedulers[0]);
        }, this),
        error: __bind(function() {
          return temporarilySet(this.error, 'Invalid project url', [this.projecturl]);
        }, this)
      });
    };
    BoincNewWorksourceForm.prototype.getAuthkey = function() {
      var request;
      if (this.username().length === 0 || this.password().length === 0) {
        return;
      }
      request = this.webrpc.lookupAccount(this.username(), this.password());
      request.onComplete.subscribe(__bind(function(userInfo) {
        return this.authkey.immediate(userInfo.Auth);
      }, this));
      return request.onError.subscribe(__bind(function(error) {
        if (!this.ok()) {
          return temporarilySet(this.error, 'Invalid username and/or password', [this.username, this.password]);
        }
      }, this));
    };
    BoincNewWorksourceForm.prototype.checkAuthkey = function() {
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
        if (!this.ok()) {
          return temporarilySet(this.error, 'Invalid authkey', [this.authkey]);
        }
      }, this));
    };
    BoincNewWorksourceForm.prototype.getProjectname = function() {
      var request;
      if (this.projecturl().length === 0) {
        this.projectname('');
      }
      request = this.webrpc.projectConfiguration();
      return request.onComplete.subscribe(__bind(function(projectInfo) {
        return this.projectname(projectInfo.name);
      }, this));
    };
    return BoincNewWorksourceForm;
  })();
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
    Gears.prototype.newworksourceforms = void 0;
    Gears.prototype.client = void 0;
    Gears.prototype.start = function() {
      var worksource, _i, _len, _ref;
      _ref = this.client.getWorksources();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        worksource = _ref[_i];
        if (worksource instanceof web2grid.worksource.boinc.BoincWorkSource) {
          worksource = new Boinc(worksource);
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
    function Gears(client, newworksourceforms) {
      var newworksourceform, _i, _len, _ref;
      this.client = client;
      this.newworksourceforms = newworksourceforms;
      this.start = __bind(this.start, this);
      this.client.onLog.subscribe(log('main'));
      _ref = this.newworksourceforms();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        newworksourceform = _ref[_i];
        newworksourceform.worksource.subscribe(__bind(function(newworksource) {
          var death_watch;
          this.client.addWorksource(newworksource.worksource);
          this.worksources.push(newworksource);
          return death_watch = worksource.living.subscribe(__bind(function(living) {
            if (living === false) {
              this.client.removeWorksource(worksource.worksource);
              this.worksources.remove(worksource);
              return death_watch.dispose();
            }
          }, this));
        }, this));
      }
    }
    return Gears;
  })();
  bvp6 = new BoincNewWorksourceForm({
    formtitle: 'Add Bvp6 demo project',
    description: 'Description',
    projectname: 'Bvp6 demo',
    projecturl: 'http://bvp6.hpc.iit.bme.hu/w2g',
    scheduler: 'http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi',
    authkey: '2962b0b8970c4ca693d953da648724cd',
    hide: ['projecturl', 'scheduler', 'authkey', 'username_password'],
    ok: true
  });
  empty = new BoincNewWorksourceForm({
    formtitle: 'Add BOINC project',
    description: 'Description',
    hide: ['scheduler', 'authkey'],
    ok: false
  });
  empty_dev = new BoincNewWorksourceForm({
    formtitle: 'Add BOINC project (for developers)',
    description: 'Description',
    ok: false
  });
  client = new web2grid.core.control.Client("GridBee");
  if (client.getWorksources().length === 0) {
    client.addBoincWorkSource("http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi", "2962b0b8970c4ca693d953da648724cd");
  }
  window.gears = new Gears(client, NewWorksourceForm.prototype.newworksourceforms);
  $(function() {
    ko.applyBindings(window.gears);
    return window.gears.start();
  });
}).call(this);
