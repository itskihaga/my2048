const findLast = predicate => ary => {
    const _findLast = index => (
        index >= 0 ? predicate(ary[index]) ? ary[index] : _findLast(index - 1) : null
    )
    return _findLast(ary.length - 1);
};

const group = groupBy => ary => {
    const dic = {};
    const res = [];
    let index = 0;
    for(let e of ary){
        const key = groupBy(e);
        if(typeof dic[key] === "undefined"){
            res.push([e]);
            dic[key] = index;
            index++;
        } else {
            res[dic[key]].push(e);
        }
    }
    return res;
};

const flat = (ary, depth = 1) => (
    depth > 0 ? ary.reduce((prev,cur)=>[...prev,...flat(cur,depth - 1)],[]) : ary
);

const rnd = number => Math.floor(Math.random() * number);

const numbers = size => {
    const res = [];
    for(let i = 0;i < size;i++)res.push(i);
    return res;
}

// 配列を複数渡して、それを総当たりでぶつけて1配列を返すのを作りたい。
const cross = (...arys) => func => {
    
}

const supplier = func => init => {
    let i = init;
    return () => i = func(i)
}


export default {findLast,group,flat,rnd,numbers,supplier}