import * as React from 'react';
import Cell from "@/view/organisms/board/molecules/CellContainer";
import util from "@/util/util"

const supplier = util.supplier((e:number)=> e * 2)(1)
const numbers = util.numbers(3).map(e => util.numbers(6).map(supplier))

export default () => (
    <div>
        {numbers.map((e,index) => 
            <div key={index}>
                {e.map(e => <Cell key={e} value={e} style={{display:"inline-block"}}/>)}
            </div>
        )}
    </div>
)