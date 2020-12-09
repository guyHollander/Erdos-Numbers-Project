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
        let node = !id? !name? null : this.nodes.getNodeByName(name) : this.nodes.getNodeById(id)
        return [node]
    }


}