const findLast = <T>(predicate: (val: T) => boolean) => (ary: T[]): T | null => {
    const _findLast = (index: number): T | null=> (
        index >= 0 ? predicate(ary[index]) ? ary[index] : _findLast(index - 1) : null
    )
    return _findLast(ary.length - 1);
};

const group = <T,K>(groupBy: (val: T) => K) => (ary: T[]): [K,T[]][]=> {
    const dict = new Map<K,T[]>();
    for (let e of ary) {
        const key: K = groupBy(e);
        const values = dict.get(key);
        if (typeof values === "undefined") {
            const newValues : T[]= [e]
            dict.set(key,newValues);
        } else {
            values.push(e);
        }
    }
    return Array.from(dict.entries());
};

interface FlattenableArray<T>{
    [index: number]: T | FlattenableArray<T>;
}

const flat = <T>(ary:FlattenableArray<T>, depth:number = 1):T[] => (
    depth > 0 ? ary instanceof Array ? ary.reduce((prev, cur) => [...prev, ...flat(cur, depth - 1)], []) : ary : ary
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

