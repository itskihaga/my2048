import {Middleware,MiddlewareAPI,Dispatch,AnyAction} from "redux"


interface Action<T extends string> extends AnyAction {
    type:T
}
export interface TaskRegistration<T extends string,S = undefined> {
    task:Task<Action<T>,S>,
    type:T
}

export const regsterTask = <T extends string,S = undefined>(type:T,task:Task<Action<T>,S>) : TaskRegistration<T,S>=> {
    return {
        type,
        task
    }
}

type Task1<A extends AnyAction,S> = (dispatch:Dispatch<AnyAction>,action:A,state:S) => Promise<void>

export type Task<A extends AnyAction,S = undefined> = Task1<A,S> 

export default<S> (tasks : TaskRegistration<any,S> [])=> {

    const map = new Map(tasks.map(e => [e.type,e.task]))
    const processings = new Set<string>();

    const middleware : Middleware = (store :MiddlewareAPI<Dispatch<AnyAction>,S>) => (next:Dispatch<AnyAction>) => (action:AnyAction) => {
        const task = map.get(action.type)
        if(task){
            if(!processings.has(action.type)){
                processings.add(action.type);
                const del = ()=>processings.delete(action.type)
                task(store.dispatch,action,store.getState())
                    .then(del).catch(del)
            }
        } else {
            next(action)
        }
    }
    return middleware
}