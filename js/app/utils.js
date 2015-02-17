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

function sampleArray(arrayToSample, numOfSamples, modifier, decimalDigits) {
    var arrayMiddle = arrayToSample.length/ 2,
        sampleLength = Math.floor((arrayMiddle) / numOfSamples),
        sampleAvgs = [],
        precision,
        sample;

    modifier = modifier || 1;
    decimalDigits = decimalDigits || 10;

    precision = Math.pow(10, decimalDigits);

    for (var j = 0; j < numOfSamples; j++) {
        sample = 0;
                
        for (var i = 0; i < sampleLength; i++) {
            sample += Math.abs(arrayToSample[(j * sampleLength) + i]);
            sample += Math.abs(arrayToSample[(j * sampleLength) + i + (arrayMiddle)]);
        }
                
        sample /= sampleLength*2;
                
        sampleAvgs.push(Math.round(sample * modifier * precision) / precision);
    }
    
    return sampleAvgs;
}

function float32ToArray(array) {
    return Array.prototype.slice.call(array);
}

function toggleFullscreen(el) {
    var isFullscreen;
    
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
        isFullscreen = false;
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
        isFullscreen = true;
    }
    
    return isFullscreen;
}

function getIsFullscreen() {
    return document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
 
}

//Modified from: http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
function getLocation(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
}

//Modified from http://stackoverflow.com/questions/13070054/convert-rgb-strings-to-hex-in-javascript 12/30/14
function rgbToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex;

    function componentFromStr(numStr, percent) {
        var num = Math.max(0, parseInt(numStr, 10));
        return percent ?
            Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
    }
}

//Modified from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb 12/30/14
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    result = [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ];

    var rgbStr = 'rgb(' + result + ')';

    return rgbStr;
}