type Direction = "Up" | "Down" | "Left" | "Right"
type Action = "Removal" | "Merged" | "Move" | "None"

interface Address {
    x:number,
    y:number
}

interface Cell {
    id:number,
    address:Address,
    value:number,
    action:Action
}

export {Direction,Action,Address,Cell};