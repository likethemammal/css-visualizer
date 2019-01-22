import {
    connect
} from 'react-redux'

import _ from 'lodash'

import { actions as actionsAudio } from '../Audio/Audio.actions'
import { actions } from './Controls.actions'

import * as selectorsAudio from '../Audio/Audio.selectors'
import * as selectors from './Controls.selectors'

export default (Component) => connect((state) => {
    return _.mapValues({
        ...selectorsAudio,
        ...selectors,
    }, (selector, key) => {
        const value = selector(state)
        return value
    })
}, {
    ...actionsAudio,
    ...actions,
})(Component)
