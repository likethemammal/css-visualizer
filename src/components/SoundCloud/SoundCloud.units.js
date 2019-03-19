import _ from 'lodash'

import {
    SONG_BATCH_SIZE,
    SC_ID,
} from '../../constants/app'

export const SoundCloud = ({ SoundCloud }) => SoundCloud || {}

export const paginationIndex = ({ paginationIndex }) => paginationIndex
export const collection = ({ collection }) => collection
export const nextHref = ({ nextHref }) => nextHref
export const listenedToIds = ({ listenedToIds }) => listenedToIds
export const currentSongId = ({ currentSongId }) => currentSongId


export const songsNotListenedTo = (collection, listenedToIds) => {
    return collection.filter(({ id }) => {
        return listenedToIds.indexOf(id) === -1
    })
}

export const songsNotListenedToLength = (songsNotListenedTo) => songsNotListenedTo.length

export const hasNextSong = (songsNotListenedToLength) => songsNotListenedToLength > 0
export const nextSongIndex = (songsNotListenedToLength) => Math.floor(songsNotListenedToLength * Math.random())
export const nextSong = (hasNextSong, songsNotListenedTo, nextSongIndex, currentSongId) => {
    console.log(hasNextSong, nextSongIndex, currentSongId)
    return hasNextSong && songsNotListenedTo[nextSongIndex]
}
export const nextSongId = (hasNextSong, { id }) => {
    return hasNextSong && id
}

export const currentSong = (collection, currentSongId) => _.find(collection, ({ id }) => {
    return currentSongId === id
})
export const hasCurrentSong = (currentSong) => !!currentSong

export const currentSongFormatted = (
    hasCurrentSong,
    {
        stream_url,
        title,
        permalink_url,
        user,
        duration,
        artwork_url,
    } = {}
) => {

    if (!hasCurrentSong) {
        return {}
    }

    return {
        streamUrl: `${stream_url}?client_id=${SC_ID}`,
        titleName: title,
        titleUrl: permalink_url,
        artistName: user.username,
        albumSrc: artwork_url.replace('large.jpg', 'crop.jpg'),
    }
}

export const nextPaginationIndex = (paginationIndex) => {

    if (paginationIndex === false) {
        return 0
    }

    return paginationIndex + 1
}

export const limit = (nextPaginationIndex) => {

    const pageIndex = Math.max(nextPaginationIndex, 1)
    const batchSize = pageIndex * SONG_BATCH_SIZE

    return batchSize + 3
}

export const getAPIUrl = (nextHref) => {

    console.log(nextHref)


    if (nextHref) {

        const { pathname, search } = new URL(nextHref)

        return `${pathname}${search}`
    }

    return '/tracks'
}
