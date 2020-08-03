/**
 * Created by Azamat Mirvosiqov on 20/03/2015.
 */

var ajaxQuery = jQuery.ajax();

var lang = jQuery('html').attr('lang');

jQuery.fn.hoverIntent = function (handlerIn, handlerOut, selector) {

    var cfg = {
        interval: 100,
        sensitivity: 6,
        timeout: 0
    };

    if (typeof handlerIn === "object") {
        cfg = jQuery.extend(cfg, handlerIn);
    } else if (jQuery.isFunction(handlerOut)) {
        cfg = jQuery.extend(cfg, {mouseenter: handlerIn, out: handlerOut, selector: selector});
    } else {
        cfg = jQuery.extend(cfg, {over: handlerIn, out: handlerIn, selector: handlerOut});
    }

    var cX, cY, pX, pY;

    var track = function (ev) {
        cX = ev.pageX;
        cY = ev.pageY;
    };

    var compare = function (ev, ob) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);

        if (Math.sqrt((pX - cX) * (pX - cX) + (pY - cY) * (pY - cY)) < cfg.sensitivity) {
            jQuery(ob).off("mousemove.hoverIntent", track);

            ob.hoverIntent_s = true;
            return cfg.over.apply(ob, [ev]);
        } else {

            pX = cX;
            pY = cY;

            ob.hoverIntent_t = setTimeout(function () {
                compare(ev, ob);
            }, cfg.interval);
        }
    };

    var delay = function (ev, ob) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
        ob.hoverIntent_s = false;
        return cfg.out.apply(ob, [ev]);
    };

    var handleHover = function (e) {

        var ev = jQuery.extend({}, e);
        var ob = this;

        if (ob.hoverIntent_t) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
        }

        if (e.type === "mouseenter") {
            pX = ev.pageX;
            pY = ev.pageY;
            jQuery(ob).on("mousemove.hoverIntent", track);
            if (!ob.hoverIntent_s) {
                ob.hoverIntent_t = setTimeout(function () {
                    compare(ev, ob);
                }, cfg.interval);
            }

        } else {
            jQuery(ob).off("mousemove.hoverIntent", track);
            if (ob.hoverIntent_s) {
                ob.hoverIntent_t = setTimeout(function () {
                    delay(ev, ob);
                }, cfg.timeout);
            }
        }
    };

    return this.on({'mouseenter.hoverIntent': handleHover, 'mouseleave.hoverIntent': handleHover}, cfg.selector);
};


function testVoice(e) {
	e.preventDefault();
	
}


jQuery(document).on('click', '#testVoice', function(e){
	e.preventDefault();
//	alert(window.speechSynthesis)
	
//	var synth = window.speechSynthesis;
//
//	var utterance1 = new SpeechSynthesisUtterance('How about we say this now? This is quite a long sentence to say.');
//

//	synth.speak(utterance1);
})

var narrator = {

    init: function(){
        if (jQuery("#speech").length < 1) {
            jQuery('body').append('<audio id="speech" src=""></audio>');
        }
    },

    player : function(){
        return document.getElementById('speech');
    },

    speak: function(text){
        if(responsiveVoice.voiceSupport() || versionIE >= 11 || versionIE >= 10 || versionIE >= 9) {
            responsiveVoice.setDefaultVoice("Russian Female");
            if(jQuery.cookie("narrator") == 'on'){
                responsiveVoice.speak(text);              
            } else {
                responsiveVoice.cancel();
            }
            return false;
        } else {
            alert('Ваш браузер не поддерживает синтез речи.')
        }
    },

    play: function(){
        responsiveVoice.play();
    },

    stop: function(){
        responsiveVoice.pause();
    }
};


jQuery(document).ready(function(){

    jQuery.fn.narrator = '1.0.0';


    jQuery('p, a, span, h1, h2, h3, h4, h5, h6, li, .panel-heading').hoverIntent({
        over: function(){
            if (jQuery("#speech").length == 1 && jQuery('.narratorBox').length == 0) {
                var text = jQuery(this).text();
                if (jQuery.trim(text).length > 0) {
                    jQuery(this).addClass('narratorBox loadingCursor');
                    jQuery('.narratorBox').append('<div class="loading-text"><i class="fas fa-volume-up"></i></div>');
                    narrator.speak(text);
                }
            }
        },
        timeout: 0,
        interval: 500,
        out: function(){
            jQuery('.narratorBox').removeClass('loadingCursor');
            jQuery('.narratorBox .loading-text').remove();
            jQuery(this).removeClass('narratorBox');
            narrator.stop();
            ajaxQuery.abort();
        }
    });
});