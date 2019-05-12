import { put, call, takeLeading } from 'redux-saga/effects';
import {addCell,moveCells,actionExit} from "../logic/cells"

const move = (cells,direction)=> moveCells(direction)(actionExit(cells))
const add = cells => new Promise(res=>setTimeout(res,100,addCell(cells)));

const task = function* (action) {
    const moved = yield call(move,action.cells,action.direction);
    if(moved.result){
        yield put({type:"CELLS_FETCHED",cells:moved.cells})
        const added = yield call(add,moved.cells)
        yield put({type:"CELLS_FETCHED",cells:added})
    }
}

export default takeLeading("REQUEST_MOVE", task);