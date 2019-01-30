import {
    createSelectorWithDependencies as createSelector
} from 'reselect-tools'

import {
    SoundCloud,
    paginationIndex as _paginationIndex,
    nextPaginationIndex as _nextPaginationIndex,
    nextHref as _nextHref,
    collection as _collection,
    limit as _limit,
    currentSongId as _currentSongId,
    listenedToIds as _listenedToIds,
    currentSong as _currentSong,
    currentSongFormatted as _currentSongFormatted,
    songsNotListenedTo as _songsNotListenedTo,
    songsNotListenedToLength as _songsNotListenedToLength,
    nextSongIndex as _nextSongIndex,
    nextSong as _nextSong,
    nextSongId as _nextSongId,
    hasNextSong as _hasNextSong,
    hasCurrentSong as _hasCurrentSong,
} from './SoundCloud.units'

export const paginationIndex = createSelector(
    SoundCloud,
    _paginationIndex,
)

export const nextHref = createSelector(
    SoundCloud,
    _nextHref,
)

export const collection = createSelector(
    SoundCloud,
    _collection,
)

export const currentSongId = createSelector(
    SoundCloud,
    _currentSongId,
)

export const currentSong = createSelector(
    collection,
    currentSongId,
    _currentSong,
)

export const hasCurrentSong = createSelector(
    currentSong,
    _hasCurrentSong,
)

export const currentSongFormatted = createSelector(
    hasCurrentSong,
    currentSong,
    _currentSongFormatted,
)

export const listenedToIds = createSelector(
    SoundCloud,
    _listenedToIds,
)

export const songsNotListenedTo = createSelector(
    collection,
    listenedToIds,
    _songsNotListenedTo,
)

export const songsNotListenedToLength = createSelector(
    songsNotListenedTo,
    _songsNotListenedToLength,
)

export const nextSongIndex = createSelector(
    songsNotListenedToLength,
    _nextSongIndex,
)

export const hasNextSong = createSelector(
    songsNotListenedToLength,
    _hasNextSong,
)

export const nextSong = createSelector(
    hasNextSong,
    songsNotListenedTo,
    nextSongIndex,
    currentSongId,
    _nextSong
)

export const nextSongId = createSelector(
    hasNextSong,
    nextSong,
    _nextSongId
)

export const nextPaginationIndex = createSelector(
    paginationIndex,
    _nextPaginationIndex,
)

export const limit = createSelector(
    nextPaginationIndex,
    _limit,
)
