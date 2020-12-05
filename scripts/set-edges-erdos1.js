import { notDeepEqual } from 'assert'
import fs from 'fs'

let nodesStr = fs.readFileSync('..\\data_set\\Nodes', {encoding:'utf-8'})

let nodes = nodesStr.split('\n').map((s)=> s.split(',')).map((arr)=> Number(arr[0]))
let edges = nodes.map((id)=> [0,id])

// console.log(edges)
fs.writeFileSync('..\\data_set\\Edges', edges.join('\n'))
