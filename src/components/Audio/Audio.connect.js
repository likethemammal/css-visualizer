import {
    connect
} from 'react-redux'

import { select } from '../../units/utils/connect'

import { actions } from './Audio.actions'
import * as selectors from './Audio.selectors'

export default (Component) => connect((state) => {
    return select(selectors, state)
}, {
    ...actions,
})(Component)
