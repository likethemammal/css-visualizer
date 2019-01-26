import {
    connect
} from 'react-redux'

import _ from 'lodash'

import { select } from '../../units/utils/connect'

import { actions as actionsAudio } from '../Audio/Audio.actions'
import { actions } from './Controls.actions'

import * as selectorsAudio from '../Audio/Audio.selectors'
import * as selectors from './Controls.selectors'

export default (Component) => connect((state) => {
    const selected = select({
        ...selectorsAudio,
        ...selectors,
    }, state)

    return selected
}, {
    ...actionsAudio,
    ...actions,
})(Component)
