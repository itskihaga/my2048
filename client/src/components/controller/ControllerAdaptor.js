import Controller from "./Controller";
import { connect } from 'react-redux';

const dispatch2props = dispatch => {
    return {
        submit(direction){
            dispatch({type:"REQUEST_MOVE",direction,token:this.props.token})
        }
    }
}

export default connect(state => ({token:state.token}),dispatch2props)(Controller)