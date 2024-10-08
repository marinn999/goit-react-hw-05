import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { fetchMovieBySearch } from "../../api";
import s from "./MoviesPage.module.css";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [findedMovies, setFindedMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const handleChangeQuery = (newQuery) => {
    //перевіряю, чи запит не є лише пробілами
    const trimmedQuery = newQuery.trim();
    //Щоб при пошуку, коли пусте поле, не було в url “movies/query=“, то повертаємо пустий обʼєкт і буде просто “/movies”
    if (!trimmedQuery) {
      toast.error("Type the movie name");
      return setSearchParams({});
    }

    searchParams.set("query", trimmedQuery);
    //searchParams записує дані в себе, а setSearchParams в url.
    setSearchParams(searchParams);
  };

  useEffect(() => {
    // перевіркa на порожнє ключове слово
    if (!query) return;
    const getSearchResults = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieBySearch(query);
        // перевіркa на наявність results
        setFindedMovies(data.results || []);
      } catch (error) {
        toast.error("There is a problem with data loading");
      } finally {
        setLoading(false);
      }
    };
    getSearchResults();
  }, [query]);
  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {loading && <Loader />}
      {/* Використовую MovieList для рендеру знайдених фільмів */}
      {findedMovies.length > 0 && (
        <MovieList
          movies={findedMovies}
          linkState={{ from: `/movies?query=${query}` }} // Передаю стан пошукового запиту:
          //linkState містить стан пошукового запиту для навігації назад після переходу на сторінку деталей фільму.
        />
      )}
    </div>
  );
};

export default MoviesPage;
