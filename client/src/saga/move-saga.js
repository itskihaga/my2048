import { put, call, takeLeading } from 'redux-saga/effects';
import {moveCells,actionExit} from "../logic/cells";
import axios from "../wrappers/axios";

const move = (cells,direction)=> moveCells(direction)(actionExit(cells))
const sendToserver = params => Promise.all([new Promise(res=>setTimeout(res,100)),axios.post("/api/move",params).then(res => res.data)]);

const task = function* (action) {
    const moved = yield call(move,action.cells,action.direction);
    if(moved.result){
        yield put({type:"CELLS_FETCHED",cells:moved.cells})
        const [_,res] = yield call(sendToserver,{direction:action.direction,token:action.token})
        yield put({type:"CELLS_FETCHED",cells:res.cells})
    }
}

export default takeLeading("REQUEST_MOVE", task);