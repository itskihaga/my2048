import * as React from 'react';

import styled from "styled-components";
import {CELL_SIZE,WAKU_SIZE} from "@/view/constants";
import Cell from "./Cell"

const Div = styled.div`
    padding:${WAKU_SIZE / 2}em;
    position: relative;
    width:${CELL_SIZE}em;
    height:${CELL_SIZE}em;
`

export default ({style,value}:{style? : React.CSSProperties,value:number}) => (
    <Div style={style}>
        <Cell value={value}/>
    </Div>
)