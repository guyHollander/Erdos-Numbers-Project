import { Component } from 'react'
import Search from './search_comp.js';
import Mermaid from "./Mermaid"
// import mermaid from 'mermaid'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes:[],
      edges:[],
      erdos_number:Infinity,
      name:'',
      mermaidGraph:''
    }
  }

  setMermaidGraph(edges){
    return 'stateDiagram-v2' + edges.reduce((str, curr)=> {
      str += `\n${curr[0]} --> ${curr[1]}`
      return str
    }, '')
  }
  searchHandler = (name) => {
    console.log(`i know you send ${name}`)
    fetch(`/api/erdosPath?name=${name}`).then((response)=>{
      if(response.status !== 200 && response.status !== 304 ){
        console.error(`Failed to query sever : ${response.status}`)
        this.setState((state)=>({nodes:[], edges:[], erdos_number:Infinity}))
      } else {
        response.json().then((g)=>{
          console.log(g)
          this.setState(()=>({nodes:g.nodes, edges:g.edges, erdos_number:g.dist, name:name, mermaidGraph:this.setMermaidGraph(g.edges)}))
          if(g.edges.length === 0)
            this.notFoundHandler()
      })}
    }).catch(err=>console.log(err))
  }

  notFoundHandler = () => {
    console.log("not found hendler")
    alert(`${this.state.name} not found!!, please try again`)
    window.location.reload(false);
  }

  render() {
    // let mermaidStr = 'stateDiagram-v2' + this.state.edges.reduce((str, curr)=> {
    //   str += `\n${curr[0]} --> ${curr[1]}`
    //   return str
    // }, '')
    let erdos_number
    let mermaid_vis
    // let g = new Graph()
    if (this.state.edges.length > 0){
      erdos_number = <h1 style={{padding: '50px 0 0 70px', margin:'auto'}}>{this.state.name} is Erdos Number: {this.state.erdos_number}</h1>
      mermaid_vis = <div style={{padding: '50px 60px'}}>
        <Mermaid id="graph1" content={this.state.mermaidGraph} redraw={true} />
      </div>
    }
    else{
      erdos_number = <div></div>
      mermaid_vis = <div></div>
    }

    // mermaid.init(undefined, 'Mermaid')
    
    // let error_msg_vis
    // if (this.state.toShowErrorMessage){
    //   error_msg_vis = <h1 
    // }

    return (
      <div>
        <div>
          <Search onSearch={this.searchHandler} />
        </div>
        {erdos_number}
        {mermaid_vis}
      </div>
    );
  }
}

export default App;
