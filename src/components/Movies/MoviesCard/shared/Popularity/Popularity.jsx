import React from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import classes from "./Popularity.module.scss";
import { theme } from "./theme";

const Popularity = ({ popularity }) => {
  return (
    <div data-testid="popularity" className={classes.wrapper}>
      <Progress
        width={50}
        type="circle"
        strokeWidth={6}
        percent={popularity}
        symbolClassName={classes.progress}
        theme={theme}
        style={{
          background: "#000",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default Popularity;
