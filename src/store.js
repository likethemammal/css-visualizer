import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { registerSelectors, getStateWith, selectorGraph } from 'reselect-tools'

// import createStorybookListener from 'storybook-addon-redux-listener'

export const IS_STORYBOOK = process.env.NODE_ENV === 'storybook'

// import selectors from './selectors'
import rootReducer from './reducers'
// import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [
    sagaMiddleware,
]

// if (IS_STORYBOOK) {
//     const storybookMiddleware = createStorybookListener()
//
//     middlewares.push(storybookMiddleware)
// }

const compose = (name, middleware) => composeWithDevTools({
    name
})(middleware)

const configureStore = function (reducer, name) {
    return createStore(
        reducer,
        compose(
            name,
            applyMiddleware(...middlewares),
        ),
        // withReduxEnhancer
    )
}

//Redux DevTools
const STORE_NAME = 'CSS Visualizer'

const store = configureStore(rootReducer, STORE_NAME)

// sagaMiddleware.run(rootSaga)

//Reselect Devtools
// registerSelectors(selectors)
// getStateWith(() => store.getState())

export default store
