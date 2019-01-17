const AUDIO__VISUALIZER_LOADED = 'AUDIO__VISUALIZER_LOADED'
const AUDIO__PLAY_FAKED = 'AUDIO__PLAY_FAKED'
const AUDIO__VOLUME_CHANGE = 'AUDIO__VOLUME_CHANGE'
const AUDIO__AUDIO_UPDATED = 'AUDIO__AUDIO_UPDATED'

import _ from 'lodash'

export const types = {
    AUDIO__VISUALIZER_LOADED,
    AUDIO__PLAY_FAKED,
    AUDIO__VOLUME_CHANGE,
    AUDIO__AUDIO_UPDATED,
}

const onPlayFaked = () => {
    return {
        type: types.AUDIO__PLAY_FAKED,
    }
}

const onVolumeChange = (ev) => {
    return {
        type: types.AUDIO__VOLUME_CHANGE,
        volume: parseFloat(ev.target.value),
    }
}

const onVisualizerLoaded = _.throttle(() => {
    return {
        type: types.AUDIO__VISUALIZER_LOADED,
    }
}, 100)

const onAudioUpdate = (audio) => {
    return {
        type: types.AUDIO__AUDIO_UPDATED,
        audio,
    }
}

export const actions = {
    onAudioUpdate,
    onPlayFaked,
    onVolumeChange,
    onVisualizerLoaded,
}
