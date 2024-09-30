import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMovieById } from "../../api";
import { Link } from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import { Icon } from "@iconify/react";
import clsx from "clsx";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  useEffect(() => {
    const getMovieById = async () => {
      const data = await fetchMovieById(movieId);
      setMovie(data);
    };
    getMovieById();
  }, [movieId]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div style={{ marginTop: "10px" }}>
      <Link to="/" className={s.goBack}>
        <Icon icon="ion:return-up-back-outline" /> Go back
      </Link>
      <div className={s.wrapper}>
        <img
          className={s.img}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={s.textWrapper}>
          <h2>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <hr />
      <div className={s.infoWrapper}>
        <h4>Additional information</h4>
        <NavLink to="cast" className={buildLinkClass}>
          Cast <Icon icon="solar:forward-bold" />
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews <Icon icon="solar:forward-bold" />
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
