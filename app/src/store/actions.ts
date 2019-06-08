import {Cell,Direction} from "@/domain/model/model"

type Action = CellsFetched | InitFetched | RequestMove | RequestInit
export interface CellsFetched {
    type:"CELLS_FETCHED",
    cells:Cell[]
}

export interface InitFetched {
    type:"INIT_FETCHED",
    cells:Cell[],
    token:string
}

export interface RequestMove {
    type:"REQUEST_MOVE",
    direction:Direction,
    cells:Cell[],
    token:string
}

export interface RequestInit {
    type:"REQUEST_INIT"
}

export default Action