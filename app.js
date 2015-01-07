var Visualizers = Visualizers || {},
    dancer = new Dancer();

var App = {
    
    visualizerContainer: document.getElementById('visualizer-container'),
    chooser: document.getElementById('chooser'),
    uiContainer: document.getElementById('ui-container'),
    ui: document.getElementById('ui'),
    playPause: document.getElementById('play-pause'),
    next: document.getElementById('next'),
    searchBtn: document.getElementById('search-btn'),
    searchInput: document.getElementById('search-input'),
    duration: document.getElementById('duration'),
    randomColor: document.getElementById('random-color'),
    colorPicker1: document.getElementById('color-picker1'),
    colorPicker2: document.getElementById('color-picker2'),
    colorPicker3: document.getElementById('color-picker3'),
    volumeSlider: document.getElementById('volume-slider'),

    DurationTimer: 0,

    options: {
        defaultVolume: 0.25
    },

    IdleTimer: 0,
    canFadeUI: false,

    hideVis: false,
    
    audio: new Audio(),
    audioLoaded: false,
    autoplayRandom: false,

    tracksCache: [
        {
            artist: 'Alex Metric',
            title: 'Scandalism',
            format: 'mp3',
            url: 'music/Alex Metric - Scandalism.mp3'
        },
        {
            artist: 'Kygo',
            title: 'Sexual Healing (Remix)',
            format: 'mp3',
            url: 'music/Kygo - Sexual Healing (Remix).mp3'
        },
        {
            artist: 'Bondax',
            title: 'All Inside',
            format: 'mp3',
            url: 'music/Bondax - All Inside.mp3'
        },
        {
            artist: 'Estelle Miller',
            title: 'Jacknjill',
            format: 'mp3',
            url: 'music/Estelle Miller - Jacknjill.mp3'
        },
        {
            artist: 'Estelle Miller',
            title: 'Delicate Words',
            format: 'mp3',
            url: 'music/Estelle Miller - Delicate Words.mp3'
        },
        {
            artist: 'Nobuo Uematsu',
            title: 'To Zanarkand',
            format: 'mp3',
            url: 'music/Nobuo Uematsu - To Zanarkand.mp3'
        },
        {
            artist: 'Koji Kondo',
            title: 'Song of Storms',
            format: 'mp3',
            url: 'music/Koji Kondo - Song of Storms.mp3'
        },
        {
            artist: 'Carl Douglas',
            title: 'Kung Fu Fighting 1974 Disco',
            format: 'mp3',
            url: 'music/Carl Douglas - Kung Fu Fighting 1974 Disco.mp3'
        },
        {
            artist: 'Ella Fitzgerald',
            title: 'Someone To Watch Over Me',
            format: 'mp3',
            url: 'music/Ella Fitzgerald - Someone To Watch Over Me.mp3'
        },
        {
            artist: 'Neon Indian',
            title: 'Polish Girl',
            format: 'mp3',
            url: 'music/Neon Indian - Polish Girl.mp3'
        },
        {
            artist: 'George Michael',
            title: 'Careless Whisper',
            format: 'mp3',
            url: 'music/George Michael - Careless Whisper.mp3'
        }
    ],
    
    currentTrack: 0,
    tracksListenedTo: [],
    
    events: function() {
        this.chooser.addEventListener('change', this.switchVisualizers);
        if (loadFromSC) {
            this.searchBtn.addEventListener('click', _.bind(this.search, this));
            this.searchInput.addEventListener('keyup', _.bind(function(e) {
                if (e.keyCode === 13) {
                    this.search();
                }
            }, this));
        }
        this.playPause.addEventListener('click', _.bind(this.togglePlayPause, this));
        this.next.addEventListener('click', _.bind(this.nextSongFromCache, this));
        
        document.body.addEventListener('click', _.bind(this.toggleUI, this));
        document.body.addEventListener('mousemove', _.throttle(_.bind(this.toggleUI, this)), 100);
        document.body.addEventListener('keyup', _.bind(this.toggleUI, this));
        this.setupColorEvents();
        this.setupResizeEvent();

        this.volumeSlider.addEventListener('change', _.bind(this.onVolumeChange, this));
    },
    
    init: function() {
        this.events();
        this.setupMusic();

        this.setupFullscreen();
        
        document.addEventListener('DOMContentLoaded', _.bind(function () {
            Visualizers[this.chooser.firstElementChild.value].run();
            this.volumeSlider.value = this.options.defaultVolume * 100;
            //Needed because changing slider value doesnt cause change event.
            var event = new Event('change');
            this.volumeSlider.dispatchEvent(event);
        }, this));
    },

    setupMusic: function() {
        if (this.autoplayRandom) {
            this.currentTrack = Math.round(Math.random()*this.tracksCache.length);
        }
        this.nextSongFromCache();
    },

    setupColorEvents: function() {
        this.randomColor.addEventListener('click', _.bind(function() {
            Visualizers.currentVisualizer.setColors();
        }, this));

        this.colorPicker1.addEventListener('change', _.bind(function(ev) {
            var el = ev.currentTarget;
            onColorChange(1, el.value);
        }, this));

        this.colorPicker2.addEventListener('change', _.bind(function(ev) {
            var el = ev.currentTarget;
            onColorChange(2, el.value);
        }, this));

        this.colorPicker3.addEventListener('change', _.bind(function(ev) {
            var el = ev.currentTarget;
            onColorChange(3, el.value);
        }, this));

        function onColorChange(elNum, color) {
            var currentVisualizer = Visualizers.currentVisualizer;
            color = hexToRgb(color);

            //Break hex color into rgb values.
            currentVisualizer['color' + elNum] = color;
            currentVisualizer.onColorChange();
        }
    },

    setupResizeEvent: function() {
        var rtime = new Date(1, 1, 2000, 12,00,00);
        var timeout = false;
        var delta = 200;

        window.addEventListener('resize', _.throttle(function() {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        }, 100));

        function resizeend() {
            if (new Date() - rtime < delta) {
                setTimeout(resizeend, delta);
            } else {
                timeout = false;
                doneResizing();
            }
        }

        function doneResizing () {
            var currentVis = Visualizers.currentVisualizer;
            var onResizeFunc = _.bind(currentVis.onResize, currentVis);
            if (onResizeFunc) {
                onResizeFunc();
            }
        }
    },

    onVolumeChange: function(ev) {
        var el = ev.currentTarget;
        var volume =  el.value / 100;

        this.audio.volume = volume;
        this.currentVolume = volume;
        Visualizers.currentVisualizer.setVolumeModifier();
    },

    switchVisualizers: function(ev) {
        if (Visualizers.currentVisualizer) {
            Visualizers.currentVisualizer.destroy();
        }
        Visualizers[ev.target.value].run();
    },
    
    toggleUI: _.throttle(function() {
        this.visualizerContainer.style.cursor = 'auto';
        this.ui.style.opacity = 1;

        if (this.canFadeUI) {
            clearInterval(this.IdleTimer);

            this.IdleTimer = setInterval(_.bind(function() {
                this.ui.style.opacity = 0;
                this.visualizerContainer.style.cursor = 'none';
            }, this), 2000);
        }

    }),
    
    search: function() {
        var hostname = getLocation(this.searchInput.value);
        var dotlocation = hostname.indexOf('.');

        hostname = hostname.substr(0, dotlocation);

        if (hostname === 'soundcloud') {
            var deferred = Q.defer();
            var promise = deferred.promise;

            SC.get('/resolve', { url: this.searchInput.value }, _.bind(function(urlData) {
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
                    this.nextSongFromCache();
                }, this));

            }, this));
        } else if (hostname === 'grooveshark') {
            console.log('grooveshark url');
        }
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
            url: track.stream_url + '?client_id=' + clientID,
            title: track.title,
            artist: track.user.username,
            length: track.duration
        });
    },
    
    togglePlayPause: function() {
        if (dancer.isPlaying()) {
            dancer.pause();
            this.playPause.style['background-image'] = "url('imgs/glyphicons_173_play.png')";
        } else {
            dancer.play();
            this.playPause.style['background-image'] = "url('imgs/glyphicons_174_pause.png')";
        }
    },
    
    setupFullscreen: function() {
        var fullscreen = document.getElementById('fullscreen');
        
        if (
            document.fullscreenEnabled || 
            document.webkitFullscreenEnabled || 
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
        ) {
            fullscreen.addEventListener('click', _.bind(function() {
                toggleFullscreen(document.body);
                var isFullscreen = getIsFullscreen();
            }, this));
        } else {
            fullscreen.style.display = 'none';
        }
    },
    
    nextSongFromCache: function() {
        // todo: fix error for "Failed to execute 'createMediaElementSource' on 'AudioContext'", might be a Chrome bug;
        dancer.pause();
                
        var trackInfo = this.tracksCache[this.currentTrack];
        
        this.audio.src = trackInfo.url;

        this.duration.style.right = '100%';

        clearInterval(this.DurationTimeout);

        this.DurationTimeout = setInterval(_.bind(function() {
            if (this.audio.duration) {
                var totalDuration = Math.floor(this.audio.duration);
                var currentDuration = this.audio.currentTime;
                var percentComplete = currentDuration/totalDuration || 0;
                var precision = 100;
                var percentLeft = Math.floor((1 - percentComplete)*100 * precision) / precision;

                this.duration.style.right = percentLeft + '%';
            }
        }, this) , 250);

        this.attachMetaData(trackInfo.artist, trackInfo.title);
        this.ui.style.opacity = 1;
        
        this.tracksListenedTo.push(this.currentTrack);
        this.currentTrack = this.getRandomTrackNum();
        
        this.audio.addEventListener('ended', _.bind(this.nextSongFromCache, this));

        if (!this.audioLoaded) {
            dancer.load(this.audio);
            this.audioLoaded = true;
        }
        
        dancer.play();
        
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

    resetTracks: function() {
        this.tracksCache = [];
        this.tracksListenedTo = [];
        this.currentTrack = 0;
    },

    attachMetaData: function(artistStr, titleStr) {
        var artist = document.getElementById('artist');
        var title = document.getElementById('title');
        
        artist.innerHTML = artistStr;
        title.innerHTML = titleStr;
    }
};

App.init();