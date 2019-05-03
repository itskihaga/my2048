import React from 'react';

class Controller extends React.Component {
    render() {
        const props = flg => ({onClick:this.props.submit.bind(this,flg)});
        return (
            <div className="tt48-controller">
                <div>
                    <button {...props("U")}>上</button>
                </div>
                <div>
                    <button {...props("R")}>右</button>
                    <button {...props("L")}>左</button>
                </div>
                <div>
                    <button {...props("D")}>下</button>
                </div>
            </div>
        );
    }
}

export default Controller;