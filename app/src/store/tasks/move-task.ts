import { Task } from "redux-tasks"
import {moveCells,actionExit} from "@/domain/service/service";
import {Cell,Direction,AppState} from "@/domain/model/model"
import {RequestMove} from "@/store/actions"
import service,{MoveRequest} from "@/service/move"
import _ from "@/util/util"

const move = ({cells,direction}:{cells:Cell[],direction:Direction})=> moveCells(direction)(actionExit(cells))
const sendToserver = (params:MoveRequest) => Promise.all([_.wait(100),service(params)]);

const task : Task<RequestMove,AppState> = async (dispatch,action,state) => {
    if(state.stage != "playing"){
        throw new Error();
    }
    const moved = move({
        direction:action.direction,
        cells:state.cells
    });
    if(moved.just){
        dispatch({type:"CELLS_FETCHED",cells:moved.value})
        const [_,res] = await sendToserver(action)
        dispatch({type:"CELLS_FETCHED",cells:res.cells})
    }
}

export default {
    type:"REQUEST_MOVE",
    task
}