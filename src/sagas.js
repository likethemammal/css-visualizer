import { all } from 'redux-saga/effects'

import AudioSagas from './components/Audio/Audio.sagas'
import ControlsSagas from './components/Player/Controls.sagas'

function* rootSaga() {
    yield all([
        ...AudioSagas,
        ...ControlsSagas,
    ])
}

export default rootSaga
