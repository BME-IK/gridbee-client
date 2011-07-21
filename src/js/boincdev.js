
function boincdev_create() {
	var scheduler = viewModel.worksourcetypes.boincdev.parameters.scheduler();
	var authkey = viewModel.worksourcetypes.boincdev.parameters.authkey();
	var ws = new web2grid.worksource.boinc.BoincWorkSource(scheduler, authkey);
	Main.client.addWorkSource(ws);
	console.log('New worksource added: ', ws);
};

function boincdev_remove(project) {
	for (var i = 0; i < project.workunits().length; i++) {
		var workunit = project.workunits()[i];
		workunit.workunit.terminate();
		Main.client.activeworks.remove(workunit.workunit);
		Main.client.passiveworks.remove(workunit.workunit);
	}
	Main.client.sources.remove(project.worksource);
	viewModel.projects.remove(project);
}

viewModel.running.subscribe(function(newValue){
	Main.toggle();
});

viewModel.threads.subscribe(function(newValue){
	Main.client.setTargetActiveWorkNumber(newValue);
	console.log('Number of threads: ', newValue);
});

function findWorkunit(wu) {
	for (var i = 0; i < viewModel.projects().length; i++) {
		var project = viewModel.projects()[i];
		if (project.worksource === ws) return project;
	}
	return null;
}

function findWorksource(ws) {
	for (var i = 0; i < viewModel.projects().length; i++) {
		var project = viewModel.projects()[i];
		if (project.worksource === ws) return project;
	}
	return null;
}


function updateWorkunit(workunit) {
	//console.log('Updating workunit: ', workunit, workunit.workunit.name, workunit.workunit.getState(), workunit.workunit.progress);
	if (Main.client.activeworks.indexOf(workunit.workunit) === -1) {
		workunit.state('Passive');
	} else {
		workunit.state(workunit.workunit.getState());
	}
	workunit.progress(workunit.workunit.progress ? workunit.workunit.progress * 100 : 0);
	var log = workunit.workunit.console.exportAsHtml(100, web2grid.core.log.LogLevel.L4_Information);
	log = log.replace(/<div class="source">[^<]*<\/div>/g, '');
	workunit.console(log);
}


function updateWorkunits(project) {
	//console.log('Updating project: ', project);
	var workunits = Main.client.activeworks.concat(Main.client.passiveworks);
	// Removing workunits that no longer exist
	for (var i = 0; i < project.workunits().length; i++) {
		var workunit = project.workunits()[i].workunit;
		if (workunits.indexOf(workunit) === -1) {
			//console.log('Removing workunit: ', workunit);
			project.workunits.remove(project.workunits()[i]);
		}
	}
	
	// Adding workunits not listed yet
	projectworkunits = project.workunits().map(function(wu){return wu.workunit});
	for (var i = 0; i < workunits.length; i++) {
		var workunit = workunits[i];
		if (workunit.source !== project.worksource) continue;
		if (projectworkunits.indexOf(workunit) === -1) {
			//console.log('New workunit found: ', workunit, workunit.name);
			project.workunits.push({
				workunit : workunit,
	 			state : ko.observable('Computing...'),
	 			progress : ko.observable(50),
	 			console : ko.observable('console2'),
	 			consoleenabled : ko.observable(false)				
			});
		}
	}

	for (var i = 0; i < project.workunits().length; i++) {
		updateWorkunit(project.workunits()[i]);
	}
}

function updateWorksources() {
	if (!Main.client) return;
	//console.log('Updating Worksources: ', viewModel.projects());
	var worksources = Main.client.getWorkSources();
	// Removing projects that no longer exist
	for (var i = 0; i < viewModel.projects().length; i++) {
		var project = viewModel.projects()[i];
		if (worksources.arr.indexOf(project.worksource) === -1) {
			//console.log('Removing worksource: ', project.worksource);
			viewModel.projects.remove(project);
		}
	}
	
	// Adding projects not listed yet
	for (var i = 0; i < worksources.arr.length; i++) {
		var worksource = worksources.arr[i];
		var project = findWorksource(worksource);
		if (project == null) {
			//console.log('New worksource found: ', worksource);
			viewModel.projects.push({
				worksource : worksource,
				name : worksource.getScreenName(),
				url : worksource.scheduler_url,
				authkey : worksource.authinfo.authenticator,
				workunits : ko.observableArray([])
			});
		}
	}
	
	// Refreshing existing worksources
	for (var i = 0; i < viewModel.projects().length; i++) {
		updateWorkunits(viewModel.projects()[i]);
	}
}

setInterval(updateWorksources, 1000);

function onLoad() {
	Main.logdiv = $("#log")[0];
	var Console = web2grid.core.log.Console.main;
	Console.onLog.bind(Main.onLog);
	Console.logNotice("Console loaded.");
	
	var BrowserInfo = web2grid.core.info.BrowserInfo;
	Console.logInformation("OS: " + BrowserInfo.osName() + " " + BrowserInfo.osPlatform());
	Console.logInformation("Browser: " + BrowserInfo.browserVendor() + " " + BrowserInfo.browserName() + " " + BrowserInfo.browserFullVersion());
	Console.logInformation("HTML5 Local Storage: " + BrowserInfo.html5localStorage());
	Console.logInformation("HTML5 WebWorkers: " + BrowserInfo.html5webWorkers());
	Console.logInformation("HTML5 CORS: " + BrowserInfo.html5xmlHttpRequestLevel2());
	
	if (!BrowserInfo.html5webWorkers() || !BrowserInfo.html5localStorage())
	{
		Console.main.logCritical("Your browser does not support HTML5 WebWorkers! This technology is essential for the client to run. Please consider using Google Chrome, Mozzila Firefox or Internet Explorer 10.");
		Main.ok = false;
		return;
	}
	
	Main.ok = true;
	
	Main.client = web2grid.control.Scheduler.loadFromLocalStorage(window.location.pathname);
	var client = Main.client;
	client.setTargetActiveWorkNumber(viewModel.threads());
	client.setTargetPassiveWorkNumber(2);
	client.setRequestInterval(10000);
	
	if (viewModel.running()) client.start(1000);
}
