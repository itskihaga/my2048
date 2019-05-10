import React from 'react';
import {moveCells,addCell,DIRECTIONS,ACTIONS,actionExit} from '../../logic/cells'
import { Motion,spring,presets,TransitionMotion} from 'react-motion';

const oneCellSize = 3.5;
class Box extends React.Component {
    render() {
        const cellToStyle = e => ({
            key:"id_" + e.id,
            data:e,
            style:{
                opacity:spring(1)
            }
        })
        const willEnter = () => ({opacity:0})
        return (
            <div className="box2">
                <TransitionMotion styles={this.props.cells.map(cellToStyle)} {...{willEnter}}>
                    {interpolatedStyles => (
                        <div className="tt-48-box-bg">
                            {interpolatedStyles.map(e => <Cell {...e} />)}
                        </div>
                    )}
                </TransitionMotion>
            </div>
        );
    }
}

const Cell = ({data,style}) => {

    const toMotionStyle = num => spring(num * oneCellSize,presets.gentle);

    const motionStyle = {
        top: toMotionStyle(data.address.y),
        left: toMotionStyle(data.address.x)
    }

    const toEm = styles => {
        const newStyle = {};
        for(name in styles){
            newStyle[name] = styles[name] + "em";
        }
        return newStyle
    }

    console.log(data)

    const localStyle = {
        zIndex : data.action == ACTIONS.MERGED ? 1 : 0 
    }

    return (
        <Motion style={motionStyle}>
            {interpolatingStyle => <_Cell style={{...toEm(interpolatingStyle),...style,...localStyle}} value={data.value} />}
        </Motion>
    )
}

const _Cell = ({style,value}) => (
    <div className="no-length">
        <div {...{style}} className="tt-48-cell">
            <div className={"tt-48-cell-content"}>{value}</div>
        </div>
    </div>
)

class TransitionSample extends React.Component {

    constructor(){
        super();
        this.state = {
            cells:addCell(addCell([]))
        };
    }

    render(){
        const onClick = dir => () => {
            this.setState({
                cells:moveCells(dir)(actionExit(this.state.cells))
            });
        }
        const changeCell = () => {
            this.setState({
                cells:addCell(this.state.cells)
            });
        }
        return (
            <div className="sample">
                <Box cells={this.state.cells}/>
                <div>{Object.keys(DIRECTIONS).map(e => <button key={e} onClick={onClick(e)}>{e}</button>)}</div>
                <button onClick={changeCell}>add</button>
            </div>
        )
    }
}



export default TransitionSample;