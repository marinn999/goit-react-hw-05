import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../api";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

const HomePage = () => {
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
    <div>
      <h1 className={s.headerName}>Trending today</h1>
      {loading && <Loader />}
      {error && toast.error("Can not load the trends. Try again.")}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
      {!loading && !error && movies.length === 0 && (
        <p>There is nothing in trends</p>
      )}
    </div>
  );
};

export default HomePage;
