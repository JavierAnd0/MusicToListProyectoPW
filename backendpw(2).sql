-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-11-2023 a las 13:45:39
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones`
--

CREATE TABLE `canciones` (
  `id` bigint(11) NOT NULL,
  `titulo` mediumtext NOT NULL,
  `album` mediumtext NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `fecha_agregada` date NOT NULL,
  `link` mediumtext NOT NULL,
  `usuario_id` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `canciones`
--

INSERT INTO `canciones` (`id`, `titulo`, `album`, `descripcion`, `fecha_agregada`, `link`, `usuario_id`) VALUES
(18, 'pegando abajo', 'charly', 'q cancion tan bna', '2023-11-01', 'estoitriste.com', 20),
(21, 'pegando abajo', 'garcia', 'q cancion tan bna', '2023-11-21', 'estoitriste.com', 20),
(22, 'mq', 'kevin', 'q cancion tan bna', '2023-11-21', 'estoitriste.com', 20),
(23, 'amarillo', 'a', 'a', '2023-11-21', 'e', 30),
(26, 'Crimen', 'ahi vamos', 'durisimo hermano', '0000-00-00', 'aajflajfla.com', 20),
(27, 'Crimen', 'Ahi vamos', 'que buena', '2023-11-15', 'aa;aflas.com', 30),
(28, 'Bolero falaz', 'Originales', 'De mis favoritas', '2023-11-21', 'https://open.spotify.com/track/5yMXpZhVnUAFT154F3MQ8G?si=075a493e14ed449d', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `telefono`, `email`, `password`, `rol`) VALUES
(20, 'ola', 'ola', NULL, 'ola', '$argon2id$v=19$m=1024,t=1,p=1$wKYiRMe/tMhielmsmCLl8g$J38ldtfGp08aL8ZG1k4szwN7KEzx/sR3XdZ7QgwK9DI', NULL),
(21, 'x', 'x', NULL, 'juan', '$argon2id$v=19$m=1024,t=1,p=1$UKpNeZSeZaL+wmw9ISd6Jg$Ha4HxIb7ctKu41GXqbkiuxb5U+xzOQ2nh0O8oYy0Ors', NULL),
(30, 'alvaro', 'andrade', NULL, 'ajao@gmail.com', '$argon2id$v=19$m=1024,t=1,p=1$FX8efc7+AuvSZCkl9gjm+Q$kpDqMHOb+3DD98baOBQc8aEizpUbk2WsNF/iuP2puMc', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `canciones_ibfk_1` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `canciones`
--
ALTER TABLE `canciones`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD CONSTRAINT `canciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
