import React from 'react';
import "./MovieSearch.css";

const movieSearch = (props) => {
    const style = {

    };

    return (
        <div className="movie-search">
            <div className="cover">
                <div className="tb">
                    <div className="td">
                      <input type={props.type}
                        onChange={props.onChange}
                        value={props.value} />                            
                    </div>
                    <div className="td" className="s-cover">
                        <button type="submit">
                            <div className="s-circle"></div>
                            <span></span>
                        </button>
                    </div>                
                </div>
            </div>
        </div>

    );
};

export default movieSearch;