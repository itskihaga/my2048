import { put, call, takeLeading } from 'redux-saga/effects';
import axios from "../wrappers/axios";

const api = () => axios.post("/api/init").then(res => res.data)

const task = function* () {
    const res = yield call(api);
    console.log(res);
    yield put({type:"INIT_FETCHED",...res})
}

export default takeLeading("REQUEST_INIT", task);