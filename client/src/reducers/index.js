export default (state,action) => {
    const {cells,type} = action;
    switch (type) {
        case "CELLS_FETCHED": 
            return Object.assign({},state,{cells});
        default: 
            return state;
    }
}