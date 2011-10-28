(function() {
  var Boinc, BoincWorkunit, Gears, Worksource, Workunit, client, delayedObservable, log, max_id, temporarilySet;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Worksource = (function() {
    Worksource.prototype.type = null;
    Worksource.prototype.description = null;
    Worksource.prototype.name = ko.observable(null);
    Worksource.prototype.workunits = ko.observableArray([]);
    Worksource.prototype.living = ko.observable(false);
    Worksource.prototype.worksource = void 0;
    function Worksource(worksource) {
      this.worksource = worksource;
      this.types = void 0;
      this.register = void 0;
      this.ok = ko.observable(false);
      this.error = ko.observable(null);
      this.name = ko.observable(null);
      this.workunits = ko.observableArray([]);
      this.living = ko.observable(false);
    }
    Worksource.prototype.types = [];
    Worksource.prototype.register = function(cls) {
      return Worksource.prototype.types.push(cls);
    };
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
  Boinc = (function() {
    __extends(Boinc, Worksource);
    Boinc.prototype.type = 'boinc';
    Boinc.prototype.description = 'BOINC project';
    function Boinc(worksource) {
      var workunit, _i, _len, _ref, _ref2;
      this.worksource = worksource;
      this.getProjectname = __bind(this.getProjectname, this);
      this.checkAuthkey = __bind(this.checkAuthkey, this);
      this.getAuthkey = __bind(this.getAuthkey, this);
      this.getSchedulerUrl = __bind(this.getSchedulerUrl, this);
      this.watchWorkunits = __bind(this.watchWorkunits, this);
      this.create = __bind(this.create, this);
      Boinc.__super__.constructor.call(this, this.worksource);
      this.projecturl = delayedObservable('');
      this.username = delayedObservable('');
      this.password = delayedObservable('');
      this.authkey = delayedObservable('');
      this.projectname = ko.observable('');
      this.scheduler = ko.observable('');
      this.living(this.worksource != null);
      if (this.worksource != null) {
        this.name((_ref = this.worksource.projectname) != null ? _ref : this.worksource.getSchedulerUrl());
        this.projectname(this.name());
        this.projecturl(this.worksource.projecturl);
        this.scheduler(this.worksource.getSchedulerUrl());
        this.authkey(this.worksource.getAuthkey());
        _ref2 = this.worksource.getWorkUnits();
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          workunit = _ref2[_i];
          this.workunits.push(new BoincWorkunit(workunit));
        }
        this.watchWorkunits();
        return;
      }
      this.name('Bvp6 demo');
      this.projectname(this.name());
      this.projecturl('http://bvp6.hpc.iit.bme.hu/w2g');
      this.scheduler('http://bvp6.hpc.iit.bme.hu/w2g_cgi/cgi');
      this.authkey('2962b0b8970c4ca693d953da648724cd');
      this.ok(true);
      this.projecturl.immediateSubscribe(__bind(function() {
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
    Boinc.prototype.create = function() {
      var BoincWorkSource;
      BoincWorkSource = web2grid.worksource.boinc.BoincWorkSource;
      this.worksource = new BoincWorkSource(this.scheduler(), this.authkey());
      this.watchWorkunits();
      return this.living(true);
    };
    Boinc.prototype.watchWorkunits = function() {
      this.worksource.onAddWorkunit.subscribe(__bind(function(addedWorkunit) {
        return this.workunits.push(new BoincWorkunit(addedWorkunit));
      }, this));
      return this.worksource.onRemoveWorkunit.subscribe(__bind(function(removedWorkunit) {
        var candidate, _i, _len, _ref, _results;
        _ref = this.workunits();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          candidate = _ref[_i];
          _results.push(candidate.workunit === removedWorkunit ? this.workunits.remove(candidate) : void 0);
        }
        return _results;
      }, this));
    };
    Boinc.prototype.getSchedulerUrl = function() {
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
    Boinc.prototype.getAuthkey = function() {
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
    Boinc.prototype.checkAuthkey = function() {
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
    Boinc.prototype.getProjectname = function() {
      var request;
      if (this.projecturl().length === 0) {
        this.projectname('');
      }
      request = this.webrpc.projectConfiguration();
      return request.onComplete.subscribe(__bind(function(projectInfo) {
        return this.projectname(projectInfo.name);
      }, this));
    };
    return Boinc;
  })();
  Worksource.prototype.register(Boinc);
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
    Gears.prototype.client = void 0;
    Gears.prototype.skeletons = {};
    Gears.prototype.watch_worksource = function(worksource, livingCallback, deadCallback) {
      var watch;
      return watch = worksource.living.subscribe(__bind(function(living) {
        if (living === true) {
          this.client.addWorksource(worksource.worksource);
          this.worksources.push(worksource);
          return typeof livingCallback === "function" ? livingCallback() : void 0;
        } else {
          this.client.removeWorksource(worksource.worksource);
          this.worksources.remove(worksource);
          if (typeof deadCallback === "function") {
            deadCallback();
          }
          return watch.dispose();
        }
      }, this));
    };
    Gears.prototype.register_skeletons = function() {
      var constructor, newskeleton, type, _i, _len, _ref, _results;
      newskeleton = __bind(function(type, constructor) {
        var skeleton;
        skeleton = new constructor();
        this.skeletons[type](skeleton);
        return this.watch_worksource(skeleton, (function() {
          return newskeleton(type, constructor);
        }));
      }, this);
      _ref = Worksource.prototype.types;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        constructor = _ref[_i];
        type = constructor.prototype.type;
        this.skeletons[type] = ko.observable(null);
        _results.push(newskeleton(type, constructor));
      }
      return _results;
    };
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
    function Gears(client) {
      this.client = client;
      this.start = __bind(this.start, this);
      this.register_skeletons = __bind(this.register_skeletons, this);
      this.watch_worksource = __bind(this.watch_worksource, this);
      this.client.onLog.subscribe(log('main'));
      this.register_skeletons();
    }
    return Gears;
  })();
  client = new web2grid.core.control.Client("GridBee");
  window.gears = new Gears(client);
  $(function() {
    var constructor, _i, _len, _ref;
    _ref = Worksource.prototype.types;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      constructor = _ref[_i];
      $('#skeleton').tmpl(constructor.prototype).appendTo('#skeletons');
    }
    ko.applyBindings(window.gears);
    return window.gears.start();
  });
}).call(this);
