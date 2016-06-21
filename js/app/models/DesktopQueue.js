define(['app/options', 'bean', 'app/models/Queue', 'soundcloud', 'q', 'underscore'], function (Options, Bean, Queue, SC, Q, _) {

    var DesktopQueue = _.extend({

        dataPacketTimer: '',
        currentGenre: 'electro pop',
        nextHref: false,

        init: function() {
            Bean.on(window, 'model.search', _.bind(this.search, this));
            Bean.on(window, 'queue.requestNextSong', _.bind(this.prepareNextSong, this));
            Bean.on(window, 'queue.switchGenre', _.bind(this.onSwitchGenre, this));

            this.setupMusic();
        },

        onSwitchGenre: function (genre) {
            this.currentGenre = genre.toLowerCase();
            this.nextHref = false;
            this.setupMusic();
        },

        setupMusic: function() {
            var promise = this.search();

            promise.then(_.bind(function() {
                if (Options.autoplayRandom) {
                    this.currentSong = this.getRandomSongNum();
                }

                Bean.fire(window, 'next');
            }, this));
        },

        search: function() {
            var deferred = Q.defer();
            var promise = deferred.promise;
            var url = '/tracks';
            var opts = {
                tags: this.currentGenre,
                limit: 10,
                linked_partitioning: 1
            };

            if (this.nextHref) {
                url = this.nextHref;
                opts = {};
            }

            SC.get(url, opts, _.bind(function(urlData) {
                var collection = urlData.collection;

                for (var i = 0; i < collection.length; i++) {
                    var track = collection[i];

                    this.addSong(track);
                }

                this.nextHref = urlData.nextHref;

                deferred.resolve();

            }, this));

            return promise;
        },

        prepareNextSong: function() {
            var songsListened = this.getListenedSongs();
            var promise;

            if (songsListened.length >= this.songs.length - 1) {
                promise = this.search();

                promise.then(_.bind(this.sendNextSong, this));
            } else {
                this.sendNextSong();
            }

        },



        sendNextSong: function() {
            this.setNextSong();

            var songInfo = this.getCurrentSong().metadata;

            Bean.fire(window, 'player.trackInfo', songInfo);
        }


    }, Queue);

    return DesktopQueue;

});