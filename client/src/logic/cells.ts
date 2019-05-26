import _  from "@/util/util"
import {Maybe} from "@/util/types"
import {Direction,Action,BOX_SIZE, Cell,CellValue,Address} from "./constants"

interface RuleOfDirection {
    [key:string]:Rule
}
type XorY = "x" | "y"

interface Rule {
    point:XorY,
    group:XorY,
    conv:(point:number)=>number
}

const toAddress = (dic:{[key:string]:number}):Address=>({x:dic.x,y:dic.y})

const dirToRule : RuleOfDirection = {
    [Direction.Up]:{
        point:"y",
        group:"x",
        conv:e => e
    },
    [Direction.Down]:{
        point:"y",
        group:"x",
        conv:e => BOX_SIZE - 1 - e
    },
    [Direction.Left]:{
        point:"x",
        group:"y",
        conv:e => e
    },
    [Direction.Right]:{
        point:"x",
        group:"y",
        conv:e => BOX_SIZE - 1 - e
    }
}

interface LineElement {
    id:number,
    point:number,
    value:CellValue,
    action:Action
}

const moveCells = (dir:Direction) => (cells:Cell[]):Maybe<Cell[]> => {

    const rule = dirToRule[dir];

    const simplify = (cell:Cell):LineElement => (
        {
            id:cell.id,
            point:rule.conv(cell.address[rule.point]),
            value:cell.value,
            action:cell.action
        }
    )

    const desimplify = (group:number) => ({point,value,id,action}:LineElement):Cell => (
        {
            id,
            address:toAddress({
                [rule.group]:group,
                [rule.point]:rule.conv(point)
            }),
            value,
            action
        }
    );

    const groups = _.group((e:Cell) => e.address[rule.group])(cells)
    console.log(groups)
    const moved : Cell[] = _.flat<Cell>(
        groups.map(group => moveLine(group.values.map(simplify)).map(desimplify(group.key)))
    )

    console.log(moved)

    return moved.every(cell => cell.action == Action.NONE) ? {just:false} : {just:true,value:moved};
}


const moveLine = (line:LineElement[]):LineElement[] => {
    line.sort((a,b) => a.point - b.point);
    const _moveLine = (current:LineElement[],tag:LineElement) => {
        const shototsu = _.findLast((e:LineElement) => !(e.action == Action.DISAPPEAR) && e.point < tag.point)(current);
        const merge : boolean = !!shototsu && shototsu.value == tag.value && !(shototsu.action == Action.MERGED)
        const moveTo : number = shototsu ? merge ? shototsu.point : shototsu.point + 1 : 0
        const assignee = {
            point:moveTo,
            action:merge ? Action.DISAPPEAR : moveTo == tag.point ? Action.NONE : Action.MOVE
        }
        return current.map(e => {
            return e.id == tag.id ? Object.assign(e,assignee) : 
            merge && shototsu && shototsu.id == e.id ? Object.assign(e,{value:e.value * 2,action:Action.MERGED}) : e
        })
    };
    return line.reduce(_moveLine,line);
}

let uniqueId = 0;

const addCell = (cells : Cell[]):Cell[]=> {
    const nums = [];
    for(let x of _.numbers(BOX_SIZE)) for(let y of _.numbers(BOX_SIZE))
        if(!cells.find(e => e.address.x == x && e.address.y == y)) nums.push({address:{x,y}})
    const index = _.rnd(nums.length)
    return [...cells,{id:uniqueId++,address:nums[index].address,value:2,action:Action.NONE}]
}

const actionExit = (cells : Cell[]):Cell[] => (
    cells
        .filter(e => e.action != Action.DISAPPEAR)
        .map(e => Object.assign(e,{action:Action.NONE}))
)

export {addCell,moveCells,actionExit};
