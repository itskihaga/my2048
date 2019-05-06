import React from 'react';

const val2component = (Component, prop) => (value, index) => <Component {...{ [prop]: value, key: index }} />

const convertCellsArray = cells => {

    const getNumber = (x,y) => {
        const res = cells.find(e => e.address.x == x && e.address.y == y);
        return res ? res.value : "None";
    }

    const o2f = [0,1,2,3];

    return o2f.map(y => o2f.map(x => getNumber(x,y)))

}

class Box extends React.Component {
    render() {
        return (
            <table border='10' className="tt48-box">
                <tbody>{convertCellsArray(this.props.cells).map(val2component(Line, "cells"))}</tbody>
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
        return <td>{this.props.value != "None" ? this.props.value : ""}</td>
    }
}

export default Box;