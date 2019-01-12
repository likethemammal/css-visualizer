import React, { Component } from 'react'

class _Audio extends Component {

    constructor(props) {
        super(props)
    }

    onAudioLoaded = () => {
        const {
            onVisualizerLoaded,
            vm,
            audio,
        } = this.props

        vm.load(audio, onVisualizerLoaded)
        audio.play()
    }

    onPlay = () => {

        const { audio } = this.props

        if (audio.readyState === 3 || audio.readyState === 4) {
            this.onAudioLoaded()
        } else {
            audio.addEventListener('canplay', this.onAudioLoaded)
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.fakeTriggered && !prevProps.fakeTriggered) {
            this.onPlay()
        }

    }

    componentDidMount() {
        this.props.audio.crossOrigin = "anonymous"
        this.props.audio.src = 'https://likethemammal.github.io/visualizer-micro/sample.mp3'
    }

    render() {

        return <div>
            <button onClick={this.props.onFakeTriggered}>Play</button>
            {this.props.children}
        </div>
    }
}

export default _Audio
