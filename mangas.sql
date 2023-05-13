CREATE DATABASE `mangadb`;

USE `mangadb`;

CREATE TABLE Mangas (
    id INT PRIMARY KEY,
    nome VARCHAR(255),
    capitulos INT,
    paginas INT
);

CREATE TABLE Capitulos (
    id INT PRIMARY KEY,
    manga_id INT,
    titulo VARCHAR(255),
    numero INT,
    paginas INT,
    FOREIGN KEY (manga_id) REFERENCES Mangas(id)
);

CREATE TABLE Paginas (
    id INT PRIMARY KEY,
    capitulo_id INT,
    numero INT,
    paginas INT,
    FOREIGN KEY (capitulo_id) REFERENCES Capitulos(id)
);


CREATE TABLE Genero (
    id INT PRIMARY KEY,
    nome VARCHAR(255)
);

