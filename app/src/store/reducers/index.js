export default (state,action) => {
    const {cells,type,token} = action;
    switch (type) {
        case "CELLS_FETCHED": 
            return Object.assign({},state,{cells});
        case "INIT_FETCHED":
            return Object.assign({},state,{cells,token});
        default: 
            return state;
    }
}