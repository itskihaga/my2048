import {Store} from "redux"
import {AppState,Direction} from "@/domain/model/model"
import {Action} from "@/store/actions/actions"

const dic :[string,Direction][]= [
    ["ArrowUp","Up"],
    ["ArrowRight","Right"],
    ["ArrowLeft","Left"],
    ["ArrowDown","Down"],
]

const keyToDir = new Map<string,Direction>(dic)


export default (window:Window,store: Store<AppState, Action>) => {
    window.addEventListener("keydown",event=>{

        const dir = keyToDir.get(event.key);

        if(dir){
            event.preventDefault();
            const state = store.getState()
            if(state.stage == "playing"){
                store.dispatch({
                    type:"REQUEST_MOVE",
                    cells:state.cells,
                    token:state.token,
                    direction:dir
                })
            }
        }

    });
}