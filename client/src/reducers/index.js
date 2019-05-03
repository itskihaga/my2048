export default (state,action) => {
    switch (action.type) {
        case "CELLS_FETCHED":
            return Object.assign({},state,{cells:action.cells});
        default: 
            return state;
    }
}