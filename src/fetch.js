

const ApiConfig = {
    KEY: "11fdff0a50cf7d845a2c73890befb6b2&query=",
    BASE_URL: "https://api.themoviedb.org/3"
};

export function fetchMoviesList(keyWord) {
    // return fetch(`${ApiConfig.BASE_URL}/search/movie?api_key=${ApiConfig.KEY}&query=${keyWord}`)
    return fetch(`${ApiConfig.BASE_URL}/search/movie?api_key=${ApiConfig.KEY}&query=${keyWord}`)
      .then(response => response.json())
      // .then(data => this.setState({ suggestionsList: data.results })); 
}

export function fetchMovie(id) {
    return fetch(`${ApiConfig.BASE_URL}/movie/${id}?api_key=${ApiConfig.KEY}&language=en-US`)
        .then(response => response.json())
}
