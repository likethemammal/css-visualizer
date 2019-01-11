import {
    connect
} from 'react-redux'

import { actions } from './Audio.actions'

export default (Component) => connect((state) => {
    return {
        audioMounted: state.Audio.audioMounted,
        visualizerLoaded: state.Audio.visualizerLoaded,
        vm: state.Audio.vm
    }
}, {
    ...actions,
})(Component)
