import React from 'react';
import css from "./Cell.scss"
import util from "../../util/underscore";

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

export default ({style,value}) => (
    <div {...{style}} className={css.cell}>
        <div style={{backgroundColor:getColor(value)}} className={css.cellContent}>{value}</div>
    </div>
)