import axios from "@/libs/axios";
import {Direction, Cell} from "@/domain/model/model"

export interface MoveResult {
    cells:Cell[]
}
export interface MoveRequest {
    token:string,
    direction:Direction
}
export default (request:MoveRequest) => axios.post("/api/move",request).then<MoveResult>(e => e.data)