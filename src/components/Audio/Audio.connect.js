import {
    connect
} from 'react-redux'

import { actions } from './Audio.actions'

export default (Component) => connect((state) => {
    return {
        fakeTriggered: state.Audio.fakeTriggered,
        visualizerLoaded: state.Audio.visualizerLoaded,
        vm: state.Audio.vm,
        audio: state.Audio.audio,
    }
}, {
    ...actions,
})(Component)
