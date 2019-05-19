const findLast = <T>(predicate: (val: T) => Boolean) => (ary: T[]): T => {
    const _findLast = (index: number): T => (
        index >= 0 ? predicate(ary[index]) ? ary[index] : _findLast(index - 1) : null
    )
    return _findLast(ary.length - 1);
};

const group = <T>(groupBy: (val: T) => string) => (ary: T[]): T[][] => {
    const dic: { [key: string]: number; } = {};
    const res: T[][] = [];
    let index: number = 0;
    for (let e of ary) {
        const key: string = groupBy(e);
        if (typeof dic[key] === "undefined") {
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
    depth > 0 ? ary.reduce((prev, cur) => [...prev, ...flat(cur, depth - 1)], []) : ary
);

const rnd = (num: number): number => Math.floor(Math.random() * num);

const numbers = (size: number): number[] => {
    const res: number[] = [];
    for (let i = 0; i < size; i++)res.push(i);
    return res;
}

const supplier = <T>(func: (val: T) => T) => (init: T): (() => T) => {
    let i: T = init;
    return () => i = func(i)
}

export default { findLast, group, flat, rnd, numbers, supplier }