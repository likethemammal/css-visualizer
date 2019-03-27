import {
    createSelectorWithDependencies as createSelector
} from 'reselect-tools'

import {
    _Audio,
    audio as _audio,
    paused as _paused,
    muted as _muted,
    playing as _playing,
    volume as _volume,
    volumeFormatted as _volumeFormatted,
    fakeTriggered as _fakeTriggered,
    vm as _vm,
    visualizerLoaded as _visualizerLoaded,
    percentComplete as _percentComplete,
    ratioComplete as _ratioComplete,
    timestamp as _timestamp,
    duration as _duration,
    currentTime as _currentTime,
    timeLeft as _timeLeft,
} from './Audio.units'

export const timestamp = createSelector(
    _Audio,
    _timestamp,
)

export const audio = createSelector(
    _Audio,
    timestamp,
    _audio,
)

export const vm = createSelector(
    _Audio,
    _vm,
)

export const fakeTriggered = createSelector(
    _Audio,
    _fakeTriggered,
)

export const visualizerLoaded = createSelector(
    _Audio,
    _visualizerLoaded,
)

export const muted = createSelector(
    audio,
    timestamp,
    _muted,
)

export const paused = createSelector(
    audio,
    timestamp,
    _paused,
)

export const playing = createSelector(
    paused,
    _playing,
)

export const volume = createSelector(
    audio,
    timestamp,
    _volume,
)

export const volumeFormatted = createSelector(
    volume,
    muted,
    _volumeFormatted,
)

export const duration = createSelector(
    audio,
    timestamp,
    _duration,
)

export const currentTime = createSelector(
    audio,
    timestamp,
    _currentTime,
)

export const ratioComplete = createSelector(
    duration,
    currentTime,
    _ratioComplete,
)

export const percentComplete = createSelector(
    ratioComplete,
    _percentComplete,
)

export const timeLeft = createSelector(
    duration,
    currentTime,
    _timeLeft,
)

