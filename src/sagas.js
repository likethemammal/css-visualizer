import { all } from 'redux-saga/effects'

import AudioSagas from './components/Audio/Audio.sagas'
import ControlsSagas from './components/Player/Controls.sagas'
import SoundCloudSagas from './components/SoundCloud/SoundCloud.sagas'

function* rootSaga() {
    yield all([
        ...AudioSagas,
        ...ControlsSagas,
        ...SoundCloudSagas,
    ])
}

export default rootSaga
