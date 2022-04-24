import { createStore } from "../../../store";
import {
  hideDetails,
  showDetails,
  fetchDetails,
} from "../actions/showDetailsActions";

import {
  selectIsOpen,
  selectStatus,
  selectError,
  selectMovieDetails,
} from "../selectors";

export const retrieveMovieDetailsSUT = () => {
  return {
    build() {
      const store = createStore();
      const selectDetailsIsOpen = () => selectIsOpen(store.getState());
      const selectDetails = () => selectMovieDetails(store.getState());
      const selectStatusDetails = () => selectStatus(store.getState());
      const retrieveMovieDetails = async (movieId) =>
        await store.dispatch(fetchDetails(movieId));
      const showMovieDetails = () => store.dispatch(showDetails());
      const hideMovieDetails = () => store.dispatch(hideDetails());
      const selectErrorMessage = () => selectError(store.getState());

      return {
        selectErrorMessage,
        selectDetailsIsOpen,
        selectDetails,
        selectStatusDetails,
        retrieveMovieDetails,
        showMovieDetails,
        hideMovieDetails,
      };
    },
  };
};
