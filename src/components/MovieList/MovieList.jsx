import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies, linkState = {} }) => {
  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.listItem}>
          {/* пропс linkState передається до кожного фільму для передачі стану з пошуковим запитом */}
          <Link to={`/movies/${movie.id}`} state={linkState}>
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
