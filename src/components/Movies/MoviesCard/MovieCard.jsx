import React, { useState, useCallback } from "react";
import classes from "./MovieCard.module.scss";
import Popularity from "./shared/Popularity/Popularity";
import MovieDetails from "./MovieDetails/MovieDetails";
import Modal from "../../UI/Modal/Modal";

const MovieCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { img, title, date, popularity, id } = data;

  const showModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <figure className={classes.card} role="contentinfo">
      {isOpen && (
        <Modal>
          <MovieDetails id={id} closeModal={closeModal} />
        </Modal>
      )}
      <div className={classes.card__content}>
        <img
          loading="lazy"
          className={classes.card__img}
          src={img}
          alt={title}
          onClick={showModal}
          data-cy="movie-img"
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
