CREATE DATABASE IF NOT EXISTS movies;
USE movies;

CREATE TABLE rating
    (
        rating_id TINYINT AUTO_INCREMENT,
        rating VARCHAR(5) NOT NULL,
        CONSTRAINT pk_rating PRIMARY KEY (rating_id)
    );

CREATE TABLE genre
    (
        genre_id TINYINT AUTO_INCREMENT,
        genre VARCHAR(20) NOT NULL,
        CONSTRAINT pk_genre PRIMARY KEY (genre_id)
    );

CREATE TABLE director
    (
        director_id MEDIUMINT AUTO_INCREMENT,
        fName VARCHAR(30) NOT NULL,
        lName VARCHAR(30) NOT NULL,
        CONSTRAINT pk_director PRIMARY KEY (director_id)
    );

CREATE TABLE producer
    (
        producer_id MEDIUMINT AUTO_INCREMENT,
        fName VARCHAR(30) NOT NULL,
        lName VARCHAR(30) NOT NULL,
        CONSTRAINT pk_producer PRIMARY KEY (producer_id)
    );

CREATE TABLE performer
    (
        performer_id MEDIUMINT AUTO_INCREMENT,
        fName VARCHAR(30) NOT NULL,
        lName VARCHAR(30) NOT NULL,
        alias VARCHAR(30),
        CONSTRAINT pk_performer PRIMARY KEY (performer_id)
    );

CREATE TABLE movies
    (
        id MEDIUMINT AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL,
        rating TINYINT NOT NULL,
        year YEAR NOT NULL,
        user_rating TINYINT NOT NULL,
        run_time TIME NOT NULL,
        CONSTRAINT pk_movie_id PRIMARY KEY (id),
        CONSTRAINT fk_rating_id FOREIGN KEY (rating) REFERENCES rating (rating_id)
    );

CREATE TABLE movie_to_genre
    (
        movie_id MEDIUMINT NOT NULL,
        genre_id TINYINT NOT NULL,
        CONSTRAINT fk_movie_id_genre FOREIGN KEY (movie_id) REFERENCES movies (id),
        CONSTRAINT fk_genre_id FOREIGN KEY (genre_id) REFERENCES genre (genre_id)
    );

CREATE TABLE movie_to_director
    (
        movie_id MEDIUMINT NOT NULL,
        director_id MEDIUMINT NOT NULL,
        CONSTRAINT fk_movie_id_director FOREIGN KEY (movie_id) REFERENCES movies (id),
        CONSTRAINT fk_director_id FOREIGN KEY (director_id) REFERENCES director (director_id)
    );

CREATE TABLE movie_to_producer
    (
        movie_id MEDIUMINT NOT NULL,
        producer_id MEDIUMINT NOT NULL,
        CONSTRAINT fk_movie_id_producer FOREIGN KEY (movie_id) REFERENCES movies (id),
        CONSTRAINT fk_producer_id FOREIGN KEY (producer_id) REFERENCES producer (producer_id)
    );

CREATE TABLE movie_to_performer
    (
        movie_id MEDIUMINT NOT NULL,
        performer_id MEDIUMINT NOT NULL,
        CONSTRAINT fk_movie_id_performer FOREIGN KEY (movie_id) REFERENCES movies (id),
        CONSTRAINT fk_performer_id FOREIGN KEY (performer_id) REFERENCES performer (performer_id)
    );

-- SELECT m.title, g.genre
--     -> FROM movies As m
--     -> INNER JOIN genre AS g
--     -> INNER JOIN movie_to_genre AS mtg
--     -> ON g.genre_id = mtg.genre_id AND m.id = mtg.movie_id;

