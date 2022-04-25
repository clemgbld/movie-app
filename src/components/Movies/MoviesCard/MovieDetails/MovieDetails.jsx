import { useEffect } from "react";
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

const MovieDetails = ({ id }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const data = useSelector(selectMovieDetails);
  const genres = useSelector(selectGenres);
  const listOfNames = useSelector(selectGenresNames);

  const { title, poster__path, year } = data;

  useEffect(() => {
    dispatch(fetchDetails(id));
  }, [dispatch]);

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

  return (
    <div role="dialog">
      {isLoading && <Spinner />}
      {data && (
        <div role="contentinfo">
          <img src={poster__path} alt={title} />
          <div>
            <h2>{`${title} (${year})`}</h2>
            <div>
              {genres && <span>{genres[0].id}</span>}
              <ul>{renderListOfName()}</ul>
            </div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default MovieDetails;
