const SC__LOAD = 'SC__LOAD'
const SC__SET_CURRENT_SONG_ID = 'SC__SET_CURRENT_SONG_ID'
const SC__NEXT_SONG = 'SC__NEXT_SONG'
const SC__SET_NEXT_SONG = 'SC__SET_NEXT_SONG'
const SC__GET_SONGS = 'SC__GET_SONGS'
const SC__GET_SONGS_SUCCESS = 'SC__GET_SONGS_SUCCESS'
const SC__GET_SONGS_ERROR = 'SC__GET_SONGS_ERROR'
const SC__SET_COLLECTION = 'SC__SET_COLLECTION'
const SC__SET_SONG_AS_LISTENED = 'SC__SET_SONG_AS_LISTENED'
const SC__SET_SONG_AS_LISTENED_SUCCESS = 'SC__SET_SONG_AS_LISTENED_SUCCESS'

export const types = {
    SC__GET_SONGS,
    SC__SET_CURRENT_SONG_ID,
    SC__GET_SONGS_SUCCESS,
    SC__GET_SONGS_ERROR,
    SC__SET_SONG_AS_LISTENED,
    SC__SET_SONG_AS_LISTENED_SUCCESS,
    SC__NEXT_SONG,
    SC__SET_NEXT_SONG,
    SC__SET_COLLECTION,
    SC__LOAD,
}

const onLoad = () => {
    return {
        type: types.SC__LOAD
    }
}

const onNext = () => {
    return {
        type: types.SC__NEXT_SONG
    }
}

export const actions = {
    onNext,
    onLoad,
}
