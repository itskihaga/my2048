import Controller from "./Controller";
import { connect } from 'react-redux';

const dispatch2props = dispatch => {
    return {
        submit({direction,token}){
            dispatch({type:"REQUEST_MOVE",direction,token})
        }
    }
}

export default connect(state => ({token:state.token}),dispatch2props)(Controller)