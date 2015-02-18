define(['app/options', 'bean'], function (Options, Bean) {

    var Queue = {
        songsListenedTo: [],
        songs: [],
        currentSong: 0,
        playbackRate: 1,

        resetSongs: function() {
            this.songs = [];
            this.currentSong = 0;
        },

        addSong: function(track) {
            this.songs.push({
                streamUrl: track.stream_url + '?client_id=' + clientID,
                title: track.title,
                titleUrl: track.permalink_url,
                artist: track.user.username,
                artistUrl: track.user.permalink_url,
                length: track.duration
            });
        },

        getRandomSongNum: function() {
            var randomNum;
            var songsListened = this.getListenedSongs();

            if (songsListened.length < this.songs.length) {

                randomNum = Math.floor(Math.random()*this.songs.length);

                if (!this.songs[randomNum].listened) {
                    return randomNum;
                } else {
                    return this.getRandomSongNum();
                }

            } else {
                this.resetSongHistory();

                return 0;
            }
        },

        getListenedSongs: function() {
            return this.songs.filter(function(song) {
                return song.listened;
            });
        },

        resetSongHistory: function() {
            for (var i = 0; i < this.songs.length; i++) {
                this.songs[i].listened = false;
            }
        },

        setNextSong: function() {
            this.songs[this.currentSong].listened = true;
            this.currentSong = this.getRandomSongNum();
        },

        getCurrentSong: function() {
            return this.songs[this.currentSong];
        }

    };

    return Queue;

});