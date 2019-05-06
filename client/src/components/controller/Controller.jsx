import React from 'react';

class Controller extends React.Component {
    render() {
        const props = flg => ({onClick:this.props.submit.bind(this,flg)});
        return (
            <div className="tt48-controller">
                <div>
                    <button {...props("Up")}>上</button>
                </div>
                <div>
                    <button {...props("Left")}>左</button>
                    <button {...props("Right")}>右</button>
                </div>
                <div>
                    <button {...props("Down")}>下</button>
                </div>
            </div>
        );
    }
}

export default Controller;