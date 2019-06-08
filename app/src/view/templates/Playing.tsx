import * as React from 'react';
import Board from '@/view/adaptors/BoardAdaptor';
import css from "@/view/style.scss"

class Playing extends React.Component {
    render(){
        return (
            <div className={css.center}>
                <div>Press Any Direction Key!!</div>
                <Board/>
            </div>
        );
    }
}

export default Playing;