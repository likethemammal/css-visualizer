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
        
    IdleTimer: 0,
    
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
        },
    ],
    
    currentTrack: 0,
    tracksListenedTo: [],
    
    events: function() {
        this.chooser.addEventListener('change', this.switchVisualizers);
        if (loadFromSC) {
            this.searchBtn.addEventListener('click', this.search);
        }
        this.playPause.addEventListener('click', _.bind(this.togglePlayPause, this));
        this.next.addEventListener('click', _.bind(this.nextSongFromCache, this));
        
        document.body.addEventListener('click', _.bind(this.toggleUI, this));
        document.body.addEventListener('mousemove', _.bind(this.toggleUI, this));
        document.body.addEventListener('keyup', _.bind(this.toggleUI, this));
    },
    
    init: function() {
        this.setupMusic();
        this.events();
        
        this.setupFullscreen();
        
        document.addEventListener('DOMContentLoaded', function () {
            Visualizers[chooser.firstElementChild.value].run();
        });
    },
    
    setupMusic: function() {        
        if (this.autoplayRandom) {
            this.currentTrack = Math.round(Math.random()*this.tracksCache.length);
        }        
        if (!loadFromSC) {
            this.nextSongFromCache();
        }
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
        
        clearInterval(this.IdleTimer);
        
        this.IdleTimer = setInterval(_.bind(function() {
            this.ui.style.opacity = 0;
            this.visualizerContainer.style.cursor = 'none';
        }, this), 2000);
    }),
    
    search: _.bind(function() {
             
        var input = document.getElementById('search-input');

        SC.get("/playlists", {q: input.value}, _.bind(function(playlists){
            var playlist = playlists[0],
                track;

            for (var i = 0; i < playlist.tracks.length; i++) {
                track = playlist.tracks[i];
                this.tracksCache.push({url: track.uri + '/stream?client_id=' + clientID, length: track.duration});
            }

            this.nextSongFromCache();
        }, this));
        
    }, this),
    
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
        var trackInfo; 
            
        dancer.pause();
                
        trackInfo = this.tracksCache[this.currentTrack];
        
        this.audio.src = trackInfo.url;
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
    
    attachMetaData: function(artistStr, titleStr) {
        var artist = document.getElementById('artist');
        var title = document.getElementById('title');
        
        artist.innerHTML = artistStr;
        title.innerHTML = titleStr;
    }
};

App.init();