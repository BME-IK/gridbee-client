
var select = function(set, select, unselect, defaultSelect)
{
	//console.log(select);
	set = $(set);
	var target = set.filter(select);
	if (unselect === true && target.hasClass('active'))
	{
		target.removeClass('active');
		if (typeof(defaultSelect) != 'undefined')
		{
			set.filter(defaultSelect).addClass('active');
		}
		return;
	}
	set.filter('.active').removeClass('active');
	target.addClass('active');
}

var togglePanel = function(panelId)
{
	var selected = $('.panel').filter('.active')[0];
	$('.panel').filter('.active').removeClass('active');
	if (selected.getAttribute('id') === panelId)
	{
		$('#mainpanel').addClass('active');
	} else {
		$('#' + panelId).addClass('active');
	}
}

var viewModel = {
	running : ko.observable(false),
	
	threads : ko.observable(1),
	
	projects : ko.observableArray([]),
	
	newworksource : {
		type : ko.observable(''),
		url : ko.observable(''),
		authkey : ko.observable(''),
		username : ko.observable(''),
		password : ko.observable('')
	},
	
	worksourcetypes : {
		boinc : {
			icon : 'http://boinc.berkeley.edu/logo/www_logo.gif',
			description : 'BOINC project',
			parameters : {
				url : ko.observable(''),
				authkey : ko.observable(''),
				username : ko.observable(''),
				password : ko.observable('')
			},
			projecturl_ok : ko.observable(false),
			ok : ko.observable(false),
			create : function() {
				alert('boinc worksource create');
			},
			checkprojecturl : function() {
				viewModel.worksourcetypes.boinc.projecturl_ok(true);
				console.log(1);
			},
			checklogin : function() {
				viewModel.worksourcetypes.boinc.ok(true);
			},
			checkauthkey : function() {
				viewModel.worksourcetypes.boinc.ok(true);
			},
		},
		boincdev : {
			icon : 'http://boinc.berkeley.edu/logo/www_logo.gif',
			description : 'BOINC dev project',
			parameters : {
				scheduler : ko.observable('http://ui.hpc.iit.bme.hu/wcdemo_cgi/cgi'),
				authkey : ko.observable('1d0f37563ceb7d1ed372a932dcdb5d85'),
			},
			ok : ko.observable(true),
			create : function() {boincdev_create();},
		},
		debug : {
			icon : 'img/gear2.svg',
			description : 'Debug worksource',
		}
	},
	
};

viewModel.worksourcetypes.boinc.checkfunction = ko.dependentObservable(function(){
	return this.url().length > 0 && (this.authkey().length > 0 || (this.username().length > 0 && this.password().length > 0));
}, viewModel.worksourcetypes.boinc.parameters);


ko.applyBindings(viewModel);

