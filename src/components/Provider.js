import React from 'react'
import { Provider } from 'react-redux'

import { hot } from 'react-hot-loader'

const ProviderWrapper = (store) => ({ children }) => (
    <Provider store={store}>
        { children }
    </Provider>
)

export default (store) => hot(module)(ProviderWrapper(store))
