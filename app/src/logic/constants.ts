enum Direction {
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Right"
}

enum Action {
    DISAPPEAR,
    MERGED,
    NONE,
    MOVE
}

const BOX_SIZE = 4;

interface Cell {
    id:number,
    address:Address,
    value:CellValue,
    action:Action
}

type CellValue = number

interface Address {
    x:number,
    y:number
}

export {Direction,Action,BOX_SIZE,Cell,CellValue,Address};