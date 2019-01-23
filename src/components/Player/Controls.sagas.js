import { call, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import randomColor from "randomcolor"

import { types } from './Controls.actions'

import {
    numColors as _numColors,
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

const sagas = [
    takeLatest(types.CONTROLS__RESET_COLORS, onSetColors),
]

export default sagas
