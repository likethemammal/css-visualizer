define(['app/options', 'bean', 'app/models/Queue', 'app/chromecast/sender/sender', 'soundcloud', 'q', 'underscore'], function (Options, Bean, Queue, sender, SC, Q, _) {

    var DesktopQueue = _.extend({

        dataPacketTimer: '',

        init: function() {
            Bean.on(window, 'model.search', _.bind(this.search, this));
            Bean.on(window, 'chromecastConnected', this.onChromecastConnected.bind(this));
            Bean.on(window, 'chromecast.metadataReceived', _.bind(this.onMetadataSent, this));
            Bean.on(window, 'chromecastDisconnected', this.onChromecastDisconnected.bind(this));
            Bean.on(window, 'queue.requestNextSong', _.bind(this.sendNextSong, this));
            Bean.on(window, 'queue.packFrame', _.bind(this.packSongData, this));

            this.setupMusic();
        },

        setupMusic: function() {
            var tracksLoaded = 0;

            for (var i = 0; i < this.songsCache.length; i++) {
                var promise = this.search(this.songsCache[i].streamUrl);

                promise.then(_.bind(function() {
                    tracksLoaded++;

                    if (tracksLoaded >= this.songsCache.length) {
                        if (Options.autoplayRandom) {
                            this.currentSong = this.getRandomSongNum();
                        }

                        sender.init();

                        Bean.fire(window, 'next');
                    }
                }, this));
            }
        },

        search: function(searchVal) {
            var hostname = getLocation(searchVal);
            var dotlocation = hostname.indexOf('.');

            hostname = hostname.substr(0, dotlocation);

            if (hostname === 'soundcloud') {
                var deferred = Q.defer();
                var promise = deferred.promise;

                SC.get('/resolve', { url: searchVal }, _.bind(function(urlData) {
                    var userID = urlData.id;
                    var fetchingURL = '';

                    switch (urlData.kind) {
                        case "user":
                            fetchingURL = '/users/' + userID + '/tracks';
                            this.getMultipleSongs(fetchingURL, deferred);

                            break;

                        case "track":
                            this.addSong(urlData);
                            deferred.resolve();
                            break;

                        case "playlist":
                            fetchingURL = '/playlist/' + userID + '/tracks';
                            this.getMultipleSongs(fetchingURL, deferred);
                            break;
                    }

                    promise.then(_.bind(function() {
                        Bean.fire(window, 'next');
                    }, this));

                }, this));

                return promise;
            } else if (hostname === 'grooveshark') {
                console.log('grooveshark url');
            }
        },

        getMultipleSongs: function(fetchingURL, deferred) {
            SC.get(fetchingURL, _.bind(function(tracks) {
                for (var i = 0; i < tracks.length; i++) {
                    var track = tracks[i];
                    this.addSong(track);
                }

                if (deferred) {
                    deferred.resolve();
                }
            }, this));
        },

        sendNextSong: function() {
            this.setNextSong();

            var songInfo = this.getCurrentSong().metadata;

            if (this.chromecastConnected) {
                Bean.fire(window, 'sender.loadMedia', songInfo.streamUrl);
            }

            Bean.fire(window, 'player.trackInfo', songInfo);
        },

        onChromecastConnected: function() {
            this.chromecastConnected = true;
        },

        onMetadataSent: function() {
            console.log('metadata sent');
            this.dataPacketTimer = setInterval(this.sendDataPacket.bind(this), 1000);
        },

        onChromecastDisconnected: function() {
            this.chromecastConnected = false;
            clearTimeout(this.dataPacketTimer);
        },

        sendDataPacket: function() {
            if (dancer.isPlaying()) {
                var song = this.getCurrentSong();

                Bean.fire(window, 'socket.audiodata', {
                    songChanged: this.songChanged,
                    audioDataPacket: song.audioDataPacket.serializeData()
                });

                song.audioDataPacket.emptyPackets();

                this.setCurrentSong(song);
            }
        },

        packSongData: function(data) {
            var song = this.getCurrentSong();
            song.audioDataPacket.packFrame(data.frame, data.second);
            this.setCurrentSong(song);
        },

        songsCache: [
//            {
//                artist: 'Alex Metric',
//                title: 'Scandalism',
//                format: 'mp3',
//                streamUrl: 'https://soundcloud.com/alexmetric/scandalism'
//            },
            {
                artist: 'Kygo',
                title: 'Sexual Healing (Remix)',
                format: 'mp3',
                streamUrl: 'https://soundcloud.com/kygo/marvin-gaye-sexual-healing'
            },
            {
                artist: 'Bondax',
                title: 'All Inside',
                format: 'mp3',
                streamUrl: 'https://soundcloud.com/bondax/all-inside'
//            },
//            {
//                artist: 'Estelle Miller',
//                title: 'Jacknjill',
//                format: 'mp3',
//                streamUrl: 'https://soundcloud.com/estelle-miller/jacknjill'
//            },
//            {
//                artist: 'Estelle Miller',
//                title: 'Delicate Words',
//                format: 'mp3',
//                streamUrl: 'https://soundcloud.com/estelle-miller/delicate-words'
//            },
//            {
//                artist: 'Nobuo Uematsu',
//                title: 'To Zanarkand',
//                format: 'mp3',
//                streamUrl: 'https://soundcloud.com/final-fantasy-soundtracks/final-fantasy-x-ost-to'
//            },
//            {
//                artist: 'Koji Kondo',
//                title: 'Song of Storms',
//                format: 'mp3',
//                streamUrl: 'https://soundcloud.com/user6966642/the-legend-of-zelda-song-of-storms'
//            },
//            {
//                artist: 'Carl Douglas',
//                title: 'Kung Fu Fighting 1974 Disco',
//                format: 'mp3',
//                streamUrl: 'https://soundcloud.com/kuploadr3/carl-douglas-kung-fu-fighting'
//            },
//            {
//                artist: 'Ella Fitzgerald',
//                title: 'Someone To Watch Over Me',
//                format: 'mp3',
//                streamUrl: 'https://soundcloud.com/maha-khalid-1/ella-fitzgerald-someone-to'
//            },
//            {
//                artist: 'Neon Indian',
//                title: 'Polish Girl',
//                format: 'mp3',
//                streamUrl: 'https://soundcloud.com/mgmtneonindian/polish-girl'
//            },
//            {
//                artist: 'Toto',
//                title: 'Africa',
//                format: 'mp3',
//                streamUrl: 'https://soundcloud.com/kuploadr/toto-africa'
            }
        ]

    }, Queue);

    return DesktopQueue;

});