import * as React from 'react';
import util from "@/util/util";

import styled from "styled-components";
import {CELL_SIZE} from "@/view/constants";

const get = util.supplier<number>(e => e * 2)(1);
const map = new Map<number,string>();
[
    "#00FFFF","#00FFCC","#00FF99",
    "#00FF66","#00FF33","#00FF00",
    "#0099FF","#0066FF",
    "#FF99FF","#FF99CC","#FF9999",
    "#FF66FF","#FF33FF","#FF00FF"
].forEach(col => {
    map.set(get(),col)
});

const getColor = (value:number) => map.get(value) || "#CCCCCC"

const Div = styled.div`
    font-size: ${CELL_SIZE / 3}em;
    width:100%;
    height:100%;
    text-align: center;
    vertical-align: middle;
    border-radius: 5px;
`

export default ({value}:{value:number}) => <Div style={{backgroundColor:getColor(value)}}>{value}</Div>
