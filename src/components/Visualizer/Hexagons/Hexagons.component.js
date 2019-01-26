import React, { Component } from 'react'

import { lighterColor, changeColor, darkerColor, fadeToColor, } from '../../../units/utils/color'
import { sampleArray, } from '../../../units/utils/visualizer'

import { prefix } from '../../../constants/app'

import Base from '../Base.component'

const NUM_HEXS = 15

const HEX_DEFAULT_TRANSFORM_STR = `rotate(0deg)`

class Bars extends Base {

    name = 'Hexagons'
    numColors = 3
    fps = 70

    currentOverlay = ''
    colorTimer = false

    colorOverlay = false
    gradientOverlay = false
    hexWrappers = []
    hexs = []

    setupElements = () => {
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

        this.visualizer.current.appendChild(overlayContainer);
        this.visualizer.current.appendChild(hexContainer);

        for (var i = 0; i < NUM_HEXS; i++) {
            var hexWrapper = document.createElement('div'),
                hex = document.createElement('div');

            hexWrapper.appendChild(hex);
            hex.style[prefix.css + 'transform'] = HEX_DEFAULT_TRANSFORM_STR;

            hexWrapper.className += ' hex-wrapper';
            hex.className += ' hex';

            hexContainer.appendChild(hexWrapper);
        }

        this.colorOverlay = colorOverlay;
        this.gradientOverlay = gradientOverlay;

        this.hexs = document.getElementsByClassName('hex');
        this.hexWrappers = document.getElementsByClassName('hex-wrapper');
    }

    setShading = () => {
        var shade = 'rgba(255,255,255,0.08)';
        var styleSheet = document.styleSheets[0];

        for (var j = 0; j < NUM_HEXS; j++) {
            var hex = this.hexs[j];
            var beforeStr = '#hex' + j + ':before { border-bottom-color : ' + shade + '}',
                afterStr = '#hex' + j + ':after { border-top-color : ' + shade + '}';

            hex.id = 'hex' + j;
            hex.style['background-color'] = shade;
            styleSheet.insertRule(beforeStr, 0);
            styleSheet.insertRule(afterStr, 0);

        }
    }

    setColors = () => {
        // todo: Add cross-browser support for opacity and gradients

        const {
            color1,
            color2,
            color3,
        } = this.props

        var gradientStr = prefix.css + "linear-gradient(-30deg, " + color1 + " 0%," + color2 + " 50%," + color3 + " 100%)";

        switch (this.currentOverlay) {
            case 'gradient':
                this.colorOverlay.style['background'] = color1;
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

    }

    onSpectrum = (spectrum) => {
        var sampleAvgs = sampleArray(spectrum, NUM_HEXS, 0.08);

        for (var i = 0; i < NUM_HEXS; i++) {
            this.hexWrappers[i].style[prefix.css + 'transform'] = HEX_DEFAULT_TRANSFORM_STR + ' scale(' + (sampleAvgs[i]*100 + 1) + ')';
        }
    }

    onMount = () => {
        this.setupElements();
        this.setShading();
        this.setColors()

        this.colorTimer = setInterval(() => {
            if (this.props.playing) {
                this.props.resetColors()
            }
        }, 10000)

    }

    onResize = () => {
        this.setupElements()
    }

    onUnmount = () => {
        clearInterval(this.colorTimer)
    }

    onColorChange = () => {
        this.setColors()
    }


}

export default Bars
