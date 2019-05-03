import { put, call, takeEvery } from 'redux-saga/effects';

const api = dir => new Promise(res => setTimeout(() => res([[1,2,3],[dir,dir,dir]]),500));

const task = function* (action) {
    const cells = yield call(api,action.direction);
    yield put({type:"CELLS_FETCHED",cells})
}

export default takeEvery("REQUEST_MOVE", task);