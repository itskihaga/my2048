import { put, call, takeEvery } from 'redux-saga/effects';
import axios from '@/wrappers/axios'

const api = arg => axios.post("/move",arg).then(res => ({score:res.data.score,cells:res.data.status}));

const task = function* (action) {
    const {direction,token} = action;
    const {cells,score} = yield call(api,{direction,token});
    yield put({type:"CELLS_FETCHED",cells,score})
}

export default takeEvery("REQUEST_MOVE", task);