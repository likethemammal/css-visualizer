import { types } from './Controls.actions'
import _ from 'lodash'

export const initialState = {
    genreIndex: 0,
    visualizerIndex: 0,
    colors: [],
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

}
