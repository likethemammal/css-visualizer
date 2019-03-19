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
        const {
            currentSongId,
            visualizerLoaded,
            fakeTriggered,

            onPlay,
            onSetSrc,
        } = this.props

        if (fakeTriggered && !prevProps.fakeTriggered) {
            this.onPlayFaked()
        }

        if (visualizerLoaded && !prevProps.visualizerLoaded) {
            onPlay()
        }

        if (currentSongId && currentSongId !== prevProps.currentSongId) {
            onSetSrc()
        }

    }

    render() {

        return <Fragment />
    }
}

export default _Audio
