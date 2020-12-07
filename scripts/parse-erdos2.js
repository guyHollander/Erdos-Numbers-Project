import fs from 'fs'

let erdos2Raw = fs.readFileSync('.\\raw_data\\Erdos2.txt',{encoding:'utf-8'}),
    nodes = fs.readFileSync('.\\data_set\\Nodes', {encoding:'utf-8'}).split('\n').map(s=>s.split(',')),
    edges = fs.readFileSync('.\\data_set\\Edges')

let erdos2 = erdos2Raw.split('|').map(s => s.split('\r\n'))
let lastInd = Number(nodes[nodes.length-1][0])
// console.log(nodes.substring(nodes.lastIndexOf(',')-1,nodes.lastIndexOf(',')))
// console.log(lastInd)
let erdos2Nodes = erdos2.map((nodes)=> nodes[0]).map((s)=>s.replace('*','').trim()).map((s)=>s.replace(/\^\d/,'')).
                        map((s)=>s.split(',')).map((name)=> [name.slice(1).join(''), name[0]]).
                        map((name)=> name[0] ? [name[0].trim().split(' ').join('_'),name[1].split(' ').join('_')] : ['',name[1].split(' ').join('_')]).
                        map(name=> name.join('_')).
                        map(name=>[++lastInd,name])

// console.log(erdos2Raw.split('|').map(s => s.split('\r\n')))
console.log(erdos2Nodes)
fs.appendFileSync('.\\data_set\\Nodes', '\n' + erdos2Nodes.join('\n').toLowerCase())