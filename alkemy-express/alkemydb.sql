-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-03-2021 a las 23:56:56
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alkemydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(10) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Food'),
(2, 'Taxes'),
(3, 'Transportation'),
(4, 'Salary'),
(5, 'Sales'),
(6, 'Studies'),
(7, 'Gifts'),
(8, 'Health and Medicines');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operations`
--

CREATE TABLE `operations` (
  `id` int(10) NOT NULL,
  `categoryId` int(10) NOT NULL,
  `concept` varchar(100) NOT NULL,
  `date` date DEFAULT NULL,
  `amount` int(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `userId` int(10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `operations`
--

INSERT INTO `operations` (`id`, `categoryId`, `concept`, `date`, `amount`, `type`, `userId`, `createdAt`, `updatedAt`) VALUES
(122, 1, 'Mermelada', '2021-03-15', 75, 'Egress', 1, '2021-03-01 13:16:11', '2021-03-01 13:16:11'),
(125, 7, 'Lechuga', '2021-03-15', 700, 'Income', 1, '2021-03-01 13:17:44', '2021-03-01 13:17:44'),
(126, 1, 'Yerba', '2021-03-08', 777, 'Income', 1, '2021-03-01 13:23:14', '2021-03-01 13:23:14'),
(130, 1, 'Mamadera', '2021-03-08', 700, 'Income', 1, '2021-03-01 13:37:32', '2021-03-01 13:37:32'),
(134, 1, 'Queso', '2021-03-02', 3475, 'Income', 1, '2021-03-01 13:53:00', '2021-03-01 21:49:52'),
(161, 7, 'Un Termo Stanley Vieja', '2021-04-18', 1989, 'Income', 1, '2021-03-01 14:12:45', '2021-03-01 21:54:26'),
(167, 1, 'Plato', '2021-03-08', 7553, 'Income', 1, '2021-03-02 19:22:27', '2021-03-02 19:22:27'),
(168, 1, 'Termolar', '2021-02-23', 7000, 'Egress', 1, '2021-03-02 19:23:35', '2021-03-02 19:23:35'),
(173, 7, 'Celular', '2021-02-03', 7500, 'Income', 0, '2021-03-02 22:30:03', '2021-03-02 22:30:03'),
(174, 1, 'Botella', '2021-03-01', 7500, 'Income', 0, '2021-03-02 22:39:39', '2021-03-02 22:39:39'),
(175, 1, 'aaaa', '2021-03-01', 777, 'Egress', 0, '2021-03-02 22:42:48', '2021-03-02 22:42:48'),
(176, 7, 'sdfdsfd', '2021-03-08', 324234, 'Egress', 0, '2021-03-02 22:43:45', '2021-03-02 22:43:45'),
(177, 7, 'sdfdsfd', '2021-03-08', 324234, 'Egress', 0, '2021-03-02 22:45:45', '2021-03-02 22:45:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fullName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `createdAt`, `updatedAt`, `fullName`) VALUES
(1, 'contraseña123', 'daviddonati730@gmail.com', '2021-02-24 21:03:39', '2021-02-24 21:03:39', ''),
(3, '', 'nadia@nadia.com', '2021-03-02 21:54:08', '2021-03-02 21:54:08', ''),
(4, '', 'nadia@nadia.com.ar', '2021-03-02 21:58:53', '2021-03-02 21:58:53', ''),
(5, '', 'nadia@gmail.com', '2021-03-02 21:59:13', '2021-03-02 21:59:13', ''),
(6, '', 'nadia@hotmail.com', '2021-03-02 22:01:55', '2021-03-02 22:01:55', ''),
(7, '1234', 'nadia@prueba.com', '2021-03-02 22:08:04', '2021-03-02 22:08:04', ''),
(8, '1234', 'dasda@njksad.com', '2021-03-02 22:10:03', '2021-03-02 22:10:03', ''),
(9, '1234', 'dasda@njksad.com.ar', '2021-03-02 22:12:00', '2021-03-02 22:12:00', ''),
(10, '1234', 'dasda@njksad.com.ara', '2021-03-02 22:13:09', '2021-03-02 22:13:09', ''),
(11, '1234', 'dasda@njksad.com.araaa', '2021-03-02 22:14:35', '2021-03-02 22:14:35', ''),
(12, '12311', 'dasda@njksad.com.araaaaa', '2021-03-02 22:15:20', '2021-03-02 22:15:20', ''),
(13, '123', 'dasda@njksad.comaa', '2021-03-02 22:17:07', '2021-03-02 22:17:07', ''),
(14, '123', 'pepe@pepe.com', '2021-03-02 22:19:01', '2021-03-02 22:19:01', ''),
(15, 'numero', 'juan@gmail.com', '2021-03-02 22:21:40', '2021-03-02 22:21:40', 'Juan'),
(16, 'nadia', 'nadiav@gmail.com', '2021-03-02 22:55:25', '2021-03-02 22:55:25', 'nadav');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `operations`
--
ALTER TABLE `operations`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
