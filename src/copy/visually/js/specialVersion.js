/**
 * Created by Azamat Mirvosiqov on 29.01.2015.
 */

var curUrl = window.location.href;
var arCurUrl = curUrl.split('/');
var noImageTitle = 'Без картинки';
var setImageTitle = 'С картинкой';
switch (arCurUrl[3]){
    case 'uz':
        noImageTitle = 'Расмсиз';
        setImageTitle = 'Расмли';
        break;
    case 'oz':
        noImageTitle = 'Rasmsiz';
        setImageTitle = 'Rasmli';
        break;
    case 'en':
        noImageTitle = 'Without a picture';
        setImageTitle = 'With a picture';
        break;
}

var min = 14,
    max = 18;

function makeNormal() {
    jQuery('html').removeClass('blackAndWhite blackAndWhiteInvert');
    jQuery.removeCookie('specialView', {path: '/'});
}

function makeBlackAndWhite() {
    makeNormal();
    jQuery('html').addClass('blackAndWhite');
    jQuery.cookie("specialView", 'blackAndWhite', {path: '/'});
}

function makeBlackAndWhiteDark() {
    makeNormal();
    jQuery('html').addClass('blackAndWhiteInvert');
    jQuery.cookie("specialView", 'blackAndWhiteInvert', {path: '/'});
}

function makeSetImage() {
    jQuery('html').removeClass( "noImage" );
    jQuery('.spcNoImage').removeClass( "spcSetImage" );
    jQuery('.spcNoImage').attr('data-original-title', setImageTitle);
    jQuery.removeCookie('specialViewImage', {path: '/'});
}

function makeNoImage() {
    jQuery('html').stop().addClass( "noImage" );
    jQuery('.spcNoImage').addClass( "spcSetImage" );
    jQuery('.spcNoImage').attr('data-original-title', noImageTitle);
    jQuery.cookie("specialViewImage", 'noImage', {path: '/'});
}

function offImages(){
    if (jQuery.cookie("specialViewImage") == 'noImage'){
        makeSetImage();
    } else {
        makeNoImage();
    }
}

function setFontSize(size) {
    if (size < min) {
        size = min;
    }
    if (size > max) {
        size = max;
    }
    if (size == 16){
        jQuery('body').removeAttr("style");
        return false
    }
    jQuery('html').css({'font-size': parseInt(size) + 'px'});
    jQuery('.accordion li a, table td, .verticalMenu li a, .copyright').css({'font-size': parseInt(size) + 2 + 'px'});
    jQuery('.main-news h1').css({'font-size': parseInt(size) + 4 + 'px'});
    jQuery('.link_list a, .expmenu li a, .main-news p a').css({'font-size': parseInt(size) - 2 + 'px'});
    jQuery('.smallText, .caption, .minif').css({'font-size': parseInt(size) - 4 + 'px'});

    jQuery('.fontChangeable, .panel-classic .panel-heading, .menu li a, .breadcrumbs li, .classicGridViewListtext, .selectArea, .selectArea li a, .list .listItem').css({'font-size': size + 'px'});

    if (size > max - 7) {
        jQuery('.news-container .main-news').hide();
        jQuery('.news-container .listData').removeClass('col-md-6').addClass('col-md-12');
    } else {
        jQuery('.news-container .main-news').show();
        jQuery('.news-container .listData').removeClass('col-md-12').addClass('col-md-6');
    }
}

function saveFontSize(size) {
    jQuery.cookie("fontSize", size, {path: '/'});
}
function changeSliderText(sliderId, value) {
    var position = Math.round(Math.abs((value - min) * (100 / (max - min))));
    jQuery('.fontRange').text(position);
}

function setNarrator() {
    // jQuery('head').append(jQuery('<script type="text/javascript"><\/script>').attr('src', '/wp-content/themes/crit-site/assets/js/narrator.js'));
	if(window.speechSynthesis == undefined){
		alert('Чтение речи не поддерживается в данном браузере');
		return  
	}
    narrator.init();
    jQuery('#speechToggle').html('<i class="fas fa-volume-mute"></i>');
    jQuery('#speechToggle').addClass('active');
    jQuery.cookie("narrator", 'on', {path: '/'});
    if (typeof(jQuery.cookie("speechVolume")) == 'undefined') {
        jQuery("#speechVolume").slider('value', 500);
        jQuery('#speechOptions .sliderText .range').text(100);
    } else {
        var speechVolume = jQuery.cookie("speechVolume");
        jQuery("#speechVolume").slider('value', speechVolume);
        jQuery('#speechOptions .sliderText .range').text(speechVolume);
    }
}

function unsetNarrator() {
    jQuery.cookie("narrator", null, { path: '/' });
    jQuery('#speech').remove();
    jQuery('#speechToggle').removeClass('active');
    jQuery('#speechToggle').html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>');
    responsiveVoice.cancel();
    // removeJsCssFile('narrator.js', 'js');
}

