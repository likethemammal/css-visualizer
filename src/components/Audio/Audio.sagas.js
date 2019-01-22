import { call, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import { types } from './Audio.actions'

import {
    audio as _audio,
    paused as _paused,
    fakeTriggered as _fakeTriggered,
} from './Audio.selectors'

function* onVolumeChange({volume}) {
    const audio = yield select(_audio)

    audio.volume = volume + ''

    yield put({type: types.AUDIO__AUDIO_UPDATED, audio,});
}

function* onPlay() {
    const fakeTriggered = yield select(_fakeTriggered)
    const audio = yield select(_audio)
    const paused = yield select(_paused)

    if (!fakeTriggered) {
        yield put({type: types.AUDIO__PLAY_FAKED,});
        return
    }

    if (paused) {
        audio.play()
    } else {
        audio.pause()
    }

    yield put({type: types.AUDIO__AUDIO_UPDATED, audio,});
}

const sagas = [
    takeLatest(types.AUDIO__VOLUME_CHANGE, onVolumeChange),
    takeLatest(types.AUDIO__PLAY, onPlay),
]

export default sagas
