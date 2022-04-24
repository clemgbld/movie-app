import React from "react";
import classes from "./MovieCard.module.scss";
import Popularity from "./shared/Popularity/Popularity";

const MovieCard = ({ data }) => {
  const { img, title, date, popularity } = data;
  return (
    <figure className={classes.card} role="contentinfo">
      <div className={classes.card__content}>
        <img
          loading="lazy"
          className={classes.card__img}
          src={img}
          alt={title}
        />
        <Popularity popularity={popularity} />
      </div>
      <figcaption className={classes.card__caption}>
        <p className={classes.card__title}>{title}</p>
        <p className={classes.card__date}>{date}</p>
      </figcaption>
    </figure>
  );
};

export default MovieCard;
