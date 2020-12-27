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

        let paths = this.getAllErdosPaths(node)
        let dists = []
        for(const p of paths.paths){
            p.forEach((nd,i)=>{
                    if(dists[i] === undefined)
                        dists[i] = [nd]
                    else if (!dists[i].includes(nd))
                        dists[i].push(nd)
            })
        }

        let areNeighbours = (nd1, nd2)=>{
            if(this.nodes.getNodeByName(nd1).neighbors.includes(this.nodes.getNodeByName(nd2)))
                return [this.nodes.formatNameForMermaid(nd1), this.nodes.formatNameForMermaid(nd2)]
            else
                return []
        }

        let nodes = paths.paths.reduce((nds,p)=>{
            for(const nd of p){
                if(!nds.includes(nd))
                    nds.push(nd)
                }
            return nds
        }, [])

        let edges = []
        for(let i = 0; i< paths.dist; i++){
            if(i > 0){
                // set internal edges
                for(let j = 0; j<dists[i].length; j++){
                    for(const nd of dists[i].slice(j+1)){
                        let e = areNeighbours(dists[i][j], nd)
                        if(e.length === 2)
                            edges.push(e)
                    }
                }
            }
            dists[i].forEach((nd)=>{
                for(const neigh of dists[i+1]){
                    let e = areNeighbours(nd, neigh)
                    if(e.length === 2)
                            edges.push(e)
                }})
        }

        return {nodes:nodes.map((n)=>this.nodes.formatNameForMermaid(n)), edges, dist:paths.dist}

        }


}