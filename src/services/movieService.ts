import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

if (!TOKEN) {
  throw new Error("❌ TMDB token не знайдено! Додай VITE_TMDB_TOKEN у .env");
}

interface TMDBResponse {
  results: Movie[];
}

const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await tmdb.get<TMDBResponse>("/search/movie", {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results ?? [];
  } catch (error) {
    console.error("❌ Помилка при отриманні фільмів з TMDB:", error);
    return [];
  }
}