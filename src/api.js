import axios from "axios";

// Встановлюємо базовий URL для всіх запитів Axios
axios.defaults.baseURL = "https://api.themoviedb.org/3/";
// Токен доступу, який буде використовуватись у заголовку Authorization
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWNhYmM1NTBkOTdmMzBmNmE0NjQzYmIwZGUzMzRhYiIsIm5iZiI6MTcyNzUzMjY5MS4zMzUxLCJzdWIiOiI2NmY4MGQxNjM5M2NkYTFkMWRjYzFjMTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zF2UGuqJ4MN8086BVspMpqEV5ODcNHGmnGjeXK0GzZY";
// Створюємо екземпляр axios з базовими налаштуваннями
const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fetchTrendingMovies = async () => {
  const { data } = await apiClient.get(`trending/movie/day`);
  return data.results;
};

export const fetchMovieById = async (movieId) => {
  const { data } = await apiClient.get(`movie/${movieId}`);
  return data;
};

export const fetchCast = async (movieId) => {
  const { data } = await apiClient.get(`movie/${movieId}/credits`);
  return data;
};

export const fetchReviews = async (movieId) => {
  const { data } = await apiClient.get(`movie/${movieId}/reviews`);
  return data;
};

export const fetchMovieBySearch = async (query) => {
  const { data } = await apiClient.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US`
  );
  return data;
};
