import React from 'react';
import {ACTIONS} from '../../logic/cells'
import { Motion,spring,TransitionMotion} from 'react-motion';
import _ from "../../util/underscore";

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
                opacity:spring(1,{damping:30,stiffness:80})
            }
        })
        const willEnter = () => ({opacity:-1})
        return (
            <div className="box2">
                <TransitionMotion styles={this.props.cells.map(cellToStyle)} {...{willEnter}}>
                    {interpolatedStyles => (
                        <div className="tt-48-box-bg">
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
        zIndex : cell.action == ACTIONS.MERGED ? 1 : 0 
    }

    return (
        <Motion style={motionStyle}>
            {interpolatingStyle => <_Cell style={{...toEm(interpolatingStyle),...style,...localStyle}} value={cell.value} />}
        </Motion>
    )
}

const _Cell = ({style,value}) => (
    <div className="no-length">
        <div {...{style}} className="tt-48-cell">
            <div style={{backgroundColor:colorMap[value]}} className={"tt-48-cell-content"}>{value}</div>
        </div>
    </div>
)

export default Box;