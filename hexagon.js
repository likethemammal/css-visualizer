var hexs = document.getElementsByClassName('hex');

function add() {
    
    for (var i = 0; i < hexs.length; i++) {
        var str = 'rotateX(' + Math.random()*180 + 'deg) rotateZ(' + Math.random()*90 + 'deg) translateY(-' + 500 +'px)';
        hex = hexs[i];
        hex.style['-webkit-transform'] = str;
    }
    
    setInterval(function() {
        for (var i = 0; i < hexs.length; i++) {
            var str = 'rotateX(' + Math.random()*180 + 'deg) rotateZ(' + Math.random()*90 + 'deg) translateY(-' + 500 +'px)';
            hex = hexs[i];
            hex.style['-webkit-transform'] = str;
        }
    }, 5000);
    
    setInterval(function() {
        for (var i = 0; i < hexs.length; i++) {
            hexs[i].parentNode.style['-webkit-transform'] = 'scale(' + (Math.random()*.2 + 1) + ')';
        }
    }, 50);
}

function init() {        
    for (var j = 0; j < hexs.length; j++) {
        var color1 = Math.floor(Math.random()*255),
            color2 = Math.floor(Math.random()*255),
            color3 = Math.floor(Math.random()*255),
            colorStr = 'rgb(' + color1 + ',' + color2 + ',' + color3 + ')',
            beforeStr = '#hex' + j + ':before { border-bottom-color : ' + colorStr + '}';
            afterStr = '#hex' + j + ':after { border-top-color : ' + colorStr + '}';

        console.warn(colorStr);
        hexs[j].id = 'hex' + j;
        hexs[j].style['background-color'] = colorStr;
        document.styleSheets[0].insertRule(beforeStr, 0);
        document.styleSheets[0].insertRule(afterStr, 0);
        console.warn(colorStr);
    }
    
}

init();