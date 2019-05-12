import _ from "../util/underscore"
import {DIRECTIONS,ACTIONS,BOX_SIZE} from "../domain/domains"

const dirToRule = {
    [DIRECTIONS.Up]:{
        point:"y",
        group:"x",
        conv:e => e
    },
    [DIRECTIONS.Down]:{
        point:"y",
        group:"x",
        conv:e => BOX_SIZE - 1 - e
    },
    [DIRECTIONS.Left]:{
        point:"x",
        group:"y",
        conv:e => e
    },
    [DIRECTIONS.Right]:{
        point:"x",
        group:"y",
        conv:e => BOX_SIZE - 1 - e
    }
}

const moveCells = dir => cells => {

    const rule = dirToRule[dir];

    const simplify = cell => (
        {
            id:cell.id,
            group:cell.address[rule.group],
            point:rule.conv(cell.address[rule.point]),
            value:cell.value,
            action:cell.action
        }
    )

    const desimplify = ({group,point,value,id,action}) => (
        {
            id,
            address:{
                [rule.group]:group,
                [rule.point]:rule.conv(point)
            },
            value,
            action
        }
    );

    const groups = _.group(e => e.group)(cells.map(simplify))
    return _.flat(groups.map(moveLine)).map(desimplify);
}

const moveLine = line => {
    line.sort((a,b) => a.point - b.point);
    const _moveLine = (current,tag) => {
        const shototsu = _.findLast(e => !(e.action == ACTIONS.DISAPPEAR) && e.point < tag.point)(current);
        const merge = shototsu && shototsu.value == tag.value && !(shototsu.action == ACTIONS.MERGED)
        const moveTo = shototsu ? merge ? shototsu.point : shototsu.point + 1 : 0
        const assignee = {
            point:moveTo,
            action:merge ? ACTIONS.DISAPPEAR : moveTo == tag.point ? ACTIONS.NONE : ACTIONS.MOVE
        }
        return current.map(e => {
            return e.id == tag.id ? Object.assign(e,assignee) : 
            merge && shototsu.id == e.id ? Object.assign(e,{value:e.value * 2,action:ACTIONS.MERGED}) : e
        })
    };
    return line.reduce(_moveLine,line);
}


let uniqueId = 0;

const addCell = cells => {
    const nums = [];
    for(let x of _.numbers(BOX_SIZE)) for(let y of _.numbers(BOX_SIZE))
        if(!cells.find(e => e.address.x == x && e.address.y == y)) nums.push({address:{x,y}})
    const index = _.rnd(nums.length)
    return [...cells,{id:uniqueId++,address:nums[index].address,value:2,action:ACTIONS.NONE}]
}

const actionExit = cells => (
    cells
        .filter(e => e.action != ACTIONS.DISAPPEAR)
        .map(e => Object.assign(e,{action:ACTIONS.NONE}))
)

export {addCell,moveCells,DIRECTIONS,ACTIONS,actionExit};
