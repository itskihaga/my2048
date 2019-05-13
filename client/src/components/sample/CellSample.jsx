import React from 'react';
import Cell from "../box/Cell";
import util from "../../util/underscore"

const supplier = util.supplier(e => e * 2)(1)

export default () => (
    <div>
        {util.numbers(3)
            .map(e => <div key={e}>
                {util.numbers(6)
                    .map(e => <Cell key={e} value={supplier()} style={{display:"inline-block"}}/>)}
            </div>)
        }
    </div>
)