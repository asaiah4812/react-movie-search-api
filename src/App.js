import React from "react";
import {useState, useEffect } from "react";
import MovieCard from './MovieCard.jsx';
import './App.css';
import SearchIcon from './search.svg'

// 162747b7

const API_URL = "http://www.omdbapi.com?apikey=162747b7";

const movie1 = {
    "Title": "The Batman",
    "Year": "2022",
    "imdbID": "tt1877830",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        const response = await fetch (`${API_URL}&s=${title}`);
        const data = await response.json();
        
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Batman');
    }, []);
    return(
        <div className="app">
            <h1>DreamerLand</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
               movies?.length > 0
                ?(
                <div className="container">
                    {movies.map((movie) =>(
                       <MovieCard movie={movie} />
                    ))}
                </div>
                ) :
                (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>                       
                )
            }
        </div>
    );
}

export default App;