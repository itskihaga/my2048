import React from 'react';

const val2component = (Component, prop) => (value, index) => <Component {...{ [prop]: value, key: index }} />

class Box extends React.Component {
    render() {
        return (
            <table border='10' className="tt48-box">
                <tbody>{this.props.cells.map(val2component(Line, "cells"))}</tbody>
            </table>
        );
    }
}


class Line extends React.Component {
    render() {
        return <tr>{this.props.cells.map(val2component(Cell, "value"))}</tr>
    }
}

class Cell extends React.Component {
    render() {
        return <td>{this.props.value || ""}</td>
    }
}

export default Box;