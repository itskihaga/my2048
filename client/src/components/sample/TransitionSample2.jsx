import React from 'react';
import { Motion,spring,presets,TransitionMotion} from 'react-motion';

const oneCellSize = 3.5;
class Box extends React.Component {
    render() {
        const cellToStyle = e => ({
            key:"id_" + e.id,
            data:e,
            style:{
                opacity:1
            }
        })
        const willEnter = () => ({opacity:0})
        return (
            <div className="box2">
                <TransitionMotion styles={this.props.cells.map(cellToStyle)} willEnter={willEnter}>
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

    return (
        <Motion style={motionStyle} >
            {interpolatingStyle => <_Cell style={{...toEm(interpolatingStyle),...style}} value={data.value} />}
        </Motion>
    )
}

const _Cell = ({style,value}) => (
    <div className="no-length">
        <div style={style} className="tt-48-cell">
            <div className={value == "None" ? "tt-48-cell-content-none" : "tt-48-cell-content"}>{value}</div>
        </div>
    </div>
)

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
            id:cell.id,
            group:cell.address[rule.group],
            point:rule.conv(cell.address[rule.point]),
            value:cell.value
        }
    }

    const desimplify = ({group,point,value,id}) => {
        return {
            id,
            address:{
                [rule.group]:group,
                [rule.point]:rule.conv(point)
            },
            value
        }
    };

    const groups = {};

    for(let _cell of cells){
        const cell = simplify(_cell);
        groups[cell.group] = groups[cell.group] ? [...groups[cell.group],cell] : [cell];
    }

    return Object.keys(groups).reduce((prev,cur)=>[...prev,...moveLine(groups[cur]).map(desimplify)],[])
}

const ACTIONS = {
    DISAPPEAR:"DISAPPEAR",
    MERGED:"MERGED"
}

const moveLine = line => {
    line.sort((a,b) => a.point - b.point);
    const _moveLine = (current,tag) => {
        const shototsu = current.find(e => !(e.action == ACTIONS.DISAPPEAR) && e.point < tag.point);
        const merge = shototsu && shototsu.value == tag.value && !(shototsu.action == ACTIONS.MERGED)
        const assignee = {
            point:shototsu ? merge ? shototsu.point : shototsu.point + 1 : 0
        }
        if(merge){
            assignee.action = ACTIONS.DISAPPEAR
        }
        return current.map(e => {
            return e.id == tag.id ? Object.assign(e,assignee) : 
            merge && shototsu.id == e.id ? Object.assign(e,{action:ACTIONS.MERGED}) : e
        })
    };
    return line.reduce(_moveLine,line);
}

class TransitionSample extends React.Component {

    constructor(){
        super();
        this.state = {
            cells:[
                {id:1,address:{x:0,y:2},value:2},
                {id:2,address:{x:0,y:1},value:2},
                {id:3,address:{x:1,y:1},value:4}
            ]
        }
    }

    render(){
        const onClick = dir => () => {
            this.setState({
                cells:moveCells(dir)(this.state.cells)
            });
        }
        return (
            <div className="sample">
                <Box cells={this.state.cells}/>
                <div>{Object.keys(DIRECTIONS).map(e => <button key={e} onClick={onClick(e)}>{e}</button>)}</div>
            </div>
        )

    }
}



export default TransitionSample;