var sfit_module = ["SFIT","Workout", "Diet"];
var icons = []

function get_doctypes(module){	
for(var i=0; i<sfit_module.length; i++){
	frappe.call({
	method: "frappe.desk.moduleview.get",
	args: {
	module: module[i]
	},	
	callback: function(r){
	console.log(r.message)	
	for (var j = 0; j < r.message.data.length; j++) {
		var h='';
		for(var k = 0; k < r.message.data[j].items.length; k++){ if(h){
		 h  = h +'<li><a href="#List/'+r.message.data[j].items[k].name+'"><i class="fa fa-circle-o"></i>'+r.message.data[j].items[k].name+'</a></li>'

		}
		else{
		 h  ='<li><a href="#List/'+r.message.data[j].items[k].name+'"><i class="fa fa-circle-o"></i>'+r.message.data[j].items[k].name+'</a></li>'

		}
		  }
			$('.sidebar-menu').append('<li class="treeview" ><a href="#"><i class="fa fa-eercast"></i>\
            <span>'+r.message.data[j].label+'</span>\
            <span class="pull-right-container">\
              <i class="fa fa-angle-left pull-right"></i>\
            </span>\
          </a>\
          <ul class="treeview-menu">\
 			'+h+'\
          </ul>\
        </li>');	
	}
	},
	freeze: true,
	});
}
}



function selection(){
	if (window.location.hostname == "localhost" || "gym.tridotstech.com"){
		var module = sfit_module; 
		get_doctypes(module);
	}
	else{return 0;}
}

$(document).ready(function() {
	$('header').prepend(frappe.render_template("logo"));
	$('header .navbar .container').prepend(frappe.render_template("sidebar-toggle"));
	$('.main-section').append(frappe.render_template("main-sidebar"));

	$('header').addClass('main-header');
	$('header .navbar').removeClass('navbar-fixed-top');
	$('body').addClass('skin-blue sidebar-mini sidebar-collapse');	
	$('#body_div').addClass('content-wrapper');	
	
	bdtheme.set_user_background();
	selection();
	

});



frappe.provide("bdtheme");

// add toolbar icon
$(document).bind('toolbar_setup', function() {
	frappe.app.name = "bdoop Erp";
	$('.navbar-home').html(frappe._('Home'));

});

bdtheme.set_user_background = function(src, selector, style){
	if(!selector) selector = "#page-desktop";
	if(!style) style = "Fill Screen";
	if(src) {
		if (window.cordova && src.indexOf("http") === -1) {
			src = frappe.base_url + src;
		}
		var background = repl('background: url("%(src)s") center center;', {src: src});
	} else {
		var background = "background-color: #FFFFFF;";
	}

	frappe.dom.set_style(repl('%(selector)s { \
		%(background)s \
		%(style)s \
	}', {
		selector:selector,
		background:background,
		style: ""
	}));
}

frappe.templates["logo"] = '<a href="/desk" class="logo">'
+     ' <span class="logo-mini"><b>bd</b></span>'
+'      <span class="logo-lg"><b>bdoop</b></span>'
+'    </a>';

frappe.templates["sidebar-toggle"] = '<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">'
+	        '<span class="sr-only">Toggle navigation</span>'
+	    '</a>';
// 
