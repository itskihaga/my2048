import testee,{Task,TaskRegistration} from "@/index"

import { createStore ,applyMiddleware } from 'redux';


interface Hoge {
    type:"HOGE"
}


interface Action {
    type:string
}
interface State {
    message:string
}

const reduser = (state:State | undefined,action:Action)=> {
    console.log(action)
    return state || {message:"hoge"}
}

const listener1 : Task<Hoge> = async (action,dispatch,state)=>{
    console.log("HOGE")
    await new Promise(res => setTimeout(res,100))
}

const taskRegistration : TaskRegistration<"HOGE"> = {
    type:"HOGE",
    task:listener1
}

const store = createStore(reduser,applyMiddleware(testee([
    taskRegistration
])))

test("trial",(done)=>{
    store.dispatch({type:"HOGE",message:"1"});
    store.dispatch({type:"HOGE",message:"2"});
    setTimeout(()=>{
        store.dispatch({type:"HOGE",message:"3"});
        done()
    },200)
});