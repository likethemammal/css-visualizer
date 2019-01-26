import _ from "lodash";

export const select = (selectors, state) => _.mapValues(selectors, (selector, key) => {
    const value = selector(state)
    return value
})
