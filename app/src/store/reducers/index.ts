import Action from "@/store/actions"
import {AppState} from "@/domain/model/model"
import _ from "@/util/util"

export default (state:AppState | undefined,action:Action) :AppState => {
    if(!state){
        return {stage:"before"}
    }
    switch (action.type) {
        case "CELLS_FETCHED": 
            return _.assign(state,{cells:action.cells});
        case "INIT_FETCHED":
            return _.assign(state,{cells:action.cells,token:action.token,stage:"playing"});
        default: 
            return state;
    }
}