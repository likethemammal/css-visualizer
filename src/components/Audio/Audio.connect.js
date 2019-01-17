import {
    connect
} from 'react-redux'

import _ from 'lodash'

import { actions } from './Audio.actions'

import * as selectors from './Audio.selectors'

export default (Component) => connect((state) => {
    return _.mapValues(selectors, (selector, key) => {
        const value = selector(state)
        return value
    })
}, {
    ...actions,
})(Component)
