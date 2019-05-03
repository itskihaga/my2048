import { put, call, takeEvery } from 'redux-saga/effects';

const api = () => {
    return new Promise(res => setTimeout(() => res({cells:[],token:1})));
}

const task = function* () {
    const {cells,token} = yield call(api);
    yield put({type:"INIT_FETCHED",cells,token})
}

export default takeEvery("REQUEST_INIT", task);