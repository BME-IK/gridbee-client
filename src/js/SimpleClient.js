$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof web2grid=='undefined') web2grid = {}
if(!web2grid.worksource) web2grid.worksource = {}
if(!web2grid.worksource.boinc) web2grid.worksource.boinc = {}
if(!web2grid.worksource.boinc.reply) web2grid.worksource.boinc.reply = {}
web2grid.worksource.boinc.reply.DataServerReply = function(node) { if( node === $_ ) return; {
	if(node.hasNode.resolve("status")) this.status = Std.parseInt(node.node.resolve("status").getInnerData());
	if(node.hasNode.resolve("file_size")) this.file_size = Std.parseInt(node.node.resolve("file_size").getInnerData());
	if(node.hasNode.resolve("message")) this.message = node.node.resolve("message").getInnerData();
}}
web2grid.worksource.boinc.reply.DataServerReply.__name__ = ["web2grid","worksource","boinc","reply","DataServerReply"];
web2grid.worksource.boinc.reply.DataServerReply.prototype.status = null;
web2grid.worksource.boinc.reply.DataServerReply.prototype.file_size = null;
web2grid.worksource.boinc.reply.DataServerReply.prototype.message = null;
web2grid.worksource.boinc.reply.DataServerReply.prototype.__class__ = web2grid.worksource.boinc.reply.DataServerReply;
web2grid.worksource.boinc.reply.ResultSlot = function(node) { if( node === $_ ) return; {
	if(node.hasNode.resolve("name")) this.name = node.node.resolve("name").getInnerData();
	if(node.hasNode.resolve("wu_name")) this.wu_name = node.node.resolve("wu_name").getInnerData();
	if(node.hasNode.resolve("platform")) this.platform = web2grid.worksource.boinc.PlatformNames.fromString(node.node.resolve("platform").getInnerData());
	if(node.hasNode.resolve("version_num")) this.version_num = Std.parseInt(node.node.resolve("version_num").getInnerData());
	if(node.hasNode.resolve("report_deadline")) this.report_deadline = Std.parseInt(node.node.resolve("report_deadline").getInnerData());
	this.file_ref = new Array();
	if(node.hasNode.resolve("file_ref")) { var $it0 = node.nodes.resolve("file_ref").iterator();
	while( $it0.hasNext() ) { var child = $it0.next();
	this.file_ref.push(new web2grid.worksource.boinc.reply.FileRef(child));
	}}
}}
web2grid.worksource.boinc.reply.ResultSlot.__name__ = ["web2grid","worksource","boinc","reply","ResultSlot"];
web2grid.worksource.boinc.reply.ResultSlot.prototype.name = null;
web2grid.worksource.boinc.reply.ResultSlot.prototype.wu_name = null;
web2grid.worksource.boinc.reply.ResultSlot.prototype.platform = null;
web2grid.worksource.boinc.reply.ResultSlot.prototype.version_num = null;
web2grid.worksource.boinc.reply.ResultSlot.prototype.report_deadline = null;
web2grid.worksource.boinc.reply.ResultSlot.prototype.file_ref = null;
web2grid.worksource.boinc.reply.ResultSlot.prototype.__class__ = web2grid.worksource.boinc.reply.ResultSlot;
if(typeof haxe=='undefined') haxe = {}
if(!haxe.exception) haxe.exception = {}
haxe.exception.Exception = function(message,innerException,numberOfStackTraceShifts) { if( message === $_ ) return; {
	this.message = null == message?"Unknown exception":message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
}}
haxe.exception.Exception.__name__ = ["haxe","exception","Exception"];
haxe.exception.Exception.prototype.baseException = null;
haxe.exception.Exception.prototype.innerException = null;
haxe.exception.Exception.prototype.message = null;
haxe.exception.Exception.prototype.stackTrace = null;
haxe.exception.Exception.prototype.stackTraceArray = null;
haxe.exception.Exception.prototype.generateStackTrace = function(numberOfStackTraceShifts) {
	this.stackTraceArray = haxe.Stack.callStack().slice(numberOfStackTraceShifts + 1);
	var exceptionClass = Type.getClass(this);
	while(haxe.exception.Exception != exceptionClass) {
		this.stackTraceArray.shift();
		exceptionClass = Type.getSuperClass(exceptionClass);
	}
}
haxe.exception.Exception.prototype.getBaseException = function() {
	var result = this;
	while(null != result.innerException) {
		result = result.innerException;
	}
	return result;
}
haxe.exception.Exception.prototype.toString = function() {
	return this.message + haxe.Stack.toString(this.stackTraceArray);
}
haxe.exception.Exception.prototype.__class__ = haxe.exception.Exception;
haxe.exception.ArgumentNullException = function(argumentName,numberOfStackTraceShifts) { if( argumentName === $_ ) return; {
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
}}
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
for(var k in haxe.exception.Exception.prototype ) haxe.exception.ArgumentNullException.prototype[k] = haxe.exception.Exception.prototype[k];
haxe.exception.ArgumentNullException.prototype.__class__ = haxe.exception.ArgumentNullException;
if(typeof hsl=='undefined') hsl = {}
if(!hsl.haxe) hsl.haxe = {}
hsl.haxe.Bond = function(p) { if( p === $_ ) return; {
	this.halted = false;
}}
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype.halted = null;
hsl.haxe.Bond.prototype.willDestroyOnUse = null;
hsl.haxe.Bond.prototype.destroy = function() {
	null;
}
hsl.haxe.Bond.prototype.destroyOnUse = function() {
	this.willDestroyOnUse = true;
	return this;
}
hsl.haxe.Bond.prototype.halt = function() {
	this.halted = true;
}
hsl.haxe.Bond.prototype.resume = function() {
	this.halted = false;
}
hsl.haxe.Bond.prototype.__class__ = hsl.haxe.Bond;
haxe.Http = function(url) { if( url === $_ ) return; {
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
}}
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	}
	h.onError = function(e) {
		throw e;
	}
	h.request(false);
	return r;
}
haxe.Http.prototype.url = null;
haxe.Http.prototype.async = null;
haxe.Http.prototype.postData = null;
haxe.Http.prototype.headers = null;
haxe.Http.prototype.params = null;
haxe.Http.prototype.setHeader = function(header,value) {
	this.headers.set(header,value);
}
haxe.Http.prototype.setParameter = function(param,value) {
	this.params.set(param,value);
}
haxe.Http.prototype.setPostData = function(data) {
	this.postData = data;
}
haxe.Http.prototype.request = function(post) {
	var me = this;
	var r = new js.XMLHttpRequest();
	var onreadystatechange = function() {
		if(r.readyState != 4) return;
		var s = (function($this) {
			var $r;
			try {
				$r = r.status;
			}
			catch( $e0 ) {
				{
					var e = $e0;
					$r = null;
				}
			}
			return $r;
		}(this));
		if(s == undefined) s = null;
		if(s != null) me.onStatus(s);
		if(s != null && s >= 200 && s < 400) me.onData(r.responseText);
		else switch(s) {
		case null: case undefined:{
			me.onError("Failed to connect or resolve host");
		}break;
		case 12029:{
			me.onError("Failed to connect to host");
		}break;
		case 12007:{
			me.onError("Unknown host");
		}break;
		default:{
			me.onError("Http Error #" + r.status);
		}break;
		}
	}
	if(this.async) r.onreadystatechange = onreadystatechange;
	var uri = this.postData;
	if(uri != null) post = true;
	else { var $it1 = this.params.keys();
	while( $it1.hasNext() ) { var p = $it1.next();
	{
		if(uri == null) uri = "";
		else uri += "&";
		uri += StringTools.urlDecode(p) + "=" + StringTools.urlEncode(this.params.get(p));
	}
	}}
	try {
		if(post) r.open("POST",this.url,this.async);
		else if(uri != null) {
			var question = this.url.split("?").length <= 1;
			r.open("GET",this.url + (question?"?":"&") + uri,this.async);
			uri = null;
		}
		else r.open("GET",this.url,this.async);
	}
	catch( $e2 ) {
		{
			var e = $e2;
			{
				this.onError(e.toString());
				return;
			}
		}
	}
	if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	{ var $it3 = this.headers.keys();
	while( $it3.hasNext() ) { var h = $it3.next();
	r.setRequestHeader(h,this.headers.get(h));
	}}
	r.send(uri);
	if(!this.async) onreadystatechange();
}
haxe.Http.prototype.onData = function(data) {
	null;
}
haxe.Http.prototype.onError = function(msg) {
	null;
}
haxe.Http.prototype.onStatus = function(status) {
	null;
}
haxe.Http.prototype.__class__ = haxe.Http;
web2grid.worksource.boinc.BoincData = function() { }
web2grid.worksource.boinc.BoincData.__name__ = ["web2grid","worksource","boinc","BoincData"];
web2grid.worksource.boinc.BoincData.prototype.toXmlString = null;
web2grid.worksource.boinc.BoincData.prototype.__class__ = web2grid.worksource.boinc.BoincData;
if(!web2grid.worksource.boinc.request) web2grid.worksource.boinc.request = {}
web2grid.worksource.boinc.request.UploadFileInfo = function(reply_file_info) { if( reply_file_info === $_ ) return; {
	if(reply_file_info != null) {
		this.name = reply_file_info.name;
		this.generated_locally = reply_file_info.generated_locally;
		this.upload_when_present = reply_file_info.upload_when_present;
		this.max_nbytes = reply_file_info.max_nbytes;
		this.url = reply_file_info.url;
		this.xml_signature = reply_file_info.xml_signature;
	}
}}
web2grid.worksource.boinc.request.UploadFileInfo.__name__ = ["web2grid","worksource","boinc","request","UploadFileInfo"];
web2grid.worksource.boinc.request.UploadFileInfo.prototype.name = null;
web2grid.worksource.boinc.request.UploadFileInfo.prototype.generated_locally = null;
web2grid.worksource.boinc.request.UploadFileInfo.prototype.upload_when_present = null;
web2grid.worksource.boinc.request.UploadFileInfo.prototype.max_nbytes = null;
web2grid.worksource.boinc.request.UploadFileInfo.prototype.url = null;
web2grid.worksource.boinc.request.UploadFileInfo.prototype.xml_signature = null;
web2grid.worksource.boinc.request.UploadFileInfo.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	indent = "";
	var innerindent = indent + "\t";
	var xml = indent + "<file_info>\n";
	if(this.name != null) xml += innerindent + "<name>" + this.name + "</name>\n";
	if(this.generated_locally) xml += innerindent + "<generated_locally/>\n";
	if(this.upload_when_present) xml += innerindent + "<upload_when_present/>\n";
	if(this.max_nbytes != null) xml += innerindent + "<max_nbytes>" + this.max_nbytes + "</max_nbytes>\n";
	if(this.url != null) xml += innerindent + "<url>" + this.url + "</url>\n";
	if(this.xml_signature != null) xml += "<xml_signature>" + this.xml_signature + "</xml_signature>\n";
	xml += indent + "</file_info>\n";
	return xml;
}
web2grid.worksource.boinc.request.UploadFileInfo.prototype.__class__ = web2grid.worksource.boinc.request.UploadFileInfo;
web2grid.worksource.boinc.request.UploadFileInfo.__interfaces__ = [web2grid.worksource.boinc.BoincData];
if(!web2grid.core) web2grid.core = {}
if(!web2grid.core.log) web2grid.core.log = {}
web2grid.core.log.LogLevel = { __ename__ : ["web2grid","core","log","LogLevel"], __constructs__ : ["L0_Critical","L1_Error","L2_Warning","L3_Notice","L4_Information","L5_Debug"] }
web2grid.core.log.LogLevel.L0_Critical = ["L0_Critical",0];
web2grid.core.log.LogLevel.L0_Critical.toString = $estr;
web2grid.core.log.LogLevel.L0_Critical.__enum__ = web2grid.core.log.LogLevel;
web2grid.core.log.LogLevel.L1_Error = ["L1_Error",1];
web2grid.core.log.LogLevel.L1_Error.toString = $estr;
web2grid.core.log.LogLevel.L1_Error.__enum__ = web2grid.core.log.LogLevel;
web2grid.core.log.LogLevel.L2_Warning = ["L2_Warning",2];
web2grid.core.log.LogLevel.L2_Warning.toString = $estr;
web2grid.core.log.LogLevel.L2_Warning.__enum__ = web2grid.core.log.LogLevel;
web2grid.core.log.LogLevel.L3_Notice = ["L3_Notice",3];
web2grid.core.log.LogLevel.L3_Notice.toString = $estr;
web2grid.core.log.LogLevel.L3_Notice.__enum__ = web2grid.core.log.LogLevel;
web2grid.core.log.LogLevel.L4_Information = ["L4_Information",4];
web2grid.core.log.LogLevel.L4_Information.toString = $estr;
web2grid.core.log.LogLevel.L4_Information.__enum__ = web2grid.core.log.LogLevel;
web2grid.core.log.LogLevel.L5_Debug = ["L5_Debug",5];
web2grid.core.log.LogLevel.L5_Debug.toString = $estr;
web2grid.core.log.LogLevel.L5_Debug.__enum__ = web2grid.core.log.LogLevel;
web2grid.core.log.Console = function(max,filterlevel,parent) { if( max === $_ ) return; {
	if(max == null) max = 1000;
	this.maxentries = max;
	this.filterlevel = filterlevel;
	this.parent = parent;
	this.entries = new Array();
	this.onLog = new hsl.haxe.DirectSignaler(this);
}}
web2grid.core.log.Console.__name__ = ["web2grid","core","log","Console"];
web2grid.core.log.Console.main = null;
web2grid.core.log.Console.prototype.parent = null;
web2grid.core.log.Console.prototype.entries = null;
web2grid.core.log.Console.prototype.maxentries = null;
web2grid.core.log.Console.prototype.filterlevel = null;
web2grid.core.log.Console.prototype.onLog = null;
web2grid.core.log.Console.prototype.getEntries = function(max,filter) {
	if(max == null) max = 0;
	var filtered = new Array();
	{
		var _g = 0, _g1 = this.entries;
		while(_g < _g1.length) {
			var entry = _g1[_g];
			++_g;
			if(entry.level[1] <= filter[1]) {
				filtered.unshift(entry);
				if(max > 0 && filtered.length >= max) {
					return filtered.iterator();
				}
			}
		}
	}
	return filtered.iterator();
}
web2grid.core.log.Console.prototype.log = function(level,message,data,source,pos) {
	if(level != null && this.filterlevel != null) {
		if(level[1] > this.filterlevel[1]) return;
	}
	else {
		if(level == null) web2grid.core.log.Console.main.logWarning("New log entry level is null.",null,null,{ fileName : "Console.hx", lineNumber : 62, className : "web2grid.core.log.Console", methodName : "log"});
		if(this.filterlevel == null) web2grid.core.log.Console.main.logWarning("Filterlevel is null.",null,null,{ fileName : "Console.hx", lineNumber : 63, className : "web2grid.core.log.Console", methodName : "log"});
	}
	var entry = new web2grid.core.log.LogEntry(source,level,message,data,pos);
	this.entries.unshift(entry);
	if(this.maxentries > 0 && this.entries.length > this.maxentries) {
		this.entries.pop();
	}
	if(this.onLog != null) {
		this.onLog.dispatch(entry,null,{ fileName : "Console.hx", lineNumber : 76, className : "web2grid.core.log.Console", methodName : "log"});
	}
	if(this.parent != null) {
		this.parent.log(level,message,data,source,pos);
	}
}
web2grid.core.log.Console.prototype.setParent = function(console) {
	this.parent = console;
}
web2grid.core.log.Console.prototype.logDebug = function(message,data,source,pos) {
	this.log(web2grid.core.log.LogLevel.L5_Debug,message,data,source,pos);
}
web2grid.core.log.Console.prototype.logInformation = function(message,data,source,pos) {
	this.log(web2grid.core.log.LogLevel.L4_Information,message,data,source,pos);
}
web2grid.core.log.Console.prototype.logNotice = function(message,data,source,pos) {
	this.log(web2grid.core.log.LogLevel.L3_Notice,message,data,source,pos);
}
web2grid.core.log.Console.prototype.logWarning = function(message,data,source,pos) {
	this.log(web2grid.core.log.LogLevel.L2_Warning,message,data,source,pos);
}
web2grid.core.log.Console.prototype.logError = function(message,data,source,pos) {
	this.log(web2grid.core.log.LogLevel.L1_Error,message,data,source,pos);
}
web2grid.core.log.Console.prototype.logCritical = function(message,data,source,pos) {
	this.log(web2grid.core.log.LogLevel.L0_Critical,message,data,source,pos);
}
web2grid.core.log.Console.prototype.exportAsHtml = function(numlast,filter) {
	var html = "";
	var entries = this.getEntries(numlast,filter);
	while(entries.hasNext()) {
		var e = entries.next();
		var classname = "";
		var $e = e.level;
		switch( $e[1] ) {
		case 0:
		{
			classname = "critical";
		}break;
		case 1:
		{
			classname = "error";
		}break;
		case 2:
		{
			classname = "warning";
		}break;
		case 3:
		{
			classname = "notice";
		}break;
		case 4:
		{
			classname = "information";
		}break;
		case 5:
		{
			classname = "debug";
		}break;
		default:{
			classname = "";
		}break;
		}
		var line = "<div class=\"logentry " + classname + "\">";
		line += "<div class=\"time\">" + DateTools.format(e.time,"%H:%M:%S") + "</div>";
		if(e.source != null) {
			line += "<div class=\"source\">" + e.source.getScreenName() + "</div>";
		}
		line += e.message;
		if(e.data != null) {
			line += "<div class=\"data\">";
			line += "<pre>" + Std.string(e.data) + "</pre>";
			line += "</div>";
		}
		line += "</div>";
		html += line + "\n";
	}
	return html;
}
web2grid.core.log.Console.prototype.exportAsText = function(numlast,filter) {
	var text = "";
	var entries = this.getEntries(numlast,filter);
	while(entries.hasNext()) {
		var e = entries.next();
		var line = "";
		line += DateTools.format(e.time,"%H:%M:%S") + " ";
		line += "[" + e.level[1] + "] ";
		if(e.source != null) {
			line += e.source.getScreenName() + " ";
		}
		line += ": ";
		line += e.message;
		if(e.data != null) {
			line += "\n";
			line += Std.string(e.data);
		}
		if(e.level == web2grid.core.log.LogLevel.L1_Error || e.level == web2grid.core.log.LogLevel.L0_Critical) {
			line += "\n";
			line += e.pos.className + "." + e.pos.methodName;
			line += "\n";
			line += e.pos.fileName + " # " + e.pos.lineNumber;
		}
		text += line + "\n";
	}
	return text;
}
web2grid.core.log.Console.prototype.hxSerialize = function(s) {
	s.serialize(this.entries);
	s.serialize(this.maxentries);
	s.serialize(this.filterlevel);
}
web2grid.core.log.Console.prototype.hxUnserialize = function(s) {
	this.entries = s.unserialize();
	this.maxentries = s.unserialize();
	this.filterlevel = s.unserialize();
	this.onLog = new hsl.haxe.DirectSignaler(this);
}
web2grid.core.log.Console.prototype.__class__ = web2grid.core.log.Console;
web2grid.core.log.LogSource = function() { }
web2grid.core.log.LogSource.__name__ = ["web2grid","core","log","LogSource"];
web2grid.core.log.LogSource.prototype.getScreenName = null;
web2grid.core.log.LogSource.prototype.__class__ = web2grid.core.log.LogSource;
List = function(p) { if( p === $_ ) return; {
	this.length = 0;
}}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = ", ";
		s.b[s.b.length] = Std.string(l[0]);
		l = l[1];
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
if(!web2grid.core.iface) web2grid.core.iface = {}
web2grid.core.iface.Operable = function() { }
web2grid.core.iface.Operable.__name__ = ["web2grid","core","iface","Operable"];
web2grid.core.iface.Operable.prototype.operate = null;
web2grid.core.iface.Operable.prototype.__class__ = web2grid.core.iface.Operable;
web2grid.core.iface.WorkHandler = function() { }
web2grid.core.iface.WorkHandler.__name__ = ["web2grid","core","iface","WorkHandler"];
web2grid.core.iface.WorkHandler.prototype.HandleRunning = null;
web2grid.core.iface.WorkHandler.prototype.HandleDone = null;
web2grid.core.iface.WorkHandler.prototype.HandleException = null;
web2grid.core.iface.WorkHandler.prototype.HandleWrite = null;
web2grid.core.iface.WorkHandler.prototype.HandleProgress = null;
web2grid.core.iface.WorkHandler.prototype.HandleCheckpoint = null;
web2grid.core.iface.WorkHandler.prototype.HandleDebug = null;
web2grid.core.iface.WorkHandler.prototype.__class__ = web2grid.core.iface.WorkHandler;
web2grid.worksource.boinc.request.Host = function(p) { if( p === $_ ) return; {
	this.hostid = null;
	this.host_info = null;
}}
web2grid.worksource.boinc.request.Host.__name__ = ["web2grid","worksource","boinc","request","Host"];
web2grid.worksource.boinc.request.Host.prototype.hostid = null;
web2grid.worksource.boinc.request.Host.prototype.host_info = null;
web2grid.worksource.boinc.request.Host.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	var xml = "";
	if(this.hostid != null) xml += indent + "<hostid>" + this.hostid + "</hostid>\n";
	if(this.host_info != null) xml += this.host_info.toXmlString(indent);
	return xml;
}
web2grid.worksource.boinc.request.Host.prototype.__class__ = web2grid.worksource.boinc.request.Host;
haxe.Serializer = function(p) { if( p === $_ ) return; {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
}}
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype.buf = null;
haxe.Serializer.prototype.cache = null;
haxe.Serializer.prototype.shash = null;
haxe.Serializer.prototype.scount = null;
haxe.Serializer.prototype.useCache = null;
haxe.Serializer.prototype.useEnumIndex = null;
haxe.Serializer.prototype.toString = function() {
	return this.buf.b.join("");
}
haxe.Serializer.prototype.serializeString = function(s) {
	var x = this.shash.get(s);
	if(x != null) {
		this.buf.add("R");
		this.buf.add(x);
		return;
	}
	this.shash.set(s,this.scount++);
	this.buf.add("y");
	s = StringTools.urlEncode(s);
	this.buf.add(s.length);
	this.buf.add(":");
	this.buf.add(s);
}
haxe.Serializer.prototype.serializeRef = function(v) {
	var vt = typeof(v);
	{
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.add("r");
				this.buf.add(i);
				return true;
			}
		}
	}
	this.cache.push(v);
	return false;
}
haxe.Serializer.prototype.serializeFields = function(v) {
	{
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
	}
	this.buf.add("g");
}
haxe.Serializer.prototype.serialize = function(v) {
	var $e = Type["typeof"](v);
	switch( $e[1] ) {
	case 0:
	{
		this.buf.add("n");
	}break;
	case 1:
	{
		if(v == 0) {
			this.buf.add("z");
			return;
		}
		this.buf.add("i");
		this.buf.add(v);
	}break;
	case 2:
	{
		if(Math.isNaN(v)) this.buf.add("k");
		else if(!Math.isFinite(v)) this.buf.add(v < 0?"m":"p");
		else {
			this.buf.add("d");
			this.buf.add(v);
		}
	}break;
	case 3:
	{
		this.buf.add(v?"t":"f");
	}break;
	case 6:
	var c = $e[2];
	{
		if(c == String) {
			this.serializeString(v);
			return;
		}
		if(this.useCache && this.serializeRef(v)) return;
		switch(c) {
		case Array:{
			var ucount = 0;
			this.buf.add("a");
			var l = v["length"];
			{
				var _g = 0;
				while(_g < l) {
					var i = _g++;
					if(v[i] == null) ucount++;
					else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.add("n");
							else {
								this.buf.add("u");
								this.buf.add(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
			}
			if(ucount > 0) {
				if(ucount == 1) this.buf.add("n");
				else {
					this.buf.add("u");
					this.buf.add(ucount);
				}
			}
			this.buf.add("h");
		}break;
		case List:{
			this.buf.add("l");
			var v1 = v;
			{ var $it0 = v1.iterator();
			while( $it0.hasNext() ) { var i = $it0.next();
			this.serialize(i);
			}}
			this.buf.add("h");
		}break;
		case Date:{
			var d = v;
			this.buf.add("v");
			this.buf.add(d.toString());
		}break;
		case Hash:{
			this.buf.add("b");
			var v1 = v;
			{ var $it1 = v1.keys();
			while( $it1.hasNext() ) { var k = $it1.next();
			{
				this.serializeString(k);
				this.serialize(v1.get(k));
			}
			}}
			this.buf.add("h");
		}break;
		case IntHash:{
			this.buf.add("q");
			var v1 = v;
			{ var $it2 = v1.keys();
			while( $it2.hasNext() ) { var k = $it2.next();
			{
				this.buf.add(":");
				this.buf.add(k);
				this.serialize(v1.get(k));
			}
			}}
			this.buf.add("h");
		}break;
		case haxe.io.Bytes:{
			var v1 = v;
			var i = 0;
			var max = v1.length - 2;
			var chars = "";
			var b64 = haxe.Serializer.BASE64;
			while(i < max) {
				var b1 = v1.b[i++];
				var b2 = v1.b[i++];
				var b3 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4 | b2 >> 4) & 63) + b64.charAt((b2 << 2 | b3 >> 6) & 63) + b64.charAt(b3 & 63);
			}
			if(i == max) {
				var b1 = v1.b[i++];
				var b2 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4 | b2 >> 4) & 63) + b64.charAt(b2 << 2 & 63);
			}
			else if(i == max + 1) {
				var b1 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt(b1 << 4 & 63);
			}
			this.buf.add("s");
			this.buf.add(chars.length);
			this.buf.add(":");
			this.buf.add(chars);
		}break;
		default:{
			this.cache.pop();
			if(v.hxSerialize != null) {
				this.buf.add("C");
				this.serializeString(Type.getClassName(c));
				this.cache.push(v);
				v.hxSerialize(this);
				this.buf.add("g");
			}
			else {
				this.buf.add("c");
				this.serializeString(Type.getClassName(c));
				this.cache.push(v);
				this.serializeFields(v);
			}
		}break;
		}
	}break;
	case 4:
	{
		if(this.useCache && this.serializeRef(v)) return;
		this.buf.add("o");
		this.serializeFields(v);
	}break;
	case 7:
	var e = $e[2];
	{
		if(this.useCache && this.serializeRef(v)) return;
		this.cache.pop();
		this.buf.add(this.useEnumIndex?"j":"w");
		this.serializeString(Type.getEnumName(e));
		if(this.useEnumIndex) {
			this.buf.add(":");
			this.buf.add(v[1]);
		}
		else this.serializeString(v[0]);
		this.buf.add(":");
		var l = v["length"];
		this.buf.add(l - 2);
		{
			var _g = 2;
			while(_g < l) {
				var i = _g++;
				this.serialize(v[i]);
			}
		}
		this.cache.push(v);
	}break;
	case 5:
	{
		throw "Cannot serialize function";
	}break;
	default:{
		throw "Cannot serialize " + Std.string(v);
	}break;
	}
}
haxe.Serializer.prototype.serializeException = function(e) {
	this.buf.add("x");
	this.serialize(e);
}
haxe.Serializer.prototype.__class__ = haxe.Serializer;
web2grid.worksource.boinc.reply.SchedulerReply = function(node) { if( node === $_ ) return; {
	if(node.hasNode.resolve("scheduler_version")) this.scheduler_version = Std.parseInt(node.node.resolve("scheduler_version").getInnerData());
	if(node.hasNode.resolve("master_url")) this.master_url = node.node.resolve("master_url").getInnerData();
	if(node.hasNode.resolve("request_delay")) this.request_delay = Std.parseFloat(node.node.resolve("request_delay").getInnerData());
	if(node.hasNode.resolve("hostid")) this.hostid = Std.parseInt(node.node.resolve("hostid").getInnerData());
	if(node.hasNode.resolve("project_name")) this.project_name = node.node.resolve("project_name").getInnerData();
	if(node.hasNode.resolve("user_name")) this.user_name = node.node.resolve("user_name").getInnerData();
	if(node.hasNode.resolve("user_total_credit")) this.user_total_credit = Std.parseFloat(node.node.resolve("user_total_credit").getInnerData());
	if(node.hasNode.resolve("user_expavg_credit")) this.user_expavg_credit = Std.parseFloat(node.node.resolve("user_expavg_credit").getInnerData());
	if(node.hasNode.resolve("user_create_time")) this.user_create_time = Std.parseInt(node.node.resolve("user_create_time").getInnerData());
	if(node.hasNode.resolve("email_hash")) this.email_hash = node.node.resolve("email_hash").getInnerData();
	if(node.hasNode.resolve("cross_project_id")) this.cross_project_id = node.node.resolve("cross_project_id").getInnerData();
	if(node.hasNode.resolve("host_total_credit")) this.host_total_credit = Std.parseFloat(node.node.resolve("host_total_credit").getInnerData());
	if(node.hasNode.resolve("host_expavg_credit")) this.host_expavg_credit = Std.parseFloat(node.node.resolve("host_expavg_credit").getInnerData());
	if(node.hasNode.resolve("host_create_time")) this.host_create_time = Std.parseInt(node.node.resolve("host_create_time").getInnerData());
	if(node.hasNode.resolve("team_name")) this.team_name = node.node.resolve("team_name").getInnerData();
	this.message = new Array();
	this.app = new Array();
	this.app_version = new Array();
	this.file_info = new Array();
	this.workunit = new Array();
	this.result = new Array();
	this.result_ack = new Array();
	if(node.hasNode.resolve("message")) { var $it0 = node.nodes.resolve("message").iterator();
	while( $it0.hasNext() ) { var child = $it0.next();
	this.message.push(new web2grid.worksource.boinc.reply.Message(child));
	}}
	if(node.hasNode.resolve("app")) { var $it1 = node.nodes.resolve("app").iterator();
	while( $it1.hasNext() ) { var child = $it1.next();
	this.app.push(new web2grid.worksource.boinc.reply.Application(child));
	}}
	if(node.hasNode.resolve("app_version")) { var $it2 = node.nodes.resolve("app_version").iterator();
	while( $it2.hasNext() ) { var child = $it2.next();
	this.app_version.push(new web2grid.worksource.boinc.reply.AppVersion(child));
	}}
	if(node.hasNode.resolve("file_info")) { var $it3 = node.nodes.resolve("file_info").iterator();
	while( $it3.hasNext() ) { var child = $it3.next();
	this.file_info.push(new web2grid.worksource.boinc.reply.FileInfo(child));
	}}
	if(node.hasNode.resolve("workunit")) { var $it4 = node.nodes.resolve("workunit").iterator();
	while( $it4.hasNext() ) { var child = $it4.next();
	this.workunit.push(new web2grid.worksource.boinc.reply.Workunit(child));
	}}
	if(node.hasNode.resolve("result")) { var $it5 = node.nodes.resolve("result").iterator();
	while( $it5.hasNext() ) { var child = $it5.next();
	this.result.push(new web2grid.worksource.boinc.reply.ResultSlot(child));
	}}
	if(node.hasNode.resolve("result_ack")) { var $it6 = node.nodes.resolve("result_ack").iterator();
	while( $it6.hasNext() ) { var child = $it6.next();
	this.result_ack.push(new web2grid.worksource.boinc.reply.ResultAck(child));
	}}
}}
web2grid.worksource.boinc.reply.SchedulerReply.__name__ = ["web2grid","worksource","boinc","reply","SchedulerReply"];
web2grid.worksource.boinc.reply.SchedulerReply.prototype.scheduler_version = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.master_url = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.request_delay = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.hostid = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.project_name = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.user_name = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.user_total_credit = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.user_expavg_credit = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.user_create_time = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.email_hash = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.cross_project_id = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.host_total_credit = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.host_expavg_credit = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.host_create_time = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.team_name = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.message = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.app = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.app_version = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.file_info = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.workunit = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.result = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.result_ack = null;
web2grid.worksource.boinc.reply.SchedulerReply.prototype.__class__ = web2grid.worksource.boinc.reply.SchedulerReply;
web2grid.core.iface.WorkUnit = function() { }
web2grid.core.iface.WorkUnit.__name__ = ["web2grid","core","iface","WorkUnit"];
web2grid.core.iface.WorkUnit.prototype.operate = null;
web2grid.core.iface.WorkUnit.prototype.isWorking = null;
web2grid.core.iface.WorkUnit.prototype.isReportable = null;
web2grid.core.iface.WorkUnit.prototype.isCompleted = null;
web2grid.core.iface.WorkUnit.prototype.isError = null;
web2grid.core.iface.WorkUnit.prototype.getProgress = null;
web2grid.core.iface.WorkUnit.prototype.getScreenName = null;
web2grid.core.iface.WorkUnit.prototype.getSource = null;
web2grid.core.iface.WorkUnit.prototype.terminate = null;
web2grid.core.iface.WorkUnit.prototype.resume = null;
web2grid.core.iface.WorkUnit.prototype.__class__ = web2grid.core.iface.WorkUnit;
web2grid.core.iface.WorkUnit.__interfaces__ = [web2grid.core.log.LogSource,web2grid.core.iface.Operable];
hsl.haxe.Signaler = function() { }
hsl.haxe.Signaler.__name__ = ["hsl","haxe","Signaler"];
hsl.haxe.Signaler.prototype.isListenedTo = null;
hsl.haxe.Signaler.prototype.subject = null;
hsl.haxe.Signaler.prototype.addBubblingTarget = null;
hsl.haxe.Signaler.prototype.addNotificationTarget = null;
hsl.haxe.Signaler.prototype.bind = null;
hsl.haxe.Signaler.prototype.bindAdvanced = null;
hsl.haxe.Signaler.prototype.bindVoid = null;
hsl.haxe.Signaler.prototype.dispatch = null;
hsl.haxe.Signaler.prototype.getIsListenedTo = null;
hsl.haxe.Signaler.prototype.removeBubblingTarget = null;
hsl.haxe.Signaler.prototype.removeNotificationTarget = null;
hsl.haxe.Signaler.prototype.unbind = null;
hsl.haxe.Signaler.prototype.unbindAdvanced = null;
hsl.haxe.Signaler.prototype.unbindVoid = null;
hsl.haxe.Signaler.prototype.__class__ = hsl.haxe.Signaler;
web2grid.core.log.LogEntry = function(source,level,message,data,pos) { if( source === $_ ) return; {
	this.time = Date.now();
	this.source = source;
	this.level = level;
	this.message = message;
	this.data = data;
	this.pos = pos;
}}
web2grid.core.log.LogEntry.__name__ = ["web2grid","core","log","LogEntry"];
web2grid.core.log.LogEntry.prototype.time = null;
web2grid.core.log.LogEntry.prototype.source = null;
web2grid.core.log.LogEntry.prototype.level = null;
web2grid.core.log.LogEntry.prototype.message = null;
web2grid.core.log.LogEntry.prototype.data = null;
web2grid.core.log.LogEntry.prototype.pos = null;
web2grid.core.log.LogEntry.prototype.__class__ = web2grid.core.log.LogEntry;
web2grid.worksource.boinc.request.Result = function(p) { if( p === $_ ) return; {
	this.file_info = new Array();
}}
web2grid.worksource.boinc.request.Result.__name__ = ["web2grid","worksource","boinc","request","Result"];
web2grid.worksource.boinc.request.Result.prototype.name = null;
web2grid.worksource.boinc.request.Result.prototype.final_cpu_time = null;
web2grid.worksource.boinc.request.Result.prototype.final_elapsed_time = null;
web2grid.worksource.boinc.request.Result.prototype.exit_status = null;
web2grid.worksource.boinc.request.Result.prototype.state = null;
web2grid.worksource.boinc.request.Result.prototype.platform = null;
web2grid.worksource.boinc.request.Result.prototype.version_num = null;
web2grid.worksource.boinc.request.Result.prototype.app_version_num = null;
web2grid.worksource.boinc.request.Result.prototype.stderr_txt = null;
web2grid.worksource.boinc.request.Result.prototype.file_info = null;
web2grid.worksource.boinc.request.Result.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	var innerindent = indent + "    ";
	var xml = indent + "<result>\n";
	if(this.name != null) xml += innerindent + "<name>" + this.name + "</name>\n";
	if(this.final_cpu_time != null) xml += innerindent + "<final_cpu_time>" + this.final_cpu_time + "</final_cpu_time>\n";
	if(this.final_elapsed_time != null) xml += innerindent + "<final_elapsed_time>" + this.final_elapsed_time + "</final_elapsed_time>\n";
	if(this.exit_status != null) xml += innerindent + "<exit_status>" + this.exit_status + "</exit_status>\n";
	if(this.state != null) xml += innerindent + "<state>" + this.state + "</state>\n";
	if(this.platform != null) xml += innerindent + "<platform>" + web2grid.worksource.boinc.PlatformNames.toString(this.platform) + "</platform>\n";
	if(this.version_num != null) xml += innerindent + "<version_num>" + this.version_num + "</version_num>\n";
	if(this.app_version_num != null) xml += innerindent + "<app_version_num>" + this.app_version_num + "</app_version_num>\n";
	xml += "<stderr_out>\n";
	xml += "<![CDATA[";
	xml += "<stderr_txt>\n";
	if(this.stderr_txt != null) {
		xml += this.stderr_txt;
	}
	xml += "</stderr_txt>\n";
	xml += "]]>\n";
	xml += "</stderr_out>\n";
	{
		var _g = 0, _g1 = this.file_info;
		while(_g < _g1.length) {
			var info = _g1[_g];
			++_g;
			xml += info.toXmlString(innerindent);
		}
	}
	xml += indent + "</result>\n";
	return xml;
}
web2grid.worksource.boinc.request.Result.prototype.__class__ = web2grid.worksource.boinc.request.Result;
web2grid.worksource.boinc.request.Result.__interfaces__ = [web2grid.worksource.boinc.BoincData];
if(!web2grid.core.work) web2grid.core.work = {}
web2grid.core.work.JsWorker = function(handler) { if( handler === $_ ) return; {
	try {
		this.worker = new Worker("worker.js");
		this.worker.onmessage = $closure(this,"onmessage");
		this.handler = handler;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				web2grid.core.log.Console.main.logCritical("Could not create worker!",null,null,{ fileName : "JsWorker.hx", lineNumber : 32, className : "web2grid.core.work.JsWorker", methodName : "new"});
				throw e;
			}
		}
	}
}}
web2grid.core.work.JsWorker.__name__ = ["web2grid","core","work","JsWorker"];
web2grid.core.work.JsWorker.prototype.worker = null;
web2grid.core.work.JsWorker.prototype.handler = null;
web2grid.core.work.JsWorker.prototype.send = function(command,data) {
	if(this.worker != null) {
		this.worker.postMessage({ command : command, data : data});
	}
}
web2grid.core.work.JsWorker.prototype.setProgramCode = function(code) {
	this.send("program",code);
}
web2grid.core.work.JsWorker.prototype.addInputData = function(open_name,data) {
	this.send("data",{ openname : open_name, inputdata : data});
}
web2grid.core.work.JsWorker.prototype.setCheckpoint = function(state) {
	this.send("checkpoint",state);
}
web2grid.core.work.JsWorker.prototype.run = function() {
	this.send("run");
}
web2grid.core.work.JsWorker.prototype.terminate = function() {
	if(this.worker != null) {
		this.worker.terminate();
		this.worker = null;
	}
}
web2grid.core.work.JsWorker.prototype.onmessage = function(event) {
	var command = event.data.command;
	var data = event.data.data;
	if(command == "running") {
		this.handler.HandleRunning();
	}
	if(command == "done") {
		this.handler.HandleDone(data);
		this.terminate();
	}
	if(command == "exception") {
		this.handler.HandleException(data.type,data.exception);
		this.terminate();
	}
	if(command == "write") {
		this.handler.HandleWrite(data.name,data.str);
	}
	if(command == "progress") {
		this.handler.HandleProgress(data);
	}
	if(command == "checkpoint") {
		this.handler.HandleCheckpoint(data);
	}
	if(command == "debug") {
		this.handler.HandleDebug(data);
	}
}
web2grid.core.work.JsWorker.prototype.__class__ = web2grid.core.work.JsWorker;
web2grid.core.work.State = { __ename__ : ["web2grid","core","work","State"], __constructs__ : ["New","Downloading","ReadyToStart","Running","Terminated","ReadyToReport","Reporting","Done","Error"] }
web2grid.core.work.State.New = ["New",0];
web2grid.core.work.State.New.toString = $estr;
web2grid.core.work.State.New.__enum__ = web2grid.core.work.State;
web2grid.core.work.State.Downloading = ["Downloading",1];
web2grid.core.work.State.Downloading.toString = $estr;
web2grid.core.work.State.Downloading.__enum__ = web2grid.core.work.State;
web2grid.core.work.State.ReadyToStart = ["ReadyToStart",2];
web2grid.core.work.State.ReadyToStart.toString = $estr;
web2grid.core.work.State.ReadyToStart.__enum__ = web2grid.core.work.State;
web2grid.core.work.State.Running = ["Running",3];
web2grid.core.work.State.Running.toString = $estr;
web2grid.core.work.State.Running.__enum__ = web2grid.core.work.State;
web2grid.core.work.State.Terminated = ["Terminated",4];
web2grid.core.work.State.Terminated.toString = $estr;
web2grid.core.work.State.Terminated.__enum__ = web2grid.core.work.State;
web2grid.core.work.State.ReadyToReport = ["ReadyToReport",5];
web2grid.core.work.State.ReadyToReport.toString = $estr;
web2grid.core.work.State.ReadyToReport.__enum__ = web2grid.core.work.State;
web2grid.core.work.State.Reporting = ["Reporting",6];
web2grid.core.work.State.Reporting.toString = $estr;
web2grid.core.work.State.Reporting.__enum__ = web2grid.core.work.State;
web2grid.core.work.State.Done = ["Done",7];
web2grid.core.work.State.Done.toString = $estr;
web2grid.core.work.State.Done.__enum__ = web2grid.core.work.State;
web2grid.core.work.State.Error = ["Error",8];
web2grid.core.work.State.Error.toString = $estr;
web2grid.core.work.State.Error.__enum__ = web2grid.core.work.State;
web2grid.core.work.BasicWorkUnit = function(source,name,codeurl) { if( source === $_ ) return; {
	if(source == null) {
		throw new haxe.exception.Exception("The source of the workunit cannot be null!");
	}
	this.source = source;
	this.name = name;
	this.console = new web2grid.core.log.Console(0,web2grid.core.log.LogLevel.L5_Debug,web2grid.core.log.Console.main);
	this.codeurl = codeurl;
	this.dataurl = new Hash();
	this.checkpointresult = new web2grid.core.work.WorkOutput();
	this.checkpointprogress = 0;
	this.progress = 0;
	this.needsave = false;
	this.disabled = false;
	this.resumestate = web2grid.core.work.State.New;
	this.console.logNotice("Created.",null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 88, className : "web2grid.core.work.BasicWorkUnit", methodName : "new"});
	this.SwitchState(web2grid.core.work.State.New);
}}
web2grid.core.work.BasicWorkUnit.__name__ = ["web2grid","core","work","BasicWorkUnit"];
web2grid.core.work.BasicWorkUnit.prototype.source = null;
web2grid.core.work.BasicWorkUnit.prototype.name = null;
web2grid.core.work.BasicWorkUnit.prototype.state = null;
web2grid.core.work.BasicWorkUnit.prototype.resumestate = null;
web2grid.core.work.BasicWorkUnit.prototype.console = null;
web2grid.core.work.BasicWorkUnit.prototype.worker = null;
web2grid.core.work.BasicWorkUnit.prototype.codeurl = null;
web2grid.core.work.BasicWorkUnit.prototype.dataurl = null;
web2grid.core.work.BasicWorkUnit.prototype.code = null;
web2grid.core.work.BasicWorkUnit.prototype.data = null;
web2grid.core.work.BasicWorkUnit.prototype.codeFileDownload = null;
web2grid.core.work.BasicWorkUnit.prototype.dataFilesDownload = null;
web2grid.core.work.BasicWorkUnit.prototype.progress = null;
web2grid.core.work.BasicWorkUnit.prototype.tempresult = null;
web2grid.core.work.BasicWorkUnit.prototype.checkpointdata = null;
web2grid.core.work.BasicWorkUnit.prototype.checkpointresult = null;
web2grid.core.work.BasicWorkUnit.prototype.checkpointprogress = null;
web2grid.core.work.BasicWorkUnit.prototype.needsave = null;
web2grid.core.work.BasicWorkUnit.prototype.lastcheckpointtime = null;
web2grid.core.work.BasicWorkUnit.prototype.disabled = null;
web2grid.core.work.BasicWorkUnit.prototype.getScreenName = function() {
	return "WorkUnit " + this.name;
}
web2grid.core.work.BasicWorkUnit.prototype.addDataUrl = function(open_name,dataurl) {
	if(this.state == web2grid.core.work.State.New) {
		this.dataurl.set(open_name,dataurl);
	}
}
web2grid.core.work.BasicWorkUnit.prototype.isWorking = function() {
	return this.state == web2grid.core.work.State.Running;
}
web2grid.core.work.BasicWorkUnit.prototype.isReportable = function() {
	return this.state == web2grid.core.work.State.ReadyToReport;
}
web2grid.core.work.BasicWorkUnit.prototype.isCompleted = function() {
	return this.state == web2grid.core.work.State.Done || this.state == web2grid.core.work.State.Error;
}
web2grid.core.work.BasicWorkUnit.prototype.isError = function() {
	return this.state == web2grid.core.work.State.Error;
}
web2grid.core.work.BasicWorkUnit.prototype.getState = function() {
	var $e = this.state;
	switch( $e[1] ) {
	case 0:
	{
		return "New";
	}break;
	case 1:
	{
		return "Downloading files";
	}break;
	case 2:
	{
		return "Ready to start";
	}break;
	case 3:
	{
		return "Running";
	}break;
	case 4:
	{
		return "Terminated";
	}break;
	case 5:
	{
		return "Ready to report";
	}break;
	case 6:
	{
		return "Reporting";
	}break;
	case 7:
	{
		return "Done";
	}break;
	case 8:
	{
		return "Error";
	}break;
	default:{
		return "Unknown";
	}break;
	}
}
web2grid.core.work.BasicWorkUnit.prototype.getSource = function() {
	return this.source;
}
web2grid.core.work.BasicWorkUnit.prototype.getProgress = function() {
	var $e = this.state;
	switch( $e[1] ) {
	case 3:
	{
		return this.progress;
	}break;
	default:{
		return 0;
	}break;
	}
}
web2grid.core.work.BasicWorkUnit.prototype.SwitchState = function(newstage) {
	this.state = newstage;
	this.console.logDebug("Changed state to " + this.getState(),null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 159, className : "web2grid.core.work.BasicWorkUnit", methodName : "SwitchState"});
}
web2grid.core.work.BasicWorkUnit.prototype.operate = function() {
	if(this.disabled) return false;
	var $e = this.state;
	switch( $e[1] ) {
	case 0:
	{
		{
			this.progress = this.checkpointprogress;
			this.needsave = false;
			this.data = new Hash();
			this.console.logInformation("Downloading program: " + this.codeurl,null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 174, className : "web2grid.core.work.BasicWorkUnit", methodName : "operate"});
			this.codeFileDownload = web2grid.core.net.HTTPRequest.get(this.codeurl).send();
			this.dataFilesDownload = new Hash();
			{ var $it0 = this.dataurl.keys();
			while( $it0.hasNext() ) { var key = $it0.next();
			{
				var url = this.dataurl.get(key);
				this.console.logInformation("Downloading data: " + url,null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 181, className : "web2grid.core.work.BasicWorkUnit", methodName : "operate"});
				this.dataFilesDownload.set(key,web2grid.core.net.HTTPRequest.get(url).send());
			}
			}}
			this.SwitchState(web2grid.core.work.State.Downloading);
		}
	}break;
	case 1:
	{
		{
			if(this.codeFileDownload.isError()) {
				this.console.logWarning("Could not download code file: " + this.codeurl,null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 192, className : "web2grid.core.work.BasicWorkUnit", methodName : "operate"});
				this.SwitchState(web2grid.core.work.State.Error);
				return true;
			}
			if(this.codeFileDownload.isCompleted() == false) return false;
			{ var $it1 = this.dataFilesDownload.keys();
			while( $it1.hasNext() ) { var key = $it1.next();
			{
				if(this.dataFilesDownload.get(key).isError()) {
					this.console.logWarning("Could not download data file: " + this.dataurl.get(key),null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 202, className : "web2grid.core.work.BasicWorkUnit", methodName : "operate"});
					this.SwitchState(web2grid.core.work.State.Error);
					return true;
				}
				if(this.dataFilesDownload.get(key).isCompleted() == false) return false;
			}
			}}
			this.SwitchState(web2grid.core.work.State.ReadyToStart);
		}
	}break;
	case 2:
	{
		{
			this.tempresult = this.checkpointresult.copy();
			this.StartWorker();
		}
	}break;
	case 3:
	{
		{
			if(this.needsave) {
				this.needsave = false;
				return true;
			}
		}
	}break;
	case 4:
	{
		null;
	}break;
	case 5:
	{
		null;
	}break;
	case 6:
	{
		null;
	}break;
	case 7:
	{
		null;
	}break;
	case 8:
	{
		null;
	}break;
	}
	return false;
}
web2grid.core.work.BasicWorkUnit.prototype.StartWorker = function() {
	this.worker = new web2grid.core.work.JsWorker(this);
	this.code = this.codeFileDownload.getResult().content;
	this.worker.setProgramCode(this.code);
	{ var $it0 = this.dataFilesDownload.keys();
	while( $it0.hasNext() ) { var key = $it0.next();
	{
		var data = this.dataFilesDownload.get(key).getResult().content;
		this.data.set(key,data);
		this.worker.addInputData(key,data);
	}
	}}
	this.lastcheckpointtime = Date.now();
	this.worker.setCheckpoint(this.checkpointdata);
	this.SwitchState(web2grid.core.work.State.Running);
	this.console.logNotice("Started.",null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 274, className : "web2grid.core.work.BasicWorkUnit", methodName : "StartWorker"});
	this.worker.run();
}
web2grid.core.work.BasicWorkUnit.prototype.getResult = function() {
	return this.tempresult;
}
web2grid.core.work.BasicWorkUnit.prototype.terminate = function() {
	if(this.state == web2grid.core.work.State.Running) {
		this.console.logNotice("Terminated.",null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 288, className : "web2grid.core.work.BasicWorkUnit", methodName : "terminate"});
		this.worker.terminate();
		this.SwitchState(web2grid.core.work.State.Terminated);
	}
	this.disabled = true;
}
web2grid.core.work.BasicWorkUnit.prototype.resume = function() {
	this.disabled = false;
	if(this.state == web2grid.core.work.State.Terminated) {
		this.SwitchState(web2grid.core.work.State.ReadyToStart);
	}
}
web2grid.core.work.BasicWorkUnit.prototype.hxSerialize = function(s) {
	s.serialize(this.codeurl);
	s.serialize(this.dataurl);
	s.serialize(this.source);
	s.serialize(this.name);
	s.serialize(this.console);
	s.serialize(this.checkpointdata);
	s.serialize(this.checkpointresult);
	s.serialize(this.checkpointprogress);
	s.serialize(this.resumestate);
}
web2grid.core.work.BasicWorkUnit.prototype.hxUnserialize = function(s) {
	this.codeurl = s.unserialize();
	this.dataurl = s.unserialize();
	this.source = s.unserialize();
	this.name = s.unserialize();
	this.console = s.unserialize();
	this.checkpointdata = s.unserialize();
	this.checkpointresult = s.unserialize();
	this.checkpointprogress = s.unserialize();
	this.resumestate = s.unserialize();
	this.tempresult = this.checkpointresult.copy();
	this.console.setParent(web2grid.core.log.Console.main);
	this.console.logNotice("Loaded.",null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 335, className : "web2grid.core.work.BasicWorkUnit", methodName : "hxUnserialize"});
	this.SwitchState(this.resumestate);
}
web2grid.core.work.BasicWorkUnit.prototype.HandleRunning = function() {
	this.console.logInformation("Running...",null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 343, className : "web2grid.core.work.BasicWorkUnit", methodName : "HandleRunning"});
}
web2grid.core.work.BasicWorkUnit.prototype.HandleDebug = function(message) {
	if(this.state != web2grid.core.work.State.Running) return;
	this.console.logDebug("Debug: ",message,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 349, className : "web2grid.core.work.BasicWorkUnit", methodName : "HandleDebug"});
}
web2grid.core.work.BasicWorkUnit.prototype.HandleProgress = function(progress) {
	if(this.state != web2grid.core.work.State.Running) return;
	if(progress >= this.checkpointprogress) {
		this.progress = progress;
		this.console.logDebug("Progress: " + progress * 100 + "%",null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 358, className : "web2grid.core.work.BasicWorkUnit", methodName : "HandleProgress"});
	}
	else {
		this.console.logDebug("Progress smaller than in checkpoint: " + progress * 100 + "%",null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 362, className : "web2grid.core.work.BasicWorkUnit", methodName : "HandleProgress"});
	}
}
web2grid.core.work.BasicWorkUnit.prototype.HandleCheckpoint = function(checkpoint) {
	if(this.state != web2grid.core.work.State.Running) return;
	this.console.logDebug("Checkpoint Data",checkpoint,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 369, className : "web2grid.core.work.BasicWorkUnit", methodName : "HandleCheckpoint"});
	var now = Date.now();
	this.tempresult.addElapsedTime((now.getTime() - this.lastcheckpointtime.getTime()) / 1000);
	this.lastcheckpointtime = now;
	this.checkpointdata = checkpoint;
	this.checkpointresult = this.tempresult.copy();
	this.checkpointprogress = this.progress;
	this.console.logInformation("Checkpoint Created. (" + this.tempresult.getElapsedTime() + " sec) " + Math.round(this.progress * 100) + "%",null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 379, className : "web2grid.core.work.BasicWorkUnit", methodName : "HandleCheckpoint"});
	this.needsave = true;
}
web2grid.core.work.BasicWorkUnit.prototype.HandleWrite = function(name,str) {
	if(this.state != web2grid.core.work.State.Running) return;
	this.console.logDebug("Output: " + name,str,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 387, className : "web2grid.core.work.BasicWorkUnit", methodName : "HandleWrite"});
	this.tempresult.write(name,str);
}
web2grid.core.work.BasicWorkUnit.prototype.HandleException = function(type,exception) {
	if(this.state != web2grid.core.work.State.Running) return;
	this.console.logWarning("Exception: " + type + " error",exception,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 394, className : "web2grid.core.work.BasicWorkUnit", methodName : "HandleException"});
	this.SwitchState(web2grid.core.work.State.Error);
}
web2grid.core.work.BasicWorkUnit.prototype.HandleDone = function(exitstatus) {
	if(this.state != web2grid.core.work.State.Running) return;
	this.console.logNotice("Done. Exit status: " + exitstatus,null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 401, className : "web2grid.core.work.BasicWorkUnit", methodName : "HandleDone"});
	this.console.logInformation("Elapsed Time: " + this.tempresult.getElapsedTime() + " sec",null,this,{ fileName : "BasicWorkUnit.hx", lineNumber : 402, className : "web2grid.core.work.BasicWorkUnit", methodName : "HandleDone"});
	this.tempresult.setExitStatus(exitstatus);
	this.HandleCheckpoint(null);
	this.resumestate = web2grid.core.work.State.ReadyToReport;
	this.SwitchState(web2grid.core.work.State.ReadyToReport);
}
web2grid.core.work.BasicWorkUnit.prototype.__class__ = web2grid.core.work.BasicWorkUnit;
web2grid.core.work.BasicWorkUnit.__interfaces__ = [web2grid.core.iface.WorkHandler,web2grid.core.iface.WorkUnit];
if(!web2grid.core.tools) web2grid.core.tools = {}
web2grid.core.tools.AsyncState = { __ename__ : ["web2grid","core","tools","AsyncState"], __constructs__ : ["Waiting","Completed","Error"] }
web2grid.core.tools.AsyncState.Waiting = ["Waiting",0];
web2grid.core.tools.AsyncState.Waiting.toString = $estr;
web2grid.core.tools.AsyncState.Waiting.__enum__ = web2grid.core.tools.AsyncState;
web2grid.core.tools.AsyncState.Completed = ["Completed",1];
web2grid.core.tools.AsyncState.Completed.toString = $estr;
web2grid.core.tools.AsyncState.Completed.__enum__ = web2grid.core.tools.AsyncState;
web2grid.core.tools.AsyncState.Error = ["Error",2];
web2grid.core.tools.AsyncState.Error.toString = $estr;
web2grid.core.tools.AsyncState.Error.__enum__ = web2grid.core.tools.AsyncState;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	{ var $it0 = arr.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e0 ) {
		{
			var e = $e0;
			null;
		}
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		
				for(var i in o)
					if( o.hasOwnProperty(i) )
						a.push(i);
			;
	}
	else {
		var t;
		try {
			t = o.__proto__;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					t = null;
				}
			}
		}
		if(t != null) o.__proto__ = null;
		
				for(var i in o)
					if( i != "__proto__" )
						a.push(i);
			;
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	{
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		{
			var _g1 = 0, _g = arguments.length;
			while(_g1 < _g) {
				var i = _g1++;
				a.push(arguments[i]);
			}
		}
		return f(a);
	}
}
Reflect.prototype.__class__ = Reflect;
haxe.StackItem = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	return haxe.Stack.makeStack("$s");
}
haxe.Stack.exceptionStack = function() {
	return haxe.Stack.makeStack("$e");
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	{
		var _g = 0;
		while(_g < stack.length) {
			var s = stack[_g];
			++_g;
			b.b[b.b.length] = "\nCalled from ";
			haxe.Stack.itemToString(b,s);
		}
	}
	return b.b.join("");
}
haxe.Stack.itemToString = function(b,s) {
	var $e = s;
	switch( $e[1] ) {
	case 0:
	{
		b.b[b.b.length] = "a C function";
	}break;
	case 1:
	var m = $e[2];
	{
		b.b[b.b.length] = "module ";
		b.b[b.b.length] = m;
	}break;
	case 2:
	var line = $e[4], file = $e[3], s1 = $e[2];
	{
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b[b.b.length] = " (";
		}
		b.b[b.b.length] = file;
		b.b[b.b.length] = " line ";
		b.b[b.b.length] = line;
		if(s1 != null) b.b[b.b.length] = ")";
	}break;
	case 3:
	var meth = $e[3], cname = $e[2];
	{
		b.b[b.b.length] = cname;
		b.b[b.b.length] = ".";
		b.b[b.b.length] = meth;
	}break;
	case 4:
	var n = $e[2];
	{
		b.b[b.b.length] = "local function #";
		b.b[b.b.length] = n;
	}break;
	}
}
haxe.Stack.makeStack = function(s) {
	var a = (function($this) {
		var $r;
		try {
			$r = eval(s);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				$r = [];
			}
		}
		return $r;
	}(this));
	var m = new Array();
	{
		var _g1 = 0, _g = a.length - (s == "$s"?2:0);
		while(_g1 < _g) {
			var i = _g1++;
			var d = a[i].split("::");
			m.unshift(haxe.StackItem.Method(d[0],d[1]));
		}
	}
	return m;
}
haxe.Stack.prototype.__class__ = haxe.Stack;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
web2grid.worksource.boinc.request.AuthInfo = function(p) { if( p === $_ ) return; {
	this.authenticator = null;
	this.cross_project_id = null;
}}
web2grid.worksource.boinc.request.AuthInfo.__name__ = ["web2grid","worksource","boinc","request","AuthInfo"];
web2grid.worksource.boinc.request.AuthInfo.prototype.authenticator = null;
web2grid.worksource.boinc.request.AuthInfo.prototype.cross_project_id = null;
web2grid.worksource.boinc.request.AuthInfo.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	var xml = "";
	if(this.authenticator != null) xml += indent + "<authenticator>" + this.authenticator + "</authenticator>\n";
	if(this.cross_project_id != null) xml += indent + "<cross_project_id>" + this.cross_project_id + "</cross_project_id>\n";
	return xml;
}
web2grid.worksource.boinc.request.AuthInfo.prototype.__class__ = web2grid.worksource.boinc.request.AuthInfo;
web2grid.worksource.boinc.request.AuthInfo.__interfaces__ = [web2grid.worksource.boinc.BoincData];
haxe.FastCell = function(elt,next) { if( elt === $_ ) return; {
	this.elt = elt;
	this.next = next;
}}
haxe.FastCell.__name__ = ["haxe","FastCell"];
haxe.FastCell.prototype.elt = null;
haxe.FastCell.prototype.next = null;
haxe.FastCell.prototype.__class__ = haxe.FastCell;
haxe.FastList = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.FastList.__name__ = ["haxe","FastList"];
haxe.FastList.prototype.head = null;
haxe.FastList.prototype.add = function(item) {
	this.head = new haxe.FastCell(item,this.head);
}
haxe.FastList.prototype.first = function() {
	return this.head == null?null:this.head.elt;
}
haxe.FastList.prototype.pop = function() {
	var k = this.head;
	if(k == null) return null;
	else {
		this.head = k.next;
		return k.elt;
	}
}
haxe.FastList.prototype.isEmpty = function() {
	return this.head == null;
}
haxe.FastList.prototype.remove = function(v) {
	var prev = null;
	var l = this.head;
	while(l != null) {
		if(l.elt == v) {
			if(prev == null) this.head = l.next;
			else prev.next = l.next;
			break;
		}
		prev = l;
		l = l.next;
	}
	return l != null;
}
haxe.FastList.prototype.iterator = function() {
	var l = this.head;
	return { hasNext : function() {
		return l != null;
	}, next : function() {
		var k = l;
		l = k.next;
		return k.elt;
	}};
}
haxe.FastList.prototype.toString = function() {
	var a = new Array();
	var l = this.head;
	while(l != null) {
		a.push(l.elt);
		l = l.next;
	}
	return "{" + a.join(",") + "}";
}
haxe.FastList.prototype.__class__ = haxe.FastList;
web2grid.core.iface.WorkResult = function() { }
web2grid.core.iface.WorkResult.__name__ = ["web2grid","core","iface","WorkResult"];
web2grid.core.iface.WorkResult.prototype.getExitStatus = null;
web2grid.core.iface.WorkResult.prototype.getFileList = null;
web2grid.core.iface.WorkResult.prototype.getFileContent = null;
web2grid.core.iface.WorkResult.prototype.getElapsedTime = null;
web2grid.core.iface.WorkResult.prototype.__class__ = web2grid.core.iface.WorkResult;
if(!haxe.xml) haxe.xml = {}
if(!haxe.xml._Fast) haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) { if( x === $_ ) return; {
	this.__x = x;
}}
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype.__x = null;
haxe.xml._Fast.NodeAccess.prototype.resolve = function(name) {
	var x = this.__x.elementsNamed(name).next();
	if(x == null) {
		var xname = this.__x.nodeType == Xml.Document?"Document":this.__x.getNodeName();
		throw xname + " is missing element " + name;
	}
	return new haxe.xml.Fast(x);
}
haxe.xml._Fast.NodeAccess.prototype.__class__ = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.AttribAccess = function(x) { if( x === $_ ) return; {
	this.__x = x;
}}
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype.__x = null;
haxe.xml._Fast.AttribAccess.prototype.resolve = function(name) {
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	var v = this.__x.get(name);
	if(v == null) throw this.__x.getNodeName() + " is missing attribute " + name;
	return v;
}
haxe.xml._Fast.AttribAccess.prototype.__class__ = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.HasAttribAccess = function(x) { if( x === $_ ) return; {
	this.__x = x;
}}
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype.__x = null;
haxe.xml._Fast.HasAttribAccess.prototype.resolve = function(name) {
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	return this.__x.exists(name);
}
haxe.xml._Fast.HasAttribAccess.prototype.__class__ = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasNodeAccess = function(x) { if( x === $_ ) return; {
	this.__x = x;
}}
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype.__x = null;
haxe.xml._Fast.HasNodeAccess.prototype.resolve = function(name) {
	return this.__x.elementsNamed(name).hasNext();
}
haxe.xml._Fast.HasNodeAccess.prototype.__class__ = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.NodeListAccess = function(x) { if( x === $_ ) return; {
	this.__x = x;
}}
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype.__x = null;
haxe.xml._Fast.NodeListAccess.prototype.resolve = function(name) {
	var l = new List();
	{ var $it0 = this.__x.elementsNamed(name);
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(new haxe.xml.Fast(x));
	}}
	return l;
}
haxe.xml._Fast.NodeListAccess.prototype.__class__ = haxe.xml._Fast.NodeListAccess;
haxe.xml.Fast = function(x) { if( x === $_ ) return; {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + x.nodeType;
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
}}
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype.x = null;
haxe.xml.Fast.prototype.name = null;
haxe.xml.Fast.prototype.innerData = null;
haxe.xml.Fast.prototype.innerHTML = null;
haxe.xml.Fast.prototype.node = null;
haxe.xml.Fast.prototype.nodes = null;
haxe.xml.Fast.prototype.att = null;
haxe.xml.Fast.prototype.has = null;
haxe.xml.Fast.prototype.hasNode = null;
haxe.xml.Fast.prototype.elements = null;
haxe.xml.Fast.prototype.getName = function() {
	return this.x.nodeType == Xml.Document?"Document":this.x.getNodeName();
}
haxe.xml.Fast.prototype.getInnerData = function() {
	var it = this.x.iterator();
	if(!it.hasNext()) throw this.getName() + " does not have data";
	var v = it.next();
	if(it.hasNext()) throw this.getName() + " does not only have data";
	if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.getName() + " does not have data";
	return v.getNodeValue();
}
haxe.xml.Fast.prototype.getInnerHTML = function() {
	var s = new StringBuf();
	{ var $it0 = this.x.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	s.b[s.b.length] = x.toString();
	}}
	return s.b.join("");
}
haxe.xml.Fast.prototype.getElements = function() {
	var it = this.x.elements();
	return { hasNext : $closure(it,"hasNext"), next : function() {
		var x = it.next();
		if(x == null) return null;
		return new haxe.xml.Fast(x);
	}};
}
haxe.xml.Fast.prototype.__class__ = haxe.xml.Fast;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	try {
		cl = eval(name);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				cl = null;
			}
		}
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	}
	catch( $e0 ) {
		{
			var err = $e0;
			{
				e = null;
			}
		}
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = Type.getEnumConstructs(e)[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	return e.__constructs__;
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":{
		return ValueType.TBool;
	}break;
	case "string":{
		return ValueType.TClass(String);
	}break;
	case "number":{
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	}break;
	case "object":{
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	}break;
	case "function":{
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	}break;
	case "undefined":{
		return ValueType.TNull;
	}break;
	default:{
		return ValueType.TUnknown;
	}break;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		{
			var _g1 = 2, _g = a.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!Type.enumEq(a[i],b[i])) return false;
			}
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.prototype.__class__ = Type;
web2grid.worksource.boinc.request.HostInfo = function(p) { if( p === $_ ) return; {
	null;
}}
web2grid.worksource.boinc.request.HostInfo.__name__ = ["web2grid","worksource","boinc","request","HostInfo"];
web2grid.worksource.boinc.request.HostInfo.getHostInfo = function() {
	var hostinfo = new web2grid.worksource.boinc.request.HostInfo();
	
			var rightNow = new Date();
			var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
			var temp = jan1.toGMTString();
			var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
			var std_time_offset = (jan1 - jan2) / 1000;
		;
	hostinfo.timezone = std_time_offset;
	hostinfo.ip_addr = "0.0.0.0";
	hostinfo.p_ncpus = 1;
	hostinfo.p_vendor = web2grid.core.info.BrowserInfo.browserVendor();
	hostinfo.p_model = web2grid.core.info.BrowserInfo.browserName() + " " + web2grid.core.info.BrowserInfo.browserFullVersion();
	hostinfo.p_features = "";
	if(web2grid.core.info.BrowserInfo.flashInstalled()) hostinfo.p_features += "Flash;";
	if(web2grid.core.info.BrowserInfo.html5xmlHttpRequestLevel2()) hostinfo.p_features += "XmlHttpRequestLevel2;";
	if(web2grid.core.info.BrowserInfo.html5localStorage()) hostinfo.p_features += "LocalStorage;";
	if(web2grid.core.info.BrowserInfo.html5webWorkers()) hostinfo.p_features += "WebWorkers;";
	if(web2grid.core.info.BrowserInfo.html5webSockets()) hostinfo.p_features += "WebSockets;";
	hostinfo.p_membw = 0;
	hostinfo.m_nbytes = 1073741824;
	hostinfo.m_cache = 1073741824;
	hostinfo.m_swap = 1073741824;
	hostinfo.d_total = 1073741824;
	hostinfo.d_free = 1073741824;
	hostinfo.os_name = web2grid.core.info.BrowserInfo.osPlatform();
	hostinfo.os_version = web2grid.core.info.BrowserInfo.osName();
	return hostinfo;
}
web2grid.worksource.boinc.request.HostInfo.prototype.timezone = null;
web2grid.worksource.boinc.request.HostInfo.prototype.domain_name = null;
web2grid.worksource.boinc.request.HostInfo.prototype.ip_addr = null;
web2grid.worksource.boinc.request.HostInfo.prototype.host_cpid = null;
web2grid.worksource.boinc.request.HostInfo.prototype.p_ncpus = null;
web2grid.worksource.boinc.request.HostInfo.prototype.p_vendor = null;
web2grid.worksource.boinc.request.HostInfo.prototype.p_model = null;
web2grid.worksource.boinc.request.HostInfo.prototype.p_features = null;
web2grid.worksource.boinc.request.HostInfo.prototype.p_fpops = null;
web2grid.worksource.boinc.request.HostInfo.prototype.p_iops = null;
web2grid.worksource.boinc.request.HostInfo.prototype.p_membw = null;
web2grid.worksource.boinc.request.HostInfo.prototype.p_calculated = null;
web2grid.worksource.boinc.request.HostInfo.prototype.m_nbytes = null;
web2grid.worksource.boinc.request.HostInfo.prototype.m_cache = null;
web2grid.worksource.boinc.request.HostInfo.prototype.m_swap = null;
web2grid.worksource.boinc.request.HostInfo.prototype.d_total = null;
web2grid.worksource.boinc.request.HostInfo.prototype.d_free = null;
web2grid.worksource.boinc.request.HostInfo.prototype.os_name = null;
web2grid.worksource.boinc.request.HostInfo.prototype.os_version = null;
web2grid.worksource.boinc.request.HostInfo.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	var xml = indent + "<host_info>\n";
	var innerindent = indent + "    ";
	if(this.timezone != null) xml += innerindent + "<timezone>" + this.timezone + "</timezone>\n";
	if(this.domain_name != null) xml += innerindent + "<domain_name>" + this.domain_name + "</domain_name>\n";
	if(this.ip_addr != null) xml += innerindent + "<ip_addr>" + this.ip_addr + "</ip_addr>\n";
	if(this.host_cpid != null) xml += innerindent + "<host_cpid>" + this.host_cpid + "</host_cpid>\n";
	if(this.p_ncpus != null) xml += innerindent + "<p_ncpus>" + this.p_ncpus + "</p_ncpus>\n";
	if(this.p_vendor != null) xml += innerindent + "<p_vendor>" + this.p_vendor + "</p_vendor>\n";
	if(this.p_model != null) xml += innerindent + "<p_model>" + this.p_model + "</p_model>\n";
	if(this.p_features != null) xml += innerindent + "<p_features>" + this.p_features + "</p_features>\n";
	if(this.p_fpops != null) xml += innerindent + "<p_fpops>" + this.p_fpops + "</p_fpops>\n";
	if(this.p_iops != null) xml += innerindent + "<p_iops>" + this.p_iops + "</p_iops>\n";
	if(this.p_membw != null) xml += innerindent + "<p_membw>" + this.p_membw + "</p_membw>\n";
	if(this.p_calculated != null) xml += innerindent + "<p_calculated>" + this.p_calculated + "</p_calculated>\n";
	if(this.m_nbytes != null) xml += innerindent + "<m_nbytes>" + this.m_nbytes + "</m_nbytes>\n";
	if(this.m_cache != null) xml += innerindent + "<m_cache>" + this.m_cache + "</m_cache>\n";
	if(this.m_swap != null) xml += innerindent + "<m_swap>" + this.m_swap + "</m_swap>\n";
	if(this.d_total != null) xml += innerindent + "<d_total>" + this.d_total + "</d_total>\n";
	if(this.d_free != null) xml += innerindent + "<d_free>" + this.d_free + "</d_free>\n";
	if(this.os_name != null) xml += innerindent + "<os_name>" + this.os_name + "</os_name>\n";
	if(this.os_version != null) xml += innerindent + "<os_version>" + this.os_version + "</os_version>\n";
	xml += indent + "</host_info>\n";
	return xml;
}
web2grid.worksource.boinc.request.HostInfo.prototype.__class__ = web2grid.worksource.boinc.request.HostInfo;
web2grid.worksource.boinc.request.HostInfo.__interfaces__ = [web2grid.worksource.boinc.BoincData];
hsl.haxe.Signal = function(data,currentBond,currentTarget,origin) { if( data === $_ ) return; {
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
}}
hsl.haxe.Signal.__name__ = ["hsl","haxe","Signal"];
hsl.haxe.Signal.prototype.currentBond = null;
hsl.haxe.Signal.prototype.currentTarget = null;
hsl.haxe.Signal.prototype.data = null;
hsl.haxe.Signal.prototype.data1 = null;
hsl.haxe.Signal.prototype.immediatePropagationStopped = null;
hsl.haxe.Signal.prototype.origin = null;
hsl.haxe.Signal.prototype.propagationStopped = null;
hsl.haxe.Signal.prototype.getData = function() {
	return this.data;
}
hsl.haxe.Signal.prototype.stopImmediatePropagation = function() {
	this.immediatePropagationStopped = true;
}
hsl.haxe.Signal.prototype.stopPropagation = function() {
	this.propagationStopped = true;
}
hsl.haxe.Signal.prototype.__class__ = hsl.haxe.Signal;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					return "???";
				}
			}
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	}
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	}
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = this.length + len - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
web2grid.worksource.boinc.request.ClientVersion = function(major,minor,release) { if( major === $_ ) return; {
	if(release == null) release = 0;
	if(minor == null) minor = 0;
	if(major == null) major = 1;
	this.core_client_major_version = major;
	this.core_client_minor_version = minor;
	this.core_client_release = release;
}}
web2grid.worksource.boinc.request.ClientVersion.__name__ = ["web2grid","worksource","boinc","request","ClientVersion"];
web2grid.worksource.boinc.request.ClientVersion.prototype.core_client_major_version = null;
web2grid.worksource.boinc.request.ClientVersion.prototype.core_client_minor_version = null;
web2grid.worksource.boinc.request.ClientVersion.prototype.core_client_release = null;
web2grid.worksource.boinc.request.ClientVersion.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	var xml = "";
	if(this.core_client_major_version != null) xml += indent + "<core_client_major_version>" + this.core_client_major_version + "</core_client_major_version>\n";
	if(this.core_client_minor_version != null) xml += indent + "<core_client_minor_version>" + this.core_client_minor_version + "</core_client_minor_version>\n";
	if(this.core_client_release != null) xml += indent + "<core_client_release>" + this.core_client_release + "</core_client_release>\n";
	return xml;
}
web2grid.worksource.boinc.request.ClientVersion.prototype.__class__ = web2grid.worksource.boinc.request.ClientVersion;
web2grid.worksource.boinc.request.ClientVersion.__interfaces__ = [web2grid.worksource.boinc.BoincData];
EReg = function(r,opt) { if( r === $_ ) return; {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
}
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.b[buf.b.length] = this.matchedLeft();
		buf.b[buf.b.length] = f(this);
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
Xml = function(p) { if( p === $_ ) return; {
	null;
}}
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	var rules = [Xml.enode,Xml.epcdata,Xml.eend,Xml.ecdata,Xml.edoctype,Xml.ecomment,Xml.eprolog];
	var nrules = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while(str.length > 0) {
		var i = 0;
		try {
			while(i < nrules) {
				var r = rules[i];
				if(r.match(str)) {
					switch(i) {
					case 0:{
						var x = Xml.createElement(r.matched(1));
						current.addChild(x);
						str = r.matchedRight();
						while(Xml.eattribute.match(str)) {
							x.set(Xml.eattribute.matched(1),Xml.eattribute.matched(3));
							str = Xml.eattribute.matchedRight();
						}
						if(!Xml.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(Xml.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = Xml.eclose.matchedRight();
					}break;
					case 1:{
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
					}break;
					case 2:{
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						}
						else null;
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						else null;
						current = stack.pop();
						str = r.matchedRight();
					}break;
					case 3:{
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
					}break;
					case 4:{
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = Xml.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = Xml.edoctype_elt.matchedRight();
								switch(Xml.edoctype_elt.matched(0)) {
								case "[":{
									count++;
								}break;
								case "]":{
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
								}break;
								default:{
									if(count == 0) throw "__break__";
								}break;
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
					}break;
					case 5:{
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,p.pos + p.len - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
					}break;
					case 6:{
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
					}break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0,10) + "...";
			else throw "Xml parse error : Unexpected " + str;
		}
	}
	if(!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype.nodeType = null;
Xml.prototype.nodeName = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype._nodeName = null;
Xml.prototype._nodeValue = null;
Xml.prototype._attributes = null;
Xml.prototype._children = null;
Xml.prototype._parent = null;
Xml.prototype.getNodeName = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
}
Xml.prototype.setNodeName = function(n) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
}
Xml.prototype.getNodeValue = function() {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
}
Xml.prototype.setNodeValue = function(v) {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
}
Xml.prototype.getParent = function() {
	return this._parent;
}
Xml.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
}
Xml.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
}
Xml.prototype.remove = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
}
Xml.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
}
Xml.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
}
Xml.prototype.iterator = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		return this.cur < this.x.length;
	}, next : function() {
		return this.x[this.cur++];
	}};
}
Xml.prototype.elements = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k += 1;
			if(n.nodeType == Xml.Element) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.elementsNamed = function(name) {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k++;
			if(n.nodeType == Xml.Element && n._nodeName == name) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.firstChild = function() {
	if(this._children == null) throw "bad nodetype";
	return this._children[0];
}
Xml.prototype.firstElement = function() {
	if(this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while(cur < l) {
		var n = this._children[cur];
		if(n.nodeType == Xml.Element) return n;
		cur++;
	}
	return null;
}
Xml.prototype.addChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
}
Xml.prototype.removeChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	return b;
}
Xml.prototype.insertChild = function(x,pos) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
}
Xml.prototype.toString = function() {
	if(this.nodeType == Xml.PCData) return this._nodeValue;
	if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
	if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
	if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
	if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
	var s = new StringBuf();
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "<";
		s.b[s.b.length] = this._nodeName;
		{ var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) { var k = $it0.next();
		{
			s.b[s.b.length] = " ";
			s.b[s.b.length] = k;
			s.b[s.b.length] = "=\"";
			s.b[s.b.length] = this._attributes.get(k);
			s.b[s.b.length] = "\"";
		}
		}}
		if(this._children.length == 0) {
			s.b[s.b.length] = "/>";
			return s.b.join("");
		}
		s.b[s.b.length] = ">";
	}
	{ var $it1 = this.iterator();
	while( $it1.hasNext() ) { var x = $it1.next();
	s.b[s.b.length] = x.toString();
	}}
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</";
		s.b[s.b.length] = this._nodeName;
		s.b[s.b.length] = ">";
	}
	return s.b.join("");
}
Xml.prototype.__class__ = Xml;
haxe.Timer = function(time_ms) { if( time_ms === $_ ) return; {
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval("haxe.Timer.arr[" + this.id + "].run();",time_ms);
}}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	}
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.run = function() {
	null;
}
haxe.Timer.prototype.__class__ = haxe.Timer;
IntHash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.keys = function() {
	var a = new Array();
	
			for( x in this.h )
				a.push(x);
		;
	return a.iterator();
}
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}};
}
IntHash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it0 = it;
	while( $it0.hasNext() ) { var i = $it0.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
IntHash.prototype.__class__ = IntHash;
web2grid.worksource.boinc.reply.AppVersion = function(node) { if( node === $_ ) return; {
	if(node.hasNode.resolve("app_name")) this.app_name = node.node.resolve("app_name").getInnerData();
	if(node.hasNode.resolve("version_num")) this.version_num = Std.parseInt(node.node.resolve("version_num").getInnerData());
	if(node.hasNode.resolve("platform")) this.platform = web2grid.worksource.boinc.PlatformNames.fromString(node.node.resolve("platform").getInnerData());
	if(node.hasNode.resolve("avg_ncpus")) this.avg_ncpus = Std.parseFloat(node.node.resolve("avg_ncpus").getInnerData());
	if(node.hasNode.resolve("max_ncpus")) this.max_ncpus = Std.parseFloat(node.node.resolve("max_ncpus").getInnerData());
	if(node.hasNode.resolve("flops")) this.flops = Std.parseFloat(node.node.resolve("flops").getInnerData());
	this.file_ref = new Array();
	if(node.hasNode.resolve("file_ref")) { var $it0 = node.nodes.resolve("file_ref").iterator();
	while( $it0.hasNext() ) { var child = $it0.next();
	this.file_ref.push(new web2grid.worksource.boinc.reply.FileRef(child));
	}}
}}
web2grid.worksource.boinc.reply.AppVersion.__name__ = ["web2grid","worksource","boinc","reply","AppVersion"];
web2grid.worksource.boinc.reply.AppVersion.prototype.app_name = null;
web2grid.worksource.boinc.reply.AppVersion.prototype.version_num = null;
web2grid.worksource.boinc.reply.AppVersion.prototype.platform = null;
web2grid.worksource.boinc.reply.AppVersion.prototype.avg_ncpus = null;
web2grid.worksource.boinc.reply.AppVersion.prototype.max_ncpus = null;
web2grid.worksource.boinc.reply.AppVersion.prototype.flops = null;
web2grid.worksource.boinc.reply.AppVersion.prototype.file_ref = null;
web2grid.worksource.boinc.reply.AppVersion.prototype.main_program = null;
web2grid.worksource.boinc.reply.AppVersion.prototype.__class__ = web2grid.worksource.boinc.reply.AppVersion;
web2grid.worksource.boinc.request.SchedulerRequest = function(p) { if( p === $_ ) return; {
	this.platform = web2grid.worksource.boinc.Platforms.Javascript;
	this.results = new Array();
	this.others = new Array();
}}
web2grid.worksource.boinc.request.SchedulerRequest.__name__ = ["web2grid","worksource","boinc","request","SchedulerRequest"];
web2grid.worksource.boinc.request.SchedulerRequest.prototype.platform = null;
web2grid.worksource.boinc.request.SchedulerRequest.prototype.clientversion = null;
web2grid.worksource.boinc.request.SchedulerRequest.prototype.authinfo = null;
web2grid.worksource.boinc.request.SchedulerRequest.prototype.host = null;
web2grid.worksource.boinc.request.SchedulerRequest.prototype.workrequest = null;
web2grid.worksource.boinc.request.SchedulerRequest.prototype.results = null;
web2grid.worksource.boinc.request.SchedulerRequest.prototype.others = null;
web2grid.worksource.boinc.request.SchedulerRequest.prototype.setPlatform = function(platform) {
	this.platform = platform;
}
web2grid.worksource.boinc.request.SchedulerRequest.prototype.setClientVersion = function(clientversion) {
	this.clientversion = clientversion;
}
web2grid.worksource.boinc.request.SchedulerRequest.prototype.setAuthInfo = function(authinfo) {
	this.authinfo = authinfo;
}
web2grid.worksource.boinc.request.SchedulerRequest.prototype.setHost = function(host) {
	this.host = host;
}
web2grid.worksource.boinc.request.SchedulerRequest.prototype.setWorkRequest = function(workrequest) {
	this.workrequest = workrequest;
}
web2grid.worksource.boinc.request.SchedulerRequest.prototype.addResult = function(result) {
	this.results.push(result);
}
web2grid.worksource.boinc.request.SchedulerRequest.prototype.addOther = function(data) {
	this.others.push(data);
}
web2grid.worksource.boinc.request.SchedulerRequest.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	var xml = indent + "<scheduler_request>\n";
	var innerindent = indent + "    ";
	if(this.platform != null) xml += innerindent + "<platform_name>" + web2grid.worksource.boinc.PlatformNames.toString(this.platform) + "</platform_name>\n";
	if(this.clientversion != null) xml += this.clientversion.toXmlString(innerindent);
	if(this.authinfo != null) xml += this.authinfo.toXmlString(innerindent);
	if(this.host != null) xml += this.host.toXmlString(innerindent);
	if(this.workrequest != null) xml += this.workrequest.toXmlString(innerindent);
	{
		var _g = 0, _g1 = this.results;
		while(_g < _g1.length) {
			var result = _g1[_g];
			++_g;
			xml += result.toXmlString(innerindent);
		}
	}
	{
		var _g = 0, _g1 = this.others;
		while(_g < _g1.length) {
			var other = _g1[_g];
			++_g;
			xml += other.toXmlString(innerindent);
		}
	}
	xml += indent + "</scheduler_request>\n";
	return xml;
}
web2grid.worksource.boinc.request.SchedulerRequest.prototype.__class__ = web2grid.worksource.boinc.request.SchedulerRequest;
web2grid.worksource.boinc.request.SchedulerRequest.__interfaces__ = [web2grid.worksource.boinc.BoincData];
web2grid.core.iface.WorkSource = function() { }
web2grid.core.iface.WorkSource.__name__ = ["web2grid","core","iface","WorkSource"];
web2grid.core.iface.WorkSource.prototype.getScreenName = null;
web2grid.core.iface.WorkSource.prototype.requestWorks = null;
web2grid.core.iface.WorkSource.prototype.__class__ = web2grid.core.iface.WorkSource;
web2grid.core.iface.WorkSource.__interfaces__ = [web2grid.core.log.LogSource];
web2grid.worksource.boinc.BoincWorkSource = function(scheduler_url,authkey) { if( scheduler_url === $_ ) return; {
	this.reportqueue = new Array();
	this.scheduler_url = scheduler_url;
	this.authinfo = new web2grid.worksource.boinc.request.AuthInfo();
	this.authinfo.authenticator = authkey;
	this.platform = web2grid.worksource.boinc.Platforms.Javascript;
	this.version = new web2grid.worksource.boinc.request.ClientVersion(2,0,0);
	this.host = new web2grid.worksource.boinc.request.Host();
	this.updateHostInfo();
	web2grid.core.log.Console.main.logInformation("Created.",null,this,{ fileName : "BoincWorkSource.hx", lineNumber : 60, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "new"});
}}
web2grid.worksource.boinc.BoincWorkSource.__name__ = ["web2grid","worksource","boinc","BoincWorkSource"];
web2grid.worksource.boinc.BoincWorkSource.prototype.scheduler_url = null;
web2grid.worksource.boinc.BoincWorkSource.prototype.version = null;
web2grid.worksource.boinc.BoincWorkSource.prototype.platform = null;
web2grid.worksource.boinc.BoincWorkSource.prototype.authinfo = null;
web2grid.worksource.boinc.BoincWorkSource.prototype.host = null;
web2grid.worksource.boinc.BoincWorkSource.prototype.reportqueue = null;
web2grid.worksource.boinc.BoincWorkSource.prototype.updateHostInfo = function() {
	this.host.host_info = web2grid.worksource.boinc.request.HostInfo.getHostInfo();
	this.host.host_info.p_fpops = 157286400;
	this.host.host_info.p_iops = 157286400;
}
web2grid.worksource.boinc.BoincWorkSource.prototype.getScreenName = function() {
	return "BOINC Server WorkSource (" + this.scheduler_url + ")";
}
web2grid.worksource.boinc.BoincWorkSource.prototype.requestWorks = function() {
	var request = new web2grid.worksource.boinc.request.SchedulerRequest();
	request.setClientVersion(this.version);
	request.setPlatform(this.platform);
	request.setAuthInfo(this.authinfo);
	request.setHost(this.host);
	request.setWorkRequest(new web2grid.worksource.boinc.request.WorkRequest(10));
	{
		var _g = 0, _g1 = this.reportqueue;
		while(_g < _g1.length) {
			var work = _g1[_g];
			++_g;
			web2grid.core.log.Console.main.logInformation("Reporting uploaded results to: " + this.getScreenName(),null,work,{ fileName : "BoincWorkSource.hx", lineNumber : 90, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "requestWorks"});
			request.addResult(work.getBoincResult());
		}
	}
	var result = new web2grid.core.tools.AsyncOperation();
	var benchmark = new web2grid.worksource.boinc.BenchmarkWorkUnit();
	var self = this;
	var http = web2grid.core.net.HTTPRequest.post(this.scheduler_url);
	http.rawData(request.toXmlString());
	http.errorCallback(function(error) {
		result.setError(error);
	});
	http.successCallback(function(response) {
		web2grid.core.log.Console.main.logInformation("Received Boinc Scheduler reply.",null,self,{ fileName : "BoincWorkSource.hx", lineNumber : 104, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "requestWorks"});
		var xml = new haxe.xml.Fast(Xml.parse(response.content).firstElement());
		var reply = new web2grid.worksource.boinc.reply.SchedulerReply(xml);
		if(reply.hostid != null) {
			self.host.hostid = reply.hostid;
			web2grid.core.log.Console.main.logNotice("Registered new host: " + reply.hostid,null,self,{ fileName : "BoincWorkSource.hx", lineNumber : 114, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "requestWorks"});
			web2grid.core.log.Console.main.logNotice("Project name: " + reply.project_name,null,self,{ fileName : "BoincWorkSource.hx", lineNumber : 115, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "requestWorks"});
			web2grid.core.log.Console.main.logNotice("Username: " + reply.user_name,null,self,{ fileName : "BoincWorkSource.hx", lineNumber : 116, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "requestWorks"});
		}
		{
			var _g = 0, _g1 = reply.result_ack;
			while(_g < _g1.length) {
				var ack = _g1[_g];
				++_g;
				web2grid.core.log.Console.main.logInformation("Received result ack: " + ack.name,null,self,{ fileName : "BoincWorkSource.hx", lineNumber : 124, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "requestWorks"});
				{
					var _g2 = 0, _g3 = self.reportqueue;
					while(_g2 < _g3.length) {
						var work = _g3[_g2];
						++_g2;
						if(work.getWorkUnitResultName() == ack.name) {
							web2grid.core.log.Console.main.logNotice("Reported result accepted. WorkUnit removed.",null,work,{ fileName : "BoincWorkSource.hx", lineNumber : 129, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "requestWorks"});
							self.reportqueue.remove(work);
						}
					}
				}
			}
		}
		{
			var _g = 0, _g1 = reply.message;
			while(_g < _g1.length) {
				var message = _g1[_g];
				++_g;
				web2grid.core.log.Console.main.logNotice("BOINC " + message.priority + " priority message: " + message.message,null,self,{ fileName : "BoincWorkSource.hx", lineNumber : 140, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "requestWorks"});
			}
		}
		var workunits = new Array();
		{
			var _g = 0, _g1 = reply.workunit;
			while(_g < _g1.length) {
				var unit = _g1[_g];
				++_g;
				{
					var _g2 = 0, _g3 = reply.app;
					while(_g2 < _g3.length) {
						var app = _g3[_g2];
						++_g2;
						if(app.name == unit.app_name) {
							unit.application = app;
						}
					}
				}
				{
					var _g2 = 0, _g3 = reply.app_version;
					while(_g2 < _g3.length) {
						var appv = _g3[_g2];
						++_g2;
						if(appv.app_name == unit.app_name) {
							{
								var _g4 = 0, _g5 = appv.file_ref;
								while(_g4 < _g5.length) {
									var ref = _g5[_g4];
									++_g4;
									{
										var _g6 = 0, _g7 = reply.file_info;
										while(_g6 < _g7.length) {
											var finfo = _g7[_g6];
											++_g6;
											if(finfo.name == ref.file_name) ref.file_info = finfo;
											if(ref.main_program) appv.main_program = ref;
										}
									}
								}
							}
							unit.application.version = appv;
						}
					}
				}
				{
					var _g2 = 0, _g3 = unit.file_ref;
					while(_g2 < _g3.length) {
						var ref = _g3[_g2];
						++_g2;
						{
							var _g4 = 0, _g5 = reply.file_info;
							while(_g4 < _g5.length) {
								var finfo = _g5[_g4];
								++_g4;
								if(finfo.name == ref.file_name) ref.file_info = finfo;
							}
						}
					}
				}
				{
					var _g2 = 0, _g3 = reply.result;
					while(_g2 < _g3.length) {
						var res = _g3[_g2];
						++_g2;
						if(res.wu_name == unit.name) {
							{
								var _g4 = 0, _g5 = res.file_ref;
								while(_g4 < _g5.length) {
									var ref = _g5[_g4];
									++_g4;
									{
										var _g6 = 0, _g7 = reply.file_info;
										while(_g6 < _g7.length) {
											var finfo = _g7[_g6];
											++_g6;
											if(finfo.name == ref.file_name) ref.file_info = finfo;
										}
									}
								}
							}
							unit.result = res;
							break;
						}
					}
				}
				var bwu = new web2grid.worksource.boinc.BoincWorkUnit(self,unit);
				workunits.push(bwu);
			}
		}
		result.setResult(workunits);
	});
	web2grid.core.log.Console.main.logInformation("Sending Boinc Scheduler request.",null,this,{ fileName : "BoincWorkSource.hx", lineNumber : 212, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "requestWorks"});
	http.send();
	return result;
}
web2grid.worksource.boinc.BoincWorkSource.prototype.checkUploadStatus = function(fileref) {
	var request = new web2grid.worksource.boinc.request.DataServerRequest();
	request.clientversion = this.version;
	request.get_file_size = fileref.file_name;
	var http = web2grid.core.net.HTTPRequest.post(fileref.file_info.url);
	http.rawData(request.toXmlString());
	return http.send();
}
web2grid.worksource.boinc.BoincWorkSource.prototype.uploadResult = function(fileref,data,md5) {
	var request = new web2grid.worksource.boinc.request.DataServerRequest();
	request.clientversion = this.version;
	request.file_upload = new web2grid.worksource.boinc.request.FileUpload();
	request.file_upload.file_info = new web2grid.worksource.boinc.request.UploadFileInfo(fileref.file_info);
	request.file_upload.offset = 0;
	request.file_upload.nbytes = data.length;
	request.file_upload.md5_cksum = md5;
	request.file_upload.data = data;
	var http = web2grid.core.net.HTTPRequest.post(fileref.file_info.url);
	http.rawData(request.toXmlString());
	return http.send();
}
web2grid.worksource.boinc.BoincWorkSource.prototype.reportWork = function(work) {
	web2grid.core.log.Console.main.logInformation("Added to reporting queue: " + work.getScreenName(),null,this,{ fileName : "BoincWorkSource.hx", lineNumber : 251, className : "web2grid.worksource.boinc.BoincWorkSource", methodName : "reportWork"});
	this.reportqueue.push(work);
}
web2grid.worksource.boinc.BoincWorkSource.prototype.hxSerialize = function(s) {
	s.serialize(this.scheduler_url);
	s.serialize(this.version);
	s.serialize(this.platform);
	s.serialize(this.authinfo);
	s.serialize(this.host);
	s.serialize(this.reportqueue);
}
web2grid.worksource.boinc.BoincWorkSource.prototype.hxUnserialize = function(s) {
	this.scheduler_url = s.unserialize();
	this.version = s.unserialize();
	this.platform = s.unserialize();
	this.authinfo = s.unserialize();
	this.host = s.unserialize();
	this.reportqueue = s.unserialize();
	this.updateHostInfo();
}
web2grid.worksource.boinc.BoincWorkSource.prototype.__class__ = web2grid.worksource.boinc.BoincWorkSource;
web2grid.worksource.boinc.BoincWorkSource.__interfaces__ = [web2grid.core.iface.WorkSource];
if(!web2grid.control) web2grid.control = {}
web2grid.control.State = { __ename__ : ["web2grid","control","State"], __constructs__ : ["Suspended","Running","Working","Error"] }
web2grid.control.State.Suspended = ["Suspended",0];
web2grid.control.State.Suspended.toString = $estr;
web2grid.control.State.Suspended.__enum__ = web2grid.control.State;
web2grid.control.State.Running = ["Running",1];
web2grid.control.State.Running.toString = $estr;
web2grid.control.State.Running.__enum__ = web2grid.control.State;
web2grid.control.State.Working = ["Working",2];
web2grid.control.State.Working.toString = $estr;
web2grid.control.State.Working.__enum__ = web2grid.control.State;
web2grid.control.State.Error = ["Error",3];
web2grid.control.State.Error.toString = $estr;
web2grid.control.State.Error.__enum__ = web2grid.control.State;
web2grid.control.Scheduler = function(storageroot) { if( storageroot === $_ ) return; {
	this.sources = new Array();
	this.activeworks = new Array();
	this.passiveworks = new Array();
	this.activeworknumber = 1;
	this.passiveworknumber = 1;
	this.lastrequestsource = 0;
	this.lastrequesttime = null;
	this.requestinterval = 5;
	this.storageroot = storageroot;
	web2grid.core.log.Console.main.logNotice("Created new client.",null,this,{ fileName : "Scheduler.hx", lineNumber : 358, className : "web2grid.control.Scheduler", methodName : "new"});
	web2grid.core.log.Console.main.logInformation("Number of Work Sources: " + this.getNumberOfSources(),null,this,{ fileName : "Scheduler.hx", lineNumber : 359, className : "web2grid.control.Scheduler", methodName : "new"});
	this.dumpWorkNumber();
	this.onStartWorking = new hsl.haxe.DirectSignaler(this);
	this.onStopWorking = new hsl.haxe.DirectSignaler(this);
	this.onSuspended = new hsl.haxe.DirectSignaler(this);
	this.onError = new hsl.haxe.DirectSignaler(this);
	this.onOperate = new hsl.haxe.DirectSignaler(this);
	this.isrunning = false;
	this.state = web2grid.control.State.Suspended;
	this.completedworks = 0;
}}
web2grid.control.Scheduler.__name__ = ["web2grid","control","Scheduler"];
web2grid.control.Scheduler.loadFromLocalStorage = function(root) {
	try {
		var string = localStorage.getItem(root);
		if(string == null || string == "") {
			web2grid.core.log.Console.main.logWarning("Client is not installed in this browser yet. Installing new settings.",null,null,{ fileName : "Scheduler.hx", lineNumber : 444, className : "web2grid.control.Scheduler", methodName : "loadFromLocalStorage"});
			var client = new web2grid.control.Scheduler(root);
			client.saveToLocalStorage();
			return client;
		}
		var client = (function($this) {
			var $r;
			var $t = haxe.Unserializer.run(string);
			if(Std["is"]($t,web2grid.control.Scheduler)) $t;
			else throw "Class cast error";
			$r = $t;
			return $r;
		}(this));
		client.storageroot = root;
		web2grid.core.log.Console.main.logNotice("Loaded last settings from LocalStorage.",null,client,{ fileName : "Scheduler.hx", lineNumber : 452, className : "web2grid.control.Scheduler", methodName : "loadFromLocalStorage"});
		web2grid.core.log.Console.main.logInformation("Number of Work Sources: " + client.getNumberOfSources(),null,client,{ fileName : "Scheduler.hx", lineNumber : 453, className : "web2grid.control.Scheduler", methodName : "loadFromLocalStorage"});
		client.dumpWorkNumber();
		return client;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				if(localStorage.getItem(root) != "") {
					web2grid.core.log.Console.main.logError("Could not load from LocalStorage! Invalid data found! Installing new settings.",null,null,{ fileName : "Scheduler.hx", lineNumber : 461, className : "web2grid.control.Scheduler", methodName : "loadFromLocalStorage"});
				}
				var client = new web2grid.control.Scheduler(root);
				client.saveToLocalStorage();
				return client;
			}
		}
	}
}
web2grid.control.Scheduler.prototype.sources = null;
web2grid.control.Scheduler.prototype.workrequest = null;
web2grid.control.Scheduler.prototype.activeworks = null;
web2grid.control.Scheduler.prototype.passiveworks = null;
web2grid.control.Scheduler.prototype.activeworknumber = null;
web2grid.control.Scheduler.prototype.passiveworknumber = null;
web2grid.control.Scheduler.prototype.requestinterval = null;
web2grid.control.Scheduler.prototype.lastrequesttime = null;
web2grid.control.Scheduler.prototype.lastrequestsource = null;
web2grid.control.Scheduler.prototype.isrunning = null;
web2grid.control.Scheduler.prototype.timer = null;
web2grid.control.Scheduler.prototype.state = null;
web2grid.control.Scheduler.prototype.completedworks = null;
web2grid.control.Scheduler.prototype.changestate = function(newstate) {
	if(this.state != newstate) {
		var $e = this.state;
		switch( $e[1] ) {
		case 0:
		{
			var $e = newstate;
			switch( $e[1] ) {
			case 2:
			{
				this.onStartWorking.dispatch(null,null,{ fileName : "Scheduler.hx", lineNumber : 59, className : "web2grid.control.Scheduler", methodName : "changestate"});
			}break;
			default:{
				null;
			}break;
			}
		}break;
		case 1:
		{
			var $e = newstate;
			switch( $e[1] ) {
			case 2:
			{
				this.onStartWorking.dispatch(null,null,{ fileName : "Scheduler.hx", lineNumber : 66, className : "web2grid.control.Scheduler", methodName : "changestate"});
			}break;
			case 0:
			{
				this.onSuspended.dispatch(null,null,{ fileName : "Scheduler.hx", lineNumber : 67, className : "web2grid.control.Scheduler", methodName : "changestate"});
			}break;
			default:{
				null;
			}break;
			}
		}break;
		case 2:
		{
			var $e = newstate;
			switch( $e[1] ) {
			case 1:
			{
				this.onStopWorking.dispatch(null,null,{ fileName : "Scheduler.hx", lineNumber : 74, className : "web2grid.control.Scheduler", methodName : "changestate"});
			}break;
			case 0:
			{
				this.onSuspended.dispatch(null,null,{ fileName : "Scheduler.hx", lineNumber : 75, className : "web2grid.control.Scheduler", methodName : "changestate"});
			}break;
			default:{
				null;
			}break;
			}
		}break;
		default:{
			null;
		}break;
		}
		if(newstate == web2grid.control.State.Error) {
			this.onError.dispatch(null,null,{ fileName : "Scheduler.hx", lineNumber : 84, className : "web2grid.control.Scheduler", methodName : "changestate"});
		}
		this.state = newstate;
	}
}
web2grid.control.Scheduler.prototype.setTargetActiveWorkNumber = function(number) {
	if(number > 0) {
		if(this.activeworknumber > number) {
			var num = 0;
			{
				var _g = 0, _g1 = this.activeworks;
				while(_g < _g1.length) {
					var work = _g1[_g];
					++_g;
					num++;
					if(num > number) {
						work.terminate();
						this.activeworks.remove(work);
						this.passiveworks.push(work);
						web2grid.core.log.Console.main.logInformation("Transfered active work to passive: " + work.getScreenName(),null,this,{ fileName : "Scheduler.hx", lineNumber : 107, className : "web2grid.control.Scheduler", methodName : "setTargetActiveWorkNumber"});
					}
				}
			}
		}
		this.activeworknumber = number;
		web2grid.core.log.Console.main.logInformation("Target active work number set to: " + number,null,this,{ fileName : "Scheduler.hx", lineNumber : 112, className : "web2grid.control.Scheduler", methodName : "setTargetActiveWorkNumber"});
	}
}
web2grid.control.Scheduler.prototype.setTargetPassiveWorkNumber = function(number) {
	if(number > 0) this.passiveworknumber = number;
}
web2grid.control.Scheduler.prototype.setRequestInterval = function(interval) {
	if(interval > 0) this.requestinterval = interval;
}
web2grid.control.Scheduler.prototype.addWorkSource = function(source) {
	this.sources.push(source);
	this.saveToLocalStorage();
	web2grid.core.log.Console.main.logInformation("Sources: " + this.getNumberOfSources(),null,this,{ fileName : "Scheduler.hx", lineNumber : 132, className : "web2grid.control.Scheduler", methodName : "addWorkSource"});
}
web2grid.control.Scheduler.prototype.getNumberOfSources = function() {
	return this.sources.length;
}
web2grid.control.Scheduler.prototype.getWorkSources = function() {
	return this.sources.iterator();
}
web2grid.control.Scheduler.prototype.getMaxProgress = function() {
	var progress = 0;
	{
		var _g = 0, _g1 = this.activeworks;
		while(_g < _g1.length) {
			var work = _g1[_g];
			++_g;
			if(work.getProgress() > progress) {
				progress = work.getProgress();
			}
		}
	}
	return progress;
}
web2grid.control.Scheduler.prototype.getCompletedWorks = function() {
	return this.completedworks;
}
web2grid.control.Scheduler.prototype.isWorking = function() {
	return this.state == web2grid.control.State.Working;
}
web2grid.control.Scheduler.prototype.isSuspended = function() {
	return this.state == web2grid.control.State.Suspended;
}
web2grid.control.Scheduler.prototype.dumpWorkNumber = function() {
	web2grid.core.log.Console.main.logInformation("Number of works: " + this.activeworks.length + " active and " + this.passiveworks.length + " passive",null,this,{ fileName : "Scheduler.hx", lineNumber : 175, className : "web2grid.control.Scheduler", methodName : "dumpWorkNumber"});
}
web2grid.control.Scheduler.prototype.getScreenName = function() {
	return "Client Scheduler";
}
web2grid.control.Scheduler.prototype.onStartWorking = null;
web2grid.control.Scheduler.prototype.onStopWorking = null;
web2grid.control.Scheduler.prototype.onSuspended = null;
web2grid.control.Scheduler.prototype.onError = null;
web2grid.control.Scheduler.prototype.onOperate = null;
web2grid.control.Scheduler.prototype.requestWorks = function() {
	var changed = false;
	if(this.workrequest != null) {
		if(this.workrequest.isCompleted()) {
			if(this.workrequest.isError()) {
				web2grid.core.log.Console.main.logDebug("Work request error: " + this.workrequest.getError(),null,this,{ fileName : "Scheduler.hx", lineNumber : 201, className : "web2grid.control.Scheduler", methodName : "requestWorks"});
			}
			else {
				var works = this.workrequest.getResult();
				if(works != null) {
					if(works.length == 0) {
						web2grid.core.log.Console.main.logInformation("Received no work.",null,this,{ fileName : "Scheduler.hx", lineNumber : 210, className : "web2grid.control.Scheduler", methodName : "requestWorks"});
					}
					else {
						web2grid.core.log.Console.main.logInformation("Received " + works.length + " works.",null,this,{ fileName : "Scheduler.hx", lineNumber : 214, className : "web2grid.control.Scheduler", methodName : "requestWorks"});
						{
							var _g = 0;
							while(_g < works.length) {
								var work = works[_g];
								++_g;
								web2grid.core.log.Console.main.logDebug("Got work, added to passive.",null,this,{ fileName : "Scheduler.hx", lineNumber : 217, className : "web2grid.control.Scheduler", methodName : "requestWorks"});
								this.passiveworks.push(work);
								this.dumpWorkNumber();
								changed = true;
							}
						}
					}
				}
			}
			this.workrequest = null;
		}
		else if(this.workrequest.getElapsedTime().getTime() > 10000) {
			web2grid.core.log.Console.main.logInformation("Work request timed out.",null,this,{ fileName : "Scheduler.hx", lineNumber : 230, className : "web2grid.control.Scheduler", methodName : "requestWorks"});
			this.workrequest = null;
		}
	}
	if(this.workrequest == null && this.passiveworks.length < this.passiveworknumber) {
		if(this.lastrequesttime == null) this.lastrequesttime = Date.fromTime(0);
		var elapsedtime = Date.now().getTime() - this.lastrequesttime.getTime();
		if(elapsedtime >= this.requestinterval) {
			this.lastrequestsource = (this.lastrequestsource + 1) % this.sources.length;
			if(this.sources.length > 0) {
				var source = this.sources[this.lastrequestsource];
				web2grid.core.log.Console.main.logInformation("Requesting works from: " + source.getScreenName(),null,this,{ fileName : "Scheduler.hx", lineNumber : 248, className : "web2grid.control.Scheduler", methodName : "requestWorks"});
				this.workrequest = this.sources[this.lastrequestsource].requestWorks();
				this.lastrequesttime = Date.now();
			}
			else {
				web2grid.core.log.Console.main.logNotice("There are no WorkSources to request work from.",null,null,{ fileName : "Scheduler.hx", lineNumber : 254, className : "web2grid.control.Scheduler", methodName : "requestWorks"});
			}
		}
	}
	return changed;
}
web2grid.control.Scheduler.prototype.activateWorks = function() {
	var changed = false;
	if(this.activeworks.length < this.activeworknumber && this.passiveworks.length > 0) {
		var work = this.passiveworks.shift();
		this.activeworks.push(work);
		work.resume();
		web2grid.core.log.Console.main.logInformation("Activating work: " + work.getScreenName(),null,this,{ fileName : "Scheduler.hx", lineNumber : 271, className : "web2grid.control.Scheduler", methodName : "activateWorks"});
		this.dumpWorkNumber();
		changed = true;
	}
	return changed;
}
web2grid.control.Scheduler.prototype.operateWorks = function() {
	var changed = false;
	{
		var _g = 0, _g1 = this.activeworks;
		while(_g < _g1.length) {
			var work = _g1[_g];
			++_g;
			if(work.isCompleted()) {
				changed = true;
				this.activeworks.remove(work);
				if(work.isError() == false) {
					this.completedworks++;
					web2grid.core.log.Console.main.logNotice("Completed works: " + this.completedworks,null,this,{ fileName : "Scheduler.hx", lineNumber : 293, className : "web2grid.control.Scheduler", methodName : "operateWorks"});
				}
				web2grid.core.log.Console.main.logInformation("Work removed: " + work.getScreenName(),null,this,{ fileName : "Scheduler.hx", lineNumber : 296, className : "web2grid.control.Scheduler", methodName : "operateWorks"});
				this.dumpWorkNumber();
			}
			else {
				changed = work.operate();
			}
		}
	}
	return changed;
}
web2grid.control.Scheduler.prototype.operate = function() {
	var changed = false;
	changed = changed || this.requestWorks();
	changed = changed || this.activateWorks();
	changed = changed || this.operateWorks();
	if(changed) {
		this.saveToLocalStorage();
	}
	if(this.isrunning) {
		var working = false;
		{
			var _g = 0, _g1 = this.activeworks;
			while(_g < _g1.length) {
				var work = _g1[_g];
				++_g;
				working = working || work.isWorking();
			}
		}
		if(working) {
			this.changestate(web2grid.control.State.Working);
		}
		else {
			this.changestate(web2grid.control.State.Running);
		}
	}
	this.onOperate.dispatch(null,null,{ fileName : "Scheduler.hx", lineNumber : 339, className : "web2grid.control.Scheduler", methodName : "operate"});
	return changed;
}
web2grid.control.Scheduler.prototype.run = function() {
	try {
		if(this.isrunning) {
			this.operate();
		}
		else {
			this.timer.stop();
		}
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				web2grid.core.log.Console.main.logError("Exception:",e,this,{ fileName : "Scheduler.hx", lineNumber : 388, className : "web2grid.control.Scheduler", methodName : "run"});
				web2grid.core.log.Console.main.logError("Stack Trace:",haxe.Stack.exceptionStack(),this,{ fileName : "Scheduler.hx", lineNumber : 389, className : "web2grid.control.Scheduler", methodName : "run"});
				this.isrunning = false;
			}
		}
	}
}
web2grid.control.Scheduler.prototype.start = function(msec) {
	if(msec == null) msec = 1000;
	if(this.isrunning) return;
	web2grid.core.log.Console.main.logNotice("Started.",null,this,{ fileName : "Scheduler.hx", lineNumber : 397, className : "web2grid.control.Scheduler", methodName : "start"});
	this.isrunning = true;
	this.timer = new haxe.Timer(msec);
	this.timer.run = $closure(this,"run");
	this.changestate(web2grid.control.State.Running);
}
web2grid.control.Scheduler.prototype.isRunning = function() {
	return this.isrunning;
}
web2grid.control.Scheduler.prototype.stop = function() {
	this.isrunning = false;
	web2grid.core.log.Console.main.logNotice("Stopped.",null,this,{ fileName : "Scheduler.hx", lineNumber : 412, className : "web2grid.control.Scheduler", methodName : "stop"});
}
web2grid.control.Scheduler.prototype.terminate = function() {
	{
		var _g = 0, _g1 = this.activeworks;
		while(_g < _g1.length) {
			var work = _g1[_g];
			++_g;
			work.terminate();
		}
	}
	this.changestate(web2grid.control.State.Suspended);
}
web2grid.control.Scheduler.prototype.resume = function() {
	var _g = 0, _g1 = this.activeworks;
	while(_g < _g1.length) {
		var work = _g1[_g];
		++_g;
		work.resume();
	}
}
web2grid.control.Scheduler.prototype.storageroot = null;
web2grid.control.Scheduler.prototype.saveToLocalStorage = function() {
	try {
		haxe.Serializer.USE_CACHE = true;
		var string = haxe.Serializer.run(this);
		localStorage.setItem(this.storageroot,string);
		web2grid.core.log.Console.main.logDebug("Saved.",null,this,{ fileName : "Scheduler.hx", lineNumber : 477, className : "web2grid.control.Scheduler", methodName : "saveToLocalStorage"});
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				web2grid.core.log.Console.main.logError("Could not save to localStorage!",e,this,{ fileName : "Scheduler.hx", lineNumber : 481, className : "web2grid.control.Scheduler", methodName : "saveToLocalStorage"});
				web2grid.core.log.Console.main.logError("Stack Trace:",haxe.Stack.exceptionStack(),this,{ fileName : "Scheduler.hx", lineNumber : 482, className : "web2grid.control.Scheduler", methodName : "saveToLocalStorage"});
			}
		}
	}
}
web2grid.control.Scheduler.prototype.hxSerialize = function(s) {
	s.serialize(this.sources);
	s.serialize(this.activeworks);
	s.serialize(this.passiveworks);
	s.serialize(this.activeworknumber);
	s.serialize(this.passiveworknumber);
	s.serialize(this.requestinterval);
	s.serialize(this.lastrequestsource);
	s.serialize(this.completedworks);
}
web2grid.control.Scheduler.prototype.hxUnserialize = function(s) {
	this.sources = s.unserialize();
	this.activeworks = s.unserialize();
	this.passiveworks = s.unserialize();
	this.activeworknumber = s.unserialize();
	this.passiveworknumber = s.unserialize();
	this.requestinterval = s.unserialize();
	this.lastrequestsource = s.unserialize();
	this.completedworks = s.unserialize();
	this.lastrequesttime = null;
	this.isrunning = false;
	this.onStartWorking = new hsl.haxe.DirectSignaler(this);
	this.onStopWorking = new hsl.haxe.DirectSignaler(this);
	this.onSuspended = new hsl.haxe.DirectSignaler(this);
	this.onError = new hsl.haxe.DirectSignaler(this);
	this.onOperate = new hsl.haxe.DirectSignaler(this);
	this.state = web2grid.control.State.Suspended;
	this.isrunning = false;
}
web2grid.control.Scheduler.prototype.__class__ = web2grid.control.Scheduler;
web2grid.control.Scheduler.__interfaces__ = [web2grid.core.log.LogSource,web2grid.core.iface.Operable];
web2grid.worksource.boinc.reply.ResultAck = function(node) { if( node === $_ ) return; {
	if(node.hasNode.resolve("name")) this.name = node.node.resolve("name").getInnerData();
}}
web2grid.worksource.boinc.reply.ResultAck.__name__ = ["web2grid","worksource","boinc","reply","ResultAck"];
web2grid.worksource.boinc.reply.ResultAck.prototype.name = null;
web2grid.worksource.boinc.reply.ResultAck.prototype.__class__ = web2grid.worksource.boinc.reply.ResultAck;
hsl.haxe.DirectSignaler = function(subject,rejectNullData) { if( subject === $_ ) return; {
	if(null == subject) {
		throw new haxe.exception.ArgumentNullException("subject",1);
	}
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
}}
hsl.haxe.DirectSignaler.__name__ = ["hsl","haxe","DirectSignaler"];
hsl.haxe.DirectSignaler.prototype.bubblingTargets = null;
hsl.haxe.DirectSignaler.prototype.isListenedTo = null;
hsl.haxe.DirectSignaler.prototype.notificationTargets = null;
hsl.haxe.DirectSignaler.prototype.rejectNullData = null;
hsl.haxe.DirectSignaler.prototype.sentinel = null;
hsl.haxe.DirectSignaler.prototype.subject = null;
hsl.haxe.DirectSignaler.prototype.subjectClassNames = null;
hsl.haxe.DirectSignaler.prototype.addBubblingTarget = function(value) {
	if(null == this.bubblingTargets) {
		this.bubblingTargets = new List();
	}
	this.bubblingTargets.add(value);
}
hsl.haxe.DirectSignaler.prototype.addNotificationTarget = function(value) {
	if(null == this.notificationTargets) {
		this.notificationTargets = new List();
	}
	this.notificationTargets.add(value);
}
hsl.haxe.DirectSignaler.prototype.bind = function(listener) {
	if(null == listener) {
		throw new haxe.exception.ArgumentNullException("listener",1);
	}
	return this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
}
hsl.haxe.DirectSignaler.prototype.bindAdvanced = function(listener) {
	if(null == listener) {
		throw new haxe.exception.ArgumentNullException("listener",1);
	}
	return this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
}
hsl.haxe.DirectSignaler.prototype.bindVoid = function(listener) {
	if(null == listener) {
		throw new haxe.exception.ArgumentNullException("listener",1);
	}
	return this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
}
hsl.haxe.DirectSignaler.prototype.bubble = function(data,origin) {
	if(null != this.bubblingTargets) {
		{ var $it0 = this.bubblingTargets.iterator();
		while( $it0.hasNext() ) { var bubblingTarget = $it0.next();
		{
			bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 109, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
		}
		}}
	}
	if(null != this.notificationTargets) {
		{ var $it1 = this.notificationTargets.iterator();
		while( $it1.hasNext() ) { var notificationTarget = $it1.next();
		{
			notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 114, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
		}
		}}
	}
}
hsl.haxe.DirectSignaler.prototype.dispatch = function(data,origin,positionInformation) {
	if("dispatchNative" != positionInformation.methodName && "bubble" != positionInformation.methodName) {
		this.verifyCaller(positionInformation);
	}
	if(this.rejectNullData && null == data) {
		throw new haxe.exception.Exception("Some data that was passed is null, but this signaler has been set to reject null data.",null,1);
	}
	origin = null == origin?this.subject:origin;
	if(3 == this.sentinel.callListener(data,this.subject,origin,3)) {
		{
			if(null != this.bubblingTargets) {
				{ var $it0 = this.bubblingTargets.iterator();
				while( $it0.hasNext() ) { var bubblingTarget = $it0.next();
				{
					bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 109, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
				}}
			}
			if(null != this.notificationTargets) {
				{ var $it1 = this.notificationTargets.iterator();
				while( $it1.hasNext() ) { var notificationTarget = $it1.next();
				{
					notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 114, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
				}}
			}
		}
	}
}
hsl.haxe.DirectSignaler.prototype.getIsListenedTo = function() {
	return this.sentinel.getIsConnected();
}
hsl.haxe.DirectSignaler.prototype.getOrigin = function(origin) {
	return null == origin?this.subject:origin;
}
hsl.haxe.DirectSignaler.prototype.verifyCaller = function(positionInformation) {
	if(null == this.subjectClassNames) {
		this.subjectClassNames = haxe.TypeTools.getClassNames(this.subject);
	}
	{ var $it0 = this.subjectClassNames.iterator();
	while( $it0.hasNext() ) { var subjectClassName = $it0.next();
	{
		if(subjectClassName == positionInformation.className) {
			return;
		}
	}
	}}
	throw new haxe.exception.Exception("This method may only be called by the subject of the signaler.",null,2);
}
hsl.haxe.DirectSignaler.prototype.removeBubblingTarget = function(value) {
	if(null != this.bubblingTargets) {
		this.bubblingTargets.remove(value);
	}
}
hsl.haxe.DirectSignaler.prototype.removeNotificationTarget = function(value) {
	if(null != this.notificationTargets) {
		this.notificationTargets.remove(value);
	}
}
hsl.haxe.DirectSignaler.prototype.unbind = function(listener) {
	this.sentinel.remove(new hsl.haxe._DirectSignaler.RegularBond(listener));
}
hsl.haxe.DirectSignaler.prototype.unbindAdvanced = function(listener) {
	this.sentinel.remove(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
}
hsl.haxe.DirectSignaler.prototype.unbindVoid = function(listener) {
	this.sentinel.remove(new hsl.haxe._DirectSignaler.NiladicBond(listener));
}
hsl.haxe.DirectSignaler.prototype.__class__ = hsl.haxe.DirectSignaler;
hsl.haxe.DirectSignaler.__interfaces__ = [hsl.haxe.Signaler];
if(!hsl.haxe._DirectSignaler) hsl.haxe._DirectSignaler = {}
hsl.haxe._DirectSignaler.LinkedBond = function(p) { if( p === $_ ) return; {
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
}}
hsl.haxe._DirectSignaler.LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl.haxe._DirectSignaler.LinkedBond.__super__ = hsl.haxe.Bond;
for(var k in hsl.haxe.Bond.prototype ) hsl.haxe._DirectSignaler.LinkedBond.prototype[k] = hsl.haxe.Bond.prototype[k];
hsl.haxe._DirectSignaler.LinkedBond.prototype.destroyed = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.next = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.previous = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	return 0;
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.determineEquals = function(value) {
	return false;
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.destroy = function() {
	if(false == this.destroyed) {
		this.previous.next = this.next;
		this.next.previous = this.previous;
		this.destroyed = true;
	}
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.unlink = function() {
	if(false == this.destroyed) {
		this.previous.next = this.next;
		this.next.previous = this.previous;
		this.destroyed = true;
	}
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.__class__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.SentinelBond = function(p) { if( p === $_ ) return; {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
}}
hsl.haxe._DirectSignaler.SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl.haxe._DirectSignaler.SentinelBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.SentinelBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.SentinelBond.prototype.isConnected = null;
hsl.haxe._DirectSignaler.SentinelBond.prototype.add = function(value) {
	value.next = this;
	value.previous = this.previous;
	return this.previous = this.previous.next = value;
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	var node = this.next;
	while(node != this && 1 != propagationStatus) {
		propagationStatus = node.callListener(data,currentTarget,origin,propagationStatus);
		node = node.next;
	}
	return propagationStatus;
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.getIsConnected = function() {
	return this.next != this;
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.remove = function(value) {
	var node = this.next;
	while(node != this) {
		if(node.determineEquals(value)) {
			if(false == node.destroyed) {
				node.previous.next = node.next;
				node.next.previous = node.previous;
				node.destroyed = true;
			}
			break;
		}
		node = node.next;
	}
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.__class__ = hsl.haxe._DirectSignaler.SentinelBond;
hsl.haxe._DirectSignaler.RegularBond = function(listener) { if( listener === $_ ) return; {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
}}
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.RegularBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.RegularBond.prototype.listener = null;
hsl.haxe._DirectSignaler.RegularBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	if(false == this.halted) {
		this.listener(data);
		if(this.willDestroyOnUse) {
			if(false == this.destroyed) {
				this.previous.next = this.next;
				this.next.previous = this.previous;
				this.destroyed = true;
			}
		}
	}
	return propagationStatus;
}
hsl.haxe._DirectSignaler.RegularBond.prototype.determineEquals = function(value) {
	return Std["is"](value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
}
hsl.haxe._DirectSignaler.RegularBond.prototype.__class__ = hsl.haxe._DirectSignaler.RegularBond;
hsl.haxe._DirectSignaler.NiladicBond = function(listener) { if( listener === $_ ) return; {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
}}
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.NiladicBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.NiladicBond.prototype.listener = null;
hsl.haxe._DirectSignaler.NiladicBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	if(false == this.halted) {
		this.listener();
		if(this.willDestroyOnUse) {
			if(false == this.destroyed) {
				this.previous.next = this.next;
				this.next.previous = this.previous;
				this.destroyed = true;
			}
		}
	}
	return propagationStatus;
}
hsl.haxe._DirectSignaler.NiladicBond.prototype.determineEquals = function(value) {
	return Std["is"](value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
}
hsl.haxe._DirectSignaler.NiladicBond.prototype.__class__ = hsl.haxe._DirectSignaler.NiladicBond;
hsl.haxe._DirectSignaler.AdvancedBond = function(listener) { if( listener === $_ ) return; {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
}}
hsl.haxe._DirectSignaler.AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl.haxe._DirectSignaler.AdvancedBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.AdvancedBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.AdvancedBond.prototype.listener = null;
hsl.haxe._DirectSignaler.AdvancedBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	if(this.halted == false) {
		var signal = new hsl.haxe.Signal(data,this,currentTarget,origin);
		this.listener(signal);
		if(this.willDestroyOnUse) {
			if(false == this.destroyed) {
				this.previous.next = this.next;
				this.next.previous = this.previous;
				this.destroyed = true;
			}
		}
		if(signal.immediatePropagationStopped) {
			return 1;
		}
		else if(signal.propagationStopped) {
			return 2;
		}
	}
	return propagationStatus;
}
hsl.haxe._DirectSignaler.AdvancedBond.prototype.determineEquals = function(value) {
	return Std["is"](value,hsl.haxe._DirectSignaler.AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
}
hsl.haxe._DirectSignaler.AdvancedBond.prototype.__class__ = hsl.haxe._DirectSignaler.AdvancedBond;
hsl.haxe._DirectSignaler.PropagationStatus = function() { }
hsl.haxe._DirectSignaler.PropagationStatus.__name__ = ["hsl","haxe","_DirectSignaler","PropagationStatus"];
hsl.haxe._DirectSignaler.PropagationStatus.prototype.__class__ = hsl.haxe._DirectSignaler.PropagationStatus;
web2grid.core.tools.AsyncResult = function() { }
web2grid.core.tools.AsyncResult.__name__ = ["web2grid","core","tools","AsyncResult"];
web2grid.core.tools.AsyncResult.prototype.isCompleted = null;
web2grid.core.tools.AsyncResult.prototype.isError = null;
web2grid.core.tools.AsyncResult.prototype.getState = null;
web2grid.core.tools.AsyncResult.prototype.getError = null;
web2grid.core.tools.AsyncResult.prototype.getProgress = null;
web2grid.core.tools.AsyncResult.prototype.getResult = null;
web2grid.core.tools.AsyncResult.prototype.getElapsedTime = null;
web2grid.core.tools.AsyncResult.prototype.onComplete = null;
web2grid.core.tools.AsyncResult.prototype.onError = null;
web2grid.core.tools.AsyncResult.prototype.onProgress = null;
web2grid.core.tools.AsyncResult.prototype.__class__ = web2grid.core.tools.AsyncResult;
web2grid.core.tools.AsyncOperation = function(p) { if( p === $_ ) return; {
	this.starttime = Date.now();
	this.state = web2grid.core.tools.AsyncState.Waiting;
	this.result = null;
	this.error = null;
	this.progress = 0;
	this.onComplete = new hsl.haxe.DirectSignaler(this);
	this.onError = new hsl.haxe.DirectSignaler(this);
	this.onProgress = new hsl.haxe.DirectSignaler(this);
}}
web2grid.core.tools.AsyncOperation.__name__ = ["web2grid","core","tools","AsyncOperation"];
web2grid.core.tools.AsyncOperation.prototype.result = null;
web2grid.core.tools.AsyncOperation.prototype.error = null;
web2grid.core.tools.AsyncOperation.prototype.progress = null;
web2grid.core.tools.AsyncOperation.prototype.state = null;
web2grid.core.tools.AsyncOperation.prototype.starttime = null;
web2grid.core.tools.AsyncOperation.prototype.setResult = function(result) {
	if(this.state == web2grid.core.tools.AsyncState.Waiting) {
		this.result = result;
		this.state = web2grid.core.tools.AsyncState.Completed;
		this.progress = 100;
		this.onComplete.dispatch(result,null,{ fileName : "AsyncOperation.hx", lineNumber : 40, className : "web2grid.core.tools.AsyncOperation", methodName : "setResult"});
	}
	else {
		web2grid.core.log.Console.main.logError("Async operation result can only be set once!",null,null,{ fileName : "AsyncOperation.hx", lineNumber : 44, className : "web2grid.core.tools.AsyncOperation", methodName : "setResult"});
	}
}
web2grid.core.tools.AsyncOperation.prototype.setError = function(error) {
	if(this.state == web2grid.core.tools.AsyncState.Waiting) {
		this.error = error;
		this.state = web2grid.core.tools.AsyncState.Error;
		this.onError.dispatch(error,null,{ fileName : "AsyncOperation.hx", lineNumber : 54, className : "web2grid.core.tools.AsyncOperation", methodName : "setError"});
	}
	else {
		web2grid.core.log.Console.main.logError("Async operation error can only be set once!",null,null,{ fileName : "AsyncOperation.hx", lineNumber : 58, className : "web2grid.core.tools.AsyncOperation", methodName : "setError"});
	}
}
web2grid.core.tools.AsyncOperation.prototype.setProgress = function(progress) {
	if(progress > this.progress) {
		this.progress = progress;
		this.onProgress.dispatch(progress,null,{ fileName : "AsyncOperation.hx", lineNumber : 67, className : "web2grid.core.tools.AsyncOperation", methodName : "setProgress"});
	}
}
web2grid.core.tools.AsyncOperation.prototype.getElapsedTime = function() {
	return Date.fromTime(Date.now().getTime() - this.starttime.getTime());
}
web2grid.core.tools.AsyncOperation.prototype.onComplete = null;
web2grid.core.tools.AsyncOperation.prototype.onError = null;
web2grid.core.tools.AsyncOperation.prototype.onProgress = null;
web2grid.core.tools.AsyncOperation.prototype.isCompleted = function() {
	return this.state == web2grid.core.tools.AsyncState.Completed;
}
web2grid.core.tools.AsyncOperation.prototype.isError = function() {
	return this.state == web2grid.core.tools.AsyncState.Error;
}
web2grid.core.tools.AsyncOperation.prototype.getState = function() {
	return this.state;
}
web2grid.core.tools.AsyncOperation.prototype.getError = function() {
	if(this.state != web2grid.core.tools.AsyncState.Error) web2grid.core.log.Console.main.logWarning("Async operation has not completed yet.",null,null,{ fileName : "AsyncOperation.hx", lineNumber : 97, className : "web2grid.core.tools.AsyncOperation", methodName : "getError"});
	return this.error;
}
web2grid.core.tools.AsyncOperation.prototype.getProgress = function() {
	return this.progress;
}
web2grid.core.tools.AsyncOperation.prototype.getResult = function() {
	if(this.state != web2grid.core.tools.AsyncState.Completed) web2grid.core.log.Console.main.logWarning("Async operation has not completed yet.",null,null,{ fileName : "AsyncOperation.hx", lineNumber : 108, className : "web2grid.core.tools.AsyncOperation", methodName : "getResult"});
	return this.result;
}
web2grid.core.tools.AsyncOperation.prototype.__class__ = web2grid.core.tools.AsyncOperation;
web2grid.core.tools.AsyncOperation.__interfaces__ = [web2grid.core.tools.AsyncResult];
StringBuf = function(p) { if( p === $_ ) return; {
	this.b = new Array();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
web2grid.worksource.boinc.request.DataServerRequest = function(p) { if( p === $_ ) return; {
	null;
}}
web2grid.worksource.boinc.request.DataServerRequest.__name__ = ["web2grid","worksource","boinc","request","DataServerRequest"];
web2grid.worksource.boinc.request.DataServerRequest.prototype.clientversion = null;
web2grid.worksource.boinc.request.DataServerRequest.prototype.get_file_size = null;
web2grid.worksource.boinc.request.DataServerRequest.prototype.file_upload = null;
web2grid.worksource.boinc.request.DataServerRequest.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	var xml = indent + "<data_server_request>\n";
	var innerindent = indent + "    ";
	if(this.clientversion != null) xml += this.clientversion.toXmlString(innerindent);
	if(this.get_file_size != null) xml += innerindent + "<get_file_size>" + this.get_file_size + "</get_file_size>\n";
	if(this.file_upload != null) {
		xml += this.file_upload.toXmlString(innerindent);
	}
	else {
		xml += indent + "</data_server_request>\n";
	}
	return xml;
}
web2grid.worksource.boinc.request.DataServerRequest.prototype.__class__ = web2grid.worksource.boinc.request.DataServerRequest;
web2grid.worksource.boinc.request.DataServerRequest.__interfaces__ = [web2grid.worksource.boinc.BoincData];
web2grid.worksource.boinc.Platforms = { __ename__ : ["web2grid","worksource","boinc","Platforms"], __constructs__ : ["Unknown","Javascript"] }
web2grid.worksource.boinc.Platforms.Unknown = ["Unknown",0];
web2grid.worksource.boinc.Platforms.Unknown.toString = $estr;
web2grid.worksource.boinc.Platforms.Unknown.__enum__ = web2grid.worksource.boinc.Platforms;
web2grid.worksource.boinc.Platforms.Javascript = ["Javascript",1];
web2grid.worksource.boinc.Platforms.Javascript.toString = $estr;
web2grid.worksource.boinc.Platforms.Javascript.__enum__ = web2grid.worksource.boinc.Platforms;
web2grid.worksource.boinc.reply.Application = function(node) { if( node === $_ ) return; {
	if(node.hasNode.resolve("name")) this.name = node.node.resolve("name").getInnerData();
	if(node.hasNode.resolve("user_friendly_name")) this.user_friendly_name = node.node.resolve("user_friendly_name").getInnerData();
}}
web2grid.worksource.boinc.reply.Application.__name__ = ["web2grid","worksource","boinc","reply","Application"];
web2grid.worksource.boinc.reply.Application.prototype.name = null;
web2grid.worksource.boinc.reply.Application.prototype.user_friendly_name = null;
web2grid.worksource.boinc.reply.Application.prototype.version = null;
web2grid.worksource.boinc.reply.Application.prototype.__class__ = web2grid.worksource.boinc.reply.Application;
Hash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				
				for(var i in this.h)
					if( i == key ) return true;
			;
				return false;
			}
		}
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
	return a.iterator();
}
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it0 = it;
	while( $it0.hasNext() ) { var i = $it0.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
web2grid.worksource.boinc.PlatformNames = function() { }
web2grid.worksource.boinc.PlatformNames.__name__ = ["web2grid","worksource","boinc","PlatformNames"];
web2grid.worksource.boinc.PlatformNames.names = null;
web2grid.worksource.boinc.PlatformNames.toString = function(platform) {
	{ var $it0 = web2grid.worksource.boinc.PlatformNames.names.keys();
	while( $it0.hasNext() ) { var key = $it0.next();
	{
		if(web2grid.worksource.boinc.PlatformNames.names.get(key) == platform) return key;
	}
	}}
	return null;
}
web2grid.worksource.boinc.PlatformNames.fromString = function(name) {
	if(web2grid.worksource.boinc.PlatformNames.names.exists(name)) return web2grid.worksource.boinc.PlatformNames.names.get(name);
	else return web2grid.worksource.boinc.Platforms.Unknown;
}
web2grid.worksource.boinc.PlatformNames.prototype.__class__ = web2grid.worksource.boinc.PlatformNames;
if(!web2grid.js) web2grid.js = {}
web2grid.js.Event = function() { }
web2grid.js.Event.__name__ = ["web2grid","js","Event"];
web2grid.js.Event.prototype.__class__ = web2grid.js.Event;
web2grid.js.ProgressEvent = function() { }
web2grid.js.ProgressEvent.__name__ = ["web2grid","js","ProgressEvent"];
web2grid.js.ProgressEvent.prototype.lengthComputable = null;
web2grid.js.ProgressEvent.prototype.loaded = null;
web2grid.js.ProgressEvent.prototype.total = null;
web2grid.js.ProgressEvent.prototype.__class__ = web2grid.js.ProgressEvent;
web2grid.js.ProgressEvent.__interfaces__ = [web2grid.js.Event];
web2grid.js.EventTarget = function() { }
web2grid.js.EventTarget.__name__ = ["web2grid","js","EventTarget"];
web2grid.js.EventTarget.prototype.addEventListener = null;
web2grid.js.EventTarget.prototype.removeEventListener = null;
web2grid.js.EventTarget.prototype.dispatchEvent = null;
web2grid.js.EventTarget.prototype.__class__ = web2grid.js.EventTarget;
web2grid.js.XMLHttpRequestEventTarget = function() { }
web2grid.js.XMLHttpRequestEventTarget.__name__ = ["web2grid","js","XMLHttpRequestEventTarget"];
web2grid.js.XMLHttpRequestEventTarget.prototype.onloadstart = null;
web2grid.js.XMLHttpRequestEventTarget.prototype.onprogress = null;
web2grid.js.XMLHttpRequestEventTarget.prototype.onabort = null;
web2grid.js.XMLHttpRequestEventTarget.prototype.onerror = null;
web2grid.js.XMLHttpRequestEventTarget.prototype.onload = null;
web2grid.js.XMLHttpRequestEventTarget.prototype.ontimeout = null;
web2grid.js.XMLHttpRequestEventTarget.prototype.onloadend = null;
web2grid.js.XMLHttpRequestEventTarget.prototype.__class__ = web2grid.js.XMLHttpRequestEventTarget;
web2grid.js.XMLHttpRequestEventTarget.__interfaces__ = [web2grid.js.EventTarget];
web2grid.js.XMLHttpRequestUpload = function() { }
web2grid.js.XMLHttpRequestUpload.__name__ = ["web2grid","js","XMLHttpRequestUpload"];
web2grid.js.XMLHttpRequestUpload.prototype.__class__ = web2grid.js.XMLHttpRequestUpload;
web2grid.js.XMLHttpRequestUpload.__interfaces__ = [web2grid.js.XMLHttpRequestEventTarget];
web2grid.worksource.boinc.request.WorkRequest = function(required_seconds) { if( required_seconds === $_ ) return; {
	this.work_req_seconds = required_seconds;
}}
web2grid.worksource.boinc.request.WorkRequest.__name__ = ["web2grid","worksource","boinc","request","WorkRequest"];
web2grid.worksource.boinc.request.WorkRequest.prototype.work_req_seconds = null;
web2grid.worksource.boinc.request.WorkRequest.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	var xml = "";
	if(this.work_req_seconds != null) xml += indent + "<work_req_seconds>" + this.work_req_seconds + "</work_req_seconds>\n";
	return xml;
}
web2grid.worksource.boinc.request.WorkRequest.prototype.__class__ = web2grid.worksource.boinc.request.WorkRequest;
web2grid.worksource.boinc.request.WorkRequest.__interfaces__ = [web2grid.worksource.boinc.BoincData];
web2grid.worksource.boinc.reply.Workunit = function(node) { if( node === $_ ) return; {
	if(node.hasNode.resolve("name")) this.name = node.node.resolve("name").getInnerData();
	if(node.hasNode.resolve("app_name")) this.app_name = node.node.resolve("app_name").getInnerData();
	if(node.hasNode.resolve("command_line")) this.command_line = node.node.resolve("command_line").getInnerData();
	if(node.hasNode.resolve("rsc_fpops_est")) this.rsc_fpops_est = Std.parseFloat(node.node.resolve("rsc_fpops_est").getInnerData());
	if(node.hasNode.resolve("rsc_fpops_bound")) this.rsc_fpops_bound = Std.parseFloat(node.node.resolve("rsc_fpops_bound").getInnerData());
	if(node.hasNode.resolve("rsc_memory_bound")) this.rsc_memory_bound = Std.parseFloat(node.node.resolve("rsc_memory_bound").getInnerData());
	if(node.hasNode.resolve("rsc_disk_bound")) this.rsc_disk_bound = Std.parseFloat(node.node.resolve("rsc_disk_bound").getInnerData());
	this.file_ref = new Array();
	if(node.hasNode.resolve("file_ref")) { var $it0 = node.nodes.resolve("file_ref").iterator();
	while( $it0.hasNext() ) { var child = $it0.next();
	this.file_ref.push(new web2grid.worksource.boinc.reply.FileRef(child));
	}}
}}
web2grid.worksource.boinc.reply.Workunit.__name__ = ["web2grid","worksource","boinc","reply","Workunit"];
web2grid.worksource.boinc.reply.Workunit.prototype.name = null;
web2grid.worksource.boinc.reply.Workunit.prototype.app_name = null;
web2grid.worksource.boinc.reply.Workunit.prototype.command_line = null;
web2grid.worksource.boinc.reply.Workunit.prototype.rsc_fpops_est = null;
web2grid.worksource.boinc.reply.Workunit.prototype.rsc_fpops_bound = null;
web2grid.worksource.boinc.reply.Workunit.prototype.rsc_memory_bound = null;
web2grid.worksource.boinc.reply.Workunit.prototype.rsc_disk_bound = null;
web2grid.worksource.boinc.reply.Workunit.prototype.file_ref = null;
web2grid.worksource.boinc.reply.Workunit.prototype.application = null;
web2grid.worksource.boinc.reply.Workunit.prototype.result = null;
web2grid.worksource.boinc.reply.Workunit.prototype.__class__ = web2grid.worksource.boinc.reply.Workunit;
if(!web2grid.ui) web2grid.ui = {}
web2grid.ui.SVGUtilities = function() { }
web2grid.ui.SVGUtilities.__name__ = ["web2grid","ui","SVGUtilities"];
web2grid.ui.SVGUtilities.createSvgElement = function(tag,id,parent) {
	var x = document;
	var element = web2grid.ui.SVGUtilities.createElementNS(web2grid.ui.SVGUtilities.svgNS,tag);
	if(parent != null) parent.appendChild(element);
	if(id != null) element.setAttribute("id",id);
	return element;
}
web2grid.ui.SVGUtilities.createAnimationTransform = function(parent,id,type,begin,end,dur,repeat,freeze) {
	if(freeze == null) freeze = false;
	if(type == null) type = "rotate";
	var rotate = web2grid.ui.SVGUtilities.createSvgElement("animateTransform",id,parent);
	rotate.setAttribute("attributeName","transform");
	rotate.setAttribute("attributeType","XML");
	rotate.setAttribute("begin","indefinite");
	rotate.setAttribute("end","indefinite");
	rotate.setAttribute("type",type);
	rotate.setAttribute("repeatCount","indefinite");
	if(freeze) rotate.setAttribute("fill","freeze");
	if(begin != null) rotate.setAttribute("begin",begin);
	if(end != null) rotate.setAttribute("end",end);
	if(dur != null) rotate.setAttribute("dur",dur + "s");
	if(repeat != null) rotate.setAttribute("repeatCount",repeat + "");
	return rotate;
}
web2grid.ui.SVGUtilities.createAnimationRotateBy = function(parent,id,begin,end,dur,by,repeat,freeze) {
	if(freeze == null) freeze = false;
	var rotate = web2grid.ui.SVGUtilities.createAnimationTransform(parent,id,"rotate",begin,end,dur,repeat,freeze);
	if(by != null) rotate.setAttribute("by",by + "");
	return rotate;
}
web2grid.ui.SVGUtilities.createAnimationRotateFromTo = function(parent,id,begin,end,dur,from,to,repeat,freeze,additive) {
	if(freeze == null) freeze = false;
	var rotate = web2grid.ui.SVGUtilities.createAnimationTransform(parent,id,"rotate",begin,end,dur,repeat,freeze);
	if(from != null) rotate.setAttribute("from",from + "");
	if(to != null) rotate.setAttribute("to",to + "");
	if(additive != null) rotate.setAttribute("additive",additive);
	return rotate;
}
web2grid.ui.SVGUtilities.createAnimationTranslateBy = function(parent,id,begin,end,dur,by,repeat,freeze) {
	if(freeze == null) freeze = false;
	var translate = web2grid.ui.SVGUtilities.createAnimationTransform(parent,id,"translate",begin,end,dur,repeat,freeze);
	if(by != null) translate.setAttribute("by",by.x + ", " + by.y);
	return translate;
}
web2grid.ui.SVGUtilities.createAnimationTranslateFromTo = function(parent,id,begin,end,dur,from,to,repeat,freeze,additive) {
	if(freeze == null) freeze = false;
	var translate = web2grid.ui.SVGUtilities.createAnimationTransform(parent,id,"translate",begin,end,dur,repeat,freeze);
	if(from != null) translate.setAttribute("from",from.x + ", " + from.y);
	if(to != null) translate.setAttribute("to",to.x + ", " + to.y);
	if(additive != null) translate.setAttribute("additive",additive);
	return translate;
}
web2grid.ui.SVGUtilities.prototype.__class__ = web2grid.ui.SVGUtilities;
web2grid.ui.Animation = function() { }
web2grid.ui.Animation.__name__ = ["web2grid","ui","Animation"];
web2grid.ui.Animation.prototype.start = null;
web2grid.ui.Animation.prototype.stop = null;
web2grid.ui.Animation.prototype.isRunning = null;
web2grid.ui.Animation.prototype.onStartComplete = null;
web2grid.ui.Animation.prototype.onStopComplete = null;
web2grid.ui.Animation.prototype.__class__ = web2grid.ui.Animation;
web2grid.ui.WorkingAnimation = function(parent,animationId,deltaFi,deltaT,accelerationPeriod,accelerationGranularity) { if( parent === $_ ) return; {
	if(accelerationGranularity == null) accelerationGranularity = 10;
	if(accelerationPeriod == null) accelerationPeriod = 1.0;
	this.onStartComplete = new hsl.haxe.DirectSignaler(this);
	this.onStopComplete = new hsl.haxe.DirectSignaler(this);
	this.parent = parent;
	this.deltaFi = deltaFi;
	this.deltaT = deltaT;
	this.stopScheduled = false;
	this.running = false;
	this.accTime = 2 * accelerationPeriod * deltaT;
	var dur = this.accTime / (accelerationGranularity - 1);
	var beta = deltaFi / deltaT / accelerationGranularity;
	var alfa = beta;
	this.kezdes = web2grid.ui.SVGUtilities.createAnimationRotateFromTo(parent,animationId + "_kezdes",null,null,dur,0,alfa * dur,1,true);
	{
		var _g = 2;
		while(_g < accelerationGranularity) {
			var x = _g++;
			alfa += beta;
			web2grid.ui.SVGUtilities.createAnimationRotateBy(parent,null,animationId + "_kezdes.begin+" + (x - 1) * dur + "s",null,dur,alfa * dur,1,true);
		}
	}
	alfa += beta;
	this.forgas = web2grid.ui.SVGUtilities.createAnimationRotateBy(parent,animationId + "_forgas",animationId + "_kezdes.begin+" + (accelerationGranularity - 1) * dur + "s",null,deltaT,deltaFi,null,false);
	this.forgas.setAttribute("accumulate","sum");
	{
		var _g = 1;
		while(_g < accelerationGranularity) {
			var x = _g++;
			alfa -= beta;
			web2grid.ui.SVGUtilities.createAnimationRotateBy(parent,null,animationId + "_forgas.end+" + (x - 1) * dur + "s",null,dur,alfa * dur,1,true);
		}
	}
}}
web2grid.ui.WorkingAnimation.__name__ = ["web2grid","ui","WorkingAnimation"];
web2grid.ui.WorkingAnimation.prototype.onStartComplete = null;
web2grid.ui.WorkingAnimation.prototype.onStopComplete = null;
web2grid.ui.WorkingAnimation.prototype.parent = null;
web2grid.ui.WorkingAnimation.prototype.deltaFi = null;
web2grid.ui.WorkingAnimation.prototype.deltaT = null;
web2grid.ui.WorkingAnimation.prototype.accTime = null;
web2grid.ui.WorkingAnimation.prototype.kezdes = null;
web2grid.ui.WorkingAnimation.prototype.forgas = null;
web2grid.ui.WorkingAnimation.prototype.timer = null;
web2grid.ui.WorkingAnimation.prototype.stopScheduled = null;
web2grid.ui.WorkingAnimation.prototype.running = null;
web2grid.ui.WorkingAnimation.prototype.start = function() {
	if(this.running) return;
	this.running = true;
	web2grid.ui.SVGUtilities.startAnimation(this.kezdes);
	haxe.Timer.delay($closure(this,"startComplete"),Math.round(this.accTime * 1000));
}
web2grid.ui.WorkingAnimation.prototype.startComplete = function() {
	this.timer = new haxe.Timer(Math.round(this.deltaT * 1000));
	this.timer.run = $closure(this,"repeat");
	this.onStartComplete.dispatch(null,null,{ fileName : "Gears.hx", lineNumber : 260, className : "web2grid.ui.WorkingAnimation", methodName : "startComplete"});
}
web2grid.ui.WorkingAnimation.prototype.stop = function() {
	if(this.stopScheduled) return;
	this.stopScheduled = true;
}
web2grid.ui.WorkingAnimation.prototype.repeat = function() {
	if(this.stopScheduled) {
		web2grid.ui.SVGUtilities.stopAnimation(this.forgas);
		this.timer.stop();
		haxe.Timer.delay($closure(this,"stopComplete"),Math.round(this.accTime * 1000));
	}
}
web2grid.ui.WorkingAnimation.prototype.stopComplete = function() {
	this.stopScheduled = false;
	this.running = false;
	this.onStopComplete.dispatch(null,null,{ fileName : "Gears.hx", lineNumber : 284, className : "web2grid.ui.WorkingAnimation", methodName : "stopComplete"});
}
web2grid.ui.WorkingAnimation.prototype.isRunning = function() {
	return this.running;
}
web2grid.ui.WorkingAnimation.prototype.__class__ = web2grid.ui.WorkingAnimation;
web2grid.ui.WorkingAnimation.__interfaces__ = [web2grid.ui.Animation];
web2grid.ui.ErrorAnimation = function(parent,animationId,deltaFi,deltaT) { if( parent === $_ ) return; {
	this.onStartComplete = new hsl.haxe.DirectSignaler(this);
	this.onStopComplete = new hsl.haxe.DirectSignaler(this);
	this.parent = parent;
	this.deltaFi = deltaFi;
	this.deltaT = deltaT;
	this.stopScheduled = false;
	this.running = false;
	this.kezdes = web2grid.ui.SVGUtilities.createAnimationRotateFromTo(parent,animationId + "_kezdes",null,null,0.2 * deltaT,0,0,1,true);
	web2grid.ui.SVGUtilities.createAnimationRotateBy(parent,null,animationId + "_kezdes.end",null,0.01 * deltaT,0.05 * deltaFi,1,true);
	web2grid.ui.SVGUtilities.createAnimationRotateBy(parent,null,animationId + "_kezdes.end+" + 0.01 * deltaT + "s",null,0.1 * deltaT,0.8 * deltaFi,1,true);
	web2grid.ui.SVGUtilities.createAnimationRotateBy(parent,null,animationId + "_kezdes.end+" + 0.11 * deltaT + "s",null,0.04 * deltaT,0.15 * deltaFi,1,true);
	web2grid.ui.SVGUtilities.createAnimationRotateBy(parent,null,animationId + "_kezdes.end+" + 0.25 * deltaT + "s",null,0.45 * deltaT,-1 * deltaFi,1,true);
}}
web2grid.ui.ErrorAnimation.__name__ = ["web2grid","ui","ErrorAnimation"];
web2grid.ui.ErrorAnimation.prototype.onStartComplete = null;
web2grid.ui.ErrorAnimation.prototype.onStopComplete = null;
web2grid.ui.ErrorAnimation.prototype.parent = null;
web2grid.ui.ErrorAnimation.prototype.deltaFi = null;
web2grid.ui.ErrorAnimation.prototype.deltaT = null;
web2grid.ui.ErrorAnimation.prototype.kezdes = null;
web2grid.ui.ErrorAnimation.prototype.timer = null;
web2grid.ui.ErrorAnimation.prototype.stopScheduled = null;
web2grid.ui.ErrorAnimation.prototype.running = null;
web2grid.ui.ErrorAnimation.prototype.start = function() {
	if(this.running) return;
	this.running = true;
	web2grid.ui.SVGUtilities.startAnimation(this.kezdes);
	this.onStartComplete.dispatch(null,null,{ fileName : "Gears.hx", lineNumber : 386, className : "web2grid.ui.ErrorAnimation", methodName : "start"});
	this.timer = new haxe.Timer(Math.round(this.deltaT * 1000));
	this.timer.run = $closure(this,"repeat");
}
web2grid.ui.ErrorAnimation.prototype.stop = function() {
	if(this.stopScheduled) return;
	this.stopScheduled = true;
}
web2grid.ui.ErrorAnimation.prototype.repeat = function() {
	if(!this.stopScheduled) {
		web2grid.ui.SVGUtilities.startAnimation(this.kezdes);
	}
	else {
		this.stopScheduled = false;
		this.running = false;
		this.timer.stop();
		this.onStopComplete.dispatch(null,null,{ fileName : "Gears.hx", lineNumber : 410, className : "web2grid.ui.ErrorAnimation", methodName : "repeat"});
	}
}
web2grid.ui.ErrorAnimation.prototype.isRunning = function() {
	return this.running;
}
web2grid.ui.ErrorAnimation.prototype.__class__ = web2grid.ui.ErrorAnimation;
web2grid.ui.ErrorAnimation.__interfaces__ = [web2grid.ui.Animation];
web2grid.ui.MoveAwayAnimation = function(parent,animationId,center,from,by,deltaT) { if( parent === $_ ) return; {
	this.onStartComplete = new hsl.haxe.DirectSignaler(this);
	this.onStopComplete = new hsl.haxe.DirectSignaler(this);
	this.parent = parent;
	this.deltaT = deltaT;
	this.stopScheduled = false;
	this.running = false;
	var deltaX = center.x - from.x;
	var deltaY = center.y - from.y;
	var to = { x : center.x + deltaX * by, y : center.y + deltaY * by};
	this.kezdes = web2grid.ui.SVGUtilities.createAnimationTranslateFromTo(parent,animationId + "_kezdes",null,null,deltaT * 0.5,center,{ x : center.x + deltaX * by * 0.8, y : center.y + deltaY * by * 0.8},1,true);
	web2grid.ui.SVGUtilities.createAnimationTranslateBy(parent,null,animationId + "_kezdes.end",null,deltaT * 0.5,{ x : deltaX * by * 0.2, y : deltaY * by * 0.2},1,true);
	this.befejezes = web2grid.ui.SVGUtilities.createAnimationTranslateFromTo(parent,animationId + "_befejezes",null,null,deltaT * 0.5,to,{ x : center.x + deltaX * by * 0.2, y : center.y + deltaY * by * 0.2},1,true);
	web2grid.ui.SVGUtilities.createAnimationTranslateBy(parent,null,animationId + "_befejezes.end",null,deltaT * 0.5,{ x : deltaX * by * -0.2, y : deltaY * by * -0.2},1,true);
}}
web2grid.ui.MoveAwayAnimation.__name__ = ["web2grid","ui","MoveAwayAnimation"];
web2grid.ui.MoveAwayAnimation.prototype.onStartComplete = null;
web2grid.ui.MoveAwayAnimation.prototype.onStopComplete = null;
web2grid.ui.MoveAwayAnimation.prototype.parent = null;
web2grid.ui.MoveAwayAnimation.prototype.deltaT = null;
web2grid.ui.MoveAwayAnimation.prototype.stopScheduled = null;
web2grid.ui.MoveAwayAnimation.prototype.running = null;
web2grid.ui.MoveAwayAnimation.prototype.kezdes = null;
web2grid.ui.MoveAwayAnimation.prototype.befejezes = null;
web2grid.ui.MoveAwayAnimation.prototype.start = function() {
	if(this.running) return;
	this.running = true;
	web2grid.ui.SVGUtilities.startAnimation(this.kezdes);
	haxe.Timer.delay($closure(this,"startComplete"),Math.round(1000 * this.deltaT));
}
web2grid.ui.MoveAwayAnimation.prototype.startComplete = function() {
	this.onStartComplete.dispatch(null,null,{ fileName : "Gears.hx", lineNumber : 510, className : "web2grid.ui.MoveAwayAnimation", methodName : "startComplete"});
}
web2grid.ui.MoveAwayAnimation.prototype.stop = function() {
	if(this.stopScheduled) return;
	this.stopScheduled = true;
	web2grid.ui.SVGUtilities.startAnimation(this.befejezes);
	haxe.Timer.delay($closure(this,"stopComplete"),Math.round(1000 * this.deltaT));
}
web2grid.ui.MoveAwayAnimation.prototype.stopComplete = function() {
	this.running = false;
	this.stopScheduled = false;
	this.onStopComplete.dispatch(null,null,{ fileName : "Gears.hx", lineNumber : 526, className : "web2grid.ui.MoveAwayAnimation", methodName : "stopComplete"});
}
web2grid.ui.MoveAwayAnimation.prototype.isRunning = function() {
	return this.running;
}
web2grid.ui.MoveAwayAnimation.prototype.__class__ = web2grid.ui.MoveAwayAnimation;
web2grid.ui.MoveAwayAnimation.__interfaces__ = [web2grid.ui.Animation];
web2grid.ui.Gears = function(parent) { if( parent === $_ ) return; {
	this.svg = web2grid.ui.SVGUtilities.createSvgElement("svg","svg",parent);
	this.svg.setAttribute("xmlns",web2grid.ui.SVGUtilities.svgNS);
	this.svg.setAttribute("version","1.1");
	this.svg.setAttribute("viewBox","0 0 295 240");
	this.svg.setAttribute("style","width: 100%; height: 100%;");
	this.nagykerek = web2grid.ui.SVGUtilities.createSvgElement("g","nagykerek",this.svg);
	this.nagykerek.setAttribute("transform","translate(101.7705, 146.70815)");
	this.nagykerek.setAttribute("fill","rgb(33, 68, 120)");
	this.nagykerek_fogak = web2grid.ui.SVGUtilities.createSvgElement("path","nagykerek_fogak",this.nagykerek);
	this.nagykerek_fogak.setAttribute("d","m 71.16418181818182, 0 c -0.124,-2.59 -0.196,-5.188 -0.44,-7.771 4.03603,-1.926 8.03403,-4.117 11.97003,-6.569 -1.019,-6.285 -2.946,-12.403 -5.309,-18.315 -4.663,0.074 -9.24803,0.404 -13.71703,0.978 -1.056,-2.387 -2.505,-4.555 -3.842,-6.785 -1.328,-2.238 -3.022,-4.227 -4.551,-6.326 2.408,-3.854 4.52,-7.806 6.506,-11.998 -4.231,-4.735 -9.153,-8.802 -14.323,-12.481 -3.847,2.527 -7.562,5.328 -11.009,8.215 -2.184,-1.422 -4.548,-2.518 -6.898,-3.638 -2.31,-1.212 -4.834,-1.93 -7.262,-2.866 -0.039,-4.611 -0.42,-9.024 -1.024,-13.627 -6.142,-1.712 -12.511,-2.489 -18.825,-2.702 -1.86,4.152 -3.457,8.455 -4.791,12.823 -2.593,0.126 -5.188,0.205 -7.754,0.681 -2.582,0.346 -5.141,0.801 -7.65,1.525 -2.489,-3.736 -5.277,-7.53 -8.24,-10.982 -6.025,2.055 -11.918,4.59 -17.314,7.955 0.729,4.585 1.631,8.953 2.876,13.348 -2.055,1.587 -4.255,3.003 -6.141,4.793 -1.921,1.749 -3.896,3.443 -5.587,5.424 -4.12,-1.805 -8.451,-3.439 -12.869,-4.803 -3.924,4.984 -7.511,10.273 -10.254,16.025 3.078,3.467 6.247,6.684 9.606,9.689 -0.878,2.448 -1.896,4.859 -2.582,7.369 -0.599,2.531 -1.454,5.016 -1.762,7.604 -4.437,0.718 -8.911,1.701 -13.397,2.951 -0.689,6.309 -0.69,12.659 0,18.968 4.487,1.249 8.961,2.233 13.398,2.951 0.308,2.587 1.163,5.072 1.762,7.603 0.688,2.51 1.705,4.921 2.583,7.37 -3.359,3.006 -6.528,6.222 -9.606,9.689 2.743,5.751 6.33,11.04 10.254,16.024 4.418,-1.364 8.748,-2.998 12.869,-4.804 1.689,1.98 3.665,3.675 5.586,5.423 1.886,1.791 4.087,3.207 6.141,4.794 -1.245,4.396 -2.146,8.763 -2.876,13.348 5.397,3.365 11.289,5.901 17.315,7.956 2.963,-3.453 5.751,-7.246 8.24,-10.982 2.509,0.724 5.068,1.18 7.649,1.524 2.567,0.477 5.162,0.556 7.755,0.681 1.335,4.369 2.931,8.672 4.792,12.823 6.313,-0.213 12.683,-0.99 18.824,-2.7 0.604,-4.603 0.985,-9.016 1.024,-13.627 2.427,-0.937 4.951,-1.654 7.26,-2.866 2.352,-1.12 4.716,-2.217 6.899,-3.638 3.448,2.886 7.163,5.687 11.009,8.213 5.17,-3.68 10.092,-7.746 14.322,-12.481 -1.986,-4.192 -4.098,-8.144 -6.506,-11.998 1.527,-2.099 3.223,-4.087 4.55,-6.325 1.337,-2.23 2.786,-4.398 3.842,-6.785 4.469,0.572 9.05403,0.902 13.71703,0.977 2.362,-5.912 4.29,-12.029 5.309,-18.314 -3.936,-2.452 -7.934,-4.645 -11.97003,-6.57 0.245,-2.584 0.317,-5.181 0.441,-7.771 z m -54.17,37.239 c -7.036,3.196 -15.099,4.483 -22.834,3.257 -7.72,-1.029 -15.05,-4.45 -20.954,-9.561 -5.93,-5.107 -10.292,-11.945 -12.496,-19.391 -2.194,-7.453 -2.194,-15.637 -10e-4,-23.09 2.204,-7.444 6.566,-14.282 12.495,-19.391 5.904,-5.109 13.234,-8.53 20.954,-9.559 7.736,-1.227 15.8,0.061 22.836,3.256 7.09,3.205 13.23,8.564 17.45,15.119 4.275,6.562 6.42,14.271 6.531,22.119 -0.111,7.847 -2.257,15.555 -6.531,22.119 -4.221,6.557 -10.361,11.917 -17.45,15.122 z");
	this.nagykerek_kor = web2grid.ui.SVGUtilities.createSvgElement("path","nagykerek_kor",this.nagykerek);
	this.nagykerek_kor.setAttribute("d","m 31.605454545454542, -20.291363636363712 c -3.873,-6.014 -9.515,-10.939 -16.015,-13.876 -6.445,-2.924 -13.847,-4.118 -20.954,-2.983 -7.08,0.939 -13.795,4.077 -19.219,8.768 -5.445,4.689 -9.444,10.968 -11.466,17.789 -2.012,6.825 -2.012,14.363 0,21.188 2.022,6.82 6.021,13.099 11.468,17.79 5.424,4.689 12.139,7.828 19.218,8.768 7.106,1.135 14.508,-0.061 20.952,-2.984 6.5,-2.937 12.143,-7.863 16.016,-13.878 3.925,-6.026 5.879,-13.077 5.993,-20.29 -0.114,-7.216 -2.068,-14.267 -5.993,-20.292 z m -19.167,47.568 c -5.116,2.316 -11.035,3.305 -16.73,2.374 -5.645,-0.739 -10.978,-3.241 -15.324,-6.991 -4.362,-3.754 -7.548,-8.776 -9.161,-14.197 -1.603,-5.418 -1.604,-11.507 0,-16.926 1.612,-5.42 4.798,-10.442 9.16,-14.196 4.346,-3.749 9.679,-6.252 15.323,-6.99 5.696,-0.931 11.616,0.058 16.733,2.373 5.179,2.332 9.703,6.286 12.796,11.088 3.141,4.819 4.666,10.394 4.786,16.188 -0.12,5.793 -1.646,11.369 -4.786,16.188 -3.094,4.802 -7.618,8.757 -12.797,11.089 z");
	this.kiskerek = web2grid.ui.SVGUtilities.createSvgElement("g","kiskerek",this.svg);
	this.kiskerek.setAttribute("transform","translate(206.59101, 66.508813) rotate(-1.3)");
	this.kiskerek.setAttribute("fill","rgb(212, 85, 0)");
	this.kiskerek_fogak = web2grid.ui.SVGUtilities.createSvgElement("path","kiskerek_fogak",this.kiskerek);
	this.kiskerek_fogak.setAttribute("d","m 20.453166666666664, 32.8398333333333 c 2.4014,-1.49074 4.591,-3.27998 6.652,-5.2091 1.9677,-2.0235 3.7986,-4.17822 5.3353,-6.55139 6.5013,1.6768 13.4302,2.37539 20.5484,1.97331 1.8798,-4.42526 3.311,-9.057 4.0252,-13.80073 -5.6622,-4.70545 -11.8975,-8.25318 -18.3737,-10.54227 -0.029,-2.82268 -0.5101,-5.62697 -1.1885,-8.36024 -0.6724,-2.74383 -1.7366,-5.3701 -2.9575,-7.91523 4.6303,-4.75503 8.7681,-10.46543 11.9354,-16.79464 -2.8244,-3.89058 -6.1999,-7.30433 -9.8607,-10.38809 -6.952,2.56429 -13.1495,6.20119 -18.3447,10.59654 -2.5197,-1.26899 -5.1262,-2.38427 -7.8549,-3.1099 -2.72,-0.73008 -5.5149,-1.26571 -8.336,-1.34884 -1.7952,-6.53255 -4.6623,-12.79958 -8.5386,-18.79105 -4.7757,0.49425 -9.46,1.70774 -13.9762,3.36343 -1.2532,7.30089 -1.2061,14.4789 0.03,21.19769 -2.4015,1.49074 -4.5917,3.28076 -6.6513,5.20974 -1.9685,2.02286 -3.7993,4.17758 -5.33683,6.55012 -6.50133,-1.6768 -13.431,-2.37602 -20.54775,-1.97408 -1.8798,4.42525 -3.31179,9.05636 -4.02654,13.80228 5.66228,4.70544 11.89754,8.25318 18.37371,10.54226 0.0293,2.82268 0.51017,5.62698 1.18779,8.35961 0.67312,2.74447 1.73732,5.37073 2.95887,7.91509 -4.63035,4.75503 -8.76733,10.46606 -11.93465,16.79527 2.82517,3.89121 6.19982,7.30292 9.86059,10.38668 6.95121,-2.56492 13.14871,-6.20181 18.34391,-10.59717 2.5205,1.26963 5.1262,2.38427 7.8564,3.10977 2.7192,0.73084 5.5141,1.26647 8.3361,1.35024 1.7937,6.53269 4.6608,12.79972 8.5371,18.7912 4.7758,-0.49426 9.4601,-1.70775 13.977,-3.36281 1.2524,-7.30152 1.2054,-14.47953 -0.03,-21.19769 z m -8.9204,-21.08438 c -4.1429,3.99109 -10.3421,5.75128 -15.9563,4.07628 -5.5097,-1.44104 -10.1567,-6.17677 -11.4906,-11.71242 -1.5665,-5.64444 0.3118,-11.80927 4.3825,-15.87483 4.1442,-3.99264 10.3421,-5.75128 15.9556,-4.07691 5.5089,1.44041 10.155,6.1755 11.4883,11.71192 1.5694,5.64416 -0.3136,11.813 -4.3795,15.87596 z");
	this.states = new Hash();
	this.currentState = "idle";
	this.nextState = null;
	this.states.set("idle",new haxe.FastList());
	this.states.set("working",new haxe.FastList());
	this.states.get("working").add(new web2grid.ui.WorkingAnimation(this.nagykerek_fogak,"nagykerek_working",-32.7272727,0.5,0.5));
	this.states.get("working").add(new web2grid.ui.WorkingAnimation(this.kiskerek_fogak,"kiskerek_working",60,0.5,0.5));
	this.states.set("error",new haxe.FastList());
	this.states.get("error").add(new web2grid.ui.ErrorAnimation(this.nagykerek_fogak,"nagykerek_error",-16.36363635,2.5));
	this.states.get("error").add(new web2grid.ui.ErrorAnimation(this.kiskerek_fogak,"kiskerek_error",0.5 * 60,2.5));
	this.states.set("suspend",new haxe.FastList());
	this.states.get("suspend").add(new web2grid.ui.MoveAwayAnimation(this.kiskerek_fogak,"kiskerek_suspend",{ x : 0.0, y : 0.0},{ x : 101.7705 - 206.59101, y : 146.70815 - 66.508813},0.1,0.3));
	{ var $it0 = this.states.iterator();
	while( $it0.hasNext() ) { var l = $it0.next();
	{
		{ var $it1 = l.iterator();
		while( $it1.hasNext() ) { var a = $it1.next();
		{
			a.onStopComplete.bindVoid((function(f,a1,a2) {
				return function() {
					return f(a1,a2);
				}
			})($closure(this,"schedule"),null,true));
		}
		}}
	}
	}}
}}
web2grid.ui.Gears.__name__ = ["web2grid","ui","Gears"];
web2grid.ui.Gears.prototype.svg = null;
web2grid.ui.Gears.prototype.nagykerek = null;
web2grid.ui.Gears.prototype.nagykerek_fogak = null;
web2grid.ui.Gears.prototype.nagykerek_kor = null;
web2grid.ui.Gears.prototype.kiskerek = null;
web2grid.ui.Gears.prototype.kiskerek_fogak = null;
web2grid.ui.Gears.prototype.states = null;
web2grid.ui.Gears.prototype.currentState = null;
web2grid.ui.Gears.prototype.nextState = null;
web2grid.ui.Gears.prototype.schedule = function(newState,animationEnded) {
	if(animationEnded == null) animationEnded = false;
	if(newState != null) {
		this.nextState = newState;
		{ var $it0 = this.states.get(this.currentState).iterator();
		while( $it0.hasNext() ) { var a = $it0.next();
		{
			a.stop();
		}
		}}
	}
	if(animationEnded) {
		var allEnded = true;
		{ var $it1 = this.states.get(this.currentState).iterator();
		while( $it1.hasNext() ) { var a = $it1.next();
		{
			if(a.isRunning()) allEnded = false;
		}
		}}
		if(allEnded) this.currentState = "idle";
	}
	if(this.currentState == "idle" && this.nextState != null) {
		this.currentState = this.nextState;
		this.nextState = null;
		{ var $it2 = this.states.get(this.currentState).iterator();
		while( $it2.hasNext() ) { var a = $it2.next();
		{
			a.start();
		}
		}}
	}
}
web2grid.ui.Gears.prototype.working = function() {
	if(this.currentState != "working") this.schedule("working");
}
web2grid.ui.Gears.prototype.idle = function() {
	if(this.currentState != "idle") this.schedule("idle");
}
web2grid.ui.Gears.prototype.error = function() {
	if(this.currentState != "error") this.schedule("error");
}
web2grid.ui.Gears.prototype.suspend = function() {
	if(this.currentState != "suspend") this.schedule("suspend");
}
web2grid.ui.Gears.prototype.__class__ = web2grid.ui.Gears;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
DateTools = function() { }
DateTools.__name__ = ["DateTools"];
DateTools.__format_get = function(d,e) {
	return (function($this) {
		var $r;
		switch(e) {
		case "%":{
			$r = "%";
		}break;
		case "C":{
			$r = StringTools.lpad(Std.string(Std["int"](d.getFullYear() / 100)),"0",2);
		}break;
		case "d":{
			$r = StringTools.lpad(Std.string(d.getDate()),"0",2);
		}break;
		case "D":{
			$r = DateTools.__format(d,"%m/%d/%y");
		}break;
		case "e":{
			$r = Std.string(d.getDate());
		}break;
		case "H":case "k":{
			$r = StringTools.lpad(Std.string(d.getHours()),e == "H"?"0":" ",2);
		}break;
		case "I":case "l":{
			$r = (function($this) {
				var $r;
				var hour = d.getHours() % 12;
				$r = StringTools.lpad(Std.string(hour == 0?12:hour),e == "I"?"0":" ",2);
				return $r;
			}($this));
		}break;
		case "m":{
			$r = StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
		}break;
		case "M":{
			$r = StringTools.lpad(Std.string(d.getMinutes()),"0",2);
		}break;
		case "n":{
			$r = "\n";
		}break;
		case "p":{
			$r = d.getHours() > 11?"PM":"AM";
		}break;
		case "r":{
			$r = DateTools.__format(d,"%I:%M:%S %p");
		}break;
		case "R":{
			$r = DateTools.__format(d,"%H:%M");
		}break;
		case "s":{
			$r = Std.string(Std["int"](d.getTime() / 1000));
		}break;
		case "S":{
			$r = StringTools.lpad(Std.string(d.getSeconds()),"0",2);
		}break;
		case "t":{
			$r = "\t";
		}break;
		case "T":{
			$r = DateTools.__format(d,"%H:%M:%S");
		}break;
		case "u":{
			$r = (function($this) {
				var $r;
				var t = d.getDay();
				$r = t == 0?"7":Std.string(t);
				return $r;
			}($this));
		}break;
		case "w":{
			$r = Std.string(d.getDay());
		}break;
		case "y":{
			$r = StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
		}break;
		case "Y":{
			$r = Std.string(d.getFullYear());
		}break;
		default:{
			$r = (function($this) {
				var $r;
				throw "Date.format %" + e + "- not implemented yet.";
				return $r;
			}($this));
		}break;
		}
		return $r;
	}(this));
}
DateTools.__format = function(d,f) {
	var r = new StringBuf();
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) break;
		r.b[r.b.length] = f.substr(p,np - p);
		r.b[r.b.length] = DateTools.__format_get(d,f.substr(np + 1,1));
		p = np + 2;
	}
	r.b[r.b.length] = f.substr(p,f.length - p);
	return r.b.join("");
}
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
}
DateTools.delta = function(d,t) {
	return Date.fromTime(d.getTime() + t);
}
DateTools.getMonthDays = function(d) {
	var month = d.getMonth();
	var year = d.getFullYear();
	if(month != 1) return DateTools.DAYS_OF_MONTH[month];
	var isB = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
	return isB?29:28;
}
DateTools.seconds = function(n) {
	return n * 1000.0;
}
DateTools.minutes = function(n) {
	return n * 60.0 * 1000.0;
}
DateTools.hours = function(n) {
	return n * 60.0 * 60.0 * 1000.0;
}
DateTools.days = function(n) {
	return n * 24.0 * 60.0 * 60.0 * 1000.0;
}
DateTools.parse = function(t) {
	var s = t / 1000;
	var m = s / 60;
	var h = m / 60;
	return { ms : t % 1000, seconds : Std["int"](s % 60), minutes : Std["int"](m % 60), hours : Std["int"](h % 24), days : Std["int"](h / 24)};
}
DateTools.make = function(o) {
	return o.ms + 1000.0 * (o.seconds + 60.0 * (o.minutes + 60.0 * (o.hours + 24.0 * o.days)));
}
DateTools.prototype.__class__ = DateTools;
web2grid.worksource.boinc.reply.Message = function(node) { if( node === $_ ) return; {
	if(node.has.resolve("priority")) this.priority = node.att.resolve("priority");
	this.message = node.getInnerData();
}}
web2grid.worksource.boinc.reply.Message.__name__ = ["web2grid","worksource","boinc","reply","Message"];
web2grid.worksource.boinc.reply.Message.prototype.priority = null;
web2grid.worksource.boinc.reply.Message.prototype.message = null;
web2grid.worksource.boinc.reply.Message.prototype.__class__ = web2grid.worksource.boinc.reply.Message;
web2grid.core.work.WorkOutput = function(p) { if( p === $_ ) return; {
	this.outputfiles = new Hash();
	this.exitstatus = 0;
	this.elapsedtime = 0;
}}
web2grid.core.work.WorkOutput.__name__ = ["web2grid","core","work","WorkOutput"];
web2grid.core.work.WorkOutput.prototype.outputfiles = null;
web2grid.core.work.WorkOutput.prototype.exitstatus = null;
web2grid.core.work.WorkOutput.prototype.elapsedtime = null;
web2grid.core.work.WorkOutput.prototype.setExitStatus = function(value) {
	this.exitstatus = value;
}
web2grid.core.work.WorkOutput.prototype.write = function(name,content) {
	if(this.outputfiles.exists(name)) {
		this.outputfiles.set(name,this.outputfiles.get(name) + content);
	}
	else {
		this.outputfiles.set(name,content);
	}
}
web2grid.core.work.WorkOutput.prototype.addElapsedTime = function(time) {
	this.elapsedtime += time;
}
web2grid.core.work.WorkOutput.prototype.copy = function() {
	var result = new web2grid.core.work.WorkOutput();
	{ var $it0 = this.outputfiles.keys();
	while( $it0.hasNext() ) { var key = $it0.next();
	{
		result.write(key,this.getFileContent(key));
	}
	}}
	result.exitstatus = this.exitstatus;
	result.elapsedtime = this.elapsedtime;
	return result;
}
web2grid.core.work.WorkOutput.prototype.getExitStatus = function() {
	return this.exitstatus;
}
web2grid.core.work.WorkOutput.prototype.getFileList = function() {
	var list = new Array();
	{ var $it0 = this.outputfiles.keys();
	while( $it0.hasNext() ) { var key = $it0.next();
	{
		list.push(key);
	}
	}}
	return list;
}
web2grid.core.work.WorkOutput.prototype.getFileContent = function(name) {
	return this.outputfiles.get(name);
}
web2grid.core.work.WorkOutput.prototype.getElapsedTime = function() {
	return Math.round(this.elapsedtime * 100) / 100;
}
web2grid.core.work.WorkOutput.prototype.__class__ = web2grid.core.work.WorkOutput;
web2grid.core.work.WorkOutput.__interfaces__ = [web2grid.core.iface.WorkResult];
web2grid.worksource.boinc.reply.FileInfo = function(node) { if( node === $_ ) return; {
	if(node.hasNode.resolve("name")) this.name = node.node.resolve("name").getInnerData();
	this.generated_locally = node.hasNode.resolve("generated_locally");
	this.upload_when_present = node.hasNode.resolve("upload_when_present");
	this.executable = node.hasNode.resolve("executable");
	if(node.hasNode.resolve("nbytes")) this.nbytes = Std.parseInt(node.node.resolve("nbytes").getInnerData());
	if(node.hasNode.resolve("max_nbytes")) this.max_nbytes = Std.parseInt(node.node.resolve("max_nbytes").getInnerData());
	if(node.hasNode.resolve("url")) this.url = node.node.resolve("url").getInnerData();
	if(node.hasNode.resolve("md5_cksum")) this.md5_cksum = node.node.resolve("md5_cksum").getInnerData();
	if(node.hasNode.resolve("xml_signature")) this.xml_signature = node.node.resolve("xml_signature").getInnerData();
	if(node.hasNode.resolve("file_signature")) this.file_signature = node.node.resolve("file_signature").getInnerData();
}}
web2grid.worksource.boinc.reply.FileInfo.__name__ = ["web2grid","worksource","boinc","reply","FileInfo"];
web2grid.worksource.boinc.reply.FileInfo.prototype.name = null;
web2grid.worksource.boinc.reply.FileInfo.prototype.generated_locally = null;
web2grid.worksource.boinc.reply.FileInfo.prototype.upload_when_present = null;
web2grid.worksource.boinc.reply.FileInfo.prototype.executable = null;
web2grid.worksource.boinc.reply.FileInfo.prototype.nbytes = null;
web2grid.worksource.boinc.reply.FileInfo.prototype.max_nbytes = null;
web2grid.worksource.boinc.reply.FileInfo.prototype.url = null;
web2grid.worksource.boinc.reply.FileInfo.prototype.md5_cksum = null;
web2grid.worksource.boinc.reply.FileInfo.prototype.xml_signature = null;
web2grid.worksource.boinc.reply.FileInfo.prototype.file_signature = null;
web2grid.worksource.boinc.reply.FileInfo.prototype.__class__ = web2grid.worksource.boinc.reply.FileInfo;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
web2grid.worksource.boinc.BoincResultState = { __ename__ : ["web2grid","worksource","boinc","BoincResultState"], __constructs__ : ["New","CheckingStatus","ReadyToUpload","Uploading","Uploaded","Error"] }
web2grid.worksource.boinc.BoincResultState.New = ["New",0];
web2grid.worksource.boinc.BoincResultState.New.toString = $estr;
web2grid.worksource.boinc.BoincResultState.New.__enum__ = web2grid.worksource.boinc.BoincResultState;
web2grid.worksource.boinc.BoincResultState.CheckingStatus = ["CheckingStatus",1];
web2grid.worksource.boinc.BoincResultState.CheckingStatus.toString = $estr;
web2grid.worksource.boinc.BoincResultState.CheckingStatus.__enum__ = web2grid.worksource.boinc.BoincResultState;
web2grid.worksource.boinc.BoincResultState.ReadyToUpload = ["ReadyToUpload",2];
web2grid.worksource.boinc.BoincResultState.ReadyToUpload.toString = $estr;
web2grid.worksource.boinc.BoincResultState.ReadyToUpload.__enum__ = web2grid.worksource.boinc.BoincResultState;
web2grid.worksource.boinc.BoincResultState.Uploading = ["Uploading",3];
web2grid.worksource.boinc.BoincResultState.Uploading.toString = $estr;
web2grid.worksource.boinc.BoincResultState.Uploading.__enum__ = web2grid.worksource.boinc.BoincResultState;
web2grid.worksource.boinc.BoincResultState.Uploaded = ["Uploaded",4];
web2grid.worksource.boinc.BoincResultState.Uploaded.toString = $estr;
web2grid.worksource.boinc.BoincResultState.Uploaded.__enum__ = web2grid.worksource.boinc.BoincResultState;
web2grid.worksource.boinc.BoincResultState.Error = ["Error",5];
web2grid.worksource.boinc.BoincResultState.Error.toString = $estr;
web2grid.worksource.boinc.BoincResultState.Error.__enum__ = web2grid.worksource.boinc.BoincResultState;
web2grid.worksource.boinc.BoincResult = function(source,workunit,slot,fileref,data) { if( source === $_ ) return; {
	this.source = source;
	this.workunit = workunit;
	this.slot = slot;
	this.fileref = fileref;
	this.data = data;
	this.md5 = haxe.Md5.encode(data);
	this.state = web2grid.worksource.boinc.BoincResultState.New;
	this.accepted = false;
}}
web2grid.worksource.boinc.BoincResult.__name__ = ["web2grid","worksource","boinc","BoincResult"];
web2grid.worksource.boinc.BoincResult.prototype.state = null;
web2grid.worksource.boinc.BoincResult.prototype.source = null;
web2grid.worksource.boinc.BoincResult.prototype.workunit = null;
web2grid.worksource.boinc.BoincResult.prototype.slot = null;
web2grid.worksource.boinc.BoincResult.prototype.fileref = null;
web2grid.worksource.boinc.BoincResult.prototype.data = null;
web2grid.worksource.boinc.BoincResult.prototype.md5 = null;
web2grid.worksource.boinc.BoincResult.prototype.accepted = null;
web2grid.worksource.boinc.BoincResult.prototype.statusCheckOperation = null;
web2grid.worksource.boinc.BoincResult.prototype.uploadOperation = null;
web2grid.worksource.boinc.BoincResult.prototype.reportOperation = null;
web2grid.worksource.boinc.BoincResult.prototype.isCompleted = function() {
	return this.state == web2grid.worksource.boinc.BoincResultState.Uploaded;
}
web2grid.worksource.boinc.BoincResult.prototype.isError = function() {
	return this.state == web2grid.worksource.boinc.BoincResultState.Error;
}
web2grid.worksource.boinc.BoincResult.prototype.SwitchState = function(newstate) {
	this.state = newstate;
	web2grid.core.log.Console.main.logDebug("Changed state to " + this.getState(),null,this,{ fileName : "BoincResult.hx", lineNumber : 70, className : "web2grid.worksource.boinc.BoincResult", methodName : "SwitchState"});
}
web2grid.worksource.boinc.BoincResult.prototype.getScreenName = function() {
	return this.workunit.getScreenName() + " / Result " + this.slot.name + " / " + this.fileref.open_name;
}
web2grid.worksource.boinc.BoincResult.prototype.getState = function() {
	var $e = this.state;
	switch( $e[1] ) {
	case 0:
	{
		return "New";
	}break;
	case 1:
	{
		return "Checking upload status";
	}break;
	case 2:
	{
		return "Ready to upload";
	}break;
	case 3:
	{
		return "Uploading";
	}break;
	case 4:
	{
		return "Uploaded";
	}break;
	case 5:
	{
		return "Error";
	}break;
	default:{
		return "Unknown";
	}break;
	}
}
web2grid.worksource.boinc.BoincResult.prototype.operate = function() {
	var $e = this.state;
	switch( $e[1] ) {
	case 0:
	{
		{
			web2grid.core.log.Console.main.logInformation("Checking upload status.",null,this,{ fileName : "BoincResult.hx", lineNumber : 98, className : "web2grid.worksource.boinc.BoincResult", methodName : "operate"});
			this.statusCheckOperation = this.source.checkUploadStatus(this.fileref);
			this.SwitchState(web2grid.worksource.boinc.BoincResultState.CheckingStatus);
		}
	}break;
	case 1:
	{
		{
			if(this.statusCheckOperation.isCompleted()) {
				var response = this.statusCheckOperation.getResult();
				var xml = new haxe.xml.Fast(Xml.parse(response.content).firstElement());
				var reply = new web2grid.worksource.boinc.reply.DataServerReply(xml);
				if(reply.status == 0) {
					if(reply.file_size == 0) {
						web2grid.core.log.Console.main.logInformation("This result is not uploaded yet.",null,this,{ fileName : "BoincResult.hx", lineNumber : 115, className : "web2grid.worksource.boinc.BoincResult", methodName : "operate"});
						this.SwitchState(web2grid.worksource.boinc.BoincResultState.ReadyToUpload);
					}
					else {
						web2grid.core.log.Console.main.logInformation("This result has been already uploaded.",null,this,{ fileName : "BoincResult.hx", lineNumber : 121, className : "web2grid.worksource.boinc.BoincResult", methodName : "operate"});
						this.SwitchState(web2grid.worksource.boinc.BoincResultState.Uploaded);
					}
				}
				else {
					web2grid.core.log.Console.main.logWarning("Could not retrieve result status.",null,this,{ fileName : "BoincResult.hx", lineNumber : 127, className : "web2grid.worksource.boinc.BoincResult", methodName : "operate"});
					this.SwitchState(web2grid.worksource.boinc.BoincResultState.Error);
				}
			}
		}
	}break;
	case 2:
	{
		{
			web2grid.core.log.Console.main.logInformation("Uploading: " + this.data.length + " bytes",null,this,{ fileName : "BoincResult.hx", lineNumber : 135, className : "web2grid.worksource.boinc.BoincResult", methodName : "operate"});
			this.uploadOperation = this.source.uploadResult(this.fileref,this.data,this.md5);
			this.SwitchState(web2grid.worksource.boinc.BoincResultState.Uploading);
		}
	}break;
	case 3:
	{
		{
			if(this.uploadOperation.isCompleted()) {
				var response = this.uploadOperation.getResult();
				var xml = new haxe.xml.Fast(Xml.parse(response.content).firstElement());
				var reply = new web2grid.worksource.boinc.reply.DataServerReply(xml);
				if(reply.message != null) {
					web2grid.core.log.Console.main.logWarning("Upload handler message: " + reply.message,null,this,{ fileName : "BoincResult.hx", lineNumber : 150, className : "web2grid.worksource.boinc.BoincResult", methodName : "operate"});
				}
				if(reply.status == 0) {
					web2grid.core.log.Console.main.logInformation("Uploaded successfully.",null,this,{ fileName : "BoincResult.hx", lineNumber : 155, className : "web2grid.worksource.boinc.BoincResult", methodName : "operate"});
					this.SwitchState(web2grid.worksource.boinc.BoincResultState.Uploaded);
				}
				else {
					web2grid.core.log.Console.main.logWarning("Could not upload result.",null,this,{ fileName : "BoincResult.hx", lineNumber : 160, className : "web2grid.worksource.boinc.BoincResult", methodName : "operate"});
					this.SwitchState(web2grid.worksource.boinc.BoincResultState.Error);
				}
			}
		}
	}break;
	case 4:
	{
		null;
	}break;
	case 5:
	{
		null;
	}break;
	}
	return false;
}
web2grid.worksource.boinc.BoincResult.prototype.getFileInfo = function() {
	var info = new web2grid.worksource.boinc.request.ResultFileinfo();
	info.name = this.slot.name;
	info.nbytes = this.data.length;
	info.max_nbytes = this.fileref.file_info.max_nbytes;
	info.md5_cksum = this.md5;
	info.url = this.fileref.file_info.url;
	return info;
}
web2grid.worksource.boinc.BoincResult.prototype.isAccepted = function() {
	return this.accepted;
}
web2grid.worksource.boinc.BoincResult.prototype.setAccepted = function() {
	if(this.state == web2grid.worksource.boinc.BoincResultState.Uploaded) {
		this.accepted = true;
	}
}
web2grid.worksource.boinc.BoincResult.prototype.hxSerialize = function(s) {
	s.serialize(this.state);
	s.serialize(this.source);
	s.serialize(this.workunit);
	s.serialize(this.slot);
	s.serialize(this.fileref);
	s.serialize(this.data);
	s.serialize(this.md5);
	s.serialize(this.accepted);
}
web2grid.worksource.boinc.BoincResult.prototype.hxUnserialize = function(s) {
	this.state = s.unserialize();
	this.source = s.unserialize();
	this.workunit = s.unserialize();
	this.slot = s.unserialize();
	this.fileref = s.unserialize();
	this.data = s.unserialize();
	this.md5 = s.unserialize();
	this.accepted = s.unserialize();
	if(this.state != web2grid.worksource.boinc.BoincResultState.Uploaded) this.state = null;
}
web2grid.worksource.boinc.BoincResult.prototype.__class__ = web2grid.worksource.boinc.BoincResult;
web2grid.worksource.boinc.BoincResult.__interfaces__ = [web2grid.core.log.LogSource,web2grid.core.iface.Operable];
web2grid.worksource.boinc.reply.FileRef = function(node) { if( node === $_ ) return; {
	if(node.hasNode.resolve("file_name")) this.file_name = node.node.resolve("file_name").getInnerData();
	if(node.hasNode.resolve("open_name")) this.open_name = node.node.resolve("open_name").getInnerData();
	this.main_program = node.hasNode.resolve("main_program");
}}
web2grid.worksource.boinc.reply.FileRef.__name__ = ["web2grid","worksource","boinc","reply","FileRef"];
web2grid.worksource.boinc.reply.FileRef.prototype.file_name = null;
web2grid.worksource.boinc.reply.FileRef.prototype.open_name = null;
web2grid.worksource.boinc.reply.FileRef.prototype.main_program = null;
web2grid.worksource.boinc.reply.FileRef.prototype.file_info = null;
web2grid.worksource.boinc.reply.FileRef.prototype.__class__ = web2grid.worksource.boinc.reply.FileRef;
haxe.TypeTools = function() { }
haxe.TypeTools.__name__ = ["haxe","TypeTools"];
haxe.TypeTools.getClassNames = function(value) {
	var result = new List();
	var valueClass = Std["is"](value,Class)?value:Type.getClass(value);
	while(null != valueClass) {
		result.add(Type.getClassName(valueClass));
		valueClass = Type.getSuperClass(valueClass);
	}
	return result;
}
haxe.TypeTools.prototype.__class__ = haxe.TypeTools;
Main = function() { }
Main.__name__ = ["Main"];
Main.gears = null;
Main.ok = null;
Main.client = null;
Main.logdiv = null;
Main.progressdiv = null;
Main.idletimer = null;
Main.main = function() {
	null;
}
Main.toggle = function() {
	if(!Main.ok) return;
	if(Main.client.isRunning()) {
		Main.client.stop();
		Main.client.terminate();
	}
	else {
		Main.client.resume();
		Main.client.start(100);
	}
}
Main.onStart = function() {
	if(!Main.ok) return;
	Main.gears.working();
}
Main.onStop = function() {
	if(!Main.ok) return;
	Main.gears.idle();
}
Main.onSuspend = function() {
	if(!Main.ok) return;
	Main.gears.suspend();
}
Main.onError = function() {
	if(!Main.ok) return;
	Main.gears.error();
}
Main.onIdle = function() {
	if(!Main.ok) return;
	if(Main.client.isWorking()) {
		var progress = Main.client.getMaxProgress();
		Main.progressdiv.innerHTML = "<p>" + Math.round(progress * 100) + "%</p>" + "<p>" + "Completed: " + Main.client.getCompletedWorks() + "</p>";
	}
	else if(Main.client.isSuspended()) {
		Main.progressdiv.innerHTML = "<p>&nbsp;</p><p>Suspended.</p>";
	}
	else {
		Main.progressdiv.innerHTML = "<p>&nbsp;</p><p>Waiting.</p>";
	}
}
Main.onLog = function(entry) {
	var html = web2grid.core.log.Console.main.exportAsHtml(100,web2grid.core.log.LogLevel.L4_Information);
	var scrolling = false;
	if(Main.logdiv.scrollTop >= Main.logdiv.scrollHeight - Main.logdiv.clientHeight - 10) {
		scrolling = true;
	}
	Main.logdiv.innerHTML = html;
	if(scrolling) {
		Main.logdiv.scrollTop = Main.logdiv.scrollHeight;
	}
}
Main.startstop = function(div) {
	if(!Main.ok) return;
	if(Main.client.isRunning()) {
		Main.client.stop();
		Main.client.terminate();
		div.innerHTML = "Start";
		div.className = "button";
	}
	else {
		Main.client.resume();
		Main.client.start(100);
		div.innerHTML = "Stop";
		div.className = "button on";
	}
}
Main.consoletoggle = function(div) {
	if(div.className == "button") {
		div.className = "button on";
		Main.logdiv.className = "";
	}
	else {
		div.className = "button";
		Main.logdiv.className = "hidden";
	}
}
Main.threadtoggle = function(div) {
	if(!Main.ok) return;
	if(div.className == "button") {
		if(js.Lib.window.confirm("Warning! The following option can make your computer slow! Are you sure you want to run the workunits using two processor threads?")) {
			div.className = "button on";
			Main.client.setTargetActiveWorkNumber(2);
		}
	}
	else {
		div.className = "button";
		Main.client.setTargetActiveWorkNumber(1);
	}
}
Main.onload = function() {
	Main.logdiv = js.Lib.document.getElementById("log");
	web2grid.core.log.Console.main.onLog.bind($closure(Main,"onLog"));
	web2grid.core.log.Console.main.logNotice("Console loaded.",null,null,{ fileName : "Main.hx", lineNumber : 163, className : "Main", methodName : "onload"});
	Main.progressdiv = js.Lib.document.getElementById("progress");
	web2grid.core.log.Console.main.logInformation("OS: " + web2grid.core.info.BrowserInfo.osName() + " " + web2grid.core.info.BrowserInfo.osPlatform(),null,null,{ fileName : "Main.hx", lineNumber : 167, className : "Main", methodName : "onload"});
	web2grid.core.log.Console.main.logInformation("Browser: " + web2grid.core.info.BrowserInfo.browserVendor() + " " + web2grid.core.info.BrowserInfo.browserName() + " " + web2grid.core.info.BrowserInfo.browserFullVersion(),null,null,{ fileName : "Main.hx", lineNumber : 168, className : "Main", methodName : "onload"});
	web2grid.core.log.Console.main.logInformation("HTML5 Local Storage: " + web2grid.core.info.BrowserInfo.html5localStorage(),null,null,{ fileName : "Main.hx", lineNumber : 169, className : "Main", methodName : "onload"});
	web2grid.core.log.Console.main.logInformation("HTML5 WebWorkers: " + web2grid.core.info.BrowserInfo.html5webWorkers(),null,null,{ fileName : "Main.hx", lineNumber : 170, className : "Main", methodName : "onload"});
	web2grid.core.log.Console.main.logInformation("HTML5 CORS: " + web2grid.core.info.BrowserInfo.html5xmlHttpRequestLevel2(),null,null,{ fileName : "Main.hx", lineNumber : 171, className : "Main", methodName : "onload"});
	if(!web2grid.core.info.BrowserInfo.html5webWorkers() || !web2grid.core.info.BrowserInfo.html5localStorage()) {
		web2grid.core.log.Console.main.logCritical("Your browser does not support HTML5 WebWorkers! This technology is essential for the client to run. Please consider using Google Chrome, Mozzila Firefox or Internet Explorer 10.",null,null,{ fileName : "Main.hx", lineNumber : 175, className : "Main", methodName : "onload"});
		Main.ok = false;
	}
	Main.idletimer = new haxe.Timer(1000);
	Main.idletimer.run = $closure(Main,"onIdle");
	Main.gears = new web2grid.ui.Gears(js.Lib.document.getElementById("gears"));
	if(!web2grid.core.info.BrowserInfo.html5webWorkers() || !web2grid.core.info.BrowserInfo.html5localStorage()) {
		Main.gears.error();
		Main.ok = false;
		return;
	}
	Main.ok = true;
	Main.client = web2grid.control.Scheduler.loadFromLocalStorage(js.Lib.window.location.pathname);
	Main.client.setTargetActiveWorkNumber(1);
	Main.client.setTargetPassiveWorkNumber(2);
	Main.client.setRequestInterval(10000);
	Main.client.onStartWorking.bindVoid($closure(Main,"onStart"));
	Main.client.onStopWorking.bindVoid($closure(Main,"onStop"));
	Main.client.onSuspended.bindVoid($closure(Main,"onSuspend"));
	Main.client.onError.bindVoid($closure(Main,"onError"));
	if(Main.client.getNumberOfSources() == 0) {
		var scheduler_url = "http://ui.hpc.iit.bme.hu/wcdemo_cgi/cgi";
		var authkey = "1d0f37563ceb7d1ed372a932dcdb5d85";
		Main.client.addWorkSource(new web2grid.worksource.boinc.BoincWorkSource(scheduler_url,authkey));
	}
	Main.client.start(100);
}
Main.prototype.__class__ = Main;
haxe.Md5 = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.Md5.__name__ = ["haxe","Md5"];
haxe.Md5.encode = function(s) {
	return haxe.Md5.inst.doEncode(s);
}
haxe.Md5.prototype.bitOR = function(a,b) {
	var lsb = a & 1 | b & 1;
	var msb31 = a >>> 1 | b >>> 1;
	return msb31 << 1 | lsb;
}
haxe.Md5.prototype.bitXOR = function(a,b) {
	var lsb = a & 1 ^ b & 1;
	var msb31 = a >>> 1 ^ b >>> 1;
	return msb31 << 1 | lsb;
}
haxe.Md5.prototype.bitAND = function(a,b) {
	var lsb = a & 1 & (b & 1);
	var msb31 = a >>> 1 & b >>> 1;
	return msb31 << 1 | lsb;
}
haxe.Md5.prototype.addme = function(x,y) {
	var lsw = (x & 65535) + (y & 65535);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return msw << 16 | lsw & 65535;
}
haxe.Md5.prototype.rhex = function(num) {
	var str = "";
	var hex_chr = "0123456789abcdef";
	{
		var _g = 0;
		while(_g < 4) {
			var j = _g++;
			str += hex_chr.charAt(num >> j * 8 + 4 & 15) + hex_chr.charAt(num >> j * 8 & 15);
		}
	}
	return str;
}
haxe.Md5.prototype.str2blks = function(str) {
	var nblk = (str.length + 8 >> 6) + 1;
	var blks = new Array();
	{
		var _g1 = 0, _g = nblk * 16;
		while(_g1 < _g) {
			var i = _g1++;
			blks[i] = 0;
		}
	}
	var i = 0;
	while(i < str.length) {
		blks[i >> 2] |= str.charCodeAt(i) << (str.length * 8 + i) % 4 * 8;
		i++;
	}
	blks[i >> 2] |= 128 << (str.length * 8 + i) % 4 * 8;
	var l = str.length * 8;
	var k = nblk * 16 - 2;
	blks[k] = l & 255;
	blks[k] |= (l >>> 8 & 255) << 8;
	blks[k] |= (l >>> 16 & 255) << 16;
	blks[k] |= (l >>> 24 & 255) << 24;
	return blks;
}
haxe.Md5.prototype.rol = function(num,cnt) {
	return num << cnt | num >>> 32 - cnt;
}
haxe.Md5.prototype.cmn = function(q,a,b,x,s,t) {
	return this.addme(this.rol(this.addme(this.addme(a,q),this.addme(x,t)),s),b);
}
haxe.Md5.prototype.ff = function(a,b,c,d,x,s,t) {
	return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
}
haxe.Md5.prototype.gg = function(a,b,c,d,x,s,t) {
	return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
}
haxe.Md5.prototype.hh = function(a,b,c,d,x,s,t) {
	return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
}
haxe.Md5.prototype.ii = function(a,b,c,d,x,s,t) {
	return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
}
haxe.Md5.prototype.doEncode = function(str) {
	var x = this.str2blks(str);
	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;
	var step;
	var i = 0;
	while(i < x.length) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		step = 0;
		a = this.ff(a,b,c,d,x[i],7,-680876936);
		d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
		c = this.ff(c,d,a,b,x[i + 2],17,606105819);
		b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
		a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
		d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
		c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
		b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
		a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
		d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
		c = this.ff(c,d,a,b,x[i + 10],17,-42063);
		b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
		a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
		d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
		c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
		b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
		a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
		d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
		c = this.gg(c,d,a,b,x[i + 11],14,643717713);
		b = this.gg(b,c,d,a,x[i],20,-373897302);
		a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
		d = this.gg(d,a,b,c,x[i + 10],9,38016083);
		c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
		b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
		a = this.gg(a,b,c,d,x[i + 9],5,568446438);
		d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
		c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
		b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
		a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
		d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
		c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
		b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
		a = this.hh(a,b,c,d,x[i + 5],4,-378558);
		d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
		c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
		b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
		a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
		d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
		c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
		b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
		a = this.hh(a,b,c,d,x[i + 13],4,681279174);
		d = this.hh(d,a,b,c,x[i],11,-358537222);
		c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
		b = this.hh(b,c,d,a,x[i + 6],23,76029189);
		a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
		d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
		c = this.hh(c,d,a,b,x[i + 15],16,530742520);
		b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
		a = this.ii(a,b,c,d,x[i],6,-198630844);
		d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
		c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
		b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
		a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
		d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
		c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
		b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
		a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
		d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
		c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
		b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
		a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
		d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
		c = this.ii(c,d,a,b,x[i + 2],15,718787259);
		b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
		a = this.addme(a,olda);
		b = this.addme(b,oldb);
		c = this.addme(c,oldc);
		d = this.addme(d,oldd);
		i += 16;
	}
	return this.rhex(a) + this.rhex(b) + this.rhex(c) + this.rhex(d);
}
haxe.Md5.prototype.__class__ = haxe.Md5;
haxe.Unserializer = function(buf) { if( buf === $_ ) return; {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	this.setResolver(haxe.Unserializer.DEFAULT_RESOLVER);
}}
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	{
		var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
		while(_g1 < _g) {
			var i = _g1++;
			codes[haxe.Unserializer.BASE64.cca(i)] = i;
		}
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype.buf = null;
haxe.Unserializer.prototype.pos = null;
haxe.Unserializer.prototype.length = null;
haxe.Unserializer.prototype.cache = null;
haxe.Unserializer.prototype.scache = null;
haxe.Unserializer.prototype.resolver = null;
haxe.Unserializer.prototype.setResolver = function(r) {
	if(r == null) this.resolver = { resolveClass : function(_) {
		return null;
	}, resolveEnum : function(_) {
		return null;
	}};
	else this.resolver = r;
}
haxe.Unserializer.prototype.getResolver = function() {
	return this.resolver;
}
haxe.Unserializer.prototype.get = function(p) {
	return this.buf.cca(p);
}
haxe.Unserializer.prototype.readDigits = function() {
	var k = 0;
	var s = false;
	var fpos = this.pos;
	while(true) {
		var c = this.buf.cca(this.pos);
		if(c != c) break;
		if(c == 45) {
			if(this.pos != fpos) break;
			s = true;
			this.pos++;
			continue;
		}
		if(c < 48 || c > 57) break;
		k = k * 10 + (c - 48);
		this.pos++;
	}
	if(s) k *= -1;
	return k;
}
haxe.Unserializer.prototype.unserializeObject = function(o) {
	while(true) {
		if(this.pos >= this.length) throw "Invalid object";
		if(this.buf.cca(this.pos) == 103) break;
		var k = this.unserialize();
		if(!Std["is"](k,String)) throw "Invalid object key";
		var v = this.unserialize();
		o[k] = v;
	}
	this.pos++;
}
haxe.Unserializer.prototype.unserializeEnum = function(edecl,tag) {
	var constr = Reflect.field(edecl,tag);
	if(constr == null) throw "Unknown enum tag " + Type.getEnumName(edecl) + "." + tag;
	if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
	var nargs = this.readDigits();
	if(nargs == 0) {
		this.cache.push(constr);
		return constr;
	}
	var args = new Array();
	while(nargs > 0) {
		args.push(this.unserialize());
		nargs -= 1;
	}
	var e = constr.apply(edecl,args);
	this.cache.push(e);
	return e;
}
haxe.Unserializer.prototype.unserialize = function() {
	switch(this.buf.cca(this.pos++)) {
	case 110:{
		return null;
	}break;
	case 116:{
		return true;
	}break;
	case 102:{
		return false;
	}break;
	case 122:{
		return 0;
	}break;
	case 105:{
		return this.readDigits();
	}break;
	case 100:{
		var p1 = this.pos;
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++;
			else break;
		}
		return Std.parseFloat(this.buf.substr(p1,this.pos - p1));
	}break;
	case 121:{
		var len = this.readDigits();
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
		var s = this.buf.substr(this.pos,len);
		this.pos += len;
		s = StringTools.urlDecode(s);
		this.scache.push(s);
		return s;
	}break;
	case 107:{
		return Math.NaN;
	}break;
	case 109:{
		return Math.NEGATIVE_INFINITY;
	}break;
	case 112:{
		return Math.POSITIVE_INFINITY;
	}break;
	case 97:{
		var buf = this.buf;
		var a = new Array();
		this.cache.push(a);
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c == 104) {
				this.pos++;
				break;
			}
			if(c == 117) {
				this.pos++;
				var n = this.readDigits();
				a[a.length + n - 1] = null;
			}
			else a.push(this.unserialize());
		}
		return a;
	}break;
	case 111:{
		var o = { };
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	}break;
	case 114:{
		var n = this.readDigits();
		if(n < 0 || n >= this.cache.length) throw "Invalid reference";
		return this.cache[n];
	}break;
	case 82:{
		var n = this.readDigits();
		if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
		return this.scache[n];
	}break;
	case 120:{
		throw this.unserialize();
	}break;
	case 99:{
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	}break;
	case 119:{
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		return this.unserializeEnum(edecl,this.unserialize());
	}break;
	case 106:{
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		this.pos++;
		var index = this.readDigits();
		var tag = Type.getEnumConstructs(edecl)[index];
		if(tag == null) throw "Unknown enum index " + name + "@" + index;
		return this.unserializeEnum(edecl,tag);
	}break;
	case 108:{
		var l = new List();
		this.cache.push(l);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
		this.pos++;
		return l;
	}break;
	case 98:{
		var h = new Hash();
		this.cache.push(h);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) {
			var s = this.unserialize();
			h.set(s,this.unserialize());
		}
		this.pos++;
		return h;
	}break;
	case 113:{
		var h = new IntHash();
		this.cache.push(h);
		var buf = this.buf;
		var c = this.buf.cca(this.pos++);
		while(c == 58) {
			var i = this.readDigits();
			h.set(i,this.unserialize());
			c = this.buf.cca(this.pos++);
		}
		if(c != 104) throw "Invalid IntHash format";
		return h;
	}break;
	case 118:{
		var d = Date.fromString(this.buf.substr(this.pos,19));
		this.cache.push(d);
		this.pos += 19;
		return d;
	}break;
	case 115:{
		var len = this.readDigits();
		var buf = this.buf;
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
		var codes = haxe.Unserializer.CODES;
		if(codes == null) {
			codes = haxe.Unserializer.initCodes();
			haxe.Unserializer.CODES = codes;
		}
		var i = this.pos;
		var rest = len & 3;
		var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
		var max = i + (len - rest);
		var bytes = haxe.io.Bytes.alloc(size);
		var bpos = 0;
		while(i < max) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			var c3 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			var c4 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c3 << 6 | c4) & 255;
		}
		if(rest >= 2) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			if(rest == 3) {
				var c3 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			}
		}
		this.pos += len;
		this.cache.push(bytes);
		return bytes;
	}break;
	case 67:{
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		o.hxUnserialize(this);
		if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
		return o;
	}break;
	default:{
		null;
	}break;
	}
	this.pos--;
	throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
}
haxe.Unserializer.prototype.__class__ = haxe.Unserializer;
if(!haxe.macro) haxe.macro = {}
haxe.macro.Constant = { __ename__ : ["haxe","macro","Constant"], __constructs__ : ["CInt","CFloat","CString","CIdent","CType","CRegexp"] }
haxe.macro.Constant.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CIdent = function(s) { var $x = ["CIdent",3,s]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CType = function(s) { var $x = ["CType",4,s]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CRegexp = function(r,opt) { var $x = ["CRegexp",5,r,opt]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Binop = { __ename__ : ["haxe","macro","Binop"], __constructs__ : ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval"] }
haxe.macro.Binop.OpAdd = ["OpAdd",0];
haxe.macro.Binop.OpAdd.toString = $estr;
haxe.macro.Binop.OpAdd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpMult = ["OpMult",1];
haxe.macro.Binop.OpMult.toString = $estr;
haxe.macro.Binop.OpMult.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpDiv = ["OpDiv",2];
haxe.macro.Binop.OpDiv.toString = $estr;
haxe.macro.Binop.OpDiv.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpSub = ["OpSub",3];
haxe.macro.Binop.OpSub.toString = $estr;
haxe.macro.Binop.OpSub.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAssign = ["OpAssign",4];
haxe.macro.Binop.OpAssign.toString = $estr;
haxe.macro.Binop.OpAssign.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpEq = ["OpEq",5];
haxe.macro.Binop.OpEq.toString = $estr;
haxe.macro.Binop.OpEq.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpNotEq = ["OpNotEq",6];
haxe.macro.Binop.OpNotEq.toString = $estr;
haxe.macro.Binop.OpNotEq.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpGt = ["OpGt",7];
haxe.macro.Binop.OpGt.toString = $estr;
haxe.macro.Binop.OpGt.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpGte = ["OpGte",8];
haxe.macro.Binop.OpGte.toString = $estr;
haxe.macro.Binop.OpGte.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpLt = ["OpLt",9];
haxe.macro.Binop.OpLt.toString = $estr;
haxe.macro.Binop.OpLt.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpLte = ["OpLte",10];
haxe.macro.Binop.OpLte.toString = $estr;
haxe.macro.Binop.OpLte.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAnd = ["OpAnd",11];
haxe.macro.Binop.OpAnd.toString = $estr;
haxe.macro.Binop.OpAnd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpOr = ["OpOr",12];
haxe.macro.Binop.OpOr.toString = $estr;
haxe.macro.Binop.OpOr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpXor = ["OpXor",13];
haxe.macro.Binop.OpXor.toString = $estr;
haxe.macro.Binop.OpXor.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpBoolAnd = ["OpBoolAnd",14];
haxe.macro.Binop.OpBoolAnd.toString = $estr;
haxe.macro.Binop.OpBoolAnd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpBoolOr = ["OpBoolOr",15];
haxe.macro.Binop.OpBoolOr.toString = $estr;
haxe.macro.Binop.OpBoolOr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpShl = ["OpShl",16];
haxe.macro.Binop.OpShl.toString = $estr;
haxe.macro.Binop.OpShl.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpShr = ["OpShr",17];
haxe.macro.Binop.OpShr.toString = $estr;
haxe.macro.Binop.OpShr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpUShr = ["OpUShr",18];
haxe.macro.Binop.OpUShr.toString = $estr;
haxe.macro.Binop.OpUShr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpMod = ["OpMod",19];
haxe.macro.Binop.OpMod.toString = $estr;
haxe.macro.Binop.OpMod.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAssignOp = function(op) { var $x = ["OpAssignOp",20,op]; $x.__enum__ = haxe.macro.Binop; $x.toString = $estr; return $x; }
haxe.macro.Binop.OpInterval = ["OpInterval",21];
haxe.macro.Binop.OpInterval.toString = $estr;
haxe.macro.Binop.OpInterval.__enum__ = haxe.macro.Binop;
haxe.macro.Unop = { __ename__ : ["haxe","macro","Unop"], __constructs__ : ["OpIncrement","OpIDecrement","OpNot","OpNeg","OpNegBits"] }
haxe.macro.Unop.OpIncrement = ["OpIncrement",0];
haxe.macro.Unop.OpIncrement.toString = $estr;
haxe.macro.Unop.OpIncrement.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpIDecrement = ["OpIDecrement",1];
haxe.macro.Unop.OpIDecrement.toString = $estr;
haxe.macro.Unop.OpIDecrement.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNot = ["OpNot",2];
haxe.macro.Unop.OpNot.toString = $estr;
haxe.macro.Unop.OpNot.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNeg = ["OpNeg",3];
haxe.macro.Unop.OpNeg.toString = $estr;
haxe.macro.Unop.OpNeg.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNegBits = ["OpNegBits",4];
haxe.macro.Unop.OpNegBits.toString = $estr;
haxe.macro.Unop.OpNegBits.__enum__ = haxe.macro.Unop;
haxe.macro.ExprDef = { __ename__ : ["haxe","macro","ExprDef"], __constructs__ : ["EConst","EArray","EBinop","EField","EType","EParenthesis","EObjectDecl","EArrayDecl","ECall","ENew","EUnop","EVars","EFunction","EBlock","EFor","EIf","EWhile","ESwitch","ETry","EReturn","EBreak","EContinue","EUntyped","EThrow","ECast","EDisplay","EDisplayNew","ETernary"] }
haxe.macro.ExprDef.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EArray = function(e1,e2) { var $x = ["EArray",1,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EBinop = function(op,e1,e2) { var $x = ["EBinop",2,op,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EField = function(e,field) { var $x = ["EField",3,e,field]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EType = function(e,field) { var $x = ["EType",4,e,field]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EParenthesis = function(e) { var $x = ["EParenthesis",5,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EObjectDecl = function(fields) { var $x = ["EObjectDecl",6,fields]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EArrayDecl = function(values) { var $x = ["EArrayDecl",7,values]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ECall = function(e,params) { var $x = ["ECall",8,e,params]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ENew = function(t,params) { var $x = ["ENew",9,t,params]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EUnop = function(op,postFix,e) { var $x = ["EUnop",10,op,postFix,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EVars = function(vars) { var $x = ["EVars",11,vars]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EFunction = function(f) { var $x = ["EFunction",12,f]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EBlock = function(exprs) { var $x = ["EBlock",13,exprs]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EFor = function(v,it,expr) { var $x = ["EFor",14,v,it,expr]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EIf = function(econd,eif,eelse) { var $x = ["EIf",15,econd,eif,eelse]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EWhile = function(econd,e,normalWhile) { var $x = ["EWhile",16,econd,e,normalWhile]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ESwitch = function(e,cases,edef) { var $x = ["ESwitch",17,e,cases,edef]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ETry = function(e,catches) { var $x = ["ETry",18,e,catches]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EReturn = function(e) { var $x = ["EReturn",19,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EBreak = ["EBreak",20];
haxe.macro.ExprDef.EBreak.toString = $estr;
haxe.macro.ExprDef.EBreak.__enum__ = haxe.macro.ExprDef;
haxe.macro.ExprDef.EContinue = ["EContinue",21];
haxe.macro.ExprDef.EContinue.toString = $estr;
haxe.macro.ExprDef.EContinue.__enum__ = haxe.macro.ExprDef;
haxe.macro.ExprDef.EUntyped = function(e) { var $x = ["EUntyped",22,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EThrow = function(e) { var $x = ["EThrow",23,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ECast = function(e,t) { var $x = ["ECast",24,e,t]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EDisplay = function(e,isCall) { var $x = ["EDisplay",25,e,isCall]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EDisplayNew = function(t) { var $x = ["EDisplayNew",26,t]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ETernary = function(econd,eif,eelse) { var $x = ["ETernary",27,econd,eif,eelse]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ComplexType = { __ename__ : ["haxe","macro","ComplexType"], __constructs__ : ["TPath","TFunction","TAnonymous","TParent","TExtend"] }
haxe.macro.ComplexType.TPath = function(p) { var $x = ["TPath",0,p]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TFunction = function(args,ret) { var $x = ["TFunction",1,args,ret]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TAnonymous = function(fields) { var $x = ["TAnonymous",2,fields]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TParent = function(t) { var $x = ["TParent",3,t]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TExtend = function(p,fields) { var $x = ["TExtend",4,p,fields]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.TypeParam = { __ename__ : ["haxe","macro","TypeParam"], __constructs__ : ["TPType","TPConst"] }
haxe.macro.TypeParam.TPType = function(t) { var $x = ["TPType",0,t]; $x.__enum__ = haxe.macro.TypeParam; $x.toString = $estr; return $x; }
haxe.macro.TypeParam.TPConst = function(c) { var $x = ["TPConst",1,c]; $x.__enum__ = haxe.macro.TypeParam; $x.toString = $estr; return $x; }
haxe.macro.FieldType = { __ename__ : ["haxe","macro","FieldType"], __constructs__ : ["FVar","FProp","FFun"] }
haxe.macro.FieldType.FVar = function(t) { var $x = ["FVar",0,t]; $x.__enum__ = haxe.macro.FieldType; $x.toString = $estr; return $x; }
haxe.macro.FieldType.FProp = function(t,get,set) { var $x = ["FProp",1,t,get,set]; $x.__enum__ = haxe.macro.FieldType; $x.toString = $estr; return $x; }
haxe.macro.FieldType.FFun = function(args,ret) { var $x = ["FFun",2,args,ret]; $x.__enum__ = haxe.macro.FieldType; $x.toString = $estr; return $x; }
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
if(!web2grid.core.info) web2grid.core.info = {}
web2grid.core.info.BrowserInfo = function(p) { if( p === $_ ) return; {
	null;
}}
web2grid.core.info.BrowserInfo.__name__ = ["web2grid","core","info","BrowserInfo"];
web2grid.core.info.BrowserInfo.detectBrowser = function() {
	var success;
	success = web2grid.core.info.BrowserInfo.checkBrowser("Opera Software","Opera",function(navigator) {
		return window.opera ? true : false;
	},new EReg("([0-9]+)\\.([.0-9]+)$",""));
	if(success) return;
	success = web2grid.core.info.BrowserInfo.checkBrowser("Microsoft","Internet Explorer",function(navigator) {
		return navigator.userAgent.indexOf("MSIE") > -1?true:false;
	},new EReg("MSIE (\\d+)\\.(\\d+)",""));
	if(success) return;
	success = web2grid.core.info.BrowserInfo.checkBrowser("Google","Chrome",function(navigator) {
		return navigator.userAgent.indexOf("Chrome") > -1?true:false;
	},new EReg("Chrome/(\\d+)\\.([.0-9]+)",""));
	if(success) return;
	success = web2grid.core.info.BrowserInfo.checkBrowser("Mozilla","Firefox",function(navigator) {
		return navigator.userAgent.indexOf("Firefox") > -1?true:false;
	},new EReg("Firefox/(\\d+)\\.([.0-9]+)",""));
	if(success) return;
}
web2grid.core.info.BrowserInfo.checkBrowser = function(vendor,browser,check,versionRegexp) {
	if(check(js.Lib.window.navigator)) {
		versionRegexp.match(js.Lib.window.navigator.userAgent);
		web2grid.core.info.BrowserInfo.browserVendorValue = vendor;
		web2grid.core.info.BrowserInfo.browserNameValue = browser;
		web2grid.core.info.BrowserInfo.browserMajorVersionValue = Std.parseInt(versionRegexp.matched(1));
		web2grid.core.info.BrowserInfo.browserFullVersionValue = versionRegexp.matched(1) + "." + versionRegexp.matched(2);
		return true;
	}
	return false;
}
web2grid.core.info.BrowserInfo.browserVendor = function() {
	if(web2grid.core.info.BrowserInfo.browserVendorValue == null) web2grid.core.info.BrowserInfo.detectBrowser();
	return web2grid.core.info.BrowserInfo.browserVendorValue;
}
web2grid.core.info.BrowserInfo.browserName = function() {
	if(web2grid.core.info.BrowserInfo.browserNameValue == null) web2grid.core.info.BrowserInfo.detectBrowser();
	return web2grid.core.info.BrowserInfo.browserNameValue;
}
web2grid.core.info.BrowserInfo.browserFullVersion = function() {
	if(web2grid.core.info.BrowserInfo.browserFullVersionValue == null) web2grid.core.info.BrowserInfo.detectBrowser();
	return web2grid.core.info.BrowserInfo.browserFullVersionValue;
}
web2grid.core.info.BrowserInfo.browserMajorVersion = function() {
	if(web2grid.core.info.BrowserInfo.browserMajorVersionValue == null) web2grid.core.info.BrowserInfo.detectBrowser();
	return web2grid.core.info.BrowserInfo.browserMajorVersionValue;
}
web2grid.core.info.BrowserInfo.detectOs = function() {
	var r;
	var navigator = js.Lib.window.navigator;
	var platform = navigator.platform;
	var os = "";
	if(platform.indexOf("Win") > -1) {
		r = new EReg("Windows NT ([.0-9]+)","");
		r.match(navigator.userAgent);
		switch(r.matched(1)) {
		case "6.1":{
			os = "Windows 7";
		}break;
		case "6.0":{
			os = "Windows Vista";
		}break;
		case "5.2":{
			os = "Windows XP";
		}break;
		case "5.1":{
			os = "Windows XP";
		}break;
		default:{
			os = "Windows";
		}break;
		}
	}
	if(platform.indexOf("Linux") > -1) {
		os = "Linux";
	}
	if(platform.indexOf("Mac") > -1) {
		r = new EReg("Mac OS X [.0-9]","");
		if(r.match(navigator.userAgent)) {
			os = r.matched(0);
		}
		else {
			os = "Apple";
		}
	}
	web2grid.core.info.BrowserInfo.osPlatformValue = platform;
	web2grid.core.info.BrowserInfo.osNameValue = os;
}
web2grid.core.info.BrowserInfo.osPlatform = function() {
	if(web2grid.core.info.BrowserInfo.osPlatformValue == null) web2grid.core.info.BrowserInfo.detectOs();
	return web2grid.core.info.BrowserInfo.osPlatformValue;
}
web2grid.core.info.BrowserInfo.osName = function() {
	if(web2grid.core.info.BrowserInfo.osNameValue == null) web2grid.core.info.BrowserInfo.detectOs();
	return web2grid.core.info.BrowserInfo.osNameValue;
}
web2grid.core.info.BrowserInfo.detectFlash = function() {
	var flashPlugin = navigator.plugins["Shockwave Flash"];
	if(flashPlugin) {
		web2grid.core.info.BrowserInfo.flashInstalledValue = true;
		var description = navigator.plugins["Shockwave Flash"].description;
		var r = new EReg("Flash ([0-9]+)\\.([.0-9]+)","");
		r.match(description);
		web2grid.core.info.BrowserInfo.flashFullVersionValue = r.matched(1) + "." + r.matched(2);
		web2grid.core.info.BrowserInfo.flashMajorVersionValue = Std.parseInt(r.matched(1));
	}
	else {
		web2grid.core.info.BrowserInfo.flashInstalledValue = false;
	}
}
web2grid.core.info.BrowserInfo.flashInstalled = function() {
	if(web2grid.core.info.BrowserInfo.flashInstalledValue == null) web2grid.core.info.BrowserInfo.detectFlash();
	return web2grid.core.info.BrowserInfo.flashInstalledValue;
}
web2grid.core.info.BrowserInfo.flashFullVersion = function() {
	if(web2grid.core.info.BrowserInfo.flashFullVersionValue == null) web2grid.core.info.BrowserInfo.detectFlash();
	return web2grid.core.info.BrowserInfo.flashFullVersionValue;
}
web2grid.core.info.BrowserInfo.flashMajorVersion = function() {
	if(web2grid.core.info.BrowserInfo.flashMajorVersionValue == null) web2grid.core.info.BrowserInfo.detectFlash();
	return web2grid.core.info.BrowserInfo.flashMajorVersionValue;
}
web2grid.core.info.BrowserInfo.detectHtml5 = function() {
	web2grid.core.info.BrowserInfo.html5xmlHttpRequestLevel2Value = !!(new XMLHttpRequest()).upload;
	web2grid.core.info.BrowserInfo.html5localStorageValue = !!window.localStorage;
	web2grid.core.info.BrowserInfo.html5webWorkersValue = !!window.Worker;
	web2grid.core.info.BrowserInfo.html5webSocketsValue = !!window.WebSocket;
}
web2grid.core.info.BrowserInfo.html5xmlHttpRequestLevel2 = function() {
	if(web2grid.core.info.BrowserInfo.html5xmlHttpRequestLevel2Value == null) web2grid.core.info.BrowserInfo.detectHtml5();
	return web2grid.core.info.BrowserInfo.html5xmlHttpRequestLevel2Value;
}
web2grid.core.info.BrowserInfo.html5localStorage = function() {
	if(web2grid.core.info.BrowserInfo.html5localStorageValue == null) web2grid.core.info.BrowserInfo.detectHtml5();
	return web2grid.core.info.BrowserInfo.html5localStorageValue;
}
web2grid.core.info.BrowserInfo.html5webWorkers = function() {
	if(web2grid.core.info.BrowserInfo.html5webWorkersValue == null) web2grid.core.info.BrowserInfo.detectHtml5();
	return web2grid.core.info.BrowserInfo.html5webWorkersValue;
}
web2grid.core.info.BrowserInfo.html5webSockets = function() {
	if(web2grid.core.info.BrowserInfo.html5webSocketsValue == null) web2grid.core.info.BrowserInfo.detectHtml5();
	return web2grid.core.info.BrowserInfo.html5webSocketsValue;
}
web2grid.core.info.BrowserInfo.prototype.__class__ = web2grid.core.info.BrowserInfo;
if(!haxe.io) haxe.io = {}
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.io.Bytes = function(length,b) { if( length === $_ ) return; {
	this.length = length;
	this.b = b;
}}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	{
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			a.push(0);
		}
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	{
		var _g1 = 0, _g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = s.cca(i);
			if(c <= 127) a.push(c);
			else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			}
			else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
			else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = v & 255;
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		return;
	}
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.compare = function(other) {
	var b1 = this.b;
	var b2 = other.b;
	var len = this.length < other.length?this.length:other.length;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
	}
	return this.length - other.length;
}
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = $closure(String,"fromCharCode");
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		}
		else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127);
		else if(c < 240) {
			var c2 = b[i++];
			s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
		}
		else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
		}
	}
	return s;
}
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
if(!web2grid.core.net) web2grid.core.net = {}
web2grid.core.net.HTTPResponse = function(statusCode,headers,content) { if( statusCode === $_ ) return; {
	this.statusCode = statusCode;
	this.headers = headers;
	this.content = content;
}}
web2grid.core.net.HTTPResponse.__name__ = ["web2grid","core","net","HTTPResponse"];
web2grid.core.net.HTTPResponse.prototype.statusCode = null;
web2grid.core.net.HTTPResponse.prototype.headers = null;
web2grid.core.net.HTTPResponse.prototype.content = null;
web2grid.core.net.HTTPResponse.prototype.__class__ = web2grid.core.net.HTTPResponse;
web2grid.core.net.HTTPRequest = function(method,url) { if( method === $_ ) return; {
	if(web2grid.js.XMLHttpRequestLevel2 != null) {
		this.xhr2 = new web2grid.js.XMLHttpRequestLevel2();
		this.xhr2.addEventListener("progress",$closure(this,"xhr2OnProgress"),false);
		this.xhr2.addEventListener("load",$closure(this,"xhr2OnLoad"),false);
		this.xhr2.addEventListener("error",$closure(this,"xhr2OnError"),false);
		this.xhr2.upload.addEventListener("progress",$closure(this,"xhr2UploadOnProgress"),false);
		this.xhr2.open(method,url,true);
		this.req = this.xhr2;
	}
	else {
		var r = new EReg("(http://)?([^/]*).*","");
		r.match(js.Lib.window.location.href);
		var currentDomain = r.matched(2);
		r.match(url);
		var reuqestDomain = r.matched(2);
		if(currentDomain != reuqestDomain && web2grid.js.XDomainRequest != null) {
			this.xdr = new web2grid.js.XDomainRequest();
			this.xdr.onload = $closure(this,"xdrOnLoad");
			this.xdr.onerror = $closure(this,"xdrOnError");
			this.xdr.open(method,url);
			this.req = this.xdr;
		}
		else {
			this.xhr = new js.XMLHttpRequest();
			this.xhr.onreadystatechange = $closure(this,"xhrOnReadyStateChange");
			this.xhr.open(method,url,true);
			this.req = this.xhr;
		}
	}
	this.method = method;
	if(method == "POST" || method == "PUT") {
		this.ratio = 1;
	}
	else {
		this.ratio = 0;
	}
	this.data = null;
	this.parameters = new Hash();
	this.response = new web2grid.core.tools.AsyncOperation();
}}
web2grid.core.net.HTTPRequest.__name__ = ["web2grid","core","net","HTTPRequest"];
web2grid.core.net.HTTPRequest.get = function(url) {
	return new web2grid.core.net.HTTPRequest("GET",url);
}
web2grid.core.net.HTTPRequest.post = function(url) {
	return new web2grid.core.net.HTTPRequest("POST",url);
}
web2grid.core.net.HTTPRequest.put = function(url) {
	return new web2grid.core.net.HTTPRequest("PUT",url);
}
web2grid.core.net.HTTPRequest.prototype.xhr = null;
web2grid.core.net.HTTPRequest.prototype.xhr2 = null;
web2grid.core.net.HTTPRequest.prototype.xdr = null;
web2grid.core.net.HTTPRequest.prototype.req = null;
web2grid.core.net.HTTPRequest.prototype.method = null;
web2grid.core.net.HTTPRequest.prototype.ratio = null;
web2grid.core.net.HTTPRequest.prototype.parameters = null;
web2grid.core.net.HTTPRequest.prototype.data = null;
web2grid.core.net.HTTPRequest.prototype.response = null;
web2grid.core.net.HTTPRequest.prototype.send = function() {
	this.response.setProgress(0);
	if(this.data == null) {
		if(this.xdr == null) {
			this.req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		else {
			this.xdr.contentType = "application/x-www-form-urlencoded";
		}
		{ var $it0 = this.parameters.keys();
		while( $it0.hasNext() ) { var key = $it0.next();
		{
			if(this.data == null) this.data = "";
			if(this.data != null) this.data += "&";
			this.data += StringTools.urlEncode(key) + "=" + StringTools.urlEncode(this.parameters.get(key));
		}
		}}
	}
	try {
		this.req.send(this.data);
	}
	catch( $e1 ) {
		{
			var e = $e1;
			{
				this.response.setError("");
			}
		}
	}
	return this.response;
}
web2grid.core.net.HTTPRequest.prototype.xhrOnReadyStateChange = function() {
	if(this.xhr.readyState == 4) {
		if(this.xhr.status == 200) {
			this.response.setProgress(1);
			this.response.setResult(new web2grid.core.net.HTTPResponse(null,null,this.xhr.responseText));
		}
		else {
			this.response.setError("Error: " + this.xhr.statusText);
		}
	}
}
web2grid.core.net.HTTPRequest.prototype.xhr2UploadOnProgress = function(evt) {
	if(evt.lengthComputable) {
		var progress = evt.loaded / evt.total;
		progress = this.ratio * progress;
		this.response.setProgress(progress);
	}
}
web2grid.core.net.HTTPRequest.prototype.xhr2OnProgress = function(evt) {
	if(evt.lengthComputable) {
		var progress = evt.loaded / evt.total;
		progress = (1 - this.ratio) * progress + this.ratio;
		this.response.setProgress(progress);
	}
}
web2grid.core.net.HTTPRequest.prototype.xhr2OnLoad = function(evt) {
	this.response.setProgress(1);
	this.response.setResult(new web2grid.core.net.HTTPResponse(null,null,this.xhr2.responseText));
}
web2grid.core.net.HTTPRequest.prototype.xhr2OnError = function(evt) {
	this.response.setError("");
}
web2grid.core.net.HTTPRequest.prototype.xdrOnLoad = function() {
	this.response.setProgress(1);
	this.response.setResult(new web2grid.core.net.HTTPResponse(null,null,this.xdr.responseText));
}
web2grid.core.net.HTTPRequest.prototype.xdrOnError = function() {
	this.response.setError("");
}
web2grid.core.net.HTTPRequest.prototype.uploadRatio = function(ratio) {
	this.ratio = ratio;
}
web2grid.core.net.HTTPRequest.prototype.rawData = function(data) {
	this.data = data;
}
web2grid.core.net.HTTPRequest.prototype.addParam = function(key,value) {
	this.parameters.set(key,value);
}
web2grid.core.net.HTTPRequest.prototype.successCallback = function(successCallback) {
	this.response.onComplete.bind(successCallback);
}
web2grid.core.net.HTTPRequest.prototype.errorCallback = function(errorCallback) {
	this.response.onError.bind(errorCallback);
}
web2grid.core.net.HTTPRequest.prototype.progressCallback = function(progressCallback) {
	this.response.onProgress.bind(progressCallback);
}
web2grid.core.net.HTTPRequest.prototype.__class__ = web2grid.core.net.HTTPRequest;
web2grid.worksource.boinc.State = { __ename__ : ["web2grid","worksource","boinc","State"], __constructs__ : ["New","Running","Done","Error"] }
web2grid.worksource.boinc.State.New = ["New",0];
web2grid.worksource.boinc.State.New.toString = $estr;
web2grid.worksource.boinc.State.New.__enum__ = web2grid.worksource.boinc.State;
web2grid.worksource.boinc.State.Running = ["Running",1];
web2grid.worksource.boinc.State.Running.toString = $estr;
web2grid.worksource.boinc.State.Running.__enum__ = web2grid.worksource.boinc.State;
web2grid.worksource.boinc.State.Done = ["Done",2];
web2grid.worksource.boinc.State.Done.toString = $estr;
web2grid.worksource.boinc.State.Done.__enum__ = web2grid.worksource.boinc.State;
web2grid.worksource.boinc.State.Error = ["Error",3];
web2grid.worksource.boinc.State.Error.toString = $estr;
web2grid.worksource.boinc.State.Error.__enum__ = web2grid.worksource.boinc.State;
web2grid.worksource.boinc.BenchmarkWorkUnit = function(p) { if( p === $_ ) return; {
	this.code = "\r\n\t\t\t// *****************************\r\n\t\t\t// Benchmark WorkUnit Code\r\n\t\t\t// *****************************\r\n\t\t\t\r\n\t\t\tvar settings = js.input.read(\"settings\");\r\n\t\t\t\r\n\t\t\t// settings.type : \t\"int\" - integer / \"float\" - floating point\r\n\t\t\t// settings.oper : \tnumber of operations to excecute\r\n\t\t\t\r\n\t\t\tif (settings == null)\r\n\t\t\t{\r\n\t\t\t\tjs.output.write(\"stderr\", \"Could not read settings.\");\r\n\t\t\t\treturn -1;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tvar start = (new Date()).getTime();\r\n\t\t\t\r\n\t\t\tvar nr = 0;\r\n\t\t\tvar increment = 0;\r\n\t\t\t\r\n\t\t\tif (settings.type == \"int\")\r\n\t\t\t{\r\n\t\t\t\tnr = 131;\r\n\t\t\t\tincrement = 5;\r\n\t\t\t} \r\n\t\t\telse if (settings.type == \"float\")\r\n\t\t\t{\r\n\t\t\t\tnr = 621.218;\r\n\t\t\t\tincrement = 0.0000894;\r\n\t\t\t}\r\n\t\t\telse\r\n\t\t\t{\r\n\t\t\t\tjs.output.write(\"stderr\", \"Invalid benchmark type.\");\r\n\t\t\t\treturn -2;\r\n\t\t\t}\t\t\t\r\n\t\t\t\r\n\t\t\tvar limit = settings.oper / 10;\r\n\t\t\t\r\n\t\t\tfor (var i=0; i < limit; i++)\r\n\t\t\t{\r\n\t\t\t\tnr += increment;\r\n\t\t\t\tnr -= increment;\r\n\t\t\t\tnr *= increment;\r\n\t\t\t\tnr /= increment;\r\n\t\t\t\tnr += increment;\r\n\t\t\t\tnr -= increment;\r\n\t\t\t\tnr *= increment;\r\n\t\t\t\tnr /= increment;\r\n\t\t\t\tnr += increment;\r\n\t\t\t\tnr -= increment;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tvar end = (new Date()).getTime();\r\n\t\t\t\r\n\t\t\tvar result = end - start;\r\n\t\t\t\r\n\t\t\tjs.output.write(\"stdout\", result);\r\n\t\t\t\r\n\t\t\treturn 0;\t\r\n\t\t";
}}
web2grid.worksource.boinc.BenchmarkWorkUnit.__name__ = ["web2grid","worksource","boinc","BenchmarkWorkUnit"];
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.code = null;
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.state = null;
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.operate = function() {
	return false;
}
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.isWorking = function() {
	return false;
}
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.isReportable = function() {
	return false;
}
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.isCompleted = function() {
	return false;
}
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.isError = function() {
	return false;
}
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.getProgress = function() {
	return 0;
}
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.getScreenName = function() {
	return "Benchmark WorkUnit";
}
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.getSource = function() {
	return null;
}
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.terminate = function() {
	null;
}
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.resume = function() {
	null;
}
web2grid.worksource.boinc.BenchmarkWorkUnit.prototype.__class__ = web2grid.worksource.boinc.BenchmarkWorkUnit;
web2grid.worksource.boinc.BenchmarkWorkUnit.__interfaces__ = [web2grid.core.iface.WorkUnit];
web2grid.worksource.boinc.request.FileUpload = function(p) { if( p === $_ ) return; {
	null;
}}
web2grid.worksource.boinc.request.FileUpload.__name__ = ["web2grid","worksource","boinc","request","FileUpload"];
web2grid.worksource.boinc.request.FileUpload.prototype.file_info = null;
web2grid.worksource.boinc.request.FileUpload.prototype.nbytes = null;
web2grid.worksource.boinc.request.FileUpload.prototype.md5_cksum = null;
web2grid.worksource.boinc.request.FileUpload.prototype.offset = null;
web2grid.worksource.boinc.request.FileUpload.prototype.data = null;
web2grid.worksource.boinc.request.FileUpload.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	indent = "";
	var innerindent = indent + "";
	var xml = indent + "<file_upload>\n";
	if(this.file_info != null) xml += innerindent + this.file_info.toXmlString(innerindent);
	if(this.nbytes != null) xml += innerindent + "<nbytes>" + this.nbytes + "</nbytes>\n";
	if(this.md5_cksum != null) xml += innerindent + "<md5_cksum>" + this.md5_cksum + "</md5_cksum>\n";
	if(this.offset != null) xml += innerindent + "<offset>" + this.offset + "</offset>\n";
	xml += "<data>\n";
	xml += this.data;
	return xml;
}
web2grid.worksource.boinc.request.FileUpload.prototype.__class__ = web2grid.worksource.boinc.request.FileUpload;
web2grid.worksource.boinc.request.FileUpload.__interfaces__ = [web2grid.worksource.boinc.BoincData];
web2grid.worksource.boinc.BoincWorkUnit = function(source,unit) { if( source === $_ ) return; {
	web2grid.core.work.BasicWorkUnit.call(this,source,unit.name,unit.application.version.main_program.file_info.url);
	{
		var _g = 0, _g1 = unit.file_ref;
		while(_g < _g1.length) {
			var data = _g1[_g];
			++_g;
			this.addDataUrl(data.open_name,data.file_info.url);
		}
	}
	this.unit = unit;
}}
web2grid.worksource.boinc.BoincWorkUnit.__name__ = ["web2grid","worksource","boinc","BoincWorkUnit"];
web2grid.worksource.boinc.BoincWorkUnit.__super__ = web2grid.core.work.BasicWorkUnit;
for(var k in web2grid.core.work.BasicWorkUnit.prototype ) web2grid.worksource.boinc.BoincWorkUnit.prototype[k] = web2grid.core.work.BasicWorkUnit.prototype[k];
web2grid.worksource.boinc.BoincWorkUnit.prototype.unit = null;
web2grid.worksource.boinc.BoincWorkUnit.prototype.boincresults = null;
web2grid.worksource.boinc.BoincWorkUnit.prototype.boincReportOperation = null;
web2grid.worksource.boinc.BoincWorkUnit.prototype.getScreenName = function() {
	return "Boinc WorkUnit " + this.name;
}
web2grid.worksource.boinc.BoincWorkUnit.prototype.operate = function() {
	var boincsource = (function($this) {
		var $r;
		var $t = $this.source;
		if(Std["is"]($t,web2grid.worksource.boinc.BoincWorkSource)) $t;
		else throw "Class cast error";
		$r = $t;
		return $r;
	}(this));
	var $e = this.state;
	switch( $e[1] ) {
	case 5:
	{
		{
			this.console.logInformation("Building reporting data...",null,this,{ fileName : "BoincWorkUnit.hx", lineNumber : 50, className : "web2grid.worksource.boinc.BoincWorkUnit", methodName : "operate"});
			var result = this.getResult();
			this.boincresults = new Array();
			var streams = result.getFileList();
			if(this.unit.result.wu_name == this.name) {
				{
					var _g = 0;
					while(_g < streams.length) {
						var streamname = streams[_g];
						++_g;
						var ok = false;
						{
							var _g1 = 0, _g2 = this.unit.result.file_ref;
							while(_g1 < _g2.length) {
								var ref = _g2[_g1];
								++_g1;
								if(ref.open_name == streamname) {
									var bres = new web2grid.worksource.boinc.BoincResult(boincsource,this,this.unit.result,ref,result.getFileContent(streamname));
									this.boincresults.push(bres);
									ok = true;
								}
							}
						}
						if(!ok) {
							this.console.logWarning("Could not find result reference for open name: " + streamname,null,null,{ fileName : "BoincWorkUnit.hx", lineNumber : 74, className : "web2grid.worksource.boinc.BoincWorkUnit", methodName : "operate"});
						}
					}
				}
			}
			this.SwitchState(web2grid.core.work.State.Reporting);
		}
	}break;
	case 6:
	{
		{
			{
				var _g = 0, _g1 = this.boincresults;
				while(_g < _g1.length) {
					var result = _g1[_g];
					++_g;
					result.operate();
				}
			}
			var completed = true;
			var error = false;
			{
				var _g = 0, _g1 = this.boincresults;
				while(_g < _g1.length) {
					var result = _g1[_g];
					++_g;
					completed = completed && result.isCompleted();
					error = error || result.isError();
				}
			}
			if(completed) {
				this.console.logNotice("Successfully uploaded results.",null,this,{ fileName : "BoincWorkUnit.hx", lineNumber : 99, className : "web2grid.worksource.boinc.BoincWorkUnit", methodName : "operate"});
				this.resumestate = web2grid.core.work.State.Done;
				this.SwitchState(web2grid.core.work.State.Done);
				boincsource.reportWork(this);
				return true;
			}
			else if(error) {
				this.console.logNotice("There was a problem with uploading the results.",null,null,{ fileName : "BoincWorkUnit.hx", lineNumber : 107, className : "web2grid.worksource.boinc.BoincWorkUnit", methodName : "operate"});
				this.SwitchState(web2grid.core.work.State.Error);
			}
		}
	}break;
	default:{
		{
			return web2grid.core.work.BasicWorkUnit.prototype.operate.call(this);
		}
	}break;
	}
	return false;
}
web2grid.worksource.boinc.BoincWorkUnit.prototype.getBoincResult = function() {
	var boincresult = new web2grid.worksource.boinc.request.Result();
	boincresult.name = this.unit.result.name;
	var result = this.getResult();
	boincresult.final_cpu_time = result.getElapsedTime();
	boincresult.final_elapsed_time = result.getElapsedTime();
	boincresult.exit_status = result.getExitStatus();
	if(this.isError()) {
		boincresult.state = 10;
	}
	else {
		boincresult.state = 5;
	}
	boincresult.platform = this.unit.application.version.platform;
	boincresult.version_num = this.unit.result.version_num;
	boincresult.app_version_num = this.unit.application.version.version_num;
	boincresult.stderr_txt = "";
	{
		var _g = 0, _g1 = this.boincresults;
		while(_g < _g1.length) {
			var res = _g1[_g];
			++_g;
			boincresult.file_info.push(res.getFileInfo());
		}
	}
	return boincresult;
}
web2grid.worksource.boinc.BoincWorkUnit.prototype.getWorkUnitName = function() {
	return this.unit.name;
}
web2grid.worksource.boinc.BoincWorkUnit.prototype.getWorkUnitResultName = function() {
	return this.unit.result.name;
}
web2grid.worksource.boinc.BoincWorkUnit.prototype.getResultByName = function(name) {
	{
		var _g = 0, _g1 = this.boincresults;
		while(_g < _g1.length) {
			var res = _g1[_g];
			++_g;
			if(res.getFileInfo().name == name) {
				return res;
			}
		}
	}
	return null;
}
web2grid.worksource.boinc.BoincWorkUnit.prototype.hxSerialize = function(s) {
	s.serialize(this.unit);
	s.serialize(this.boincresults);
	web2grid.core.work.BasicWorkUnit.prototype.hxSerialize.call(this,s);
}
web2grid.worksource.boinc.BoincWorkUnit.prototype.hxUnserialize = function(s) {
	this.unit = s.unserialize();
	this.boincresults = s.unserialize();
	web2grid.core.work.BasicWorkUnit.prototype.hxUnserialize.call(this,s);
}
web2grid.worksource.boinc.BoincWorkUnit.prototype.__class__ = web2grid.worksource.boinc.BoincWorkUnit;
web2grid.worksource.boinc.request.ResultFileinfo = function(p) { if( p === $_ ) return; {
	null;
}}
web2grid.worksource.boinc.request.ResultFileinfo.__name__ = ["web2grid","worksource","boinc","request","ResultFileinfo"];
web2grid.worksource.boinc.request.ResultFileinfo.prototype.name = null;
web2grid.worksource.boinc.request.ResultFileinfo.prototype.nbytes = null;
web2grid.worksource.boinc.request.ResultFileinfo.prototype.max_nbytes = null;
web2grid.worksource.boinc.request.ResultFileinfo.prototype.md5_cksum = null;
web2grid.worksource.boinc.request.ResultFileinfo.prototype.url = null;
web2grid.worksource.boinc.request.ResultFileinfo.prototype.toXmlString = function(indent) {
	if(indent == null) indent = "";
	var innerindent = indent + "    ";
	var xml = indent + "<file_info>\n";
	if(this.name != null) xml += innerindent + "<name>" + this.name + "</name>\n";
	if(this.nbytes != null) xml += innerindent + "<nbytes>" + this.nbytes + "</nbytes>\n";
	if(this.max_nbytes != null) xml += innerindent + "<max_nbytes>" + this.max_nbytes + "</max_nbytes>\n";
	if(this.md5_cksum != null) xml += innerindent + "<md5_cksum>" + this.md5_cksum + "</md5_cksum>\n";
	if(this.url != null) xml += innerindent + "<url>" + this.url + "</url>\n";
	xml += indent + "</file_info>\n";
	return xml;
}
web2grid.worksource.boinc.request.ResultFileinfo.prototype.__class__ = web2grid.worksource.boinc.request.ResultFileinfo;
web2grid.worksource.boinc.request.ResultFileinfo.__interfaces__ = [web2grid.worksource.boinc.BoincData];
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) {
		r++;
	}
	if(r > 0) return s.substr(r,l - r);
	else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) {
		r++;
	}
	if(r > 0) {
		return s.substr(0,l - r);
	}
	else {
		return s;
	}
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			s += c.substr(0,l - sl);
			sl = l;
		}
		else {
			s += c;
			sl += cl;
		}
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			ns += c.substr(0,l - sl);
			sl = l;
		}
		else {
			ns += c;
			sl += cl;
		}
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	web2grid.core.log.Console.main = new web2grid.core.log.Console(1000,web2grid.core.log.LogLevel.L4_Information,null);
}
{
	js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch( $e1 ) {
						{
							var e1 = $e1;
							{
								throw "Unable to create XMLHttpRequest object.";
							}
						}
					}
				}
			}
		}
	}:(function($this) {
		var $r;
		throw "Unable to create XMLHttpRequest object.";
		return $r;
	}(this));
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
}
{
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
{
	try {
		web2grid.js["XDomainRequest"] = XDomainRequest;
	}
	catch( $e2 ) {
		{
			var e = $e2;
			{
				web2grid.js["XDomainRequest"] = null;
			}
		}
	}
}
{
	web2grid.worksource.boinc.PlatformNames.names = new Hash();
	web2grid.worksource.boinc.PlatformNames.names.set("unknown",web2grid.worksource.boinc.Platforms.Unknown);
	web2grid.worksource.boinc.PlatformNames.names.set("javascript",web2grid.worksource.boinc.Platforms.Javascript);
}
{
	web2grid.js["XMLHttpRequest"] = typeof XMLHttpRequest != 'undefined'?XMLHttpRequest:typeof ActiveXObject != 'undefined'?function() {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch( $e3 ) {
			{
				var e = $e3;
				{
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch( $e4 ) {
						{
							var e1 = $e4;
							{
								throw "Unable to create XMLHttpRequest object.";
							}
						}
					}
				}
			}
		}
	}:(function($this) {
		var $r;
		throw "Unable to create XMLHttpRequest object.";
		return $r;
	}(this));
}
{
	try {
		web2grid.js["XMLHttpRequestLevel2"] = web2grid.js.XMLHttpRequest != null && !!(new XMLHttpRequest()).upload?XMLHttpRequest:null;
	}
	catch( $e5 ) {
		{
			var e = $e5;
			{
				web2grid.js["XMLHttpRequestLevel2"] = null;
			}
		}
	}
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	web2grid.core.info.BrowserInfo.detectOs();
	web2grid.core.info.BrowserInfo.detectBrowser();
	web2grid.core.info.BrowserInfo.detectHtml5();
	web2grid.core.info.BrowserInfo.detectFlash();
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	}
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	}
	d.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		}break;
		case 10:{
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
	}
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	}
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
Xml.enode = new EReg("^<([a-zA-Z0-9:_-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:_-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
haxe.Timer.arr = new Array();
hsl.haxe._DirectSignaler.PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl.haxe._DirectSignaler.PropagationStatus.STOPPED = 2;
hsl.haxe._DirectSignaler.PropagationStatus.UNDISTURBED = 3;
web2grid.ui.SVGUtilities.svgNS = "http://www.w3.org/2000/svg";
web2grid.ui.SVGUtilities.createElementNS = function(x,y){return document.createElementNS(x,y);}
web2grid.ui.SVGUtilities.startAnimation = function(x){x.beginElement();}
web2grid.ui.SVGUtilities.stopAnimation = function(x){x.endElement();}
DateTools.DAYS_OF_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];
haxe.Md5.inst = new haxe.Md5();
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
js.Lib.onerror = null;
web2grid.core.info.BrowserInfo.browserVendorValue = null;
web2grid.core.info.BrowserInfo.browserNameValue = null;
web2grid.core.info.BrowserInfo.browserFullVersionValue = null;
web2grid.core.info.BrowserInfo.browserMajorVersionValue = null;
web2grid.core.info.BrowserInfo.osPlatformValue = null;
web2grid.core.info.BrowserInfo.osNameValue = null;
web2grid.core.info.BrowserInfo.flashInstalledValue = null;
web2grid.core.info.BrowserInfo.flashFullVersionValue = null;
web2grid.core.info.BrowserInfo.flashMajorVersionValue = null;
web2grid.core.info.BrowserInfo.html5xmlHttpRequestLevel2Value = null;
web2grid.core.info.BrowserInfo.html5localStorageValue = null;
web2grid.core.info.BrowserInfo.html5webWorkersValue = null;
web2grid.core.info.BrowserInfo.html5webSocketsValue = null;
Main.main()
