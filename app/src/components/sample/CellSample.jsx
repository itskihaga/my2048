import React from 'react';
import Cell from "../box/Cell";
import util from "../../util/underscore"

const supplier = util.supplier(e => e * 2)(1)
const numbers = util.numbers(3).map(e => util.numbers(6).map(supplier))

export default () => (
    <div>
        {numbers.map((e,index) => 
            <div key={index}>
                {e.map(e => <Cell key={e} value={e} style={{display:"inline-block"}}/>)}
            </div>
        )
        }
    </div>
)