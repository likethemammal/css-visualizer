var body = document.body,
    rgbStr = randomColor(),
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
                
        document.styleSheets[0].insertRule(beforeStr, 0);
        document.styleSheets[0].insertRule(afterStr, 0);
        document.styleSheets[0].insertRule(blockStr, 0);
        
        body.appendChild(block);
        
        rgbStr = lighterColor(rgbStr, 0.01);
    }
}

function animateErryTing() {
    var blocks = document.getElementsByClassName('block');
        
    for (var j = 0; j < blocks.length; j++) {
        blocks[j].style['-webkit-transform'] = "translate3d(" + ((Math.sin(j*currentAmp/10)*15) - 50) + "%, 0, 0)";
    }
    
    currentAmp++;
}

createBlocks();
setInterval(animateErryTing, 200);