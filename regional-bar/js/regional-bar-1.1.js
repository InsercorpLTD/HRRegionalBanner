let banner = {
	'title': '',
	'translate': false,
	'resize': false,
	'bookmark':false,
	'init':(function(options){
		if (options.title){ banner.title = options.title; }
		if (options.translate){ banner.translate = options.translate; }
		if (options.resize){ banner.resize = options.resize; }
		if (options.bookmark){ banner.bookmark = options.bookmark; }
		banner.setup();
	}),
	'setup':(function(){
		let mobile = '<ul id="mobile" class="notranslate top-dropdown menu-dropdown top-bar">';
			mobile += '<li>';
			mobile += '<a href="javascript:;" onclick="regionalMobileToggle(\'regional\')"><span class="glyphicon glyphicon-plus-sign" id="regional-toggle"></span> Regional Websites</a>';
				mobile += '<ul id="mobile-regional" class="notranslate regional-bar-sub-menu"></ul>';
			mobile += '</li>';
			mobile += '<li>';
				mobile += '<a href="javascript:;" onclick="regionalMobileToggle(\'govt\')"><span class="glyphicon glyphicon-plus-sign" id="govt-toggle"></span> Local Governments</a>';
				mobile += '<ul id="mobile-govt" class="notranslate regional-bar-sub-menu"></ul>';
			mobile += '</li>';
		mobile += '</ul>';
		let govt = '<ul id="govt" class="notranslate top-dropdown menu-dropdown top-bar"></ul>';
		let regional = '<ul id="regional" class="notranslate top-dropdown menu-dropdown top-bar"></ul>';
		let translate = '<ul id="translate" class="notranslate top-dropdown top-bar"></ul>';
		let size = '<ul id="size" class="notranslate top-dropdown top-bar">';
			size += '<li><a href="javascript:;" onclick="textSizeChange(\'small\')" class="small-link">A</a></li>';
			size += '<li><a href="javascript:;" onclick="textSizeChange(\'normal\')" class="normal-link current-size">A</a></li>';
			size += '<li><a href="javascript:;" onclick="textSizeChange(\'large\')" class="large-link">A</a></li>';
		size += '</ul>';
		let bar = '<div class="top-bar fixed-bar regional-bar">';
			bar += '<div class="pull-left regional-breadcrumb">'; //regional-breadcrumb
				bar += '<span class="region-seal"><a href="http://hrpdcva.gov/" title="Hampton Roads Virginia, America\'s first Region" target="_blank"><img src="http://hrpdcva.gov/templates/regional-bar/img/hr-seal.png" title="Hampton Roads Virginia, America\'s first Region" /><span class="region-text">Hampton Roads, Virginia</span></a></span><!--'; 
				bar += '--><span class="glyphicon glyphicon-chevron-right"></span><!-- ';
				bar += '--><span class="domain" id="regional-domain-link"><a href="/" title="'+banner.title+'">'+banner.title+'</a></span>';
			bar += '</div>'; // End Breadcrumb
			bar += '<ul class="pull-right regional-nav">';
				bar += '<li id="regional-link" class="hidden-xs">';
					bar += '<a href="javascript:;" onclick="showSub(\'regional\');" class="regional-menu"><span class="nav-text"><span class="nav-subtext">Regional</span> Websites</span><span class="glyphicon glyphicon-option-vertical"></span></a>';
				bar += '</li>';
				bar += '<li id="govt-link" class="hidden-xs">';
					bar += '<a href="javascript:;" onclick="showSub(\'govt\');" class="govt-menu"><span class="nav-text"><span class="nav-subtext">Local</span> Governments</span><span class="glyphicon glyphicon-option-vertical"></span></a>';
				bar += '</li>';
				bar += '<li id="mobile-link" class="visible-xs-inline-block">';
					bar += '<a href="javascript:;" onclick="showSub(\'mobile\');" class="mobile-menu"><span class="glyphicon glyphicon-link"></span></a>';
				bar += '</li>';
				if(banner.translate === true){
					bar += '<li id="translate-link">';
						bar += '<a href="javascript:;" onclick="showSub(\'translate\');" id="translate-menu" class="translate-menu">';
							bar += '<span class="nav-text">Translate</span><span class="pseudo-glyph"></span>';
						bar += '</a>';
					bar += '</li>';
				}
				if(banner.resize === true){ 
					bar += '<li id="textsize-link">';
						bar += '<a href="javascript:;" onclick="showSub(\'size\');" class="glyph-button textsize-glyph size-menu"><span class="glyphicon glyphicon-text-size"></span></a>';
					bar += '</li>';
				}
				if(banner.bookmark === true){ 
					bar += '<li class="hidden-xs" id="bookmark-link">';
						bar += '<a href="javascript:;" class="glyph-button bookmark-glyph" id="bookmark-button"><span class="glyphicon glyphicon-bookmark"></span></a>';
					bar += '</li>';
				}
			bar += '</ul>';
		bar += '</div>';
		jQuery('body').prepend(mobile, govt, regional, bar);
		if(banner.translate === true){ jQuery('body').prepend(translate); populateTranslate(); }
		if(banner.resize === true){ jQuery('body').prepend(size); }
		//jQuery('body').prepend(mobile);
		if(jQuery('#regional-domain-link a').text() == ''){
			jQuery('#regional-domain-link a').attr('title', window.location.hostname).text(window.location.hostname);
		}
		getRegionalLinks();
	})
};

