import { Component } from 'react'
import Search from './search_comp.js';
import Mermaid from "./Mermaid"

const list = ["Adi", "Guy", "Mor", "Ben", "Roi"]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toShowGraph: false,
      toShowErrorMessage: false,
      searched: ""
    }
  }

  searchHandler = (name) => {
    console.log(`i know you send ${name}`)
    if (list.indexOf(name) > -1){
      this.setState({searched:name},
        this.setState({
          toShowGraph: true
        }))
    } 
    else{
      this.setState({
        searched: name,
        toShowErrorMessage: true
      }, () => this.notFoundHandler())
    }
  }

  notFoundHandler = () => {
    console.log("not found hendler")
    alert(`${this.state.searched} not found!!, please try again`)
    window.location.reload(false);
  }

  render() {
    let erdos_number
    let mermaid_vis
    if (this.state.toShowGraph){
      erdos_number = <h1 style={{padding: '50px 0 0 70px', margin:'auto'}}>{this.state.searched} is Erdos Number: 2</h1>
      mermaid_vis = <div style={{padding: '50px 60px'}}>
        <Mermaid id="graph1" content={`
        stateDiagram-v2
        Paul_Erdos --> Nati
        Nati --> Roi
        Paul_Erdos --> Yossi
        Yossi --> Roi
        `} />
      </div>
    }
    else{
      erdos_number = <div></div>
      mermaid_vis = <div></div>
    }
    
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
