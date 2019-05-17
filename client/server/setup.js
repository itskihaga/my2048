import {addCell,moveCells,actionExit} from "../src/logic/cells"
import express from "express";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

let cnt = 0;
const repository = {};

app.post("/api/init",(_,res)=>{
    const cells = addCell(addCell([]));
    const token = "token-" + cnt++;
    repository[token] = {cells};
    res.json({cells,token});
})

app.post("/api/move",({body},res)=>{
    const prev = repository[body.token];
    const moved = moveCells(body.direction)(actionExit(prev.cells))
    const cells = addCell(moved.cells)
    repository[body.token] = {cells}
    res.json({cells});
})

const server = app.listen(3001,()=>{
    console.log("Server!");
})