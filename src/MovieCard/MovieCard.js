import React from 'react';

const movieCard = (props) => {
    const style = {

    };

    return (
        <div className="movie-card">
            <h3 className="movieName">{props.movieName}</h3>
            <p className="description">{props.description}</p>
            <img src= {props.poster}/>
        </div>
    );
};

export default movieCard;