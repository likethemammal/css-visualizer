const AUDIO__VISUALIZER_LOADED = 'AUDIO__VISUALIZER_LOADED'
const AUDIO__AUDIO_MOUNTED = 'AUDIO__AUDIO_MOUNTED'
const AUDIO__FAKE_TRIGGERED = 'AUDIO__FAKE_TRIGGERED'

export const types = {
    AUDIO__VISUALIZER_LOADED,
    AUDIO__AUDIO_MOUNTED,
    AUDIO__FAKE_TRIGGERED,
}

const onAudioMounted = () => {
    return {
        type: types.AUDIO__AUDIO_MOUNTED,
    }
}

const onFakeTriggered = () => {
    return {
        type: types.AUDIO__FAKE_TRIGGERED,
    }
}

const onVisualizerLoaded = () => {
    return {
        type: types.AUDIO__VISUALIZER_LOADED,
    }
}

export const actions = {
    onAudioMounted,
    onFakeTriggered,
    onVisualizerLoaded,
}
