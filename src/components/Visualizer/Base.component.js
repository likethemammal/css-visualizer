import React, {Component, Fragment} from 'react'

import _ from 'lodash'

const styles = {
    container: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: -1,
        backgroundColor: 'black',
    }
}

class Base extends Component {

    timer = false
    fps = 60

    constructor(props) {
        super(props)

        this.visualizer = React.createRef()
    }

    getData = () => {
        // if options.hideVis is true, return

        if (
            !this.props.visualizerLoaded ||
            this.props.paused
        ) {
            return
        }

        if (this.onSpectrum) {
            this.onSpectrum(
                this.props.vm.getSpectrum()
            )
        }

        if (this.onWaveform) {
            this.onWaveform(
                this.props.vm.getWaveform()
            )
        }
    }

    destroy = () => {
        clearInterval(this.timer)

        const styleSheet = document.getElementById('visualizer-css');
        if (styleSheet) {
            document.head.removeChild(styleSheet);
        }

        window.removeEventListener('resize', this.resize)

        if (this.onDestroy) {
            this.onDestroy()
        }
    }

    resize = _.throttle(() => {
        if (this.onResize) {
            this.onResize()
        }
    }, 100)

    componentDidMount() {
        this.timer = setInterval(this.getData, 50 + (60 - this.fps))

        const styleSheet = document.createElement('style');

        styleSheet.id = 'visualizer-css'
        document.head.appendChild(styleSheet)

        window.addEventListener('resize', this.resize)

        this.props.resetColors(this.numColors)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.width !== prevProps.width) {
            this.resize()
        }

        if (this.props.color1 !== prevProps.color1) {
            if (this.onMount) {
                this.onMount()
            }
        }
    }

    componentWillUnmount() {

        this.destroy()
    }

    render() {
        return <div ref={this.visualizer} style={styles.container}/>
    }
}

export default Base
