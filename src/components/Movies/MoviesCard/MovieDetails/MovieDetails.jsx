import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectMovieDetails,
  selectStatus,
  selectGenres,
  selectGenresNames,
} from "../../../../core/features/showDetails/selectors";
import Spinner from "../../../UI/Spinner/Spinner";
import { fetchDetails } from "../../../../core/features/showDetails/actions/showDetailsActions";
import Popularity from "../shared/Popularity/Popularity";
import classes from "./MovieDetails.module.scss";

const MovieDetails = ({ id, closeModal }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const data = useSelector(selectMovieDetails);
  const genres = useSelector(selectGenres);
  const listOfNames = useSelector(selectGenresNames);

  const {
    title,
    poster_path,
    backdrop_path,
    year,
    runtime,
    vote_average,
    tagline,
    overview,
  } = data;

  const closeModalWithEsc = useCallback(
    (e) => {
      if (e.key !== "Escape") return;
      closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    dispatch(fetchDetails(id));

    window.addEventListener("keydown", closeModalWithEsc);

    return () => window.removeEventListener("keydown", closeModalWithEsc);
  }, [dispatch, id, closeModalWithEsc]);

  const isLoading = status === "loading";

  const renderListOfName = () => {
    const indexOfLastName = listOfNames?.length - 1;
    return listOfNames?.map((name, i) =>
      i === indexOfLastName ? (
        <li key={name}>{name}</li>
      ) : (
        <li key={name}>{`${name}, `}</li>
      )
    );
  };

  const cancelEventBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={closeModal} className={classes.modal} role="dialog">
      {isLoading && <Spinner />}
      {error && <p>{error}</p>}
      {data && (
        <div
          style={{ backgroundImage: `url(${backdrop_path})` }}
          role="contentinfo"
          className={classes.modal__container}
          onClick={cancelEventBubbling}
        >
          <button className={classes.modal__close} onClick={closeModal}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
          <div className={classes.modal__poster}>
            <img
              className={classes.modal__img}
              loading="lazy"
              src={poster_path}
              alt={title}
            />
            <Popularity popularity={vote_average} />
          </div>

          <div className={classes.modal__content}>
            <h2 className={classes.modal__title}>{`${title} (${year})`}</h2>
            <div className={classes.modal__info}>
              {genres && (
                <span className={classes.modal__id}>{genres[0].id}</span>
              )}
              <ion-icon name="remove-outline"></ion-icon>
              <ul className={classes.modal__list}>{renderListOfName()}</ul>
              <ion-icon name="remove-outline"></ion-icon>
              {runtime && <span>{runtime}</span>}
            </div>

            <h4 className={classes.modal__tagline}>{tagline}</h4>
            <div>
              <h3 className={classes.modal__synopsis}>Synopsis</h3>
              <p className={classes.modal__overview}>{overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
