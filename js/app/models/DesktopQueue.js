define(['app/options', 'bean', 'app/models/Queue', 'soundcloud', 'q', 'underscore'], function (Options, Bean, Queue, SC, Q, _) {

    var DesktopQueue = _.extend({

        dataPacketTimer: '',
        currentGenre: 'electro pop',
        nextHref: false,
        paginationNumber: 0,
        numSongsToGrab: 15,

        init: function() {
            Bean.on(window, 'queue.requestNextSong', _.bind(this.prepareNextSong, this));
            Bean.on(window, 'queue.switchGenre', _.bind(this.onSwitchGenre, this));

            this.setupMusic();
        },

        onSwitchGenre: function (genre) {
            this.reset();
            this.currentGenre = genre.toLowerCase();
            this.paginationNumber = 0;
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
            }, this), function(err) {
                console.warn('Something went wrong retrieving the collection of songs from Soundcloud: ', err);
            });
        },

        search: function() {
            var deferred = Q.defer();
            var promise = deferred.promise;
            var url = '/tracks';
            var opts = {
                tags: this.currentGenre,
                //bug in SC sdk causes it to only return a few unless limit is set
                limit: ((this.paginationNumber + 1) * this.numSongsToGrab) + 3,
                linked_partitioning: this.paginationNumber + 1
            };

            if (this.nextHref) {
                url = this.nextHref;
                opts = {};
            }

            SC.get(url, opts, _.bind(function(urlData) {
                var collection = urlData.collection;

                for (var i = this.paginationNumber * this.numSongsToGrab; i < collection.length; i++) {
                    var track = collection[i];

                    this.addSong(track);
                }

                this.nextHref = urlData.nextHref;

                deferred.resolve();

            }, this), function(err) {
                deferred.reject(err);
            });

            return promise;
        },

        prepareNextSong: function() {
            var songsListened = this.getListenedSongs();
            var promise;

            if (songsListened.length >= this.songs.length - 1) {
                this.paginationNumber++;
                promise = this.search();

                promise.then(_.bind(this.sendNextSong, this), function(err) {
                    console.warn('Something went wrong preparing the next batch of songs from Soundcloud: ', err);
                });
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