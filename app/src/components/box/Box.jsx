import React from 'react';
import {Action,BOX_SIZE} from "../../logic/constants"
import { Motion,spring,TransitionMotion} from 'react-motion';
import commonCss from "@/style.scss"
import Cell from "./Cell"
import styled from "styled-components";
import {CELL_SIZE,WAKU_SIZE} from "./styleConstants";

const oneCellSize = CELL_SIZE + WAKU_SIZE;

const Background = styled.div`
    padding:${WAKU_SIZE / 2}em;
    width:${oneCellSize * BOX_SIZE}em;
    height:${oneCellSize * BOX_SIZE}em;
    background-color: #f6f6f6;
`

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
            <div className={commonCss.inlineBlock}>
                <TransitionMotion styles={this.props.cells.map(cellToStyle)} willEnter={() => ({opacity:0})}>
                    {interpolatedStyles => (
                        <Background>
                            {interpolatedStyles.map(e => <MovingCell {...e} />)}
                        </Background>
                    )}
                </TransitionMotion>
            </div>
        );
    }
}

const MovingCell = ({data,style}) => {

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
        zIndex : cell.action == Action.DISAPPEAR ? 0 : 1 
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