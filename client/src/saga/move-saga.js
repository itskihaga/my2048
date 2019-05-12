import { put, call, takeLeading } from 'redux-saga/effects';
import {addCell,moveCells,actionExit} from "../logic/cells"

const api = (cells,direction)=> addCell(moveCells(direction)(actionExit(cells)))

const task = function* (action) {
    const cells = yield call(api,action.cells,action.direction);
    yield put({type:"CELLS_FETCHED",cells})
}

export default takeLeading("REQUEST_MOVE", task);