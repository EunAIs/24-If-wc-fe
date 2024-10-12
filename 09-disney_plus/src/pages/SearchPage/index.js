import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import MovieModal from "../../components/MovieModal";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get("q");
  //console.log(useQuery) 시 q="이하값" 에서 이하값에 해당하는 부분을 가져옴

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return searchResults.length > 0 ? (
    <section className="search-container">
      {searchResults.map((movie) => {
        if (movie.backdrop_path !== null && movie.media_type !== "person") {
          const movieImageUrl =
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
          return (
            <div className="movie" key={movie.id}>
              <div
                onClick={() => handleClick(movie)}
                className="movie__column-poster"
              >
                <img
                  src={movieImageUrl}
                  alt="movie"
                  className="movie__poster"
                />
              </div>
            </div>
          );
        }
      })}
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  ) : (
    <section className="no-results">
      <div className="no-results__text">
        <p>"{searchTerm}"의 검색결과가 없습니다</p>
      </div>
    </section>
  );
}
