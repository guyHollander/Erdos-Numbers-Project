import * as React from 'react';
import { Checkbox } from 'pretty-checkbox-react';


class CheckBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            chkbox:true
          }
    }

    handleChangeChk = (e) => {
        this.setState({chkbox: e.target.checked}, () => {
            console.log(`check box is: ${this.state.chkbox}`)
            this.props.onPress(this.state.chkbox)
        })
    }

    render() {
        return <Checkbox defaultChecked={this.state.chkbox} onChange={this.handleChangeChk}/>;
    }
  }


export default CheckBox;