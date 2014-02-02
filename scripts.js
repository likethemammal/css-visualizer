var body = document.body,
    color1 = Math.max(Math.floor(Math.random()*255), 0),
    color2 = Math.max(Math.floor(Math.random()*255), 0),
    color3 = Math.max(Math.floor(Math.random()*255), 0),
    rgbStr = 'rgb(' + color1 + ',' + color2 + ',' + color3 + ')',
    amplitudes = [1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1],
    currentAmp = 0;


function createBlocks() {
    for (var i = 0; i < 45; i++) {
        var block = document.createElement('div'),
            beforeStr = '.block:nth-of-type(' + (i + 1) + '):before { background-color: ' + lighterColor(rgbStr, 0.1) + '; }',
            afterStr = '.block:nth-of-type(' + (i + 1) + '):after { background-color: ' + darkerColor(rgbStr, 0.1) + '; }',
            blockStr = '.block:nth-of-type(' + (i + 1) + ') { background-color: ' + darkerColor(rgbStr, 0.2) + '; }';
            
        block.className = 'block';
        block.style.bottom = i*14 + "px";
        block.style['-webkit-transform'] = "translate3d(" + ((Math.sin(i/10)*15) - 50) + "%, 0, 0)";
        
        console.log((Math.sin(i/10)*15) + 50);
        
        document.styleSheets[0].insertRule(beforeStr, 0);
        document.styleSheets[0].insertRule(afterStr, 0);
        document.styleSheets[0].insertRule(blockStr, 0);
        
        body.appendChild(block);
        
        rgbStr = lighterColor(rgbStr, 0.01);
    }
}

function animateErryTing() {
    var blocks = document.getElementsByClassName('block');
    
    console.warn('what the shit');
    
    for (var j = 0; j < blocks.length; j++) {
        blocks[j].style['-webkit-transform'] = "translate3d(" + ((Math.sin(j*currentAmp/10)*15) - 50) + "%, 0, 0)";
    }
    
    currentAmp++;
    
}

createBlocks();
setInterval(animateErryTing, 100);






function pad(num, totalChars) {
    var pad = '0';
    num = num + '';
    while (num.length < totalChars) {
        num = pad + num;
    }
    return num;
};

// Ratio is between 0 and 1
function changeColor(color, ratio, darker) {
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