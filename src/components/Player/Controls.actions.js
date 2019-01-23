const CONTROLS__SET_GENRE = 'CONTROLS__SET_GENRE'
const CONTROLS__SET_VISUALIZER = 'CONTROLS__SET_VISUALIZER'
const CONTROLS__RESET_COLORS = 'CONTROLS__RESET_COLORS'
const CONTROLS__SET_COLORS = 'CONTROLS__SET_COLORS'
const CONTROLS__SET_COLOR = 'CONTROLS__SET_COLOR'
const CONTROLS__SET_NUM_COLORS = 'CONTROLS__SET_NUM_COLORS'

import _ from 'lodash'

export const types = {
    CONTROLS__SET_GENRE,
    CONTROLS__SET_VISUALIZER,
    CONTROLS__SET_COLORS,
    CONTROLS__SET_NUM_COLORS,
    CONTROLS__RESET_COLORS,
    CONTROLS__SET_COLOR,
}

const setGenre = (index) => {
    return {
        type: types.CONTROLS__SET_GENRE,
        index,
    }
}

const setVisualizer = (index) => {
    return {
        type: types.CONTROLS__SET_VISUALIZER,
        index,
    }
}

const setColor = (value, index) => {
    return {
        type: types.CONTROLS__SET_COLOR,
        index,
        value,
    }
}

const resetColors = (numColors) => {
    return {
        type: types.CONTROLS__RESET_COLORS,
        numColors,
    }
}

export const actions = {
    // setColors,
    setVisualizer,
    setGenre,
    setColor,
    resetColors,
}
