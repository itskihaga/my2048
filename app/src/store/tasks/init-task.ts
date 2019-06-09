import init from "@/service/init"
import { Task } from "redux-tasks"
import { RequestInit } from "@/store/actions"

const task : Task<RequestInit> = async (dispatch)=>{
    dispatch({type:"INIT_FETCHED",...await init()})
}

export default {
    type:"REQUEST_INIT",
    task
}