import React, { Component } from 'react';
import './App.css';
import {fetchMoviesList} from './fetch';
import {fetchMovie} from './fetch';

class App extends Component {
  // fetchResponse = "foo";
  state = {
    suggestionsList: [],
    userInput: 'bean',
    selectedMovie: {}

  }

  inputChangedHandler = ( event ) => {
    this.setState( { userInput: event.target.value } );
  }  

  componentDidMount() {
    let keyWord = this.state.userInput;
    fetchMoviesList(keyWord).then(data => this.setState({ suggestionsList: data.results }));   
  } 

  componentDidUpdate(_, prevState) {
    if (prevState.userInput !== this.state.userInput){
      let keyWord = this.state.userInput;
      fetchMoviesList(keyWord).then(data => this.setState({ suggestionsList: data.results || []}));       
    }
  }

  async getMovie(id) {
      try {
          this.setState({
              selectedMovie: await fetchMovie(id)
          })
              console.log(this.state.selectedMovie);
      } catch (error) {
          console.log(error);
      }
  }  

  // getMovie(id){
  //   fetchMovie(id).then(data => this.setState({ selectedMovie: data.results }));
  //   console.log(fetchMovie(id)); 
  // }

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
            <ul>  
              {this.state.suggestionsList.map(movie => <li onClick={() => this.getMovie(movie.id)}>{movie.original_title}</li>)}
            </ul>
        </div>
        <div className="movie-card">
            <h3 className="movieName">{this.state.selectedMovie.original_title}</h3>
            <img src= {"https://image.tmdb.org/t/p/w500/" + this.state.selectedMovie.poster_path}/>
        </div>
      </div>
    );
  }
}

export default App;
