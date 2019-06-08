import Board ,{BoardProps} from "@/view/organisms/board/Board";
import { connect } from 'react-redux';

const state2props = (state : BoardProps):BoardProps => state

export default connect(state2props)(Board)