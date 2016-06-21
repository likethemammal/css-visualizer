define([
    'bean'
], function (
    Bean
    ) {

    var Player = {

        ui: document.getElementById('ui'),
        duration: document.getElementById('duration'),
        playPause: document.getElementById('play-pause'),

        setupBaseEvents: function() {
            Bean.on(window, 'playerView.next', this.onNext);
            Bean.on(window, 'playerView.playPause', _.bind(this.onPlayPause, this));

            Bean.on(window, 'view.metadata', _.bind(this.attachMetaData, this));
            Bean.on(window, 'view.resetDuration', _.bind(this.setDuration, this));
            Bean.on(window, 'view.durationProgress', _.bind(this.setDuration, this));
        },

        setDuration: function(val) {
            val = val || '100%';
            this.duration.style.right = val;
        },

        onNext: function() {
            Bean.fire(window, 'next');
        },

        onPlayPause: function(playing) {
            if (playing) {
                this.playPause.style['background-image'] = "url('imgs/glyphicons_173_play.png')";
            } else {
                this.playPause.style['background-image'] = "url('imgs/glyphicons_174_pause.png')";
            }

            Bean.fire(window, 'playerModel.playPause');
        },

        attachMetaData: function(trackInfo) {
            var artistStr = trackInfo[0] || '';
            var titleStr = trackInfo[1] || '';
            var artistUrl = trackInfo[2] || '';
            var titleUrl = trackInfo[3] || '';
            var albumSrc = trackInfo[4] || '';
            var artist = document.getElementById('artist');
            var title = document.getElementById('title');
            var album = document.getElementById('album');

            album.src = albumSrc;
            artist.innerText = artistStr;
            title.innerText = titleStr;
            artist.href = artistUrl;
            title.href = titleUrl;

            this.ui.style.opacity = 1;
        }

    };

    return Player;
});
