import React, { Component } from 'react';
import './App.css';
// import {fetchMoviesList} from './fetch';

class App extends Component {
  // fetchResponse = "foo";
  state = {
    suggestionsList: [],
  }

  componentDidMount() {
    // fetchMoviesList('face');
    fetch("https://api.themoviedb.org/3/search/movie?api_key=11fdff0a50cf7d845a2c73890befb6b2&query=face")
      .then(response => response.json())
      .then(data => this.setState({ suggestionsList: data.results }));   
  }  

  render () {
    console.log(this.state.suggestionsList);
    return (
      <div className="App">
      {this.state.suggestionsList.map(movie => <div>{movie.original_title}</div>)}
      </div>
    );
  }
}

export default App;
