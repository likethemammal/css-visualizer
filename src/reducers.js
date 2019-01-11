import { combineReducers } from 'redux'

import {
    initialState as AudioInitialState,
    reducer as AudioActions,
} from './components/Audio/Audio.reducer'

const createReducer = function(initialState, reducer) {

    return function(state = initialState, action) {
        const reaction = reducer[action.type]

        if (reaction) {
            return reaction(state, action)
        }

        return state
    }
}


export default combineReducers({
    Audio: createReducer(AudioInitialState, AudioActions),
})
