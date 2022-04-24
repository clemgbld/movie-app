import { createStore } from "../../../store";
import { fetchMovies } from "../actions/fetchMovies";
import { selectStatus, selectError } from "../selectors";

export const retrieveMoviesDataSUT = () => {
  return {
    build() {
      const store = createStore();
      const selectData = () => store.getState().movies.data;
      const selectDataStatus = () => selectStatus(store.getState());
      const retrieveMoviesData = async () =>
        await store.dispatch(fetchMovies());
      const selectErrorMessage = () => selectError(store.getState());
      return {
        selectData,
        selectDataStatus,
        retrieveMoviesData,
        selectErrorMessage,
      };
    },
  };
};
