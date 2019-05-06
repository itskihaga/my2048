export default (state,action) => {
    const {cells,token,type,score} = action;
    switch (type) {
        case "INIT_FETCHED":
            return Object.assign({},state,{cells,token});
        case "CELLS_FETCHED": 
            return Object.assign({},state,{cells,score});
        default: 
            return state;
    }
}