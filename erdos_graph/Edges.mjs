import fs from 'fs'
import path from 'path'
const edgesPath = path.format({dir:'.\\data_set', base:'Edges'})

export class Edges{
    rawEdges = fs.readFileSync(edgesPath, {encoding:'utf-8'}).split('\n').map(s=>s.split(','))
    constructor(){
        console.log('set-up edges ds');
    }
}