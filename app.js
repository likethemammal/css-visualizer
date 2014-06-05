var Visualizers = Visualizers || {},
    Timer,
    dancer;

var App = {
    visualizerContainer: document.getElementById('visualizer-container'),
    tracksCache: [],
    
    init: function() {
        this.setupDancer();
        this.setupVisualizerSwitcher();
        this.setupUIHider();
        this.setupSearch();
        this.setupFullscreen();
        
        setTimeout(function() {
            Visualizers[chooser.firstElementChild.value].run();
        }, 10);
    },
    
    setupDancer: function() {
        dancer = new Dancer();
        
        if (!loadFromSC) {
            a = new Audio();
            a.src = 'https:api.soundcloud.com/tracks/150431004/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b';
            // a.src = 'https:api.soundcloud.com/tracks/130504908/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b';
            // a.src = '../Ludovico Einaudi Fly2.wav';
            // a.src = 'https:api.soundcloud.com/tracks/149098250/download?client_id=b45b1aa10f1ac2941910a7f0d10f8e28&oauth_token=1-16343-49735712-69955a658d6fa5b'
            // a.src = 'https:www.dropbox.com/meta_dl/eyJzdWJfcGF0aCI6ICIiLCAidGVzdF9saW5rIjogZmFsc2UsICJzZXJ2ZXIiOiAiZGwuZHJvcGJveHVzZXJjb250ZW50LmNvbSIsICJpdGVtX2lkIjogbnVsbCwgImlzX2RpciI6IGZhbHNlLCAidGtleSI6ICJsNHp3Y3FnN2FyYnF2d3UifQ/AAJLDGi7mwiHsD0sYqnpqnFw002twFjlKlagMFXB-cFAJw?dl=1';
            dancer.load(a);
        }
    },
    
    setupVisualizerSwitcher: function() {
        var chooser = document.getElementById('chooser');
        
        chooser.onchange = function(ev) {
            if (Visualizers.currentVisualizer) {
                Visualizers.currentVisualizer.destroy();
            }
            Visualizers[ev.target.value].run();
        };
    },
    
    setupUIHider: function() {
        var ui = document.getElementById('ui');
        var IdleTimer;
        
        var resetIdleTimer = _.throttle(_.bind(function() {
            this.visualizerContainer.style.cursor = 'auto';
            ui.style.opacity = 1;
            clearInterval(IdleTimer);
            IdleTimer = setInterval(_.bind(function() {
                ui.style.opacity = 0;
                this.visualizerContainer.style.cursor = 'none';
            }, this), 2000);
        }, this));
        
        document.body.onmousemove = resetIdleTimer;
        document.body.onkeyup = resetIdleTimer;
    },
    
    setupSearch: function() {
        var searchBtn = document.getElementById('search'),
            input = document.getElementById('search-input');
        
        searchBtn.onclick = _.bind(function() {
        
            SC.get("/playlists", {q: input.value}, _.bind(function(playlists){
                var playlist = playlists[0],
                    track;
                    
                for (var i = 0; i < playlist.tracks.length; i++) {
                    track = playlist.tracks[i];
                    this.tracksCache.push({url: track.uri + '/stream?client_id=' + clientID, length: track.duration});
                }
                
                this.nextSongFromCache();
            }, this));
        }, this);
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