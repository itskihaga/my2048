import { put, call, takeLeading } from 'redux-saga/effects';
import {addCell} from "../logic/cells"

const api = () => addCell(addCell([]))

const task = function* () {
    const cells = yield call(api);
    yield put({type:"CELLS_FETCHED",cells})
}

export default takeLeading("REQUEST_INIT", task);