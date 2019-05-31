import Board from "@/view/organisms/board/Board";
import { connect } from 'react-redux';

const state2props = state => (
    {
        cells:state.cells
    }
)

export default connect(state2props)(Board)