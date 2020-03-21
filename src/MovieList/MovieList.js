import React from 'react';
import "./MovieList.css";

const movieList = ({list, listStatus, handleClick}) => {

    return (
        <div className="movie-container">
        	<h3 className="search-results">{listStatus}</h3>
            <ul>              
              {list.map(({id, original_title}) => <li onClick={() => handleClick(id)}>{original_title}</li>)}
            </ul>
        </div>
    );
};

export default movieList;