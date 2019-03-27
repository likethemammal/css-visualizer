import {
    connect
} from 'react-redux'

import _ from 'lodash'

import { select } from '../../units/utils/connect'

import { actions as actionsAudio } from '../Audio/Audio.actions'
import { actions } from './Controls.actions'
import { actions as actionsSoundCloud } from '../SoundCloud/SoundCloud.actions'

import * as selectorsAudio from '../Audio/Audio.selectors'
import * as selectorsSoundCloud from '../SoundCloud/SoundCloud.selectors'
import * as selectors from './Controls.selectors'

export default (Component) => connect((state) => {
    const selected = select({
        ...selectorsSoundCloud,
        ...selectorsAudio,
        ...selectors,
    }, state)

    return selected
}, {
    ...actions,
    ...actionsAudio,
    ...actionsSoundCloud,
})(Component)
