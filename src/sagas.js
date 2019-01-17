import { all } from 'redux-saga/effects'

import AudioSagas from './components/Audio/Audio.sagas'

function* rootSaga() {
    yield all([
        ...AudioSagas,
    ])
}

export default rootSaga
