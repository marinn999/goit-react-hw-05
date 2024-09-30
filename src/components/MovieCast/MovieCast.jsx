import { useEffect, useState } from "react";
import { fetchCast } from "../../api";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
import toast from "react-hot-toast";

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const getActors = async () => {
      try {
        const data = await fetchCast(movieId);
        setActors(data.cast);
      } catch (error) {
        toast.error("Something went wrong. Try again.");
      }
    };
    getActors();
  }, [movieId]);

  const defaultImg = `https://banffventureforum.com/wp-content/uploads/2019/08/no-photo-icon-22.png`;
  return (
    <ul className={s.list}>
      {actors.map(({ id, name, profile_path, character }) => (
        <li key={id} className={s.listItem}>
          <div className={s.itemWrapper}>
            <img
              className={s.img}
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : defaultImg
              }
              alt={name}
            />

            <h3 className={s.name}>{name}</h3>
            <p className={s.character}> Character: {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
