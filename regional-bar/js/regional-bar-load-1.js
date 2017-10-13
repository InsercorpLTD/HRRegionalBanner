jQuery(document).ready(function(){
	let cssId = 'regional-bar-css'; let jsId = 'regional-bar-js'; let resetId = 'reset'; let glyphId = 'glyph-sheet';
	jQuery('#regional-bar-js').on('load', banner_init);
	jQuery.ajax({
		url:'http://hrpdcva.gov/regional-banner/index/version/',
		success:function(data){
			let files = jQuery.parseJSON(data);
			//console.log(files.js)
			var head  = document.getElementsByTagName('head')[0];
			
			if (!document.getElementById(resetId)){
				var reset  = document.createElement('link');
				reset.id   = resetId;
				reset.rel  = 'stylesheet';
				reset.type = 'text/css';
				reset.href = 'https://cdn.rawgit.com/InsercorpLTD/HRRegionalBanner/master/regional-bar/css/reset.css';
				reset.media = 'all';
				head.prepend(reset);
			}
			if (!document.getElementById(glyphId)){
				styles = jQuery(head).children('link[rel="stylesheet"]');
				let last = styles.slice(-1)[0];
				var glyph  = document.createElement('link');
				glyph.id   = glyphId;
				glyph.rel  = 'stylesheet';
				glyph.type = 'text/css';
				glyph.href = '//hrpdcva.gov/templates/default/css/glyphicons.css';
				glyph.media = 'all';
				last.before(glyph);
			}
			if (!document.getElementById(cssId)){
				styles = jQuery(head).children('link[rel="stylesheet"]');
				let last = styles.slice(-1)[0];
				var link  = document.createElement('link');
				link.id   = cssId;
				link.rel  = 'stylesheet';
				link.type = 'text/css';
				link.href = 'https://cdn.rawgit.com/InsercorpLTD/HRRegionalBanner/master/regional-bar/css/'+files.css;
				link.media = 'all';
				last.before(link);
			}

			if (!document.getElementById(jsId)){
				var head  = document.getElementsByTagName('head')[0];
				var script  = document.createElement('script');
				script.id   = jsId;
				script.type = 'text/javascript';
				script.src = 'https://cdn.rawgit.com/InsercorpLTD/HRRegionalBanner/master/regional-bar/js/'+files.js;
				head.appendChild(script);
				if(script.readyState) {  //IE
					script.onreadystatechange = function() {
					  if ( script.readyState === "loaded" || script.readyState === "complete" ) { script.onreadystatechange = null; banner_init();}
					};
				} else{//others
					script.onload = function() { banner_init(); jQuery('.regional-bar+*').css('margin-top','44px').css('margin-top', ''); }
				}
			}
		}
	});
});