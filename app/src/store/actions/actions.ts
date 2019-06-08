import {Cell,Direction} from "@/domain/model/model"

type Action = ActionCellsFetched | ActionInitFetched | RequestMove
interface ActionCellsFetched {
    type:"CELLS_FETCHED",
    cells:Cell[]
}

interface ActionInitFetched {
    type:"INIT_FETCHED",
    cells:Cell[],
    token:string
}

interface RequestMove {
    type:"REQUEST_MOVE",
    direction:Direction,
    cells:Cell[],
    token:string
}

export {Action,ActionCellsFetched,ActionInitFetched,RequestMove}