let banner = {
	'title': '',
	'translate': false,
	'resize': false,
	'bookmark':false,
	'parent':'',
	'parentLink': '',
	'init':(function(options){
		if (options.title){ banner.title = options.title; }
		if (options.translate){ banner.translate = options.translate; }
		if (options.resize){ banner.resize = options.resize; }
		if (options.bookmark){ banner.bookmark = options.bookmark; }
		if (options.parent){ banner.parent = options.parent; }
		if (options.parentLink){ banner.parentLink = options.parentLink; }
		banner.setup();
	}),
	'setup':(function(){
		let veil = '<div class="regional-veil"></div>';
		let map = '<ul id="map" class="notranslate skiptranslate top-dropdown menu-dropdown top-bar" translate="no">';
			map += '<a href="javascript:;" onclick="showSub(\'map\');" title="Close map of Member Localities" class="closing-icon menu-close"><span class="glyphicon glyphicon-remove"></span></a>';
			map += '<li><img data-src="https://www.hrpdcva.gov/templates/regional-bar/img/hr-map.jpg" title="Hampton Roads Planning District Commission Member Localities" alt="Hampton Roads Planning District Commission Member Localities Map" class="not-loaded" /></li>';
		map += '</ul>';
		let mobile = '<ul id="mobile" class="notranslate skiptranslate top-dropdown menu-dropdown top-bar" translate="no">';
			mobile += '<li>';
				mobile += '<a href="javascript:;" onclick="regionalMobileToggle(\'fed\')" title="Show Federal Websites"><span class="glyphicon notranslate skiptranslate glyphicon-plus-sign" id="fed-toggle"></span> Federal Websites</a>';
				mobile += '<ul id="mobile-fed" class="notranslate skiptranslate regional-bar-sub-menu"></ul>';
			mobile += '</li>';
			mobile += '<li>';
				mobile += '<a href="javascript:;" onclick="regionalMobileToggle(\'state\')" title="Show State Websites"><span class="glyphicon notranslate skiptranslate glyphicon-plus-sign" id="state-toggle"></span> State Websites</a>';
				mobile += '<ul id="mobile-state" class="notranslate skiptranslate regional-bar-sub-menu"></ul>';
			mobile += '</li>';
			mobile += '<li>';
			mobile += '<a href="javascript:;" onclick="regionalMobileToggle(\'regional\')" title="Show Regional Websites"><span class="glyphicon notranslate skiptranslate glyphicon-plus-sign" id="regional-toggle"></span> Regional Websites</a>';
				mobile += '<ul id="mobile-regional" class="notranslate skiptranslate regional-bar-sub-menu"></ul>';
			mobile += '</li>';
			mobile += '<li>';
				mobile += '<a href="javascript:;" onclick="regionalMobileToggle(\'govt\')" title="Show Local Government"><span class="glyphicon notranslate skiptranslate glyphicon-plus-sign" id="govt-toggle"></span> Local Gov. Websites</a>';
				mobile += '<ul id="mobile-govt" class="notranslate skiptranslate regional-bar-sub-menu"></ul>';
			mobile += '</li>';
		mobile += '</ul>';
		let fed = '<ul id="fed" class="notranslate skiptranslate top-dropdown menu-dropdown top-bar regional-dropdown" translate="no"></ul>';
		let state = '<ul id="state" class="notranslate skiptranslate top-dropdown menu-dropdown top-bar regional-dropdown" translate="no"></ul>';
		let govt = '<ul id="govt" class="notranslate skiptranslate top-dropdown menu-dropdown top-bar" translate="no"></ul>';
		let regional = '<ul id="regional" class="notranslate skiptranslate top-dropdown menu-dropdown top-bar regional-dropdown" translate="no"></ul>';
		let translate = '<ul id="translate" class="notranslate skiptranslate top-dropdown top-bar" translate="no"></ul>';
		let size = '<ul id="size" class="notranslate skiptranslate top-dropdown top-bar" translate="no">';
			size += '<div class="regional-size-inner-wrap" translate="no">';
				size += '<li><a href="javascript:;" onclick="textSizeChange(\'small\')" class="small-link" title="Smaller"><span class="button-label">Smaller</span> A</a></li>';
				size += '<li><a href="javascript:;" onclick="textSizeChange(\'normal\')" class="normal-link current-size" title="Normal"><span class="button-label">Normal</span> A</a></li>';
				size += '<li><a href="javascript:;" onclick="textSizeChange(\'large\')" class="large-link" title="Larger"><span class="button-label">Larger</span> A</a></li>';
			size += '</div>';
		size += '</ul>';
		let trans = '';
		if(banner.translate === true){
			trans = '<div id="google_translate_element" class="regional-bar-translate-element"></div>';
			trans += '<script type="text/javascript">';
				trans += 'function googleTranslateElementInit() { ';
					trans += 'new google.translate.TranslateElement({pageLanguage: "en", layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, "google_translate_element");';
					trans += "changeGoogleStyles();";
				trans += '}';
			/*trans += 'function googleTranslateElementInit() {';
				trans += "new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,es,fr,tl,ko,vi,zh-CN,ar,de,ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');";
				trans += '}';*/
			trans += '</script>';
			trans += '<script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>';
		}
		let bar = '<div class="top-bar fixed-bar regional-bar notranslate skiptranslate" translate="no">';
			bar += '<div class="pull-left regional-breadcrumb" translate="no">'; //regional-breadcrumb
				bar += '<span class="region-seal"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/hr-seal.png" title="Hampton Roads Virginia, America\'s first Region" /><a href="javascript:;" onclick="showSub(\'map\');" class="map-menu" title="Click to Show Map of Member Localities"><span class="region-text">Hampton Roads, Virginia</span></a></span><!--'; 
				bar += '--><span class="glyphicon notranslate skiptranslate glyphicon-chevron-right"></span><!-- ';
				if(banner.parent != ''){
					bar += ' -->';
					if(banner.parentLink != ''){ bar += '<a href="'+banner.parentLink+'" title="'+banner.parent+'" class="regional-parent-link">'; }
					bar += '<span class="parent-text">'+banner.parent+'</span>';
					if(banner.parentLink != ''){ bar += '</a>'; }
					bar += '<span class="glyphicon notranslate skiptranslate glyphicon-chevron-right parent-chevron"></span><!-- ';
				}
				bar += '--><span class="domain" id="regional-domain-link"><a href="/" title="'+banner.title+'">'+banner.title+'</a></span>';
			bar += '</div>'; // End Breadcrumb
			bar += '<ul class="pull-right regional-nav" translate="no">';
				bar += '<li id="fed-link" class="hidden-xs dropdown-tab" translate="no">';
					bar += '<a href="javascript:;" onclick="showSub(\'fed\');" class="fed-menu" title="Click to Show Federal Websites"><span class="nav-text">Federal <span class="nav-subtext">Websites</span></span><span class="glyphicon notranslate skiptranslate glyphicon-option-vertical"></span></a>';
				bar += '</li>';
				bar += '<li id="state-link" class="hidden-xs dropdown-tab" translate="no">';
					bar += '<a href="javascript:;" onclick="showSub(\'state\');" class="state-menu" title="Click to Show State Websites"><span class="nav-text">State <span class="nav-subtext">Websites</span></span><span class="glyphicon notranslate skiptranslate glyphicon-option-vertical"></span></a>';
				bar += '</li>';
				bar += '<li id="regional-link" class="hidden-xs dropdown-tab" translate="no">';
					bar += '<a href="javascript:;" onclick="showSub(\'regional\');" class="regional-menu" title="Click to Show Regional Websites"><span class="nav-text">Regional <span class="nav-subtext">Websites</span> </span><span class="glyphicon notranslate skiptranslate glyphicon-option-vertical"></span></a>';
				bar += '</li>';
				bar += '<li id="govt-link" class="hidden-xs dropdown-tab" translate="no">';
					bar += '<a href="javascript:;" onclick="showSub(\'govt\');" class="govt-menu" title="Click to Show Localities"><span class="nav-text">Local Gov<span class="nav-subtext">Websites</span></span><span aria-hidden="true" class="glyphicon notranslate skiptranslate glyphicon-option-vertical"></span></a>';
				bar += '</li>';
				bar += '<li id="mobile-link" class="visible-xs-inline-block" translate="no">';
					bar += '<a href="javascript:;" onclick="showSub(\'mobile\');" class="mobile-menu" translate="no" title="Click to Show Links"><span class="glyphicon notranslate skiptranslate glyphicon-link"></span></a>';
				bar += '</li>';
				if(banner.translate === true){
					bar += '<li id="translate-link" translate="no">';
						//bar += '<a href="javascript:;" onclick="showSub(\'translate\');" id="translate-menu" class="translate-menu" title="Translate this Site">';
						bar += '<a href="javascript:;" onclick="jQuery(\'#google_translate_element>div > div\').trigger(\'click\');showSub(\'translate\'); " id="translate-menu" class="translate-menu" title="Click to Show Translate Options">';
							bar += '<span class="nav-text">Translate</span><span class="pseudo-glyph"></span>';
						bar += '</a>';
					bar += '</li>';
				}
				if(banner.resize === true){ 
					bar += '<li id="textsize-link" translate="no" >';
						bar += '<a href="javascript:;" onclick="showSub(\'size\');" class="glyph-button textsize-glyph size-menu" title="Click to Show Size Options"><span class="glyphicon notranslate skiptranslate glyphicon-text-size"></span></a>';
					bar += '</li>';
				}
				if(banner.bookmark === true){ 
					bar += '<li class="hidden-xs" id="bookmark-link" translate="no">';
						bar += '<a href="javascript:;" class="glyph-button bookmark-glyph" id="bookmark-button" title="Click to Bookmark"><span class="glyphicon notranslate skiptranslate glyphicon-bookmark"></span></a>';
					bar += '</li>';
				}
			bar += '</ul>';
		bar += '</div>';
		jQuery('body').prepend(veil, map, mobile, fed, state, govt, regional, bar);
		if(banner.translate === true){ /*jQuery('body').prepend(translate); populateTranslate();*/ jQuery('body').prepend(trans);}
		if(banner.resize === true){ jQuery('body').prepend(size); }
		//jQuery('body').prepend(mobile);
		if(jQuery('#regional-domain-link a').text() == ''){
			jQuery('#regional-domain-link a').attr('title', window.location.hostname).text(window.location.hostname);
		}

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
		getRegionalLinks();
		
	}),
	/* this is for loading images one after another */
	'img_ele':null,
	'img_load':function(ele){
		if (ele) banner.img_ele = ele[0];
		var el = banner.img_ele.querySelector('img.not-loaded');
		if (el) {		
			el.onload = function(e){
				jQuery(this).removeClass('not-loaded');
				banner.img_load();
			}
			el.src=el.getAttribute('data-src');
		}
	}
};
let scrollbarWidth = 0;
jQuery(document).ready(function($) {
	scrollbarWidth = window.innerWidth-$(document).width();

	jQuery(window).click(function(e){
		if(jQuery('.top-dropdown.open').length > 0){
			var clicked = e.target;
			if(jQuery(clicked).parents('.top-bar').length == 0){
				jQuery('.top-dropdown').slideUp('slow').removeClass('open');
				jQuery('.regional-nav .active, .region-seal .active').removeClass('active');
				jQuery('.regional-veil').hide();
				regionUnfreeze();
			}
		}
	});
});


