import { combineReducers } from 'redux'

import {
    initialState as AudioInitialState,
    reducer as AudioActions,
} from './components/Audio/Audio.reducer'

import {
    initialState as ControlsInitialState,
    reducer as ControlsActions,
} from './components/Player/Controls.reducer'

import {
    initialState as SoundCloudInitialState,
    reducer as SoundCloudActions,
} from './components/SoundCloud/SoundCloud.reducer'

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
    _Audio: createReducer(AudioInitialState, AudioActions),
    Controls: createReducer(ControlsInitialState, ControlsActions),
    SoundCloud: createReducer(SoundCloudInitialState, SoundCloudActions),
})
