import testee,{Task} from "@/index"

import { createStore ,applyMiddleware } from 'redux';


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

const listener1 : Task<State,Action> = async (action,dispatch,state)=>{
    console.log("HOGE")
    await new Promise(res => setTimeout(res,100))
}

const store = createStore(reduser,applyMiddleware(testee([
    {
        type:"HOGE",
        task:listener1
    }
])))

test("trial",(done)=>{
    store.dispatch({type:"HOGE",message:"1"});
    store.dispatch({type:"HOGE",message:"2"});
    setTimeout(()=>{
        store.dispatch({type:"HOGE",message:"3"});
        done()
    },200)
});