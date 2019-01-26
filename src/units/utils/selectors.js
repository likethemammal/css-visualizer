import memoize from 'lodash.memoize'
import { createSelectorCreator } from 'reselect'

const hashFn = (...args) => args.reduce(
    (acc, val) => acc + '-' + JSON.stringify(val),
    ''
)

export const createCustomSelector = createSelectorCreator(
    memoize,
    hashFn
)
