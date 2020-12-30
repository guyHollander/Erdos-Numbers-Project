import fs from 'fs'
import path from 'path'
const edgesPath = path.format({dir:'.\\data_set', base:'Edges'})
const edgesPathArxiv = path.format({dir:'.\\data_set_with_arxiv', base:'Edges'})

export class SetEdges {
    constructor(path){
        this.rawEdges = fs.readFileSync(path, {encoding:'utf-8'}).split('\n').map(s=>s.split(','))
        console.log('set-up edges ds');
    }
}