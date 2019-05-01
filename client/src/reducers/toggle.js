import actions from '@/reducers/actions';

const init = () => {
    return {flg:false};
}

export default (state,action) => {
    switch (action.type) {
        case actions.TOGGLE:
            return Object.assign({},state,{flg:!state.flg});
        default: 
            return init();
    }
}