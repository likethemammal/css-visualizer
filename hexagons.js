var Visualizers = Visualizers || {}

Visualizers.Base = {
    
};

var dancer = new Dancer();
var a = new Audio();
a.src = 'http://opengameart.org/sites/default/files/numbers.mp3';
dancer.load(a);
dancer.play();

Visualizers.Hexagons = _.extend(Visualizers.Base, {
    visualizer: document.getElementById('visualizer'),
    hexContainer: document.createElement('div'),

    hexs: [],
    numOfHexs: 7,
    hexDefaultTransformStr: 'rotate(0deg)',

    init: function() {
        this.hexContainer.className = 'hex-container';
        this.visualizer.appendChild(this.hexContainer);
        
        for (var i = 0; i < this.numOfHexs; i++) {
            var hexWrapper = document.createElement('div'),
                hex = document.createElement('div');
                
            hexWrapper.appendChild(hex); 
            hex.style['-webkit-transform'] = this.hexDefaultTransformStr;

            hexWrapper.className += ' hex-wrapper';
            hex.className += ' hex';
            
            this.hexContainer.appendChild(hexWrapper);
        }
        
        this.hexs = document.getElementsByClassName('hex');
                
        this.setColors();
        setInterval(_.bind(this.onSpectrum, this), 50);
    },
    
    setColors: function() {
        var color = 'rgb(200,200,200)';
                
        for (var j = 0; j < this.numOfHexs; j++) {
            var beforeStr = '#hex' + j + ':before { border-bottom-color : ' + color + '}';
                afterStr = '#hex' + j + ':after { border-top-color : ' + color + '}';

            this.hexs[j].id = 'hex' + j;
            this.hexs[j].style['background-color'] = color;
            document.styleSheets[0].insertRule(beforeStr, 0);
            document.styleSheets[0].insertRule(afterStr, 0);
            
            color = lighterColor(color, 0.1);

        }
    },
    
    onSpectrum: function() {
        var spectrum = float32ToArray(dancer.getSpectrum()),
            sampleAvgs = sampleArray(spectrum, this.numOfHexs);
        
        for (var i = 0; i < this.numOfHexs; i++) {
            this.hexs[i].parentNode.style['-webkit-transform'] = this.hexDefaultTransformStr + ' scale(' + (Math.random()*sampleAvgs[i]*100 + 1) + ')';
        }
    }
    
});

Visualizers.Hexagons.init();