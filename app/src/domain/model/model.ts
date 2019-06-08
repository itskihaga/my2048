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
type AppState = AppStatePlaying | AppStateBeforePlay

interface AppStatePlaying {
    stage:"playing"
    cells:Cell[],
    token:string
}

interface AppStateBeforePlay {
    stage:"before"
}



export {Direction,Action,Address,Cell,AppState};