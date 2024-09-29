import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../../api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieById = async () => {
      const data = await fetchMovieById(movieId);
      console.log(movieId);

      setMovie(data);
    };
    getMovieById();
  }, [movieId]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{movie.title}</h2>
    </div>
  );
};

export default MovieDetailsPage;
