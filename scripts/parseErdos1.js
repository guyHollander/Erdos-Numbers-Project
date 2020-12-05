import fs from "fs";
import path from "path"


let output = fs.readFileSync(".\\data_set\\Nodes",{encoding:'utf8'}),
    erdos1 = fs.readFileSync(".\\raw_data\\Erdos1.txt",{encoding:'utf8'})

let lastInd = Number(output.substring(output.lastIndexOf(',')-1,output.lastIndexOf(',')))
let  nodesArray = erdos1.split('\r\n').map((s)=> s.replace('*','').trim()).
                    map((s)=> [s.substring(s.indexOf(',') +1).trim(), s.substring(0, s.indexOf(',')), ]).
                    map((person)=> [person[0].replace(' ', '_'), person[1].replace(' ', '_')]).
                    map(a=> a.join('_')).
                    map((s)=> [++lastInd,s])


fs.appendFileSync(".\\data_set\\Nodes",nodesArray.join('\n'))
// console.log(nodesArray.join('\n'))

