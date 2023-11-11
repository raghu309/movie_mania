import {useEffect, useState} from 'react';
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';

const API_URL = "https://www.omdbapi.com?apikey=e93309a4";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        data.Response==="True"?setMovies(data.Search):setMovies([]);
    }

    useEffect(() => {
        searchMovies('WallStreet');
    }, []);


    return (
        <div className='app'>
            <h1>MovieMania</h1>

            <div className='search'>
                <input 
                    placeholder='Search for Movies' 
                    value={searchTerm} 
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }}
                />
                <img 
                    src={SearchIcon}
                    alt='search'
                    onClick={() => {
                        searchMovies(searchTerm);
                        setSearchTerm("");
                    }}
                />
            </div>
            {
                movies.length > 0?
                (
                    <div className="container">
                        {movies.map((movie) => {
                            return <MovieCard movie={movie}/>
                        })}
                    </div>
                ):(
                    <h2>No Movies Found</h2>
                )
            }

            
        </div>
    )
}

export default App;