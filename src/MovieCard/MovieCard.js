import React from 'react';
import "./MovieCard.css";

const movieCard = (props) => {
    const style = {

    };

    return (
        <div className="movie-card">
            <h3 className="movieName">{props.movieName}</h3>
            <img className="poster" alt={props.altTag} src= {props.poster}/>
            <p className="release-date">Release Date: {props.releaseDate}</p>
            <p className="description">{props.description}</p>
        </div>
    );
};

export default movieCard;