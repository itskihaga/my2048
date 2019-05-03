import Controller from "./Controller";
import { connect } from 'react-redux';

const dispatch2props = dispatch => {
    return {
        submit(direction){
            dispatch({type:"REQUEST_MOVE",direction})
        }
    }
}

export default connect(null,dispatch2props)(Controller)