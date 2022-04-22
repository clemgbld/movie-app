import Layout from "./components/Layout/Layout";
import MoviesContainer from "./components/Movies/MoviesContainer/MoviesContainer";
import { memo } from "react";

function App() {
  return (
    <Layout className="App">
      <MoviesContainer />
    </Layout>
  );
}

export default memo(App);
