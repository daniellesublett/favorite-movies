import React, { Component } from 'react';
import './App.css';
import {fetchMoviesList} from './fetch';
import {ApiConfig} from './fetch';

class App extends Component {
  // fetchResponse = "foo";
  state = {
    suggestionsList: [],
    userInput: 'bean'
  }

  inputChangedHandler = ( event ) => {
    this.setState( { userInput: event.target.value } );
  }  

  componentDidMount() {
    let keyWord = this.state.userInput;
    fetch(`${ApiConfig.BASE_URL}/search/movie?api_key=${ApiConfig.KEY}&query=${keyWord}`)
      .then(response => response.json())
      .then(data => this.setState({ suggestionsList: data.results }));   
  } 

  componentDidUpdate() { 
    let keyWord = this.state.userInput;
    fetch(`${ApiConfig.BASE_URL}/search/movie?api_key=${ApiConfig.KEY}&query=${keyWord}`)
      .then(response => response.json())
      .then(data => this.setState({ suggestionsList: data.results })); 
  }

  render () {
    return (
      <div className="App">
        <div className="movie-search">
          <input
            type="text"
            onChange={this.inputChangedHandler}
            value={this.state.userInput} />        
        </div>
        <div className="movie-container">
            {this.state.suggestionsList.map(movie => <div>{movie.original_title}</div>)}
        </div>
      </div>
    );
  }
}

export default App;
