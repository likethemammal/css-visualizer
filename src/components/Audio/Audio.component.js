import React, { Component } from 'react'

class _Audio extends Component {

    constructor(props) {
        super(props)
        this.audioEl = React.createRef();
    }

    onAudioLoaded = () => {
        this.props.vm.load(this.audioEl.current, this.props.onVisualizerLoaded)
    }

    onAudioMounted = () => {

        const { current } = this.audioEl

        if (current.readyState === 3 || current.readyState === 4) {
            this.onAudioLoaded()
        } else {
            current.addEventListener('canplay', this.onAudioLoaded)
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.audioMounted && !prevProps.audioMounted) {
            this.onAudioMounted()
        }

    }

    componentDidMount() {
        this.audioEl.current.crossOrigin = "anonymous"
    }

    render() {

        return <div>
            <button onClick={this.props.onAudioMounted}>Start</button>
            <audio ref={this.audioEl} controls src={'https://likethemammal.github.io/visualizer-micro/sample.mp3'}></audio>
            {this.props.children}
        </div>
    }
}

export default _Audio
