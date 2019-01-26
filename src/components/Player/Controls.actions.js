const CONTROLS__SET_GENRE = 'CONTROLS__SET_GENRE'
const CONTROLS__SET_VISUALIZER = 'CONTROLS__SET_VISUALIZER'
const CONTROLS__RESET_COLORS = 'CONTROLS__RESET_COLORS'
const CONTROLS__SET_COLORS = 'CONTROLS__SET_COLORS'
const CONTROLS__SET_COLOR = 'CONTROLS__SET_COLOR'
const CONTROLS__SET_NUM_COLORS = 'CONTROLS__SET_NUM_COLORS'
const CONTROLS__SET_IDLE_INACTIVE = 'CONTROLS__SET_IDLE_INACTIVE'
const CONTROLS__SET_IDLE_ACTIVE = 'CONTROLS__SET_IDLE_ACTIVE'
const CONTROLS__SET_HOVER_ACTIVE = 'CONTROLS__SET_HOVER_ACTIVE'
const CONTROLS__SET_HOVER_INACTIVE = 'CONTROLS__SET_HOVER_INACTIVE'

export const types = {
    CONTROLS__SET_GENRE,
    CONTROLS__SET_VISUALIZER,
    CONTROLS__SET_COLORS,
    CONTROLS__SET_NUM_COLORS,
    CONTROLS__RESET_COLORS,
    CONTROLS__SET_COLOR,
    CONTROLS__SET_IDLE_INACTIVE,
    CONTROLS__SET_IDLE_ACTIVE,
    CONTROLS__SET_HOVER_ACTIVE,
    CONTROLS__SET_HOVER_INACTIVE,
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

const setIdleActive = () => {
    return {
        type: types.CONTROLS__SET_IDLE_ACTIVE,
    }
}

const setIdleInactive = () => {
    return {
        type: types.CONTROLS__SET_IDLE_INACTIVE,
    }
}

const setHoverActive = () => {
    return {
        type: types.CONTROLS__SET_HOVER_ACTIVE,
    }
}

const setHoverInactive = () => {
    return {
        type: types.CONTROLS__SET_HOVER_INACTIVE,
    }
}

export const actions = {
    // setColors,
    setHoverActive,
    setHoverInactive,
    setIdleActive,
    setIdleInactive,
    setVisualizer,
    setGenre,
    setColor,
    resetColors,
}
