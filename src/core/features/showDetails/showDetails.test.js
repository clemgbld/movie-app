import { createStore } from "../../store";
import { hideDetails, showDetails } from "./actions/showDetailsActions";

describe("show the details(synopsis, background ect...) of the selected movie", () => {
  it("should be close initially", () => {
    const store = createStore();

    expect(store.getState().movieDetails).toEqual({ isOpen: false });
  });

  it("should show the details of the selected movie", () => {
    const store = createStore();

    store.dispatch(showDetails());

    expect(store.getState().movieDetails).toEqual({ isOpen: true });
  });

  it("should close the details of the selected movie when it is open", () => {
    const store = createStore();

    store.dispatch(showDetails());
    store.dispatch(hideDetails());

    expect(store.getState().movieDetails).toEqual({ isOpen: false });
  });
});
