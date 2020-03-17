
export const ApiConfig = {
    KEY: "11fdff0a50cf7d845a2c73890befb6b2",
    BASE_URL: "https://api.themoviedb.org/3"
};

export function fetchTrending() {
    return fetch(`${ApiConfig.BASE_URL}/trending/movie/week?api_key=${ApiConfig.KEY}`)
      .then(response => response.json()) 
}

export function fetchMoviesList(keyWord) {
    return fetch(`${ApiConfig.BASE_URL}/search/movie?api_key=${ApiConfig.KEY}&query=${keyWord}`)
      .then(response => response.json()) 
}

export function fetchMovie(id) {
    return fetch(`${ApiConfig.BASE_URL}/movie/${id}?api_key=${ApiConfig.KEY}&language=en-US`)
        .then(response => response.json())
}
