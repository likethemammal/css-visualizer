import { types } from './Audio.actions'
import VisualizerMicro from "visualizer-micro"
import _ from 'lodash'

export const initialState = {
    visualizerLoaded: false,
    fakeTriggered: false,
    vm: new VisualizerMicro(),
    audio: new Audio(),
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
