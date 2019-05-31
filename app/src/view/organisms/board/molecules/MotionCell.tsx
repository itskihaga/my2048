import Cell from "./CellContainer"
import { Cell as CellModel} from "@/domain/model/model"
import * as React from 'react';
import {CELL_SIZE,WAKU_SIZE} from "@/view/constants";
import { Motion,spring, PlainStyle} from 'react-motion';
import commonCss from "@/view/style.scss";

const oneCellSize = CELL_SIZE + WAKU_SIZE;

const MotionCell = ({cell,style}:{cell:CellModel,style: React.CSSProperties}) => {

    const toMotionStyle = (num:number)=> spring(num * oneCellSize);

    const motionStyle = {
        top: toMotionStyle(cell.address.y),
        left: toMotionStyle(cell.address.x)
    }

    const toEm = (styles :PlainStyle) : React.CSSProperties => {
        const newStyle :{[key:string]:string}= {};
        for(let name in styles){
            newStyle[name] = styles[name] + "em";
        }
        return newStyle
    }

    const localStyle = {
        zIndex : cell.action == "Removal" ? 0 : 1 
    }

    return (
        <div className={commonCss.noLength}>
            <Motion style={motionStyle}>
                {interpolatingStyle => <Cell style={{...toEm(interpolatingStyle),...style,...localStyle}} value={cell.value} />}
            </Motion>
        </div>
    )
}

export default MotionCell;