import React from 'react';
import { Motion,spring,presets} from 'react-motion';

 
const zeroToThree = [0,1,2,3];

const convertCellsArray = cells => {

    const getNumber = (x,y) => {
        const res = cells.find(e => e.address.x == x && e.address.y == y);
        return res || {address:{x,y},value:"None"};
    }

    return zeroToThree.map(x => zeroToThree.map(y => getNumber(x,y)))

}

class Box extends React.Component {
    render() {
        console.log(this.props.moveIn)
        return (
            <div>
                <div className="tt-48-box-bg">
                    {convertCellsArray(this.props.cells).map((e,i)=> <Clm key={i} moveIn={this.props.moveIn} value={e}/>)}
                </div>
            </div>
        );
    }
}
const oneCellSize = 3.5;

const Clm = ({value,moveIn}) => <div className="tt-48-cell-clm">{value.map((e,i)=><Cell key={i} index={i} value={e} moveIn={moveIn}/>)}</div>
const Cell = ({value,moveIn}) => {

    const {move} = value;

    const style = {
        "zIndex": move ? 1 : 0
    }

    const calcMove = (from,to) => (to - from) * oneCellSize
    const toMotionStyle = num => spring(num,presets.gentle);

    const motionStyle = {
        top: toMotionStyle(move && moveIn ? calcMove(value.address.y,move.y) :0 ),
        left: toMotionStyle(move && moveIn ? calcMove(value.address.x,move.x) :0 )
    }

    const toEm = styles => {
        const newStyle = {};
        for(name in styles){
            newStyle[name] = styles[name] + "em";
        }
        return newStyle
    }

    return (
        <Motion style={motionStyle} onRest={()=>console.log(value)}>
            {interpolatingStyle => {
                return (
                    <div style={{...style,...toEm(interpolatingStyle)}} className="tt-48-cell">
                        <div className={value.value == "None" ? "tt-48-cell-content-none" : "tt-48-cell-content"}>{value.value}</div>
                    </div>
                )
            }}
        </Motion>
    )
}

const NUM = 3;

const DIRECTIONS = {
    Up:"Up",
    Down:"Down",
    Left:"Left",
    Right:"Right"
}

const moveCells = dir => cells => {

    const dirToRule = {
        [DIRECTIONS.Up]:{
            point:"y",
            group:"x",
            conv:e => e
        },
        [DIRECTIONS.Down]:{
            point:"y",
            group:"x",
            conv:e => NUM - e
        },
        [DIRECTIONS.Left]:{
            point:"x",
            group:"y",
            conv:e => e
        },
        [DIRECTIONS.Right]:{
            point:"x",
            group:"y",
            conv:e => NUM - e
        }
    }

    const rule = dirToRule[dir];

    const simplify = cell => {
        return {
            group:cell.address[rule.group],
            point:rule.conv(cell.address[rule.point]),
            value:cell.value
        }
    }

    const desimplify = ({move,group,point,value}) => {
        return {
            address:{
                [rule.group]:group,
                [rule.point]:rule.conv(point)
            },
            value,
            move:{
                [rule.group]:group,
                [rule.point]: rule.conv(typeof move === "undefined" ? point : move)
            }
        }
    };

    const groups = {};

    for(let _cell of cells){
        const cell = simplify(_cell);
        groups[cell.group] = groups[cell.group] ? [...groups[cell.group],cell] : [cell];
    }

    return Object.keys(groups).reduce((prev,cur)=>[...prev,...moveLine(groups[cur]).map(desimplify)],[])
}

const moveLine = line => {
    line.sort((a,b) => a.point - b.point);
    console.log(line);
    const _moveLine = (current,tag,index) => {
        const shototsu = current.find(e => e.point < tag.point);
        const move = shototsu ? (typeof shototsu.move === "undefined" ? shototsu.point : shototsu.move) + 1 : 0;
        return current.map((e,i)=> i == index ? Object.assign(tag,{move}) : e)
    };
    return line.reduce(_moveLine,line);
}

class TransitionSample extends React.Component {

    constructor(){
        super();
        this.state = {
            moveIn:false,
            cells:[{address:{x:0,y:2},value:10},{address:{x:1,y:1},value:15}]
        }
    }

    render(){

        const onClick = dir => {
            console.log("onClickBefore",this.state.cells);
            this.setState({
                cells:moveCells(dir)(this.state.cells),
                moveIn:true
            });
            console.log("onClickAfter",this.state.cells);
            setTimeout(onExited,500)
        }

        const setCells = (cells,moveIn)=>{
            this.setState({cells,moveIn});
        }

        const onExited = () => {
            console.log("onExitedBefore",this.state.cells);
            this.setState({
                cells:this.state.cells.map(e => e.move ? {address:e.move,value:e.value} : e),
                moveIn:false
            });
            console.log("onExitedAfter",this.state.cells);
        }

        console.log(this.state.moveIn);

        return (
            <div className="sample">
                <div>
                    {Object.keys(DIRECTIONS).map(e => <button key={e} onClick={() => onClick(e)}>{e}</button>)}
                </div>
                <Box cells={this.state.cells} moveIn={this.state.moveIn} onExited={onExited}/>
                <div style={{height:"1em"}}/>
                {/* <Box2 cells={this.state.cells} moveIn={this.state.moveIn} onExited={onExited}/> */}
            </div>
        )

    }
}



export default TransitionSample;