jQuery(document).ready(function($) {
	
	jQuery('#bookmark-button').click(function(e) {
		var bookmark_Page_URL = window.location.href;
		var bookmark_Page_Title = document.title;
		
		if ('addToHomescreen' in window && window.addToHomescreen.isCompatible) {
		  // For Mobile browsers
		  addToHomescreen({ autostart: false, startDelay: 0 }).show(true);
		} else if (window.sidebar && window.sidebar.addPanel) {
		  // For Firefox version < 23
		  window.sidebar.addPanel(bookmark_Page_Title, bookmark_Page_URL, '');
		} else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) {
		  // For Firefox version >= 23 and Opera Hotlist
		  $(this).attr({
		    href: bookmark_Page_URL,
		    title: bookmark_Page_Title,
		    rel: 'sidebar'
		  }).off(e);
		  return true;
		} else if (window.external && ('AddFavorite' in window.external)) {
		  // IE Favorite
		  window.external.AddFavorite(bookmark_Page_URL, bookmark_Page_Title);
		} else {
		  // Other browsers (mainly WebKit - Chrome/Safari)
		  alert('Please Press ' + (/Mac/i.test(navigator.userAgent) ? 'Cmd' : 'Ctrl') + '+D to bookmark this web page.');
		}
		return false;
	});
	jQuery(window).click(function(e){
		var clicked = e.target;
		if(jQuery(clicked).parents('.top-bar').length == 0){
			jQuery('.top-dropdown').slideUp('slow').removeClass('open');
			jQuery('.regional-nav .active').removeClass('active');
			
		}
	});
});
jQuery(window).resize(function(){
	jQuery('.top-dropdown').slideUp('slow').removeClass('open');
	jQuery('.regional-nav .active').removeClass('active');
	
});
function showSub(type){
	jQuery('.top-dropdown:not(#'+type+')').slideUp('slow').removeClass('open');
	jQuery('.regional-nav .active').removeClass('active');
	if(!jQuery('#'+type).hasClass('open')){
		jQuery('#'+type).slideDown('slow').addClass('open');
		jQuery('.'+type+'-menu').addClass('active');
	}else{
		jQuery('#'+type).removeClass('open').slideUp('slow');
		jQuery('.'+type+'-menu').removeClass('active');
	}
	
}
function textSizeChange(size){
	jQuery('.current-size').removeClass('current-size');
	if(size == 'normal'){ jQuery('body').css('font-size', ''); }
	else{ jQuery('body').css('font-size', size); }
	jQuery('.'+size+'-link').addClass('current-size');
}
function translatePage(language){
	var page = window.location.href;
	res = encodeURIComponent(page);
	var link = 'https://translate.google.com/translate?hl=en&sl=auto&tl='+language+'&u='+res;
	
	window.open(link, '_self');
}
function regionalMobileToggle(type){
	jQuery('#mobile-'+type).slideToggle('slow');
	jQuery('#'+type+'-toggle').toggleClass('glyphicon-plus-sign glyphicon-minus-sign');
}
function getRegionalLinks(){
	jQuery.ajax({
		url:'http://hrpdcva.gov/regional-banner/',
		success:function(data){
			let list = jQuery.parseJSON(data);
			for (var list_item in list){
				//console.log(list[list_item]);
				let loc = jQuery('#regional'); let split = 'true'; let mob = jQuery('#mobile-regional');				
					if(list[list_item].title == 'Local Government'){ loc = jQuery('#govt'); split = ''; mob = jQuery('#mobile-govt');}
				let html = '<div class="regional-bar-link-wrap">'; let cur = 0;
				let mobile = '';
				let size = Object.keys(list[list_item].links).length;
				let s = Math.ceil(size/2); let kc = 0;
				if(split != ''){ html += '<div class="regional-bar-half">'; }
				for (var l in list[list_item].links){
					let curLink = list[list_item].links[l];
					let pathLink = curLink.link;
					if(pathLink.search('http') == -1){ pathLink = 'http://'+pathLink;}
					mobile += '<li>';
						mobile += '<a href="'+pathLink+'" title="'+curLink.title+'" target="_blank">';
							mobile += curLink.title;
						mobile += '</a>';
						
					html += '<li>';
						html += '<a href="'+pathLink+'" title="'+curLink.title+'" target="_blank">';
							html += '<span class="regional-bar-flex">';
								html += '<span class="regional-bar-image-wrap">';
									html += '<img src="http://hrpdcva.gov'+curLink.image+'" title="'+curLink.title+'" alt="'+curLink.alt+'"/>';
								html += '</span>';
								html += '<span class="regional-bar-link-text">';
									html += '<span class="regional-bar-link-title">';
										html += curLink.title;
									html += '</span>';
									html += '<span class="regional-bar-link-url">';
										html += curLink.link;
									html += '</span>';
								html += '</span>';
							html += '</span>';
						html += '</a>';
						if(curLink.children){
							html += '<ul class="regional-bar-children-links">';
							mobile += '<ul>';
							for (var c in curLink.children){
								if(kc == 0){ cur++; kc++; }
								let kidLink = curLink.children[c];
								let kLink = kidLink.link;
								if(kLink.search('http') == -1){ kLink = 'http://'+kLink;}
								html += '<li>'; mobile += '<li>';
									html += '<a href="'+kLink+'" title="'+kidLink.title+'" target="_blank">';
										mobile += '<a href="'+kLink+'" title="'+kidLink.title+'" target="_blank">';
											mobile += kidLink.title;
										mobile += '</a>';
										html += '<span class="regional-bar-flex">';
											html += '<span class="regional-bar-image-wrap">';
												html += '<img src="http://hrpdcva.gov'+kidLink.image+'" title="'+kidLink.title+'" alt="'+kidLink.alt+'"/>';
											html += '</span>';
											html += '<span class="regional-bar-link-text">';
												html += '<span class="regional-bar-link-title">';
													html += kidLink.title;
												html += '</span>';
												html += '<span class="regional-bar-link-url">';
													html += kidLink.link;
												html += '</span>';
											html += '</span>';
										html += '</span>';
									html += '</a>';
								html += '</li>'; mobile += '</li>';
							}
							html += '</ul>'; mobile += '</ul>';
						}
					html += '</li>'; mobile += '</li>';
					cur++;
					if(split != '' && cur == s){ html += '</div><div class="regional-bar-half">'; }
				}
				if(split != ''){ html += '</div>'; }
				html += '</div>';
				loc.html(html); mob.html(mobile);
			}
			/*list.each(function(){
				console.log(this.title);
			});*/
			//console.log(list[1]);
		}
	});
}
function populateTranslate(){
	let html = '';
	html += '<li class="dropdown-note">';
		html += '<a href="javascript:;" onclick="showSub(\'translate\')" class="closing-icon"><span class="glyphicon glyphicon-remove"></span></a>';
		html += '<span class="dropdown-title">Translate this Website</span>';
		html += '<span class="dropdown-subtitle">powered by Google Translate</span>';
	html += '</li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'en\');" title="Translate to English"><img src="http://hrpdcva.gov/templates/regional-bar/img/flags/united_states.jpg" title="Translate to English" alt="US Flag"/>English (US)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'es\');" title="Translate to Spanish"><img src="http://hrpdcva.gov/templates/regional-bar/img/flags/spain.jpg" title="Translate to Spanish" alt="Flag for Spain"/>espa&ntilde;ol (Spanish / Castilian)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'fr\');" title="Translate to French"><img src="http://hrpdcva.gov/templates/regional-bar/img/flags/france.jpg" title="Translate to French" alt="Flag for France"/>fran&ccedil;ais (French)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'tl\');" title="Translate to Filipino"><img src="http://hrpdcva.gov/templates/regional-bar/img/flags/philippines.jpg" title="Translate to Filipino" alt="Flag for Philippines"/>Tagalog (Filipino)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'ko\');" title="Translate to Korean"><img src="http://hrpdcva.gov/templates/regional-bar/img/flags/republic_of_korea.jpg" title="Translate to Korean" alt="Flag for Korea"/>&#xD55C;&#xAD6D;&#xC5B4; / Hanguk-eo (Korean)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'vi\');" title="Translate to Vietnamese"><img src="http://hrpdcva.gov/templates/regional-bar/img/flags/vietnam.jpg" title="Translate to Vietnamese" alt="Flag for Vietnam"/>Ti&#x1EBF;ng Vi&#x1EC7;t (Vietnamese)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'zh-CN\');" title="Translate to Mandarin"><img src="http://hrpdcva.gov/templates/regional-bar/img/flags/china.jpg" title="Translate to Chinese" alt="Flag for China"/>&#x5B98;&#x8BDD;; &#x5B98;&#x8A71;; / Gu&#257;nhu&agrave; (Mandarin)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'ar\');" title="Translate to Arabic"><img src="http://hrpdcva.gov/templates/regional-bar/img/flags/ara.jpg" title="Translate to Arabic" alt="Flag for Saudi Arabia"/>&#x644;&#x639;&#x64E;&#x631;&#x64E;&#x628;&#x650;&#x64A;&#x64E;&#x651;&#x629; / &#x639;&#x64E;&#x631;&#x64E;&#x628;&#x650;&#x64A;&#x651; arabiyy / al-\'arabiyyah (Arabic)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'de\');" title="Translate to German"><img src="http://hrpdcva.gov/templates/regional-bar/img/flags/germany.jpg" title="Translate to German" alt="Flag for Germany"/>Deutsch (German)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'ru\');" title="Translate to Russian"><img src="http://hrpdcva.gov/templates/regional-bar/img/flags/russia.jpg" title="Translate to Russian" alt="Flag for Russian"/>&#x440;&#x443;&#x441;&#x441;&#x43A;&#x438;&#x439; &#x44F;&#x437;&#x44B;&#x43A; (Russian)</a></li>';
	
	jQuery('#translate').html(html);
}