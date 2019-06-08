import { put,takeLeading,call } from 'redux-saga/effects';
import init,{Init} from "@/service/init"
import { ActionInitFetched } from "@/store/actions/actions"

export default takeLeading("REQUEST_INIT", function* () {
    const res : Init = yield call(init);
    yield put<ActionInitFetched>({type:"INIT_FETCHED",...res})
});