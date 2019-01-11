import { types } from './Audio.actions'
import VisualizerMicro from "visualizer-micro"

export const initialState = {
    visualizerLoaded: false,
    audioMounted: false,
    vm: new VisualizerMicro(),
}

export const reducer = {
    [types.AUDIO__VISUALIZER_LOADED]: (state, action) => {
        return {
            ...state,
            visualizerLoaded: true,
        }
    },
    [types.AUDIO__AUDIO_MOUNTED]: (state, action) => {
        return {
            ...state,
            audioMounted: true,
        }
    },
}
