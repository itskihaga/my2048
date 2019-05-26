import React from 'react';

class Start extends React.Component {
    render(){
        return (
            <div>
                <button onClick={this.props.start}>Start</button>
            </div>
        );
    }
}

export default Start;