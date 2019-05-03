import { put, call, takeEvery } from 'redux-saga/effects';

const api = () => {
    return new Promise(res => setTimeout(() => res([[1,2,3],[1,2,3]])));
}
const task = function* () {
    const cells = yield call(api);
    yield put({type:"CELLS_FETCHED",cells})
}

export default takeEvery("REQUEST_INIT", task);