import { types } from './Controls.actions'
import _ from 'lodash'

export const initialState = {
    genreIndex: 0,
    visualizerIndex: 0,
    numColors: 3,
    colors: [],
    idle: false,
    hovered: false,
}

export const reducer = {
    [types.CONTROLS__SET_COLORS]: (state, action) => {
        const { colors } = action

        return {
            ...state,
            colors,
        }
    },
    [types.CONTROLS__SET_VISUALIZER]: (state, action) => {
        const { index } = action

        return {
            ...state,
            visualizerIndex: index,
        }
    },
    [types.CONTROLS__SET_GENRE]: (state, action) => {
        const { index } = action

        return {
            ...state,
            genreIndex: index,
        }
    },
    [types.CONTROLS__SET_NUM_COLORS]: (state, action) => {
        const { numColors } = action

        return {
            ...state,
            numColors,
        }
    },
    [types.CONTROLS__SET_IDLE_ACTIVE]: (state, action) => {
        return {
            ...state,
            idle: true,
        }
    },
    [types.CONTROLS__SET_IDLE_INACTIVE]: (state, action) => {
        return {
            ...state,
            idle: false,
        }
    },
    [types.CONTROLS__SET_HOVER_ACTIVE]: (state, action) => {
        return {
            ...state,
            hovered: true,
        }
    },
    [types.CONTROLS__SET_HOVER_INACTIVE]: (state, action) => {
        return {
            ...state,
            hovered: false,
        }
    },
}
