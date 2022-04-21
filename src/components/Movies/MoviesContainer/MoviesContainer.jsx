import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../../../core/features/diplayMovies/actions/fetchMovies";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./MoviesContainer.module.scss";
import {
  selectError,
  selectStatus,
} from "../../../core/features/diplayMovies/selectors";
const MoviesContainer = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div>
      <h2 className={classes.title}>Home</h2>
      <div className={classes.container}>
        {status === "loading" && <Spinner />}
        {status === "rejected" && <p>{error}</p>}
      </div>
    </div>
  );
};

export default MoviesContainer;
