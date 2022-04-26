import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../../../core/features/diplayMovies/actions/fetchMovies";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./MoviesContainer.module.scss";
import {
  selectError,
  selectStatus,
  selectMovies,
} from "../../../core/features/diplayMovies/selectors";
import MovieCard from "../MoviesCard/MovieCard";
import classNames from "clsx";

const MoviesContainer = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const movies = useSelector(selectMovies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const isLoading = status === "loading";

  const containerClass = classNames({
    [classes.container]: error || isLoading,
    [classes.grid]: !(error || isLoading),
  });

  const renderMovie = (movie) => {
    const { id, poster_path, title, release_date, vote_average } = movie;

    const data = {
      img: poster_path,
      title,
      date: release_date,
      popularity: vote_average,
      id,
    };

    return <MovieCard key={id} data={data} />;
  };

  return (
    <div>
      <h2 className={classes.title}>Home</h2>
      <div className={containerClass}>
        {isLoading && <Spinner />}
        {error && <p>{error}</p>}
        {movies && movies.map(renderMovie)}
      </div>
    </div>
  );
};

export default MoviesContainer;
