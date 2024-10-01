import { useEffect, useState } from "react";
import { fetchReviews } from "../../api";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviews(movieId);
      setReviews(data.results);
    };
    getReviews();
  }, [movieId]);

  if (reviews.length === 0) return <p>There is no review yet...</p>;

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
