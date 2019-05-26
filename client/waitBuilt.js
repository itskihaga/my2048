const filename = process.argv[2]

const fs = require("fs")
const path = require("path")

const wait = filepath => {
    const f = file => fs.existsSync(file) ? file : f(path.dirname(file))
    const base = f(path.dirname(filepath));
    const nm = filepath.slice(base.length + 1)
    return new Promise(res => {
        fs.watch(base,{recursive:true},(_,name)=>{
            if(nm == name)res(true);
        })
    })
}

wait(filename).then(process.exit)
