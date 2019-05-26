import {addCell,moveCells,actionExit} from "../src/logic/cells"
import * as express from "express";
import * as cors from "cors"
import { Cell } from "@/logic/constants";

const app = express();
app.use(express.json());
app.use(cors());

let cnt = 0;
const repository :{[key:string]:{cells:Cell[]}}= {};

app.post("/api/init",(_,res)=>{
    const cells = addCell(addCell([]));
    const token = "token-" + cnt++;
    repository[token] = {cells};
    res.json({cells,token});
})

app.post("/api/move",({body},res)=>{
    const prev = repository[body.token];
    const moved = moveCells(body.direction)(actionExit(prev.cells))
    if(moved.just){
        const cells = addCell(moved.value)
        repository[body.token] = {cells}
        res.json({cells});
    } else {
        throw new Error("データ不整合")
    }
})

app.listen(3001,()=>{
    console.log("Server!");
})