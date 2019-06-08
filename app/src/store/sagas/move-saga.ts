import { put,takeLeading,call } from 'redux-saga/effects';
import {moveCells,actionExit} from "@/domain/service/service";
import {Cell,Direction} from "@/domain/model/model"
import {RequestMove,CellsFetched} from "@/store/actions"
import service,{MoveRequest, MoveResult} from "@/service/move"
import _ from "@/util/util"

const move = ({cells,direction}:{cells:Cell[],direction:Direction})=> moveCells(direction)(actionExit(cells))
const sendToserver = (params:MoveRequest) => Promise.all([_.wait(100),service(params)]);

export default takeLeading("REQUEST_MOVE", function* (action:RequestMove) {
    const moved = move(action);
    if(moved.just){
        yield put<CellsFetched>({type:"CELLS_FETCHED",cells:moved.value})
        const [_,res] : [true,MoveResult] = yield call(sendToserver,action)
        yield put<CellsFetched>({type:"CELLS_FETCHED",cells:res.cells})
    }
});