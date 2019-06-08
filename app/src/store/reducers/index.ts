import {Action} from "@/store/actions/actions"
import {AppState} from "@/domain/model/model"

export default (state:AppState | undefined,action:Action) :AppState => {
    if(!state){
        return {stage:"before"}
    }
    switch (action.type) {
        case "CELLS_FETCHED": 
            return Object.assign({},state,{cells:action.cells});
        case "INIT_FETCHED":
            return Object.assign({},state,{cells:action.cells,token:action.token,stage:"playing"});
        default: 
            return state;
    }
}