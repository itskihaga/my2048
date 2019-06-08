import axios from "@/libs/axios";
import {Cell} from "@/domain/model/model"

export interface Init {
    cells:Cell[],
    token:string
}
export default () => axios.post("/api/init").then<Init>(e => e.data)
