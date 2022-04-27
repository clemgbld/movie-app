import { createStore } from "../../../store";
import { fetchDetails } from "../actions/showDetailsActions";

import {
  selectStatus,
  selectError,
  selectMovieDetails,
  selectDetailsCached,
} from "../selectors";

export const retrieveMovieDetailsSUT = () => {
  return {
    build() {
      const store = createStore();
      const selectDetails = () => selectMovieDetails(store.getState());
      const selectStatusDetails = () => selectStatus(store.getState());
      const retrieveMovieDetails = async (movieId) =>
        await store.dispatch(fetchDetails(movieId));

      const selectCache = () => selectDetailsCached(store.getState());

      const selectErrorMessage = () => selectError(store.getState());

      return {
        selectCache,
        selectErrorMessage,
        selectDetails,
        selectStatusDetails,
        retrieveMovieDetails,
      };
    },
  };
};
