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

    state = {
        loaded: false,
    }

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

    unmount = () => {
        clearInterval(this.timer)

        const styleSheet = document.getElementById('visualizer-css');
        if (styleSheet) {
            document.head.removeChild(styleSheet);
        }

        window.removeEventListener('resize', this.resize)

        if (this.onUnmount) {
            this.onUnmount()
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

        this.setState({
            loaded: true,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.width !== prevProps.width) {
            this.resize()
        }

        if (this.state.loaded && !prevState.loaded) {
            if (this.onMount) {
                this.onMount()
            }
        }

        if (
            this.props.color1 !== prevProps.color1 ||
            this.props.color2 !== prevProps.color2 ||
            this.props.color3 !== prevProps.color3
        ) {
            if (this.onColorChange) {
                this.onColorChange()
            }
        }
    }

    componentWillUnmount() {

        this.unmount()
    }

    render() {
        return <div ref={this.visualizer} style={styles.container}>
            {this.children ? this.children() : ''}
        </div>
    }
}

export default Base
