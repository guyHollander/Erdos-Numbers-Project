import {Nodes,Node} from './Nodes.mjs'
import {Edges} from './Edges.mjs'

export class ErdosGraph{
    nodes = new Nodes()
    edges = new Edges()
    constructor(){
        console.log('Creating graph')
        this.edges.rawEdges.forEach((e)=>{
            if(!e)
                console.log(`undefined edge ${e}`)
            else {
                let n1 = this.nodes.getNodeById(e[0]), n2 = this.nodes.getNodeById(e[1])
                if(!n1 || !n2)
                    console.log(`invalid nodes ${n1}, ${n2}`, e);
                else 
                    {n1.setNeighbor(n2); n2.setNeighbor(n1)}
            }})
    }

    getAllErdosPaths(node){
        console.log(`get erdos paths`)
        let bfsQueue = [], visited = {}, finishCalc = {}, dist = 0, isPaulErdos = false 
        bfsQueue.push(node)

        while(bfsQueue.length && !isPaulErdos && dist < 10){
            let currLevel = []
            dist++
            while (bfsQueue.length){
                currLevel.push(bfsQueue.shift())
            }

            for(let i = 0; i < currLevel.length; i++){
                let currNode = currLevel[i]

                for(const neigh of currNode.neighbors){
                    if(!finishCalc[neigh.id]){
                        if(visited[neigh.id] == undefined){
                            visited[neigh.id] = [currNode.id]
                            bfsQueue.push(neigh)
                        } else 
                            visited[neigh.id] = visited[neigh.id].concat(currNode.id)

                        if(neigh.id == '0')
                            isPaulErdos = true
                    }
                }

                finishCalc[currNode.id] = true
            }

        }

        if(!isPaulErdos)
            return {paths:[], dist:Infinity}

        let paths = []
        let getPaths = (p, curr, depth)=>{
            if(curr.id == node.id){
                paths.push(p.concat([curr.name]))
                return
            }
            
            if(depth == 0)
                return
            let neighbors = visited[curr.id]
            if(neighbors.length < 1)
                return

            for(const neigh of neighbors){
                getPaths(p.concat([curr.name]), this.nodes.getNodeById(neigh), depth-1)
            }
            return
        }
        getPaths([],this.nodes.getNodeById('0'), dist)
        return {paths, dist}
    }

    returnErdosSubGraph(id, name){
        if(name) 
            name = this.nodes.normlizeNodeName(name)
        let node = !id? !name ? null : this.nodes.getNodeByName(name) : this.nodes.getNodeById(id)
        if(!node)
            return {nodes:[], edges:[], dist:Infinity}
        
        console.log(`Calculate Sub Graph for ${node.name}`)

        // let nodes = [], edges = []
        let paths = this.getAllErdosPaths(node)
        let nodes = paths.paths.reduce((nds,p)=>{
            for(const nd of p){
                if(!nds.includes(nd))
                    nds.push(nd)
                }
            return nds
        }, [])
        let edges = []
        for(let i = 0; i<nodes.length; i++){
            for(const nd of nodes.slice(i+1)){
                if(this.nodes.getNodeByName(nodes[i]).neighbors.includes(this.nodes.getNodeByName(nd)))
                    edges.push([this.nodes.formatNameForMermaid(nodes[i]), this.nodes.formatNameForMermaid(nd)])
            }
        }

        return {nodes:nodes.map((n)=>this.nodes.formatNameForMermaid(n)), edges, dist:paths.dist}

        }


}