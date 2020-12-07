import { throws } from 'assert'
import fs from 'fs'

class Nodes {
    nodes = fs.readFileSync('.\\data_set\\Nodes', {encoding:'utf-8'}).split('\n').map((s)=>s.split(','))
    lstInd = Number(this.nodes[this.nodes.length-1][0])
    idMap = {}
    namesMap = {}
    constructor(){
        console.log('init Nodes class')
        console.log(`lst node index is ${this.lstInd}, creating data tables`)
        this.nodes.forEach((node)=>{this.idMap[node[0]] = node[1]; this.namesMap[node[1]] = node[0]})
    }
    
    normlizeNode(name){
        if(typeof name == 'string'){
            name = name.replace('*','').replace(/\^\d/,'').toLowerCase().split(',').
                        map((s)=>s.trim().split(' ').join('_'))
            return [name.slice(1).join('_'),name[0]].join('_')
        } else 
            return name
    }

}

let n = new Nodes()

let erdos2Raw = fs.readFileSync('.\\raw_data\\Erdos2.txt',{encoding:'utf-8'})

let edges = erdos2Raw.split('|').map(edge=> edge.split('\r\n')),
    erdos2Edges = []

edges.forEach((edge)=>{
    edge = edge.map(n.normlizeNode)
    // console.log(edge);
    let source = n.namesMap[edge[0]] ? n.namesMap[edge[0]]: edge[0]
    let dest = edge.slice(1).map(name=>n.namesMap[name] ? n.namesMap[name] : name)
    dest.forEach((d)=>erdos2Edges.push([d,source]))
})

console.log(erdos2Edges);
fs.appendFileSync('.\\data_set\\Edges', '\n' + erdos2Edges.join('\n'))