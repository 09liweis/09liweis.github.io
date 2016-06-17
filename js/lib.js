/*global jQuery:false */
var error_msg_box = null;
var googlemap_refreshed = false;
var themes = ["dark", ""];
var themeIndex = Math.floor(Math.random() * (themes.length - 0)) + 0;
jQuery("body").addClass(themes[themeIndex]);

jQuery(window).load(function() {
	"use strict";
	if (window.location.hash==='#portfolio') {
		jQuery('#portfolio .section_header .section_title a').trigger('click');
	}
});


jQuery(document).ready(function(){
	
	// Resume
	jQuery(".resume_section_title").on("click",function() {
		console.log("test");
		jQuery('.widget_skills .skills_row').each(function(){
			var wd = jQuery(this).find('.progress').attr('data-process');
			var processNode = jQuery(this).find('.progress');
			if(processNode.width() === 0) {
				processNode.animate({'width': wd}, 700);
			} else {
				processNode.css('width', '0');
				processNode.animate({'width': wd}, 800);
			}
			jQuery('.svg').addClass('vis');
		});
		if(jQuery('#resume .section_body').css('display') === 'none'){
			jQuery('#resume .section_body').parent().removeClass('open');
		}
		else {
			jQuery('#resume .section_body').parent().addClass('open');
		}
	});
	
	//Google & QRcode	
	$QRname = jQuery('#profile_data .name .td').html();
	$QRbirth = jQuery('#profile_data .birth .td').html();
	$QRphone = jQuery('#profile_data .phone .td').html();
	$QRemail = jQuery('#profile_data .email .td').html();
	$QRsite = jQuery('#profile_data .website .td').html();
	$QRsiteClean = jQuery('#profile_data .website .td a').attr("href");
	$QRadress = jQuery('#profile_data .address .td').html()
	
	//Qcode
    jQuery('.qrcode').qrcode({
		render: 'image',
		width: 160,
		height: 160,
		color: '#000000',
		text: $QRname +' '+ $QRphone +' '+ $QRemail +' '+ $QRsiteClean +' '+ $QRadress,
		ecLevel: 'H',
		bgColor: '#FFFFFF',
		radius: 0
 	});

		
	//Profile
	if( $QRname != null && $QRname != "" ) {  jQuery('#profile_data .name').slideDown() } 
	if( $QRbirth != null && $QRbirth != "" ) { jQuery('#profile_data .birth').slideDown() } 
	if( $QRadress != null && $QRadress != "" ) { jQuery('#profile_data .address').slideDown() } 
	if( $QRphone != null && $QRphone != "" ) { jQuery('#profile_data .phone').slideDown() } 
	if( $QRemail != null && $QRemail != "" ) { jQuery('#profile_data .email').slideDown() } 
	if( $QRsite != null && $QRsite != "" ) { jQuery('#profile_data .website').slideDown() } 

		//read cookies
		if ( jQuery.cookie("body_img") != null ) {
			jQuery('body').addClass(jQuery.cookie("body_img"));
		 	} 
		if (  jQuery.cookie("body_bg") != null ) {
			jQuery('body').css('background-color', jQuery.cookie("body_bg") );
			 }


		// toTop link setup
		"use strict";
		jQuery(window).scroll(function() {
			if(jQuery(this).scrollTop() >= 110) {
				jQuery('#toTop').show();	
			} else {
				jQuery('#toTop').hide();	
			}
		});
		jQuery('#toTop').click(function(e) {
			jQuery('body,html').animate({scrollTop:0}, 800);
			e.preventDefault();
		});

		// Video and Audio tag wrapper
		jQuery('video,audio').mediaelementplayer(/* Options */);
		
		
		/*load Video*/
		jQuery(".video_thumb").click(function(){
			var frame_code = jQuery(this).attr('data-frame');
			jQuery(this).html('<iframe width="100%" height="320px" class="video_frame" src="'+frame_code+'"  frameborder="0" webkitAllowFullScreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowFullScreen="allowFullScreen"></iframe>');
		});	


		// Section tabs
		jQuery('#mainpage_accordion_area').tabs('section > .section_body', {
			tabs: 'section > .section_header > .section_title',
			effect : 'slide',
			slideUpSpeed: 600,
			slideDownSpeed: 600,
			onClick: function (e, tabIndex) {
				var tabs = jQuery('#mainpage_accordion_area section > .section_header > .section_title');
				var tab = tabs.eq(tabIndex);
				
				var QRphone = $QRphone;
				var QRemail = $QRemail;
				var QRsite = $QRsite;
				var QRadress = $QRadress;
				if (tab.hasClass('resume_section_title')) {					// Resume
					jQuery('.widget_skills .skills_row').each(function(){
						var wd = jQuery(this).find('.progress').attr('data-process');
						var processNode = jQuery(this).find('.progress');
						if(processNode.width() === 0) {
							processNode.animate({'width': wd}, 700);
						} else {
							processNode.css('width', '0');
							processNode.animate({'width': wd}, 800);
						}
						jQuery('.svg').addClass('vis');
					});
					if(jQuery('#resume .section_body').css('display') === 'none'){
						jQuery('#resume .section_body').parent().removeClass('open');
					}
					else {
						jQuery('#resume .section_body').parent().addClass('open');
					}
				}
				return false;
			},
			currentClose: true,
			anotherClose: false,
			initialIndex: -1
		});

		jQuery('#profile:not(.printable) .profile_section_header h2').click(function(){
			if (jQuery(this).find('.section_name').hasClass('show')){
				jQuery(this).find('.section_name').animate({'width':'135', 'opacity':'1'},
					550, 'easeOutCubic').removeClass('show');
			} else {
				jQuery(this).find('.section_name').animate({'width':'0', 'opacity':'0'},
					250,'easeOutCubic').slideDown().addClass('show');
			}
			jQuery(this).parent().toggleClass('opened').next('.profile_section_body').stop().slideToggle({
				duration: 450, easing: 'easeOutCubic'});
			return false;
		});
		
		jQuery('#mainpage_accordion_area h2.section_title').click(function(){
			var ofs = jQuery(this).offset().top;
			jQuery('html, body').animate({'scrollTop':ofs-50});
		});
		
		// Galleries Slider
		jQuery('.slider_container').flexslider({
			directionNav: true,
			controlNav: false
		});

		// ----------------------- Shortcodes setup -------------------
		jQuery('div.sc_infobox_closeable').click(function() {
			jQuery(this).fadeOut();
		});

		jQuery('.sc_tooltip_parent').hover(function(){
			var obj = jQuery(this);
			obj.find('.sc_tooltip').stop().animate({'marginTop': '5'}, 100).show();
		},
		function(){
			var obj = jQuery(this);
			obj.find('.sc_tooltip').stop().animate({'marginTop': '0'}, 100).hide();
		});
		
		
		jQuery(window).scroll(function(){
			"use strict";
			if(jQuery('#resume').length === 0) {
				return;
			}
			var top = jQuery(document).scrollTop();
			if(jQuery('#resume').offset().top-60 < top || parseInt(jQuery('#resume_buttons').css('top'), 10) > 0) {
				var pr_h = jQuery('#resume_buttons').parent().height()-60;
				top = Math.min(pr_h, Math.max(0, top-jQuery('#resume').offset().top+50));
				jQuery('#resume_buttons').css({'top':top});
			}
		});
		
		


});


function hideCommentScroll() {
	var com_top = jQuery('#comments').offset().top;
	var win_top = jQuery(window).scrollTop();
	var win_ht = jQuery(window).height();
	if((win_top + win_ht)-200 > com_top){
		jQuery('#scrollTo').hide();
	}
	else {
		jQuery('#scrollTo').show();
	}
}

jQuery(window).load(function(){
	if(jQuery('#comments').length > 0) {
	hideCommentScroll();
	jQuery('#scrollTo').click(function(){
		var target = jQuery(this).attr('href');
		var ofs = jQuery(target).offset().top;
		jQuery('html, body').animate({scrollTop : ofs-150});
	});
	jQuery(window).scroll(function(){
		hideCommentScroll();
	});
	}
});



















