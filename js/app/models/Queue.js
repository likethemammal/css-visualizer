define(['app/models/Song'], function (Song) {

    var Queue = {
        songs: [],
        currentSong: 0,

        reset: function() {
            this.songs = [];
            this.currentSong = 0;
        },

        addSong: function(track) {
            var song = new Song();
            var artwork = track.artwork_url || '';
            song.setMetadata({
                streamUrl: track.stream_url + '?client_id=' + clientID,
                title: track.title,
                titleUrl: track.permalink_url,
                artist: track.user.username,
                artistUrl: track.user.permalink_url,
                albumSrc: artwork.replace('large.jpg', 'crop.jpg'),
                length: track.duration
            });
            this.songs.push(song);
        },

        addSongFromMetadata: function(metadata) {
            var song = new Song();
            song.setMetadata(metadata, true);
            this.songs.push(song);
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
        },

        setCurrentSong: function(song) {
            this.songs[this.currentSong] = song;
        }

    };

    return Queue;

});