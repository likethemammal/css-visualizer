var Visualizers = Visualizers || {}

Visualizers.Hexagons = _.extend({
    hexs: [],
    numOfHexs: 15,
    hexDefaultTransformStr: 'rotate(0deg)',

    init: function() {
        this.setupElements();
        this.setShading();
        this.setColors();
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
            hex.style['-webkit-transform'] = this.hexDefaultTransformStr;

            hexWrapper.className += ' hex-wrapper';
            hex.className += ' hex';
            
            hexContainer.appendChild(hexWrapper);
        }
        
        this.hexContainer = hexContainer;
        this.overlayContainer = overlayContainer;
        this.colorOverlay = colorOverlay;
        this.gradientOverlay = gradientOverlay;
        
        this.hexs = document.getElementsByClassName('hex');
    },
    
    setShading: function() {
        var color = 'rgba(255,255,255,0.08)';
                
        for (var j = 0; j < this.numOfHexs; j++) {
            var beforeStr = '#hex' + j + ':before { border-bottom-color : ' + color + '}';
                afterStr = '#hex' + j + ':after { border-top-color : ' + color + '}';

            this.hexs[j].id = 'hex' + j;
            this.hexs[j].style['background-color'] = color;
            document.styleSheets[0].insertRule(beforeStr, 0);
            document.styleSheets[0].insertRule(afterStr, 0);
            
        }
    },
    
    setColors: function() {
        this.gradientOverlay.style['background'] = "-webkit-linear-gradient(-30deg, " + randomColor() + " 0%," + randomColor() + " 50%," + randomColor() + " 100%)"
    },
    
    onSpectrum: function(spectrum) {
        var sampleAvgs = sampleArray(spectrum, this.numOfHexs);
        
        for (var i = 0; i < this.numOfHexs; i++) {
            this.hexs[i].parentNode.style['-webkit-transform'] = this.hexDefaultTransformStr + ' scale(' + (sampleAvgs[i]*100 + 1) + ')';
        }
    }
    
}, Visualizers.Base);