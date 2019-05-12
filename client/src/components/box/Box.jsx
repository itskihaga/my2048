import React from 'react';
import {ACTIONS} from '../../logic/cells'
import { Motion,spring,TransitionMotion} from 'react-motion';
import _ from "../../util/underscore";
import css from "./Box.scss"
import commonCss from "@/style.scss"

const oneCellSize = 3.5;

const colorMap = function(){
    const get = _.supplier(e => e * 2)(1);
    const colors = ["#00FFCC","#00FF99","#00FF66","#00FF33","#00FF00","#0099FF","#0066FF","#0033FF","#0000FF"]
    return Object.assign(...colors.map(col=>({[get()]:col})));
}();

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
                            {interpolatedStyles.map(e => <Cell {...e} />)}
                        </div>
                    )}
                </TransitionMotion>
            </div>
        );
    }
}

const Cell = ({data,style}) => {

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
        <Motion style={motionStyle}>
            {interpolatingStyle => <_Cell style={{...toEm(interpolatingStyle),...style,...localStyle}} value={cell.value} />}
        </Motion>
    )
}

const _Cell = ({style,value}) => (
    <div className={commonCss.noLength}>
        <div {...{style}} className={css.cell}>
            <div style={{backgroundColor:colorMap[value]}} className={css.cellContent}>{value}</div>
        </div>
    </div>
)

export default Box;