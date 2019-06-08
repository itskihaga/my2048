import { put,takeLeading,call } from 'redux-saga/effects';
import init,{Init} from "@/service/init"
import { InitFetched } from "@/store/actions"

export default takeLeading("REQUEST_INIT", function* () {
    const res : Init = yield call(init);
    yield put<InitFetched>({type:"INIT_FETCHED",...res})
});