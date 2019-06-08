import * as React from 'react';
import {BOX_SIZE} from "@/domain/model/constants"
import { spring,TransitionMotion} from 'react-motion';
import MotionCell from "./molecules/MotionCell"
import commonCss from "@/view/style.scss"
import {Cell} from "@/domain/model/model"
import styled from "styled-components";
import {CELL_SIZE,WAKU_SIZE} from "@/view/constants";

const oneCellSize = CELL_SIZE + WAKU_SIZE;

const Background = styled.div`
    padding:${WAKU_SIZE / 2}em;
    width:${oneCellSize * BOX_SIZE}em;
    height:${oneCellSize * BOX_SIZE}em;
    background-color: #f6f6f6;
`

export interface BoardProps {
    cells:Cell[]
}

const Board = ({cells}:BoardProps) => {
    
    const cellToStyle = (e:Cell) => ({
        key:"cell-" + e.id,//数値のkeyを受け付けないので
        data:{cell:e},
        style:{
            opacity:spring(1)
        }
    })
    return (
        <div className={commonCss.inlineBlock}>
            <TransitionMotion styles={cells.map(cellToStyle)} willEnter={() => ({opacity:0})}>
                {interpolatedStyles => (
                    <Background>
                        {interpolatedStyles.map(e => <MotionCell key={e.key} cell={e.data.cell} style={e.style} />)}
                    </Background>
                )}
            </TransitionMotion>
        </div>
    );
    
}


export default Board;