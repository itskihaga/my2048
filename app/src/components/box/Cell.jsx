import React from 'react';
import util from "@/util/util";

import styled from "styled-components";
import {CELL_SIZE,WAKU_SIZE} from "./styleConstants";

const getColor = function (){
    const get = util.supplier(e => e * 2)(1);
    const colors = [
        "#00FFFF","#00FFCC","#00FF99",
        "#00FF66","#00FF33","#00FF00",
        "#0099FF","#0066FF",
        "#FF99FF","#FF99CC","#FF9999",
        "#FF66FF","#FF33FF","#FF00FF"
    ]
    const map =  Object.assign(...colors.map(col=>({[get()]:col})));
    return value => map[value] || "#CCCCCC"
}();

const CellWrapper = styled.div`
    padding:${WAKU_SIZE / 2}em;
    position: relative;
    width:${CELL_SIZE}em;
    height:${CELL_SIZE}em;
`

const CellContent = styled.div`
    font-size: ${CELL_SIZE / 3}em;
    width:100%;
    height:100%;
    text-align: center;
    vertical-align: middle;
    border-radius: 5px;
`

export default ({style,value}) => (
    <CellWrapper {...{style}}>
        <CellContent style={{backgroundColor:getColor(value)}}>{value}</CellContent>
    </CellWrapper>
)