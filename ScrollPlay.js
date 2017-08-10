/*
 * 	ScrollPlay - jQuery plugin
 *	Developed by Krunal Jariwala (Toshal Infotech)
 *
 *	Copyright (c) 2017 Idea To Working (http://idea2working.com)
 *	Dual licensed under the MIT and GPL licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

(function ( $ ) {

    var youtubeVideo = [];

    $.fn.scrollplay = function() {
        var $win = jQuery(window),
            $this = jQuery(this);

        if( $this.length < 1) return;

        for (var i=0;i<$this.length;i++){
            var obj = $this[i];
            if(obj.src.includes("youtube")){
                if (obj.src.includes("?enablejsapi=1") == false ){ 
                    obj.src += "?enablejsapi=1"; 
                }
                youtubeVideo.push(obj);
            } else if(obj.src.includes("vimeo")){
                playerHelper(obj,"vimeo");
            } else if (jQuery(obj).is("video")){
                playerHelper(obj,"html5Video");
            } else {
                return;
            }
        }

        window.onYouTubeIframeAPIReady = function() {
            for (var i=0;i<youtubeVideo.length;i++){
                playerHelper(youtubeVideo[i],"youtube");
            }
        }

        function playerHelper(obj,type){
            var player;
            if(type=="youtube"){ 
                if (typeof YT == "undefined") return;
                player = new YT.Player(obj); 
            } 
            else if(type=="vimeo") { 
                if (typeof Vimeo == "undefined") return;
                player = new Vimeo.Player(obj); 
            } 
            else { player = obj; }

            $win.scroll( function(){
                var $ele = jQuery(obj);
                if ( ($win.scrollTop() + $win.height() - $ele.outerHeight() ) > $ele.position().top &&
                    ($win.scrollTop() + $win.height()) < ($ele.position().top + $win.height())){
                    if(type=="youtube"){ player.playVideo(); } 
                    else { player.play(); }
                } else {
                    if(type=="youtube"){ player.pauseVideo(); } 
                    else { player.pause(); }
                }
            });

        }

    }

}( jQuery ));
