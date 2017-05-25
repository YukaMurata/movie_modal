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
            playerVars: {
                'rel': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        $('.main-movie_button').click(function () {
            buttonDelete();
            player.playVideo(event);
        });
    }


    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            stopVideo();
        }
    }

    function stopVideo() {
        player.stopVideo();
    }

    function buttonDelete() {
        $('.main-movie_button').css('display', 'none');
    }


});
