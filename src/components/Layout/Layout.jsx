import React from "react";
import classes from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.header__title}>
          <span className={classes["header__title--3d"]}>M</span>ovieFlix
          <span className={classes["header__title--point"]}>.</span>
        </h1>
      </header>
      <main className={classes.container}>{children}</main>
    </>
  );
};

export default Layout;
