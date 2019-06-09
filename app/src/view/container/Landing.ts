import { connect } from 'react-redux';
import Landing from "@/view/templates/Landing"

export default connect(s => s,dispatch=>{
    return {
        onClick(){
            dispatch({type:"REQUEST_INIT"})
        }
    }
})(Landing)