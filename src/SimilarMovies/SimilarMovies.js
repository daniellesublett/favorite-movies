import React from 'react';
import "./SimilarMovies.css";

const similarMovies = ({list, handleClick}) => {

    return (
        <div className="similar-container">
	        <ul>
	          {list.map(movie => <li onClick={() => handleClick(movie.id)}>{movie.original_title}</li>)}
	        </ul>
        </div>
    );
};

export default similarMovies;