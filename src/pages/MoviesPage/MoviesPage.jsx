import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { fetchMovieBySearch } from "../../api";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [findedMovies, setFindedMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const handleChangeQuery = (newQuery) => {
    searchParams.set("query", newQuery);
    //searchParams записує дані в себе, а setSearchParams в url.
    setSearchParams(searchParams);
  };

  useEffect(() => {
    // перевіркa на порожнє ключове слово
    if (!query) return;
    const getSearchResults = async () => {
      const data = await fetchMovieBySearch(query);
      // перевіркa на наявність results
      setFindedMovies(data.results || []);
    };
    getSearchResults();
  }, [query]);
  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {findedMovies.length > 0 && (
        <ul className={s.list}>
          {findedMovies.map((movie) => (
            <li key={movie.id} className={s.listItem}>
              {/* Передаємо попередній стан (пошуковий запит) state= */}
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: `/movies?query=${query}` }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
