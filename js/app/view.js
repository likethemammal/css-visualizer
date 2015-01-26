define([
    'app/options',
    'bean',
    'app/visualizers/bars',
    'app/visualizers/circles',
    'app/visualizers/hexagons',
    'app/visualizers/chromecast'
], function (
    Options,
    Bean,
    bars,
    circles,
    hexagons,
    chromecastVis
    ) {

    var View = {

        IdleTimer: 0,

        visualizers: {
            current: ''
        },

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
        fullscreen: document.getElementById('fullscreen'),
        colorPickers: [
            document.getElementById('color-picker1'),
            document.getElementById('color-picker2'),
            document.getElementById('color-picker3')
        ],
        volumeSlider: document.getElementById('volume-slider'),

        init: function() {
            var body = document.body;
            Bean.on(this.chooser, 'change', _.bind(this.switchVisualizers, this));
            if (Options.loadFromSC) {
                Bean.on(this.searchBtn, 'click', _.bind(this.onSearch, this));
                Bean.on(this.searchInput, 'keyup', _.bind(function(e) {
                    if (e.keyCode === 13) {
                        this.onSearch();
                    }
                }, this));
            }
            Bean.on(this.playPause, 'click', _.bind(this.onPlayPause, this));
            Bean.on(this.next, 'click', this.onNext);

            var toggleUIFunc = _.bind(this.toggleUI, this);
            Bean.on(body, {
                'click': toggleUIFunc,
                'mousemove': toggleUIFunc,
                'keyup': toggleUIFunc
            });

            this.setupColorEvents();

            Bean.on(this.volumeSlider, 'change', _.bind(this.onVolumeChange, this));

            Bean.on(window, 'view.loadVis', _.bind(this.switchVisualizers, this));
            Bean.on(window, 'view.setVolume', _.bind(this.setVolume, this));
            Bean.on(window, 'pageLoaded', this.setupResizeEvent);
            Bean.on(window, 'view.metadata', _.bind(this.attachMetaData, this));
            Bean.on(window, 'view.resetDuration', _.bind(this.setDuration, this));
            Bean.on(window, 'view.durationProgress', _.bind(this.setDuration, this));
            Bean.on(window, 'view.setupFullscreen', _.bind(this.setupFullscreen, this));
            Bean.on(window, 'view.resetColors', _.bind(this.resetColors, this));
            Bean.on(window, 'chromecastConnected', _.bind(function(visualizerSettings) {
                if (!this.chromecastConnected) {
                    this.chromecastConnected = true;
                    this.visualizerSettings = visualizerSettings;
                    this.switchVisualizers();
                }
            }, this));

            this.visualizers[bars.name] = bars;
            this.visualizers[circles.name] = circles;
            this.visualizers[hexagons.name] = hexagons;
            this.visualizers[chromecastVis.name] = chromecastVis;
        },

        setVolume: function() {
            var modifer = 100;

            if (Options.debug) {
                this.volumeSlider.value = Options.debugVolume * modifer;
            } else {
                this.volumeSlider.value = Options.defaultVolume * modifer;
            }

            Bean.fire(this.volumeSlider, 'change');
        },

        setDuration: function(val) {
            val = val || '100%';
            this.duration.style.right = val;
        },

        setupColorEvents: function() {
            Bean.on(this.randomColor, 'click', _.bind(function() {
                var current = this.visualizers[this.visualizers.current];
                current.resetColors();
                current.setColors();
            }, this));

            var onColorChange = _.bind(function(elNum, color) {
                var currentVisualizer = this.visualizers[this.visualizers.current];
                color = hexToRgb(color);

                //Break hex color into rgb values.
                currentVisualizer['color' + elNum] = color;
                currentVisualizer.onColorChange();
            }, this);

            // Loop through colorpickers and attach change events
            for (var i = 0; i < this.colorPickers.length; i++) {
                var picker = this.colorPickers[i];

                Bean.on(picker, 'change', function(ev, index) {
                    var el = ev.currentTarget;
                    onColorChange(index + 1, el.value);
                }, i);
            }

        },

        setupResizeEvent: function() {
            var rtime = new Date(1, 1, 2000, 12,00,00);
            var timeout = false;
            var delta = 200;

            Bean.on(window, 'resize', _.throttle(function() {
                rtime = new Date();
                if (timeout === false) {
                    timeout = true;
                    setTimeout(resizeend, delta);
                }

                function resizeend() {
                    if (new Date() - rtime < delta) {
                        setTimeout(resizeend, delta);
                    } else {
                        timeout = false;
                        doneResizing();
                    }
                }

                function doneResizing () {
                    Bean.fire(window, 'visualizer.onResize');
                }
            }, 100));


        },

        setupFullscreen: function() {
            if (
                document.fullscreenEnabled ||
                    document.webkitFullscreenEnabled ||
                    document.mozFullScreenEnabled ||
                    document.msFullscreenEnabled
                ) {
                Bean.on(this.fullscreen, 'click', _.bind(function() {
                    toggleFullscreen(document.body);
                    var isFullscreen = getIsFullscreen();
                }, this));
            } else {
                this.fullscreen.style.display = 'none';
            }
        },

        onVolumeChange: function(ev) {
            var el = ev.currentTarget;
            var volume =  el.value / 100;

            Bean.fire(window, 'model.setVolume', volume);
        },

        switchVisualizers: function(ev) {
            var visName = (this.chromecastConnected) ? 'Chromecast' : this.chooser.value;
            var current = this.visualizers.current;

            if (current) {
                this.visualizers[current].destroy();
            }
            this.visualizers[visName].chromecastConnected = this.chromecastConnected;
            this.visualizers[visName].visualizerSettings = this.visualizerSettings;
            this.visualizers[visName].run();
            this.visualizers.current = visName;
        },

        onSearch: function() {
            Bean.fire(window, 'model.search', this.searchInput.value);
        },

        onNext: function() {
            Bean.fire(window, 'next');
        },

        onPlayPause: function() {
            if (dancer.isPlaying()) {
                this.playPause.style['background-image'] = "url('imgs/glyphicons_173_play.png')";
            } else {
                this.playPause.style['background-image'] = "url('imgs/glyphicons_174_pause.png')";
            }
            Bean.fire(window, 'playPause');
        },

        toggleUI: _.throttle(function() {
            this.visualizerContainer.style.cursor = 'auto';
            this.ui.style.opacity = 1;

            if (Options.fadeUI) {
                clearInterval(this.IdleTimer);

                this.IdleTimer = setInterval(_.bind(function() {
                    this.ui.style.opacity = 0;
                    this.visualizerContainer.style.cursor = 'none';
                }, this), 2000);
            }

        }),

        attachMetaData: function(trackInfo) {
            var artistStr = trackInfo[0] || '';
            var titleStr = trackInfo[1] || '';
            var artistUrl = trackInfo[2] || '';
            var titleUrl = trackInfo[3] || '';
            var artist = document.getElementById('artist');
            var title = document.getElementById('title');

            artist.innerText = artistStr;
            title.innerText = titleStr;
            artist.href = artistUrl;
            title.href = titleUrl;

            this.ui.style.opacity = 1;
        },

        resetColors: function(colors) {
            for (var i = 0; i < colors.length; i++) {
                // Needs to be hexcolor for some reason.
                var color = rgbToHex(colors[i]);
                var picker = this.colorPickers[i];

                picker.value = color;
            }
        }

    };

    return View;
});
