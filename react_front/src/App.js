import { Component } from 'react'
import Search from './comp_search.js';
import Mermaid from "./comp_mermaid"
// import mermaid from 'mermaid'
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nodes:[],
      edges:[],
      erdos_number:Infinity,
      name:'',
      need_to_present:false,
      mermaidGraph:'',
      withArxiv:true
    }
  }

  setMermaidGraph = (edges) => {
    return 'stateDiagram-v2' + edges.reduce((str, curr)=> {
      str += `\n${curr[0].split('-').join('.')} --> ${curr[1].split('-').join('.')}`
      return str
    }, '')
  }
  searchHandler = (name) => {
    if(name.toLowerCase() === 'paul erdos' || name.toLowerCase() === 'paul_erdos'){
      let paul_mermaid = "stateDiagram-v2\nPaul_Erdos"
      this.setState({need_to_present: true, name: 'Paul Erdos', mermaidGraph: paul_mermaid, erdos_number:0})
    }
    else{
      fetch(`/api/erdosPath?name=${name}&withArxiv=${this.state.withArxiv}`).then((response)=>{
        if(response.status !== 200 && response.status !== 304 ){
          console.error(`Failed to query sever : ${response.status}`)
          this.setState((state)=>({nodes:[], edges:[], erdos_number:Infinity}))
        } else {
          response.json().then((g)=>{
            console.log(g)
            this.setState({nodes:g.nodes, edges:g.edges, erdos_number:g.dist, name:name, mermaidGraph:this.setMermaidGraph(g.edges)},() => {
              if(g.edges.length === 0)
                this.notFoundHandler()
              else{
                this.setState({need_to_present: true})
              }
            }
            )
        })}
      }).catch(err=>console.log(err)) 
    }
  }

  changeHandler = () => {
    this.setState({need_to_present:false})
  }

  pressHandler = (e) => {
    this.setState({withArxiv: e, need_to_present:false})
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
    if (this.state.need_to_present){
      console.log(this.state.mermaidGraph);
      // let graph_size = this.state.mermaidGraph.length
      // let margin = '-'+ (graph_size*0.0125).toString() + '% -'+ (graph_size*0.0125).toString()+'%'
      erdos_number = <h1 style={{margin:'auto', textAlign: 'center'}}>{this.state.name} is Erdos Number: {this.state.erdos_number}</h1>
      mermaid_vis = <div  style={{margin:"0 -800px", textAlign: 'center'}}>
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
          <Search onSearch={this.searchHandler} onChange={this.changeHandler} onPress={this.pressHandler}/>
        </div>
        {erdos_number}
        {mermaid_vis}
      </div>
    );
  }
}

export default App;
