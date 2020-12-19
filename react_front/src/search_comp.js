import React, {Component} from 'react'
// import ReactDOM from 'react-dom';
import './search_comp.css'

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }


class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchBox: '',
            submitted: false
          }
    }

    handleSearchBoxChange = (e) => {
        this.setState({searchBox: e.target.value});
     }
    
    submitHandler = (e) => {
        e.preventDefault()
        this.setState({submitted: true})
        this.props.onSearch(titleCase(this.state.searchBox))
    }
    
    render() { 
        return (
            <div className="search__container">
            <p className="search__title">Enter an Author Name</p>
            <div>
                <form onSubmit={this.submitHandler}>
                    <div className="td">
                        <div className="td" style={{ width: "90%" }}>
                            <input id="search_box" className="search__input" placeholder="Author Name" value={this.state.searchBox} onChange={this.handleSearchBoxChange}/>
                        </div>
                        <div className="td" style={{ width: "10%" }}>
                            <button type='submit' className="myButton"/>
                        </div>
                    </div>
                </form>
            </div>
            <div className="credits__container">
                <p className="credits__text">And See His <a href="https://en.wikipedia.org/wiki/Erd%C5%91s_number" className="credits__link" target="_blank" rel="noopener noreferrer">Erdős Number</a> & Graph</p>
                {/* <p className="credits__text">Background color: Pantone Color of the Year 2016 <a href="https://www.pantone.com/color-of-the-year-2016" className="credits__link">Rose Quartz</a></p> */}
            </div>
        </div>
          );
    }
}
 
export default Search;
