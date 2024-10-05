import { useEffect, useState } from "react";
import { fetchReviews } from "../../api";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
        toast.error("There is a problem. Try again.");
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  if (loading) return <Loader />;
  if (!loading && reviews.length === 0 && !error)
    return <p>There is no review yet...</p>;

  return (
    <ul className={s.list}>
      {reviews.map((review) => (
        <li key={review.id}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
