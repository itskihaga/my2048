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

const Div = styled.div<{value:number}>`
    font-size: ${({value})=> (CELL_SIZE * 4.5) / (value.toString().length + 10) + "em"};
    background-color:${({value})=> getColor(value)};
    width:100%;
    height:100%;
    border-radius: 5px;
`

const Text = styled.div`
    display: inline-block;
    line-height: 0;
    margin-top: 48%;
`

export default ({value}:{value:number}) => (
    <Div value={value}>
        <Text>
            {value}
        </Text>
    </Div>
)
