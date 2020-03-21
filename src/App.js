import React, { Component } from 'react';
import './App.css';
import {fetchTrending} from './fetch';
import {fetchMoviesList} from './fetch';
import {fetchMovie} from './fetch';
import {fetchSimilar} from './fetch';
import MovieList from './MovieList/MovieList';
import MovieSearch from './MovieSearch/MovieSearch';
import MovieCard from './MovieCard/MovieCard';
import SimilarMovies from './SimilarMovies/SimilarMovies';

class App extends Component {
  state = {
    trendingList:[],
    suggestionsList: [],
    userInput: '',
    selectedMovie: {},
    listLabel: "Popular Movies",
    similarMovies: []

  }

  inputChangedHandler = ( event ) => {
    this.setState( { userInput: event.target.value } );
  }  

  componentDidMount() {
    let hardcodedID = 181812;
    fetchTrending().then(data => this.setState({ trendingList: data.results }));
    this.getSimilar(hardcodedID);
    this.setState( { selectedMovie: this.getMovie(hardcodedID) } );  
  } 

  componentDidUpdate(_, prevState) {
    if (prevState.userInput !== this.state.userInput){
      const { userInput: keyWord, selectedMovie: {id} } = this.state;
      fetchMoviesList(keyWord).then(data => this.setState({ suggestionsList: data.results || []}));
      this.setState( { listLabel: 'search results' } );
      this.getSimilar(id);

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

  posterAltTag(){
    let altTag;
    if(this.state.selectedMovie.poster_path == null){
      altTag = "no poster image for this film"
    } else {
      altTag = this.state.selectedMovie.original_title + " poster";
    }
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

  showRelease(){
    let releaseDate;
    if(this.state.selectedMovie.release_date == null){
      releaseDate = "No release date available";
    } else {
      releaseDate = this.state.selectedMovie.release_date;
    }
    return releaseDate;
  }

  showRelevantList(){
    let movieList;
    if(this.state.userInput === ""){
      movieList = this.state.trendingList.map(movie => <li onClick={() => this.getMovie(movie.id)}>{movie.original_title}</li>);
    } else {
      movieList = this.state.suggestionsList.map(movie => <li onClick={() => this.getMovie(movie.id)}>{movie.original_title}</li>);
    }
    return movieList;
  }

 getMovie = async (id) => {
    console.log(id);
    let selectedMovie = await fetchMovie(id);
    this.setState({
        selectedMovie: selectedMovie
    })
    console.log(this);
  } 

  async getSimilar(id) {
    console.log(id);
    let similarMovies = await fetchSimilar(id)
    console.log(similarMovies.results);
      this.setState({
          similarMovies: similarMovies.results
      })        
    } 

  handleMovieClick = (id) => {
    this.getMovie(id);
    this.getSimilar(id);
  }




  render () {   
    const {userInput, trendingList, suggestionsList, selectedMovie, listLabel, similarMovies} = this.state;
    return (
      <div className="App">
        <header>
          <h1 className="pageTitle">MOVIE LOOKUP</h1>
        </header>
        <section className="searchContainer">
          <MovieSearch
            type="text"
            onChange={this.inputChangedHandler}
            value={userInput}         
          />
        </section>
        <section className="infoContainer">
          <MovieList 
            listStatus = {listLabel}
            list={userInput == "" ? trendingList : suggestionsList}
            handleClick={this.handleMovieClick}
          />
          <MovieCard 
            movieName = {selectedMovie.original_title}
            poster = {this.showPoster()}
            description = {this.showDescription()}
            releaseDate = {this.showRelease()}
            altTag = {this.posterAltTag()}
          /> 
          <SimilarMovies 
            list={similarMovies}
            handleClick={this.handleMovieClick}
          />      
        </section>

      </div>
    );
  }
}

export default App;