jQuery(window).resize(function(){
	if(window.matchMedia('(max-width: 767px)').matches){
		jQuery('.top-dropdown').slideUp('slow').removeClass('open');
		jQuery('.regional-nav .active, .region-seal .active').removeClass('active');
		
		jQuery('.regional-veil').hide();
		regionUnfreeze();
	}
	if(banner.translate === true){ changeGoogleStyles(); }
	
});
function checkColumns(type){
	let hal = jQuery('#'+type).width()/2;
	jQuery('#'+type+' .regional-bar-children-links').each(function(){
		let parent = jQuery(this).parent('li');
		let pos = parent.position();
		if(pos.left >= hal){ parent.css('float', 'right'); }
	});
}
function showSub(type){
	jQuery('.top-dropdown:not(#'+type+')').slideUp('slow').removeClass('open');
	jQuery('.regional-nav .active').removeClass('active');
	jQuery('.regional-veil').hide();

	let ele = jQuery('#'+type);
	if(!ele.hasClass('open')){
		ele.slideDown('slow').addClass('open');
		jQuery('.'+type+'-menu').addClass('active');
		
		if(type == 'regional' || type == 'govt' || type == 'map' || type == 'state' || type == 'fed'){ 
			jQuery('.regional-veil').show(); regionFreeze(); checkColumns(type);
			if(!ele.hasClass('images-loaded')){
				banner.img_load(ele);
				ele.addClass('images-loaded');
			}
		}
	}else{
		jQuery('#'+type).removeClass('open').slideUp('slow');
		jQuery('.'+type+'-menu').removeClass('active');
		jQuery('.regional-veil').hide();
		regionUnfreeze(); 
	}
	
}
function textSizeChange(size){
	jQuery('.current-size').removeClass('current-size');
	if(size == 'normal'){ jQuery('body').css('font-size', ''); }
	else{ 
		if(size == 'small'){jQuery('body').css('font-size', '.8em');}
		if(size == 'large'){jQuery('body').css('font-size', '1.1em');}
	}
	jQuery('.'+size+'-link').addClass('current-size');
	
}
function translatePage(language){
	var page = window.location.href;
	res = encodeURIComponent(page);
	var link = 'https://translate.google.com/translate?hl=en&sl=en&tl='+language+'&u='+res;
	let pro = window.location.protocol;
	let host = window.location.hostname;
	let path = window.location.pathname;
	link = pro+'//'+host+path;
	link += '#googtrans(en|'+language+')';
	setRegionalCookies('lasttrans', language, '1');
	setRegionalCookies('googtrans', '/en/'+language, '');
	if(language == 'en'){
		//deleteRegionalCookie('googtrans');
	}
	window.location.href = link;
	location.reload(true);
}
function regionalMobileToggle(type){
	jQuery('#mobile-'+type).slideToggle('slow');
	jQuery('#'+type+'-toggle').toggleClass('glyphicon-plus-sign glyphicon-minus-sign');
}
function getRegionalLinks(){
	jQuery.ajax({
		url:'https://www.hrpdcva.gov/regional-banner/',
		success:function(data){
			let list = jQuery.parseJSON(data);
			for (var list_item in list){
				//console.log(list[list_item]);
				let loc = jQuery('#regional'); let split = 'true'; let mob = jQuery('#mobile-regional'); let scr = 'regional';			
					if(list[list_item].title == 'Local Government'){ loc = jQuery('#govt'); split = ''; mob = jQuery('#mobile-govt'); scr = 'govt'; }
					if(list[list_item].title == 'Federal Websites'){ loc = jQuery('#fed'); split = ''; mob = jQuery('#mobile-fed'); scr = 'fed'; }
					if(list[list_item].title == 'State Websites'){ loc = jQuery('#state'); split = ''; mob = jQuery('#mobile-state'); scr = 'state'; }
				let html = '<div class="regional-bar-link-wrap">'; 
				
				let cur = 0;
				let mobile = '';
				let size = Object.keys(list[list_item].links).length;
				let s = Math.ceil(size/2); let kc = 0; let inc = 0; 
				let odd = '<div class="regional-bar-half hidden-sm hidden-xs">'; let even = '<div class="regional-bar-half hidden-sm hidden-xs">';
				//if(split != ''){ html += '<div class="regional-bar-half">'; }
				for (var l in list[list_item].links){
					let curLink = list[list_item].links[l];
					let pathLink = curLink.link;
					if( pathLink != undefined){
						if(pathLink.search('http') == -1){ pathLink = 'http://'+pathLink;}
						mobile += '<li>';
							mobile += '<a href="'+pathLink+'" title="'+curLink.title+'" target="_blank" rel="noreferrer">';
								mobile += curLink.title;
							mobile += '</a>';
							
						html += '<li';
						html += '>'; 
							html += '<a href="'+pathLink+'" title="'+curLink.title+'" target="_blank" rel="noreferrer">';
								html += '<span class="regional-bar-flex">';
									html += '<span class="regional-bar-image-wrap">';
										if(curLink.image != ''){
											html += '<img data-src="https://www.hrpdcva.gov'+curLink.image+'" title="'+curLink.title+'" alt="'+curLink.alt+'" class="not-loaded" />';
										}
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
							if(split == 'true'){
								if(inc%2 == 0){
									odd += '<li>'; 
										odd += '<a href="'+pathLink+'" title="'+curLink.title+'" target="_blank" rel="noreferrer">';
											odd += '<span class="regional-bar-flex">';
												odd += '<span class="regional-bar-image-wrap">';
													odd += '<img data-src="https://www.hrpdcva.gov'+curLink.image+'" title="'+curLink.title+'" alt="'+curLink.alt+'" class="not-loaded" />';
												odd += '</span>';
												odd += '<span class="regional-bar-link-text">';
													odd += '<span class="regional-bar-link-title">';
														odd += curLink.title;
													odd += '</span>';
													odd += '<span class="regional-bar-link-url">';
														odd += curLink.link;
													odd += '</span>';
												odd += '</span>';
											odd += '</span>';
										odd += '</a>';
								}else{
									even += '<li>'; 
										even += '<a href="'+pathLink+'" title="'+curLink.title+'" target="_blank" rel="noreferrer">';
											even += '<span class="regional-bar-flex">';
												even += '<span class="regional-bar-image-wrap">';
													even += '<img data-src="https://www.hrpdcva.gov'+curLink.image+'" title="'+curLink.title+'" alt="'+curLink.alt+'" class="not-loaded" />';
												even  += '</span>';
												even += '<span class="regional-bar-link-text">';
													even += '<span class="regional-bar-link-title">';
														even += curLink.title;
													even += '</span>';
													even += '<span class="regional-bar-link-url">';
														even += curLink.link;
													even += '</span>';
												even += '</span>';
											even += '</span>';
										even += '</a>';
								}
							}
							if(curLink.children){
								html += '<ul class="regional-bar-children-links">';
								if(split == 'true'){ if(inc%2 == 0){ odd += '<ul class="regional-bar-children-links">'; }else{ even += '<ul class="regional-bar-children-links">'; }}
								mobile += '<ul>';
								for (var c in curLink.children){
									if(kc == 0){ cur++; kc++; }
									let kidLink = curLink.children[c];
									let kLink = kidLink.link; let extra = '';
									if(kLink != undefined){
										if(kLink.search('http') == -1){ kLink = 'http://'+kLink;}
										html += '<li';
										if(curLink.children.length == 1){ html += ' class="full-width"';}
										html += '>'; mobile += '<li>';
											html += '<a href="'+kLink+'" title="'+kidLink.title+'" target="_blank" rel="noreferrer">';
												mobile += '<a href="'+kLink+'" title="'+kidLink.title+'" target="_blank" rel="noreferrer">';
													mobile += kidLink.title;
												mobile += '</a>';
												html += '<span class="regional-bar-flex">';
													if(kidLink.image != ''){
														html += '<span class="regional-bar-image-wrap">';
															html += '<img data-src="https://www.hrpdcva.gov'+kidLink.image+'" title="'+kidLink.title+'" alt="'+kidLink.alt+'" class="not-loaded" />';
														html += '</span>';
													}else{ extra = 'style="display:block;"'; }
													html += '<span class="regional-bar-link-text" '+extra+'>';
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
										if(split == 'true'){ 
											if(inc%2 == 0){ 
												odd += '<li>'; 
													odd += '<a href="'+kLink+'" title="'+kidLink.title+'" target="_blank" rel="noreferrer">';
														odd += '<span class="regional-bar-flex">';
															odd += '<span class="regional-bar-image-wrap">';
																odd += '<img data-src="https://www.hrpdcva.gov'+kidLink.image+'" title="'+kidLink.title+'" alt="'+kidLink.alt+'" class="not-loaded" />';
															odd += '</span>';
															odd += '<span class="regional-bar-link-text">';
																odd += '<span class="regional-bar-link-title">';
																	odd += kidLink.title;
																odd += '</span>';
																odd += '<span class="regional-bar-link-url">';
																	odd += kidLink.link;
																odd += '</span>';
															odd += '</span>';
														odd += '</span>';
													odd += '</a>';
												odd += '</li>';
											}else{ 
												even += '<li>'; 
													even += '<a href="'+kLink+'" title="'+kidLink.title+'" target="_blank" rel="noreferrer">';
														even += '<span class="regional-bar-flex">';
															even += '<span class="regional-bar-image-wrap">';
																even += '<img data-src="https://www.hrpdcva.gov'+kidLink.image+'" title="'+kidLink.title+'" alt="'+kidLink.alt+'" class="not-loaded" />';
															even += '</span>';
															even += '<span class="regional-bar-link-text">';
																even += '<span class="regional-bar-link-title">';
																	even += kidLink.title;
																even += '</span>';
																even += '<span class="regional-bar-link-url">';
																	even += kidLink.link;
																even += '</span>';
															even += '</span>';
														even += '</span>';
													even += '</a>';
												even += '</li>';
											}
										}
									}
								}
								
								html += '</ul>'; mobile += '</ul>';
								if(split == 'true'){ if(inc%2 == 0){ odd += '</ul>'; }else{ even += '</ul>'; }}
							}
						if(split == 'true'){ if(inc%2 == 0){ odd += '</li>'; }else{ even += '</li>'; }}
						html += '</li>'; mobile += '</li>';
						
					}
					cur++; inc++;
					//if(split != '' && cur == s){ html += '</div><div class="regional-bar-half">'; }
					
				}
				//if(split != ''){ html += '</div>'; }
				//if(split != ''){ odd += '</div>'; even += '</div>'; html += odd+even; }
				if(scr == 'fed' || scr == 'state'){
					let allLink = '';
					html += '<li class="regional-bar-view-all">';
						if(scr == 'fed'){ 
							allLink = '<a href="https://www.usa.gov/federal-agencies/a" title="View all Federal Government Websites" target="_blank" rel="noreferrer">';
								allLink += 'For a full listing of Federal Government websites click here. <span class="glyphicon glyphicon-new-window"></span>';
							allLink += '</a>';
						}
						if(scr == 'state'){ 
							allLink = '<a href="https://www.virginia.gov/agencies" title="View all Virginia Government Websites" target="_blank" rel="noreferrer">';
								allLink += 'For a full listing of Virginia Government websites click here. <span class="glyphicon glyphicon-new-window"></span>';
							allLink += '</a>';
						}
						html += allLink;
					html += '</li>';
					mobile += '<li>'+allLink+'</li>';
				}
				html += '</div>';
				html += '<button type="button" class="regional-scroll-indicator" href="javascript:;" onclick="scrollMe(\''+scr+'\')"><span class="glyphicon glyphicon-chevron-down"></span> Show More</button>';
				loc.html(html); mob.html(mobile);
			}
		},
		complete: function(){
			jQuery('.regional-bar-link-wrap').scroll(function(){
				let me = jQuery(this).parent('.menu-dropdown').attr('id');
				if(this.scrollHeight- jQuery(this).scrollTop() == jQuery(this).outerHeight()) {
			        jQuery('#'+me).children('.regional-scroll-indicator').attr('onclick', 'regionalScrollTop(\''+me+'\');').children('.glyphicon').toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
			    }else{
			    	jQuery('#'+me).children('.regional-scroll-indicator').attr('onclick', 'scrollMe(\''+me+'\');').children('.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
			    }
			});
		}
	});
}
function populateTranslate(){
	let html = '';
	html += '<li class="dropdown-note">';
		html += '<a href="javascript:;" onclick="showSub(\'translate\')" class="closing-icon"><span class="glyphicon notranslate skiptranslate glyphicon-remove"></span></a>';
		html += '<span class="dropdown-title">Translate this Website</span>';
		html += '<span class="dropdown-subtitle">powered by Google Translate</span>';
	html += '</li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'en\');" title="Translate to English"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/flags/united_states.jpg" title="Translate to English" alt="US Flag"/>English (US)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'es\');" title="Translate to Spanish"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/flags/spain.jpg" title="Translate to Spanish" alt="Flag for Spain"/>espa&ntilde;ol (Spanish / Castilian)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'fr\');" title="Translate to French"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/flags/france.jpg" title="Translate to French" alt="Flag for France"/>fran&ccedil;ais (French)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'tl\');" title="Translate to Filipino"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/flags/philippines.jpg" title="Translate to Filipino" alt="Flag for Philippines"/>Tagalog (Filipino)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'ko\');" title="Translate to Korean"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/flags/republic_of_korea.jpg" title="Translate to Korean" alt="Flag for Korea"/>&#xD55C;&#xAD6D;&#xC5B4; / Hanguk-eo (Korean)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'vi\');" title="Translate to Vietnamese"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/flags/vietnam.jpg" title="Translate to Vietnamese" alt="Flag for Vietnam"/>Ti&#x1EBF;ng Vi&#x1EC7;t (Vietnamese)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'zh-CN\');" title="Translate to Mandarin"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/flags/china.jpg" title="Translate to Chinese" alt="Flag for China"/>&#x5B98;&#x8BDD;; &#x5B98;&#x8A71;; / Gu&#257;nhu&agrave; (Mandarin)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'ar\');" title="Translate to Arabic"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/flags/ara.jpg" title="Translate to Arabic" alt="Flag for Saudi Arabia"/>&#x644;&#x639;&#x64E;&#x631;&#x64E;&#x628;&#x650;&#x64A;&#x64E;&#x651;&#x629; / &#x639;&#x64E;&#x631;&#x64E;&#x628;&#x650;&#x64A;&#x651; arabiyy / al-\'arabiyyah (Arabic)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'de\');" title="Translate to German"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/flags/germany.jpg" title="Translate to German" alt="Flag for Germany"/>Deutsch (German)</a></li>';
	html += '<li><a href="javascript:;" onclick="translatePage(\'ru\');" title="Translate to Russian"><img src="https://www.hrpdcva.gov/templates/regional-bar/img/flags/russia.jpg" title="Translate to Russian" alt="Flag for Russian"/>&#x440;&#x443;&#x441;&#x441;&#x43A;&#x438;&#x439; &#x44F;&#x437;&#x44B;&#x43A; (Russian)</a></li>';
	
	jQuery('#translate').html(html);
}

function regionFreeze() {
	var top= window.scrollY; 
	document.body.style.overflow= 'hidden';
	jQuery('html').css('overflow', 'hidden');
	window.onscroll= function() { window.scroll(0, top); }
	
	jQuery('.regional-bar .pull-right.regional-nav').css('margin-right', scrollbarWidth+'px');
	jQuery('html').css('margin-right', scrollbarWidth+'px');
	
}

function regionUnfreeze() {
	document.body.style.overflow= '';
	jQuery('html').css('overflow', '');
	window.onscroll= null;
	
	jQuery('.regional-bar .pull-right.regional-nav').css('margin-right', '');
	jQuery('html').css('margin-right', '');
}

function scrollMe(me){
	let ele = jQuery('#'+me+' .regional-bar-link-wrap');
	if(me == 'regional'){ ele = jQuery('#'+me+' .regional-bar-link-wrap'); }
	let curS = ele.scrollTop();
	
	ele.scrollTop(curS+200);
	if(ele[0].scrollHeight- ele.scrollTop() == ele.outerHeight()) {
        jQuery('#'+me).children('.regional-scroll-indicator').attr('onclick', 'regionalScrollTop(\''+me+'\');').children('.glyphicon').toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
    }
}
function regionalScrollTop(me){
	let ele = jQuery('#'+me+' .regional-bar-link-wrap');
	if(me == 'regional'){ ele = jQuery('#'+me+' .regional-bar-link-wrap'); }
	ele.scrollTop(0);
	jQuery('#'+me).children('.regional-scroll-indicator').attr('onclick', 'scrollMe(\''+me+'\');').children('.glyphicon').toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}

function deleteRegionalCookie( name ) {
  document.cookie = name + '=; expires=-1;';
}
var isSubdomain = function(host) {
    url = host || 'http://www.test-domain.com'; // just for the example
    var regex = new RegExp(/^([a-z]+\:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);
    return !!url.match(regex); // make sure it returns boolean
}
function setRegionalCookies(cname, cvalue, exdays){
	var d = new Date();
	var expires = '';
	if(exdays != ''){
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    expires = "expires="+d.toUTCString()+"; ";
	}

	let host = window.location.hostname;
	
    document.cookie = cname + "=" + cvalue + "; " + expires+"path=/;";
    if(isSubdomain(host) === true){
    	host = window.location.hostname
    	let parts = location.hostname.split('.');
    	host = parts.slice(-2).join('.');
    }
    document.cookie = cname + "=" + cvalue + "; " + expires+"path=/;domain=."+host+";";
}
function getRegionalCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function changeGoogleStyles() {
	if(jQuery('.goog-te-menu-frame').length > 0){
	if($('.goog-te-menu-frame').contents().find('.goog-te-menu2').length) {
		$('.goog-te-menu-frame').contents().find('body').css({
			'overflow': 'auto'
		}).find('.goog-te-menu2').css({
			'border': '0'
		});
		
		var head  = document.getElementsByTagName('head')[0];
		let test = jQuery(head).children('link[rel="stylesheet"]');
		let last = test.slice(-1)[0] 
		var link  = document.createElement('link');
		link.id   = 'newstyles';
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = 'https://www.hrpdcva.gov/templates/regional-bar/css/regional-bar-translate.css';
		link.media = 'all';
		if($('.goog-te-menu-frame').contents().find('head').find('#newstyles').length == 0){
			$('.goog-te-menu-frame').contents().find('head').append(link);
		}
		/*$('.goog-te-menu-frame').contents().find('.goog-te-menu2').css({
			'max-width':'100%',
			'width': '100%',
			'overflow':'auto',
			'box-sizing':'border-box',
			'height':'auto'
		});*/
	} else {
		setTimeout(changeGoogleStyles, 50);
	}
	} else {
		setTimeout(changeGoogleStyles, 50);
	}
}