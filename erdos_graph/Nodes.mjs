import fs from 'fs'
import path from 'path'
const nodesPath = path.format({dir:'.\\data_set', base:'Nodes'})
const nodesPatchArxiv = path.format({dir: '.\\data_set_with_arxiv', base: 'Nodes'})

export class Nodes{
    idMap ={}
    nameMap = {}

    constructor(path){
        console.log(path);
        this.rawNodes = fs.readFileSync(path, {encoding:'utf-8'}).split('\n').map(s=>s.split(','))
        this.lstIndex = this.rawNodes[this.rawNodes.length-1][0]
        console.log("Init Nodes successfully, Create Object for each node")
        this.nodes = this.rawNodes.map((n)=> new Node(n))
        console.log('Set-up hash maps')
        this.nodes.forEach((node)=>{this.idMap[node.id]=node; this.nameMap[node.name] = node})
    }

    getNodeById(id){
        return this.idMap[id]
    }

    getNodeByName(name){
        return this.nameMap[name]
    }

    normlizeNodeName(name){
        if(typeof name == 'string'){
            name = name.replace('*','').replace(/\^\d/,'').toLowerCase().trim().split(' ').join('_').replace(' ', '_')
            console.log(name);
            return name
        } else 
            return name
    }

    
    formatNameForMermaid(name){
        if(typeof name == 'string'){
            return name.split('_').map((n)=>n[0].toUpperCase() + n.substring(1)).join('_')
        } else 
            return name
       
    }

}

export class Node{
    constructor(node){
        this.id = node[0]
        this.name = node[1]
        this.neighbors = []
        this.erdosNumber = Infinity
        this.erdosPaths = []
    }

    setNeighbor(neighbor){
        if(neighbor && neighbor.id && neighbor.name && neighbor.neighbors)
            this.neighbors.push(neighbor)
    }
}