import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api";
import { Link } from "react-router-dom";
import s from "./MovieList.module.css";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setError(false);
      setLoading(true);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <div className={s.wrapper}>
      {loading && <Loader />}
      {error && toast.error("Can not load the trends. Try again.")}
      {!loading && !error && movies.length > 0 && (
        <ul className={s.list}>
          {movies.map((movie) => (
            <li key={movie.id} className={s.listItem}>
              <Link to={`movies/${movie.id.toString()}`}>
                <p>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!loading && !error && movies.length === 0 && (
        <p>There is nothing in trends</p>
      )}
    </div>
  );
};

export default MovieList;
