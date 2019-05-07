import { put, call, takeLeading } from 'redux-saga/effects';
import axios from '@/wrappers/axios'

const api = () => {
    return axios.post("/start").then(res => ({token:res.data.token,cells:res.data.status}));
}

const task = function* () {
    const {cells,token} = yield call(api);
    yield put({type:"INIT_FETCHED",cells,token})
}

export default takeLeading("REQUEST_INIT", task);