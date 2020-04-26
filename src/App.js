import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import config from "./Config";
import "./index.css";

//import components
import Nav from "./components/Nav";
import Gallery from "./components/Gallery";
import SearchForm from "./components/SearchForm";
import NotFound from "./components/NotFound";

//pushes the key back to the window
// const pushSate = ( obj, url)=> {
//   window.history.pushState(obj, '', url);
// }
//handles browser's back and forward button
// const onPopstate= handler => {
//     window.onpopstate = handler;
// }

class App extends Component {
  constructor(props) {
    //binding THIS keyword to this class
    super(props);
    //this is for browser back & forward button
    // this.params = {};
    //initial props state
    this.state = {
      photos: [],
      queryString: "",
      isLoading: true,
    };
  }

  //home pages renders trave images
  componentDidMount = () => {
    this.searching("travel");

    //this is for browser back & forward button
    // onPopstate((event) => {
    //   this.setState({
    //     key: (event.state || {}).key
    //   })
    // });
  };

  //retrieve data
  searching = (query) => {
    //save the url as a variable
    const flickrURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.My_Key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

    axios
      .get(flickrURL)
      //handle data & setting the value back to false
      .then((response) => {
        this.setState({
          //sets retrieved api data to the photos array
          photos: response.data.photos.photo,
          //sets query props to the current selected tag
          queryString: query,
          isLoading: false,
        });
      })
      .catch((error) => {
        //handle error
        console.log("Error fetching and parsing data: ", error);
      });

    //resetting isLoading to true so that 'Loading...' message show on any API call load.
    this.setState({ isLoading: true });
    // pushSate(
    //   { key: query},
    //   `/${query}`
    // );
  };

  //retrieve data for search input
  // performSearch = (query) => {
  //   const flickrURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.My_Key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

  //   axios.get(flickrURL)
  //     .then( response => {
  //       //handle data
  //       this.setState({
  //         queryString: query,
  //         photos: response.data.photos.photo,
  //         isLoading: false
  //       })
  //       console.log(query);
  //     })
  //     .catch( error => {
  //       //handle error
  //       console.log('Error fetching and parsing data: ', error);
  //     })

  //     //resetting isLoading to true so that 'Loading...' message show on any API call load.
  //     this.setState({isLoading: true});
  // }

  render() {
    console.log(this.state.photos);
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm
            onSearch={this.searching}
            isLoading={this.state.isLoading}
          />
          <Nav fetchData={this.searching} />

          <Switch>
            <Route
              exact
              strict
              path="/"
              render={() => (
                <Redirect to="/travel" isLoading={this.state.isLoading} />
              )}
            />
            <Route
              exact
              strict
              path="/search/:searchedQuery"
              render={(props) => (
                <Gallery
                  {...props}
                  data={this.state.photos}
                  query={this.state.queryString}
                  isLoading={this.state.isLoading}
                  fetchData={this.searching}
                />
              )}
            />
            <Route
              path="/(travel|sea|clouds|nature)"
              render={(props) => (
                <Gallery
                  {...props}
                  data={this.state.photos}
                  query={this.state.queryString}
                  isLoading={this.state.isLoading}
                  fetchData={this.searching}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
