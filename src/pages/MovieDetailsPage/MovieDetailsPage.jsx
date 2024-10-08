import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieById } from "../../api";
import { Link } from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  //location.state?.from — шлях, звідки прийшов користувач
  //Якщо location.state?.from існує(якщо я переходжу зі сторінки з фільмами, а не просто копіюю
  //і вставляю посилання на конкретний фільм - в такому випадку не буде попередньої сторінки з
  //пошуком ), він зберігається в goBack.current, інакше зберігається шлях до сторінки / movies
  const location = useLocation();
  const goBack = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovieById();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return toast.error("Something went wrong");
  if (!movie) return <h2>No movie found...</h2>;

  return (
    <div style={{ marginTop: "10px" }}>
      <Link to={goBack.current} className={s.goBack}>
        <Icon icon="ion:return-up-back-outline" /> Go back
      </Link>
      <div className={s.wrapper}>
        <img
          className={s.img}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          loading="lazy"
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
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