function saveSpeechVolume(val) {
    if (val > 100 || val < 25) {
        val = 100;
    }
    narrator.setVolume(val);
    jQuery.cookie("speechVolume", val, {path: '/'});
}

jQuery(document).ready(function () {
    var appearance = jQuery.cookie("specialView");
    switch (appearance) {
        case 'blackAndWhite':
            makeBlackAndWhite();
            break;
        case 'blackAndWhiteInvert':
            makeBlackAndWhiteDark();
            break;
    }
    var noimage = jQuery.cookie("specialViewImage");
    switch (noimage) {
        case 'noImage':
            makeNoImage();
            break;
        case 'setImage':
            makeSetImage();
            break;
    }

    jQuery('.no-propagation').click(function (e) {

            e.stopPropagation();

    });

    jQuery('#mode-default').click(function () {
        makeNormal();
    });
    jQuery('#mode-whiteBlack').click(function () {
        makeBlackAndWhite();

    });
    jQuery('#mode-dark').click(function () {
        makeBlackAndWhiteDark();
    });

    jQuery('#mode-noimage').click(function () {
        offImages();
    });


    jQuery('#speechSwitcher').change(function () {
        if (this.checked) {
            var narratorStatus = jQuery.cookie("narrator");
            jQuery('#speechOptions').slideDown(100);
            setNarrator();
            if (narratorStatus != 'on')
                narrator.speak(jQuery(this).attr('title'));
            	jQuery(this).addClass('active')
            	jQuery(".speech").stop().animate({opacity:1}, "fast").addClass('speechHover');
        } else {
            jQuery('#speechOptions').slideUp(100);
            unsetNarrator();
            jQuery(this).removeClass('active')
            jQuery(".speech").stop().removeClass('speechHover');
        }
    });
    
    var specVersion = false;
    jQuery('#speechToggle').on('click', function(){
    	if(!specVersion){
          var narratorStatus = jQuery.cookie("narrator");
//          jQuery('#speechOptions').slideDown(100);
          setNarrator();
         
          if (narratorStatus != 'on')
              narrator.speak(jQuery(this).attr('title'));
      		  jQuery(".speech").stop().animate({opacity:1}, "fast").addClass('speechHover');
          specVersion = true;
    	} else {
//    		jQuery('#speechOptions').slideUp(100);
          unsetNarrator();
         
          jQuery(".speech").stop().removeClass('speechHover');
          specVersion = false;
    	}
    })
    
    jQuery('#speechVersionToggle').on('click', function(){
    	jQuery(this).parent().toggleClass('active');
    	jQuery(this).toggleClass('active');
    })

    jQuery('#fontSizer').slider({
        min: min,
        max: max,
        range: "min",
        slide: function (event, ui) {
            setFontSize(ui.value);
            changeSliderText('fontSizer', ui.value);
        },
        change: function (event, ui) {
            saveFontSize(ui.value);
        }
    });
    
//    jQuery('.special-fixed-container').click(function(){
//    	jQuery(this).toggleClass('active')
//    })

    jQuery('#speechVolume').slider({
        min: 25,
        max: 100,
        range: "min",
        slide: function (event, ui) {
            jQuery('#speechVolume').prev('.sliderText').children('.range').text(ui.value);
        },
        change: function (event, ui) {
            saveSpeechVolume(ui.value);
        }
    });

    var fontSize = jQuery.cookie("fontSize");
    if (typeof(fontSize) != 'undefined') {
        jQuery("#fontSizer").slider('value', fontSize);
        setFontSize(fontSize);
        changeSliderText('fontSizer', fontSize);
    }

    Mousetrap.bind(['shift+return'], function() {
        jQuery('#speechSwitcher').prop('checked', !jQuery('#speechSwitcher').prop('checked'));
        jQuery('#speechSwitcher').trigger('change');
        return false;
    });

    if (jQuery.cookie("narrator") == 'on' && typeof(jQuery.cookie("narrator")) != 'undefined'){
        jQuery('#speechSwitcher').prop('checked', true);
        jQuery('#speechToggle').trigger('click');
        var speechVolume = jQuery.cookie("speechVolume");
        if (typeof(speechVolume) != 'undefined') {
            jQuery("#speechVolume").slider('value', speechVolume);
            jQuery('#speechOptions .sliderText .range').text(speechVolume);
        }
        if (typeof(speechNotification) != 'undefined'){
            narrator.speak(speechNotification);
        }

        Mousetrap.bind(['ctrl+shift'], function() {
            narrator.stop();
            jQuery('#speechArea').removeClass('narratorBox');
            return false;
        });

        Mousetrap.bind(['ctrl+alt'], function() {
            if (typeof(jQuery('#speechArea')) != 'undefined'){
                jQuery('#speechArea').addClass('narratorBox');
                jQuery('#speechArea').append('<div class="loading"></div>');
                narrator.speak(jQuery('#speechArea').text());
            }
            return false;
        });
        console.log('SPEC ON')
    } else {
        console.log('SPEC OF')
    }
});