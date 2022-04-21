import React from "react";
import classes from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={classes["lds-circle"]} data-testid="spinner">
      <div></div>
    </div>
  );
};

export default Spinner;
