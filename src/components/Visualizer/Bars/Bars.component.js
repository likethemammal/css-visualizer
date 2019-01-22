import React, { Component } from 'react'

import { lighterColor, changeColor, darkerColor, fadeToColor, } from '../../../units/utils/color'
import { sampleArray, } from '../../../units/utils/visualizer'

import { prefix } from '../../../constants/app'

import Base from '../Base.component'

const _numOfBars = (viewportWidth, barWidth) => viewportWidth / barWidth

const BAR_WIDTH = 24

class Bars extends Base {

    name = 'Bars'
    currentAmp = 0
    fps = 40
    colorsNeeded = 2

    bars = []

    setupElements = () => {

        const numOfBars = _numOfBars(window.innerWidth, BAR_WIDTH)

        var reflectionOverlay = document.createElement('div');

        reflectionOverlay.id = "reflection-overlay";

        this.visualizer.current.innerHTML = ''
        this.visualizer.current.appendChild(reflectionOverlay)

        for (var i = 0; i < numOfBars; i++) {
            var bar = document.createElement('div'),
                barWrapper = document.createElement('div');

            bar.className = 'bar';
            barWrapper.className = 'bar-wrapper';
            barWrapper.style.left = i*BAR_WIDTH + "px";

            barWrapper.appendChild(bar);
            this.visualizer.current.appendChild(barWrapper);
        }

        this.bars = document.getElementsByClassName('bar');
    }

    setupColors = () => {
        const styleSheet = document.getElementById('visualizer-css');
        var stylesStr = '';
        const { color1, color2 } = this.props

        let color = color1

        const numOfBars = _numOfBars(window.innerWidth, BAR_WIDTH)

        for (var i = 0; i < numOfBars; i++) {

            var startOfSelectorStr = '.bar-wrapper:nth-of-type(' + (i + 2) + ') .bar', // Its '+ 2' because reflectionOverlay is first-child
                beforeStr = startOfSelectorStr + ':before { background-color: ' + lighterColor(color, 0.1) + '; }',
                afterStr = startOfSelectorStr + ':after { background-color: ' + darkerColor(color, 0.1) + '; }',
                barStr = startOfSelectorStr + ' { background-color: ' + darkerColor(color, 0.2) + '; }';

            stylesStr += beforeStr + afterStr + barStr;

            color = fadeToColor(color, color2, 1/numOfBars);
        }

        styleSheet.innerHTML = stylesStr;
    }

    onWaveform = (waveform) => {
        const numOfBars = _numOfBars(window.innerWidth, BAR_WIDTH)

        var sampleAvgs = sampleArray(waveform, numOfBars, 1);
        var bars = this.bars;

        for (var j = 0; j < numOfBars; j++) {
            const magnitude = Math.floor(sampleAvgs[j]*1000)/1000

            const bar = bars[j]

            if (bar) {
                bar.parentNode
                    .style[prefix.css + 'transform'] =
                    [
                        "scaleY(",
                        magnitude,
                        ") translate3d(0,0,0)"
                    ].join("")
            }
        }
    }

    onMount = () => {
        this.setupElements()
        this.setupColors()
    }

    onResize = () => {
        this.setupElements()
        this.setupColors()
    }


}

export default Bars
