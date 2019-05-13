import React from 'react';
import {ACTIONS} from '../../logic/cells'
import { Motion,spring,TransitionMotion} from 'react-motion';
import css from "./Box.scss"
import commonCss from "@/style.scss"
import Cell from "./Cell"

const oneCellSize = 8;

class Box extends React.Component {
    render() {
        const cellToStyle = e => ({
            key:"cell-" + e.id,//数値のkeyを受け付けないので
            data:{cell:e},
            style:{
                opacity:spring(1)
            }
        })
        return (
            <div className={css.root}>
                <TransitionMotion styles={this.props.cells.map(cellToStyle)} willEnter={() => ({opacity:0})}>
                    {interpolatedStyles => (
                        <div className={css.background}>
                            {interpolatedStyles.map(e => <CellWrapper {...e} />)}
                        </div>
                    )}
                </TransitionMotion>
            </div>
        );
    }
}

const CellWrapper = ({data,style}) => {

    const toMotionStyle = num => spring(num * oneCellSize);
    const {cell} = data;

    const motionStyle = {
        top: toMotionStyle(cell.address.y),
        left: toMotionStyle(cell.address.x)
    }

    const toEm = styles => {
        const newStyle = {};
        for(name in styles){
            newStyle[name] = styles[name] + "em";
        }
        return newStyle
    }

    const localStyle = {
        zIndex : cell.action == ACTIONS.DISAPPEAR ? 0 : 1 
    }

    return (
        <div className={commonCss.noLength}>
            <Motion style={motionStyle}>
                {interpolatingStyle => <Cell style={{...toEm(interpolatingStyle),...style,...localStyle}} value={cell.value} />}
            </Motion>
        </div>
    )
}

export default Box;