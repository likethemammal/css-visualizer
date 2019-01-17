import { call, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import { types } from './Audio.actions'

import {
    audio as _audio,
} from './Audio.selectors'

function* onVolumeChange({volume}) {
    const audio = yield select(_audio)

    audio.volume = volume + ''

    yield put({type: types.AUDIO__AUDIO_UPDATED, audio,});
}

const sagas = [
    takeLatest(types.AUDIO__VOLUME_CHANGE, onVolumeChange),
]

export default sagas
