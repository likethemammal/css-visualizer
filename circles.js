var Visualizers = Visualizers || {};

Visualizers.Circles = _.extend({
    numOfCircles: 0,
    circleDiameter: 50,
    init: function() {
        var styleSheet = document.createElement('style');
        var circleContainer = document.createElement('div');
        circleContainer.id = 'circle-container';

        this.numOfCircles = Math.ceil(window.innerHeight / this.circleDiameter);

        this.setColors(styleSheet);

        for (var i = 0; i < this.numOfCircles; i++) {
            var circle = document.createElement('div');
            var circleWrapper = document.createElement('div');

            circle.className = 'circle';
            circleWrapper.className = 'circle-wrapper';
            circleWrapper.appendChild(circle);
            circleContainer.appendChild(circleWrapper);
        }

        styleSheet.id = 'visualizer-css';
        this.visualizer.appendChild(circleContainer);
        document.head.appendChild(styleSheet);

        this.circles = document.getElementsByClassName('circle');
    },

    setColors: function(styleSheet) {
        styleSheet = styleSheet || document.getElementById('visualizer-css');
        var stylesStr = '';
        var color = this.color1;

        this.resetInputColors();

        for (var i = 0; i < this.numOfCircles; i++) {

            var startOfSelectorStr = '.circle-wrapper:nth-of-type(' + (i + 1) + ') .circle', // Its '+ 2' because reflectionOverlay is first-child
                diameter = (this.circleDiameter * (this.numOfCircles - i)),
                screenCenter = Math.round(window.innerHeight/2),
                barStr = startOfSelectorStr + ' { background-color: ' + color + '; width: ' + diameter + 'px; height: ' + diameter + 'px;}';

            stylesStr += barStr;

            color = fadeToColor(color, this.color2, 1/this.numOfCircles);
        }

        styleSheet.innerHTML = stylesStr;
    },
    
    onWaveform: function(waveform) {
        var sampleAvgs = sampleArray(waveform, this.numOfCircles, this.volumeModifier);
        var circles = this.circles;
        var diluter = 2;
        var precision = 10; //Will affect framerate as it becomes more precise

        for (var j = 0; j < this.numOfCircles; j++) {
            var rotateDeg = 360 * (Math.floor(sampleAvgs[j]*precision)/precision) / diluter;
            circles[j].style[prefix.css + 'transform'] = ["rotate(", rotateDeg, "deg) translateX(-50%) translateZ(0)"].join("");
        }
    }
}, Visualizers.Base);