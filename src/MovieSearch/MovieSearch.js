import React from 'react';

const movieSearch = (props) => {
    const style = {

    };

    return (
        <div className="movie-search">
          <input type={props.type}
            onChange={props.onChange}
            value={props.value} />        
        </div>
    );
};

export default movieSearch;