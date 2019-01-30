import { call, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import { types } from './Audio.actions'

import {
    audio as _audio,
    paused as _paused,
    muted as _muted,
    fakeTriggered as _fakeTriggered,
} from './Audio.selectors'

function* onVolumeChange({volume}) {
    const audio = yield select(_audio)

    audio.muted = false
    audio.volume = volume + ''

    yield put({type: types.AUDIO__AUDIO_UPDATED, audio,});
}

function* onVolumeMuteToggle() {
    const audio = yield select(_audio)
    const muted = yield select(_muted)

    if (muted) {
        audio.muted = true
    } else {
        audio.muted = false
    }

    yield put({type: types.AUDIO__AUDIO_UPDATED, audio,})
}

function* onPlay() {
    const fakeTriggered = yield select(_fakeTriggered)
    const audio = yield select(_audio)
    const paused = yield select(_paused)

    if (!fakeTriggered) {
        yield put({type: types.AUDIO__PLAY_FAKED,})
        return
    }

    if (paused) {
        audio.play()
    } else {
        audio.pause()
    }

    yield put({type: types.AUDIO__AUDIO_UPDATED, audio,})
}

const sagas = [
    takeLatest(types.AUDIO__VOLUME_MUTE_TOGGLE, onVolumeMuteToggle),
    takeLatest(types.AUDIO__VOLUME_CHANGE, onVolumeChange),
    takeLatest(types.AUDIO__PLAY, onPlay),
]

export default sagas
