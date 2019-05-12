const createCompletationListener = (eventNum ,listener) => {
    let cnt = eventNum
    return () => {
        cnt--
        if(cnt == 0){
            listener()
        }
    }
}

export {createCompletationListener}