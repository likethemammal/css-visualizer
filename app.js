var Visualizers = Visualizers || {},
    Timer,
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
    
    tracksCache: [
        '../Kygo - Sexual Healing (Remix).mp3',
        '../Bondax - All Inside.mp3',
        '../Ludovico Einaudi Fly2.wav',
        'https:api.soundcloud.com/tracks/149098250/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b',
        'https:www.dropbox.com/meta_dl/eyJzdWJfcGF0aCI6ICIiLCAidGVzdF9saW5rIjogZmFsc2UsICJzZXJ2ZXIiOiAiZGwuZHJvcGJveHVzZXJjb250ZW50LmNvbSIsICJpdGVtX2lkIjogbnVsbCwgImlzX2RpciI6IGZhbHNlLCAidGtleSI6ICJsNHp3Y3FnN2FyYnF2d3UifQ/AAJLDGi7mwiHsD0sYqnpqnFw002twFjlKlagMFXB-cFAJw?dl=1',
        'https:api.soundcloud.com/tracks/150431004/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b',
        'https:api.soundcloud.com/tracks/130504908/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b',
    ],
    
    currentTrack: 0,
    
    events: function() {
        this.chooser.onchange = this.switchVisualizers;
        if (loadFromSC) {
            this.searchBtn.onclick = this.search;
        }
        this.playPause.onclick = _.bind(this.togglePlayPause, this);
        this.next.onclick = _.bind(this.nextSongFromCache, this);
        
        document.body.onclick = _.bind(this.toggleUI, this);
        document.body.onmousemove = _.bind(this.toggleUI, this);
        document.body.onkeyup = _.bind(this.toggleUI, this);
    },
    
    init: function() {
        this.runDancer();
        this.events();
        
        this.setupFullscreen();
        
        setTimeout(function() {
            Visualizers[chooser.firstElementChild.value].run();
        }, 10);
    },
    
    runDancer: function() {        
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
            fullscreen.onclick = _.bind(function() {
                toggleFullscreen(this.visualizerContainer);
                var isFullscreen = getIsFullscreen();
            }, this);
        } else {
            fullscreen.style.display = 'none';
        }
    },
    
    nextSongFromCache: function() {
        // todo: fix error for "Failed to execute 'createMediaElementSource' on 'AudioContext'", might be a Chrome bug;
        var newAudio = false;
            dancer.pause();        
        
        if (!this.a) {
            this.a = new Audio();
            newAudio = true;
        }
        
        this.a.src = this.tracksCache[this.currentTrack];
        this.currentTrack++;
        
        this.a.onended = _.bind(this.nextSongFromCache, this);
                
        if (newAudio) {
            dancer.load(this.a);
        }
        
        dancer.play();
    }
};

App.init();