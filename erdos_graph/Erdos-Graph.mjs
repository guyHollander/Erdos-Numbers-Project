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
                    console.log(`invalid nodes ${n1}, ${n2}`);
                else 
                    {n1.setNeighbor(n2); n2.setNeighbor(n1)}
            }})
    }

    calculateErdosPath(id, name){
        if(name) 
            name = this.nodes.normlizeNodeName(name)
        let node = !id? !name ? null : this.nodes.getNodeByName(name) : this.nodes.getNodeById(id)
        if(!node)
            return []

        let bfsQueue = [], visited = {}, dist = -1, isPaulErdos = false , path = []
        bfsQueue.push(node)

        while(bfsQueue.length && !isPaulErdos && dist < 5){
            let currLevel = []
            dist++
            while (bfsQueue.length){
                currLevel.push(bfsQueue.shift())
            }

            for(const n of currLevel){
                if(n.id == '0')
                    isPaulErdos =true
                
                let neighbors = n.neighbors
                for(const neigh of neighbors){
                    if(!visited[neigh.id]){
                        visited[neigh.id] = n
                        bfsQueue.push(neigh)
                    }
                }
            }

        }

        
        if(!isPaulErdos)
            return path
        
        let curr = this.nodes.getNodeById('0')
        while(curr.id != node.id){
            path.push(curr.name)
            curr = visited[curr.id]
        }
        curr.erdosNumber = dist
        path.push(curr.name)
        return {path, dist}
    }


}