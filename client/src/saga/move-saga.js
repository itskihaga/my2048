import { put, call, takeEvery } from 'redux-saga/effects';

const api = arg => new Promise(res => setTimeout(() => res([{address:{x:2,y:3},value:arg.direction}]),500));

const task = function* (action) {
    const {direction,token} = action;
    const cells = yield call(api,{direction,token});
    yield put({type:"CELLS_FETCHED",cells})
}

export default takeEvery("REQUEST_MOVE", task);