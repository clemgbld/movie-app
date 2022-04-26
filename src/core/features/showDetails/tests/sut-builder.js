import { createStore } from "../../../store";
import {
  hideDetails,
  showDetails,
  fetchDetails,
} from "../actions/showDetailsActions";

import { selectStatus, selectError, selectMovieDetails } from "../selectors";

export const retrieveMovieDetailsSUT = () => {
  return {
    build() {
      const store = createStore();
      const selectDetails = () => selectMovieDetails(store.getState());
      const selectStatusDetails = () => selectStatus(store.getState());
      const retrieveMovieDetails = async (movieId) =>
        await store.dispatch(fetchDetails(movieId));

      const selectErrorMessage = () => selectError(store.getState());

      return {
        selectErrorMessage,
        selectDetails,
        selectStatusDetails,
        retrieveMovieDetails,
      };
    },
  };
};
