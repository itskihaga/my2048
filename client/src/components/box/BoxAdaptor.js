import Box from "./Box";
import { connect } from 'react-redux';

const state2props = state => {
    return {
        cells:state.cells
    }
}

export default connect(state2props)(Box)