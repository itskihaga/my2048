import _ from "@/util/util"
import {Maybe} from "@/util/types"
import {Direction,Action,Cell,Address} from "@/domain/model/model"
import {BOX_SIZE} from "@/domain/model/constants"

type RuleOfDirection = {
    readonly [_ in Direction]:Rule
}
type XorY = "x" | "y"

interface Rule {
    point:XorY,
    group:XorY,
    conv:(point:number)=>number
}

const toAddress = (dic:{[key:string]:number}):Address=>({x:dic.x,y:dic.y})

const dirToRule : RuleOfDirection = {
    Up:{
        point:"y",
        group:"x",
        conv:e => e
    },
    Down:{
        point:"y",
        group:"x",
        conv:e => BOX_SIZE - 1 - e
    },
    Left:{
        point:"x",
        group:"y",
        conv:e => e
    },
    Right:{
        point:"x",
        group:"y",
        conv:e => BOX_SIZE - 1 - e
    }
}

interface LineElement {
    id:number,
    point:number,
    value:number,
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
    const moved : Cell[] = _.flat<Cell>(
        groups.map(([key,values]) => moveLine(values.map(simplify)).map(desimplify(key)))
    )
    return moved.every(cell => cell.action == "None") ? {just:false} : {just:true,value:moved};
}


const moveLine = (line:LineElement[]):LineElement[] => {
    line.sort((a,b) => a.point - b.point);
    const _moveLine = (current:LineElement[],tag:LineElement) => {
        const shototsu = _.findLast((e:LineElement) => !(e.action == "Removal") && e.point < tag.point)(current);
        const merge : boolean = !!shototsu && shototsu.value == tag.value && !(shototsu.action == "Merged")
        const moveTo : number = shototsu ? merge ? shototsu.point : shototsu.point + 1 : 0
        const assignee :{point:number,action:Action} = {
            point:moveTo,
            action:merge ? "Removal" : moveTo == tag.point ? "None" : "Move"
        }
        return current.map(e => {
            return e.id == tag.id ? _.assign(e,assignee) : 
            merge && shototsu && shototsu.id == e.id ? _.assign(e,{value:e.value * 2,action:"Merged"}) : e
        })
    };
    return line.reduce(_moveLine,line);
}

//FIXME
const uniqueId = _.supplier<number>(e => e + 1)(0)

const addCell = (cells : Cell[]):Cell[]=> {
    const nums = [];
    for(let x of _.numbers(BOX_SIZE)) for(let y of _.numbers(BOX_SIZE))
        if(!cells.find(e => e.address.x == x && e.address.y == y)) nums.push({address:{x,y}})
    const index = _.rnd(nums.length)
    return [...cells,{id:uniqueId(),address:nums[index].address,value:2,action:"None"}]
}

const actionExit = (cells : Cell[]):Cell[] => (
    cells
        .filter(e => e.action != "Removal")
        .map(e => _.assign(e,{action:"None"}))
)

export {addCell,moveCells,actionExit};
