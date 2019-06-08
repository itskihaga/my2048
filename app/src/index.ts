import {run,store} from "@/store"
import keydown from "@/view/listeners/keydown"
import view from "@/view"

const elm = document.getElementById('app')

if(elm){
    view(elm,store)
    keydown(window,store)
    run();
    store.dispatch({type:"REQUEST_INIT"})
}



