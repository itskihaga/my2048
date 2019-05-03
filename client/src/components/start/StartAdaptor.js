import Start from "./Start";
import { connect } from 'react-redux';

const dispatch2props = dispatch => {
    return {
        start(){
            dispatch({type:"REQUEST_INIT"})
        }
    }
}

export default connect(null,dispatch2props)(Start)