import { types } from './Audio.actions'
import VisualizerMicro from "visualizer-micro"

export const initialState = {
    visualizerLoaded: false,
    fakeTriggered: false,
    vm: new VisualizerMicro(),
    audio: new Audio(),
}

export const reducer = {
    [types.AUDIO__VISUALIZER_LOADED]: (state, action) => {
        return {
            ...state,
            visualizerLoaded: true,
        }
    },
    [types.AUDIO__FAKE_TRIGGERED]: (state, action) => {
        return {
            ...state,
            fakeTriggered: true,
        }
    },
}
