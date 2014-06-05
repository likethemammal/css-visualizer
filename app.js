var Visualizers = Visualizers || {},
    Timer,
    dancer = new Dancer();

var App = {
    
    visualizerContainer: document.getElementById('visualizer-container'),
    chooser: document.getElementById('chooser'),
    ui: document.getElementById('ui'),
    pause: document.getElementById('pause'),
    searchBtn: document.getElementById('search-btn'),
    
    tracksCache: [],
    
    events: function() {
        this.chooser.onchange = this.switchVisualizers;
        this.searchBtn.onclick = this.search;
        this.pause.onclick = _.bind(dancer.pause, dancer);
        
        document.body.onmousemove = _.bind(this.toggleUI, this);
        document.body.onkeyup = _.bind(this.toggleUI, this);
    },
    
    init: function() {
        this.setupDancer();
        this.events();
        
        this.setupFullscreen();
        
        setTimeout(function() {
            Visualizers[chooser.firstElementChild.value].run();
        }, 10);
    },
    
    setupDancer: function() {        
        if (!loadFromSC) {
            a = new Audio();
//             a.src = 'https:api.soundcloud.com/tracks/150431004/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b';
//             a.src = 'https:api.soundcloud.com/tracks/130504908/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b';
//             a.src = 'https:api.soundcloud.com/tracks/143665938/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b';
            // a.src = '../Ludovico Einaudi Fly2.wav';
//             a.src = '../CoreBass4 Rendered.mp3'
            a.src = '../Bondax - All Inside.mp3';
            // a.src = 'https:api.soundcloud.com/tracks/149098250/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b'
            // a.src = 'https:www.dropbox.com/meta_dl/eyJzdWJfcGF0aCI6ICIiLCAidGVzdF9saW5rIjogZmFsc2UsICJzZXJ2ZXIiOiAiZGwuZHJvcGJveHVzZXJjb250ZW50LmNvbSIsICJpdGVtX2lkIjogbnVsbCwgImlzX2RpciI6IGZhbHNlLCAidGtleSI6ICJsNHp3Y3FnN2FyYnF2d3UifQ/AAJLDGi7mwiHsD0sYqnpqnFw002twFjlKlagMFXB-cFAJw?dl=1';
            dancer.load(a);
            dancer.play();
        }
    },
    
    switchVisualizers: function(ev) {
        if (Visualizers.currentVisualizer) {
            Visualizers.currentVisualizer.destroy();
        }
        Visualizers[ev.target.value].run();
    },
    
    toggleUI: _.throttle(function() {
        var IdleTimer;
        
        this.visualizerContainer.style.cursor = 'auto';
        this.ui.style.opacity = 1;
        
        clearInterval(IdleTimer);
        
        IdleTimer = setInterval(_.bind(function() {
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
            }, this);
        } else {
            fullscreen.style.display = 'none';
        }
    },
    
    nextSongFromCache: function() {
        var audioTag = document.getElementById('audio'),
            currentSrc = audioTag.src;
        
        dancer.pause();
    
        audioTag.src = this.tracksCache[0].url;
        
        this.tracksCache.shift();
        if (!currentSrc) {
            dancer.load(audioTag);
        }
    
        audioTag.onended = _.bind(this.nextSongFromCache, this);
        dancer.play();
    }
};

App.init();