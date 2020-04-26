import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//import queryString from 'query-string';

//SearchForm component where data can be managed with state
class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      //query: this.props.match.params.queryString
      //query: ''
      oldValue: "",
    };
  }

  // componentDidMount() {
  //     this.setQuery();
  // }

  componentDidUpdate(prevProps) {
    const {
      match: { params },
    } = this.props;

    const newValue = params && params[0];
    if (prevProps.match.params.searchText !== this.props.match.searchText) {
      //this.setQuery;
      this.setState({ oldValue: newValue });
      this.props.onSearch(params.searchedQuery);
    }
  }

  setQuery = () => {
    const { query = "" } = this.props.match.params;
    this.setState({
      searchText: query,
      query,
    });
  };

  //This methods handles updating the searchText state when a user types.
  onSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  //This method handle what to do when a user hits submit:
  //It grabs the query value to create a route path with it
  //push that route to the current route
  //   handleSubmit = (e) => {
  //     e.preventDefault();
  //     //let searchedQuery = this.query.value;
  //     let searchedQuery = this.state.value;
  //     let path = `/search/${searchedQuery}`;
  //     console.log(path);
  //     this.props.history.push(path);
  //     //history.push(path);
  //     this.props.onSearch(searchedQuery);
  //     e.currentTarget.reset();
  //   };

  render() {
    return (
      <form
        className="search-form"
        //   onSubmit={this.handleSubmit}
      >
        <input
          type="search"
          onChange={this.onSearchChange}
          name="search"
          ref={(input) => (this.query = input)}
          placeholder="Search..."
          required
        />
        <button type="submit" className="search-button">
          <svg
            fill="#fff"
            height="24"
            viewBox="0 0 23 23"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
      </form>
    );
  }
}
export default withRouter(SearchForm);
