import React, { Component } from 'react';
import './App.css';
import {fetchTrending} from './fetch';
import {fetchMoviesList} from './fetch';
import {fetchMovie} from './fetch';
import MovieList from './MovieList/MovieList';
import MovieSearch from './MovieSearch/MovieSearch';
import MovieCard from './MovieCard/MovieCard';

class App extends Component {
  state = {
    trendingList:[],
    suggestionsList: [],
    userInput: 'search for movie',
    selectedMovie: {}

  }

  inputChangedHandler = ( event ) => {
    this.setState( { userInput: event.target.value } );
  }  

  componentDidMount() {
    fetchTrending().then(data => this.setState({ trendingList: data.results }));   
  } 

  componentDidUpdate(_, prevState) {
    if (prevState.userInput !== this.state.userInput){
      let keyWord = this.state.userInput;
      fetchMoviesList(keyWord).then(data => this.setState({ suggestionsList: data.results || []}));       
    } 
  }

  showPoster(){
    let image;
    if(this.state.selectedMovie.poster_path == null){
      image = "https://portal.lancercorp.com/Content/Images/missing.png";
    } else {
      image = "https://image.tmdb.org/t/p/w500/" + this.state.selectedMovie.poster_path;
    }
    return image;
  }

  showDescription(){
    let description;
    if(this.state.selectedMovie.overview == null){
      description = "No Description Available";
    } else {
      description = this.state.selectedMovie.overview;
    }
    return description;
  }  

  showRelevantList(){
    let movieList;
    if(this.state.userInput == "search for movie"){
      movieList = this.state.trendingList.map(movie => <li onClick={() => this.getMovie(movie.id)}>{movie.original_title}</li>);
    } else {
      movieList = this.state.suggestionsList.map(movie => <li onClick={() => this.getMovie(movie.id)}>{movie.original_title}</li>);
    }
    return movieList;
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


  render () {
    return (
      <div className="App">

        <MovieSearch
          type="text"
          onChange={this.inputChangedHandler}
          value={this.state.userInput}         
        />

        <MovieList list={this.showRelevantList()}/>

        <MovieCard 
          movieName = {this.state.selectedMovie.original_title}
          description = {this.showDescription()}
          poster = {this.showPoster()}
        />

      </div>
    );
  }
}

export default App;
