define(['app/visualizers/base', 'underscore'], function (Base, _) {

    var Hexagons = _.extend({
        name: 'Hexagons',
        hexs: [],
        hexWrappers: [],
        numOfHexs: 15,
        hexDefaultTransformStr: 'rotate(0deg)',
        currentOverlay: '',
        colorsNeeded: 3,
        fps: 70,

        init: function() {
            this.setupElements();
            this.setShading();
            this.setColors();
            this.ColorTimer = setInterval(_.bind(this.setColors, this), 10000);
        },

        setupElements: function() {
            var hexContainer = document.createElement('div'),
                overlayContainer = document.createElement('div'),
                colorOverlay = document.createElement('div'),
                gradientOverlay = document.createElement('div');

            hexContainer.id = 'hex-container';
            overlayContainer.id = 'overlay-container';
            colorOverlay.id = 'color-overlay';
            gradientOverlay.id = 'gradient-overlay';
            colorOverlay.className = 'overlay';
            gradientOverlay.className = 'overlay';

            overlayContainer.appendChild(gradientOverlay);
            overlayContainer.appendChild(colorOverlay);

            this.visualizer.appendChild(overlayContainer);
            this.visualizer.appendChild(hexContainer);

            for (var i = 0; i < this.numOfHexs; i++) {
                var hexWrapper = document.createElement('div'),
                    hex = document.createElement('div');

                hexWrapper.appendChild(hex);
                hex.style[prefix.css + 'transform'] = this.hexDefaultTransformStr;

                hexWrapper.className += ' hex-wrapper';
                hex.className += ' hex';

                hexContainer.appendChild(hexWrapper);
            }

            this.colorOverlay = colorOverlay;
            this.gradientOverlay = gradientOverlay;

            this.hexs = document.getElementsByClassName('hex');
            this.hexWrappers = document.getElementsByClassName('hex-wrapper');
        },

        setShading: function() {
            var shade = 'rgba(255,255,255,0.08)';
            var styleSheet = document.styleSheets[0];

            for (var j = 0; j < this.numOfHexs; j++) {
                var hex = this.hexs[j];
                var beforeStr = '#hex' + j + ':before { border-bottom-color : ' + shade + '}',
                    afterStr = '#hex' + j + ':after { border-top-color : ' + shade + '}';

                hex.id = 'hex' + j;
                hex.style['background-color'] = shade;
                styleSheet.insertRule(beforeStr, 0);
                styleSheet.insertRule(afterStr, 0);

            }
        },

        setColors: function() {
            // todo: Add cross-browser support for opacity and gradients

            if (this.manualColorSwitch) {
                clearInterval(this.ColorTimer);
                this.currentOverlay = 'color'; //Set to color so that the a gradient is shown
            } else {
                this.color1 = randomColor();
                this.color2 = randomColor();
                this.color3 = randomColor();
            }

            var gradientStr = prefix.css + "linear-gradient(-30deg, " + this.color1 + " 0%," + this.color2 + " 50%," + this.color3 + " 100%)";

            switch (this.currentOverlay) {
                case 'gradient':
                    this.colorOverlay.style['background'] = this.color1;
                    this.colorOverlay.style.opacity = 1;
                    this.gradientOverlay.style.opacity = 0;
                    this.currentOverlay = 'color';
                    break;
                case 'color':
                    this.gradientOverlay.style['background'] = gradientStr;
                    this.colorOverlay.style.opacity = 0;
                    this.gradientOverlay.style.opacity = 1;
                    this.currentOverlay = 'gradient';
                    break;
                default:
                    this.colorOverlay.style.opacity = 0;
                    this.gradientOverlay.style['background'] = gradientStr;
                    this.currentOverlay = 'gradient';
            }

            this.resetInputColors();
        },

        onSpectrum: function(spectrum) {
            var sampleAvgs = sampleArray(spectrum, this.numOfHexs, this.volumeModifier);

            for (var i = 0; i < this.numOfHexs; i++) {
                this.hexWrappers[i].style[prefix.css + 'transform'] = this.hexDefaultTransformStr + ' scale(' + (sampleAvgs[i]*100 + 1) + ')';
            }
        },

        onDestroy: function() {
            clearInterval(this.ColorTimer);
        }

    }, Base);

    return Hexagons;
});