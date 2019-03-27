import { call, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import randomColor from "randomcolor"

import { types } from './Controls.actions'

import {
    numColors as _numColors,
    colors as _colors,
} from './Controls.selectors'

function* onSetColors({ numColors }) {

    const currentNumColors = yield select(_numColors)

    let newNumColors = currentNumColors

    if (numColors) {
        newNumColors = numColors
        yield put({type: types.CONTROLS__SET_NUM_COLORS, numColors: newNumColors,});
    }

    const colors = [...Array(newNumColors)].map(() => {
        return randomColor()
    })

    yield put({type: types.CONTROLS__SET_COLORS, colors,});
}

function* onSetColor({ value, index }) {

    const colors = yield select(_colors)

    let newColors = [...colors]

    newColors[index] = value

    yield put({type: types.CONTROLS__SET_COLORS, colors: newColors,});

}

const sagas = [
    takeLatest(types.CONTROLS__RESET_COLORS, onSetColors),
    takeLatest(types.CONTROLS__SET_COLOR, onSetColor),
]

export default sagas
