$(function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    var isFirstAccess = ($.cookie('key') === undefined) ? true : false;

    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('player', {
            height: '512',
            width: '910',
            videoId: 'youtubeID',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        init(event);
    }

    var hasEndedVideo = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED && !hasEndedVideo) {
            hasEndedVideo = true;
            stopVideo();
            closeModal();
        }
    }

    function stopVideo() {
        player.stopVideo();
    }

    function bindEvent() {
        $('.modal_movie_btn_skip').click(function () {
            stopVideo();
            closeModal();
        });
    }

    function openModal() {
        var def = $.Deferred();
        $('.modal_movie_overlay, .modal_movie').fadeIn(function(){
            def.resolve();
        });
        return def.promise();
    }

    function closeModal() {
        $('.main-img_box').fadeOut();
    }

    function init(event) {
        if (isFirstAccess) {
            openModal()
                .then(function(){
                    event.target.playVideo();
                    bindEvent();
                    $.cookie('key', 'visit', {expires: 365});
                });
        }
    }
});
