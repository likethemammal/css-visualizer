function randomColor() {
    var color1 = Math.floor(Math.random()*255),
        color2 = Math.floor(Math.random()*255),
        color3 = Math.floor(Math.random()*255),
        colorStr = 'rgb(' + color1 + ',' + color2 + ',' + color3 + ')';

    return colorStr;
}

function pad(num, totalChars) {
    var pad = '0';
    num = num + '';
    while (num.length < totalChars) {
        num = pad + num;
    }
    return num;
};

function changeColor(color, ratio, darker) { // Ratio is between 0 and 1
    // Trim trailing/leading whitespace
    color = color.replace(/^\s*|\s*$/, '');

    // Expand three-digit hex
    color = color.replace(
        /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
        '#$1$1$2$2$3$3'
    );

    // Calculate ratio
    var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '(?:\\s*,\\s*' +
            '(0|1|0?\\.\\d+))?' +
            '\\s*\\)$'
        , 'i')),
        alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

        // Convert hex to decimal
        decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
            /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
            function() {
                return parseInt(arguments[1], 16) + ',' +
                    parseInt(arguments[2], 16) + ',' +
                    parseInt(arguments[3], 16);
            }
        ).split(/,/),
        returnValue;

    // Return RGB(A)
    return !!rgb ?
        'rgb' + (alpha !== null ? 'a' : '') + '(' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ) +
            (alpha !== null ? ', ' + alpha : '') +
            ')' :
        // Return hex
        [
            '#',
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ).toString(16), 2)
        ].join('');
};

function lighterColor(color, ratio) {
    return changeColor(color, ratio, false);
};

function darkerColor(color, ratio) {
    return changeColor(color, ratio, true);
};

function fadeToColor(rgbColor1, rgbColor2, ratio) {
    var colors1 = getNumsFromRGB(rgbColor1),
        colors2 = getNumsFromRGB(rgbColor2),
        newColors = [];
        
    for (var i = 0; i < colors1.length; i++) {
        var color1 = parseInt(colors1[i], 10);
        var color2 = parseInt(colors2[i], 10);
        newColors.push(Math.round(Math.abs(color1 + ((color2 - color1)*ratio))));
    }
        
    function getNumsFromRGB(rgbColor) {
        var colors = rgbColor.split(',');

        var colorA = colors[0].substring(4, colors[0].length),
            colorB = colors[1],
            colorC = colors[2].substring(0, colors[2].length - 1);

        return [colorA, colorB, colorC];
    }
    
    return 'rgb(' + newColors + ')';

}

function sampleArray(arrayToSample, numOfSamples) {
    var sampleLength = Math.floor((arrayToSample.length/2) / numOfSamples),
        sampleAvgs = [],
        sample;
        
    for (var j = 0; j < numOfSamples; j++) {
        sample = 0;
                
        for (var i = 0; i < sampleLength; i++) {
            sample += Math.abs(arrayToSample[(j * sampleLength) + i]);
            sample += Math.abs(arrayToSample[(j * sampleLength) + i + (arrayToSample.length/2)]);
        }
                
        sample /= sampleLength*2;
                
        sampleAvgs.push(sample);
    }
    
    return sampleAvgs;
}

function float32ToArray(array) {
    return Array.prototype.slice.call(array);
}

function toggleFullscreen(el) {
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        }
    }
}