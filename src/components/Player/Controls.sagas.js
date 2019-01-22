import { call, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import { types } from './Controls.actions'

import randomColor from "randomcolor";

function* onSetColors({ numColors = 3 }) {



    const colors = [...Array(numColors)].map(() => {
        return randomColor()
    })

    yield put({type: types.CONTROLS__SET_COLORS, colors,});
}

const sagas = [
    takeLatest(types.CONTROLS__RESET_COLORS, onSetColors),
]

export default sagas
