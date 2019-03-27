import React from 'react';
import store from "../src/store"
import getProvider from '../src/components/Provider'

const Provider = getProvider(store)

export const dispatch = store.dispatch

export const withProvider = (stories) => {
    return <Provider>
        {stories()}
    </Provider>
}
