import { types } from './Audio.actions'
import VisualizerMicro from "visualizer-micro"
import _ from 'lodash'

const audio = new Audio()

audio.volume = 0.3

export const initialState = {
    visualizerLoaded: false,
    fakeTriggered: false,
    vm: new VisualizerMicro(),
    audio,
    timestamp: Date.now()
}

export const reducer = {
    [types.AUDIO__VISUALIZER_LOADED]: (state, action) => {
        return {
            ...state,
            visualizerLoaded: true,
        }
    },
    [types.AUDIO__PLAY_FAKED]: (state, action) => {
        return {
            ...state,
            fakeTriggered: true,
        }
    },
    [types.AUDIO__AUDIO_UPDATED]: (state, { audio }) => {
        return {
            ...state,
            timestamp: Date.now()
        }
    },
}
