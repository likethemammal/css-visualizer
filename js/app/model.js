define(['app/options', 'bean', 'soundcloud', 'q', 'underscore'], function (Options, Bean, SC, Q, _) {

    var Model = {

        audio: new Audio(),
        audioLoaded: false,

        tracksListenedTo: [],
        currentTrack: 0,
        playbackRate: 1,

        DurationTimer: 0,

        chromecastAudioData: false,

        init: function() {
            Bean.on(window, 'setupMusic', _.bind(this.setupMusic, this));
            Bean.on(window, 'model.search', _.bind(this.search, this));
            Bean.on(window, 'loadAndPlay', _.bind(this.loadAndPlay, this));
            Bean.on(window, 'next', _.bind(this.nextSongFromCache, this));
            Bean.on(window, 'playPause', this.togglePlayPause, this);
            Bean.on(window, 'model.setVolume', _.bind(this.setVolume, this));
            Bean.on(window, 'chromecastConnected', this.onChromecastConnected.bind(this));

        },

        search: function(searchVal) {
            console.log(searchVal)
            var hostname = getLocation(searchVal);
            var dotlocation = hostname.indexOf('.');

            hostname = hostname.substr(0, dotlocation);

            if (hostname === 'soundcloud') {
                var deferred = Q.defer();
                var promise = deferred.promise;

                SC.get('/resolve', { url: searchVal }, _.bind(function(urlData) {
                    var userID = urlData.id;
                    var fetchingURL = '';

                    this.resetTracks();

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
            } else if (hostname === 'grooveshark') {
                console.log('grooveshark url');
            }
        },

        setupMusic: function() {
            if (Options.autoplayRandom) {
                this.currentTrack = Math.floor(Math.random()*this.tracksCache.length);
            }
            this.nextSongFromCache();
        },

        resetTracks: function() {
            this.tracksCache = [];
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
            this.tracksCache.push({
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

            if (this.tracksListenedTo.length !== this.tracksCache.length) {

                randomNum = Math.ceil(Math.random()*this.tracksCache.length - 1);

                if (this.tracksListenedTo.indexOf(randomNum) < 0) {
                    return randomNum;
                } else {
                    return this.getRandomTrackNum();
                }

            } else {
                this.tracksListenedTo = [];

                return 0;
            }
        },

        loadAndPlay: function() {
            if (!this.audioLoaded) {
                dancer.load(this.audio);
                this.audioLoaded = true;
            }

            dancer.play();
        },

        togglePlayPause: function() {
            if (dancer.isPlaying()) {
                dancer.pause();
            } else {
                dancer.play();
            }
        },

        nextSongFromCache: function() {
            // todo: fix error for "Failed to execute 'createMediaElementSource' on 'AudioContext'", might be a Chrome bug;
            dancer.pause();

            var trackInfo = this.tracksCache[this.currentTrack];

            if (this.chromecastConnected) {
                console.log(trackInfo.streamUrl)
                Bean.fire(window, 'sender.loadMedia', trackInfo.streamUrl);

                this.playbackRate = Options.chromecastPlaybackRate;
                this.setVolume(Options.chromecastVolume);
            }

            Bean.fire(window, 'resetDuration');

            clearInterval(this.DurationTimeout);

            this.DurationTimeout = setInterval(_.bind(function() {
                if (this.audio.duration) {
                    var totalDuration = Math.floor(this.audio.duration);
                    var currentDuration = this.audio.currentTime;
                    var percentComplete = currentDuration/totalDuration || 0;
                    var precision = 100;
                    var percentLeft = Math.floor((1 - percentComplete)*100 * precision) / precision;


                    Bean.fire(window, 'view.durationProgress', percentLeft + '%');
                }
            }, this) , (1000 / 60) * this.playbackRate);

            Bean.fire(window, 'view.metadata', [[trackInfo.artist, trackInfo.title, trackInfo.artistUrl, trackInfo.titleUrl]]);

            this.tracksListenedTo.push(this.currentTrack);
            this.currentTrack = this.getRandomTrackNum();

            this.audio.src = trackInfo.streamUrl;
            this.audio.playbackRate = this.playbackRate;

            Bean.off(this.audio, 'ended');
            Bean.on(this.audio, 'ended', _.bind(this.nextSongFromCache, this));

            Bean.fire(window, 'loadAndPlay');
        },

        setVolume: function(volume) {
            this.audio.volume = volume;
            Bean.fire(window, 'visualizer.setVolume', volume);
        },

        onChromecastConnected: function() {
            this.chromecastConnected = true;
            this.nextSongFromCache();
        },

        tracksCache: [
            {
                artist: 'Alex Metric',
                title: 'Scandalism',
                format: 'mp3',
                streamUrl: '/music/Alex Metric - Scandalism.mp3'
            },
            {
                artist: 'Kygo',
                title: 'Sexual Healing (Remix)',
                format: 'mp3',
                streamUrl: '/music/Kygo - Sexual Healing (Remix).mp3'
            },
            {
                artist: 'Bondax',
                title: 'All Inside',
                format: 'mp3',
                streamUrl: '/music/Bondax - All Inside.mp3'
            },
            {
                artist: 'Estelle Miller',
                title: 'Jacknjill',
                format: 'mp3',
                streamUrl: '/music/Estelle Miller - Jacknjill.mp3'
            },
            {
                artist: 'Estelle Miller',
                title: 'Delicate Words',
                format: 'mp3',
                streamUrl: '/music/Estelle Miller - Delicate Words.mp3'
            },
            {
                artist: 'Nobuo Uematsu',
                title: 'To Zanarkand',
                format: 'mp3',
                streamUrl: '/music/Nobuo Uematsu - To Zanarkand.mp3'
            },
            {
                artist: 'Koji Kondo',
                title: 'Song of Storms',
                format: 'mp3',
                streamUrl: '/music/Koji Kondo - Song of Storms.mp3'
            },
            {
                artist: 'Carl Douglas',
                title: 'Kung Fu Fighting 1974 Disco',
                format: 'mp3',
                streamUrl: '/music/Carl Douglas - Kung Fu Fighting 1974 Disco.mp3'
            },
            {
                artist: 'Ella Fitzgerald',
                title: 'Someone To Watch Over Me',
                format: 'mp3',
                streamUrl: '/music/Ella Fitzgerald - Someone To Watch Over Me.mp3'
            },
            {
                artist: 'Neon Indian',
                title: 'Polish Girl',
                format: 'mp3',
                streamUrl: '/music/Neon Indian - Polish Girl.mp3'
            },
            {
                artist: 'George Michael',
                title: 'Careless Whisper',
                format: 'mp3',
                streamUrl: '/music/George Michael - Careless Whisper.mp3'
            }
        ]

    };

    return Model;

});