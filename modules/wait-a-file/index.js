#!/usr/bin/env node
const filename = process.argv[2];

if(!filename){
    console.log("no filename")
    process.exit(1)
}

const { wait } = require("./libs")

console.log(`Waiting a file... filename:${filename}`)

wait(filename).then(process.exit)
