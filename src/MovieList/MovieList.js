import React from 'react';

const movieList = (props) => {
    const style = {

    };

    return (
        <div className="movie-container">
            <ul>  
              {props.list}
            </ul>
        </div>
    );
};

export default movieList;