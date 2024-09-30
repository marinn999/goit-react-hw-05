import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api";
import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };
    getTrendingMovies();
  }, []);

  return (
    <div className={s.wrapper}>
      <h2 className={s.headerName}>Trending today</h2>
      <ul className={s.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={s.listItem}>
            <Link to={`movies/${movie.id.toString()}`}>
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
