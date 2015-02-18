define(['app/options', 'bean', 'soundcloud', 'q', 'underscore'], function (Options, Bean, SC, Q, _) {

    var QueueModel = {

        audio: new Audio(),
        audioLoaded: false,

        tracksListenedTo: [],
        tracksQueue: [],
        currentTrack: 0,
        playbackRate: 1,

        DurationTimer: 0,

        init: function() {
            Bean.on(window, 'model.search', _.bind(this.search, this));
            Bean.on(window, 'chromecastConnected', this.onChromecastConnected.bind(this));
            Bean.on(window, 'queue.requestNextSong', _.bind(this.sendNextSong, this));

            this.setupMusic();
        },

        setupMusic: function() {
            var tracksLoaded = 0;

            for (var i = 0; i < this.tracksCache.length; i++) {
                var promise = this.search(this.tracksCache[i].streamUrl);

                promise.then(_.bind(function() {
                    tracksLoaded++;

                    if (tracksLoaded >= this.tracksCache.length) {
                        if (Options.autoplayRandom) {
                            this.currentTrack = this.getRandomTrackNum();
                        }

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
                            this.getMultipleTracks(fetchingURL, deferred);

                            break;

                        case "track":
                            this.addTrack(urlData);
                            deferred.resolve();
                            break;

                        case "playlist":
                            fetchingURL = '/playlist/' + userID + '/tracks';
                            this.getMultipleTracks(fetchingURL, deferred);
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

        resetTracks: function() {
            this.tracksQueue = [];
            this.tracksListenedTo = [];
            this.currentTrack = 0;
        },

        getMultipleTracks: function(fetchingURL, deferred) {
            SC.get(fetchingURL, _.bind(function(tracks) {
                for (var i = 0; i < tracks.length; i++) {
                    var track = tracks[i];
                    this.addTrack(track);
                }

                if (deferred) {
                    deferred.resolve();
                }
            }, this));
        },

        addTrack: function(track) {
            this.tracksQueue.push({
                streamUrl: track.stream_url + '?client_id=' + clientID,
                title: track.title,
                titleUrl: track.permalink_url,
                artist: track.user.username,
                artistUrl: track.user.permalink_url,
                length: track.duration
            });
        },

        getRandomTrackNum: function() {
            var randomNum;

            if (this.tracksListenedTo.length < this.tracksQueue.length) {

                randomNum = Math.floor(Math.random()*this.tracksQueue.length);

                if (_.indexOf(this.tracksListenedTo.indexOf, randomNum) < 0) {
                    return randomNum;
                } else {
                    return this.getRandomTrackNum();
                }

            } else {
                this.tracksListenedTo = [];

                return 0;
            }
        },

        sendNextSong: function() {
            this.lineupNextSong();

            var trackInfo = this.getTrackInfo();

            if (this.chromecastConnected) {
                Bean.fire(window, 'sender.loadMedia', trackInfo.streamUrl);
            }

            Bean.fire(window, 'player.trackInfo', trackInfo);
        },

        lineupNextSong: function() {
            this.tracksListenedTo.push(this.currentTrack);
            this.currentTrack = this.getRandomTrackNum();
        },

        getTrackInfo: function() {
            return this.tracksQueue[this.currentTrack];
        },

        onChromecastConnected: function() {
            this.chromecastConnected = true;
        },

        tracksCache: [
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

    };

    return QueueModel;

});