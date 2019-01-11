const AUDIO__VISUALIZER_LOADED = 'AUDIO__VISUALIZER_LOADED'
const AUDIO__AUDIO_MOUNTED = 'AUDIO__AUDIO_MOUNTED'

export const types = {
    AUDIO__VISUALIZER_LOADED,
    AUDIO__AUDIO_MOUNTED,
}

const onAudioMounted = () => {
    return {
        type: types.AUDIO__AUDIO_MOUNTED,
    }
}

const onVisualizerLoaded = () => {
    return {
        type: types.AUDIO__VISUALIZER_LOADED,
    }
}

export const actions = {
    onAudioMounted,
    onVisualizerLoaded,
}
