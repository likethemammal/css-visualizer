import React, {Component, Fragment} from 'react'

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
    }

    onPlayFaked = () => {

        const { audio } = this.props

        if (audio.readyState === 3 || audio.readyState === 4) {
            this.onAudioLoaded()
        } else {
            audio.addEventListener('canplay', this.onAudioLoaded)
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.fakeTriggered && !prevProps.fakeTriggered) {
            this.onPlayFaked()
        }

        if (this.props.visualizerLoaded && !prevProps.visualizerLoaded) {
            this.props.onPlay()
        }

        if (this.props.currentSongId !== prevProps.currentSongId) {
            this.props.onSetSrc()
        }

    }

    render() {

        return <Fragment />
    }
}

export default _Audio
