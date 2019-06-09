import {Middleware,MiddlewareAPI,Dispatch,AnyAction} from "redux"

interface TaskRegistration<S,A extends AnyAction> {
    task:Task<S,A>,
    type:string
}

type Task1<S,A extends AnyAction> = (action:A,dispatch:Dispatch<A>,state:S) => Promise<void>

export type Task<S,A extends AnyAction> = Task1<S,A> 

export default<S,A extends AnyAction> (tasks : TaskRegistration<S,A> [])=> {

    const map = new Map(tasks.map(e => [e.type,e.task]))
    const processings = new Set<string>();

    const middleware : Middleware = (store :MiddlewareAPI<Dispatch<AnyAction>,S>) => (next:Dispatch<A>) => (action:A) => {
        const task = map.get(action.type)
        if(task){
            if(!processings.has(action.type)){
                processings.add(action.type);
                const del = ()=>processings.delete(action.type)
                task(action,store.dispatch,store.getState())
                    .then(del).catch(del)
            }
        } else {
            next(action)
        }
    }
    return middleware
}