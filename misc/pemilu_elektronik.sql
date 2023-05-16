-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2023 at 02:44 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pemilu_elektronik`
--

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `akun_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` mediumtext NOT NULL,
  `role` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `akun_calon`
--

CREATE TABLE `akun_calon` (
  `akun_id` int(11) NOT NULL,
  `calon_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `akun_pemilih`
--

CREATE TABLE `akun_pemilih` (
  `akun_id` int(11) NOT NULL,
  `pemilih_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `calon`
--

CREATE TABLE `calon` (
  `calon_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `path_foto` varchar(1000) DEFAULT NULL,
  `no_urut` varchar(1) NOT NULL,
  `pemilihan_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `desa`
--

CREATE TABLE `desa` (
  `desa_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kota_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jenis_pemilihan`
--

CREATE TABLE `jenis_pemilihan` (
  `jenis_pemilihan_id` int(11) NOT NULL,
  `jenis` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kota`
--

CREATE TABLE `kota` (
  `kota_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `provinsi_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `memilih`
--

CREATE TABLE `memilih` (
  `pemilih_id` int(11) NOT NULL,
  `calon_id` int(11) NOT NULL,
  `suara_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pemilih`
--

CREATE TABLE `pemilih` (
  `pemilih_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `umur` int(11) NOT NULL,
  `jenis_kelamin` varchar(6) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `pendidikan` varchar(3) NOT NULL,
  `desa_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pemilihan`
--

CREATE TABLE `pemilihan` (
  `pemilihan_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tgl_mulai` datetime NOT NULL,
  `tgl_selesai` datetime NOT NULL,
  `jenis_pemilihan_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provinsi`
--

CREATE TABLE `provinsi` (
  `provinsi_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suara`
--

CREATE TABLE `suara` (
  `suara_id` int(11) NOT NULL,
  `umur` int(11) NOT NULL,
  `pendidikan` varchar(255) NOT NULL,
  `provinsi_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`akun_id`);

--
-- Indexes for table `akun_calon`
--
ALTER TABLE `akun_calon`
  ADD KEY `FK_akun_calon_akun_akun_id` (`akun_id`),
  ADD KEY `FK_akun_calon_calon_calon_id` (`calon_id`);

--
-- Indexes for table `akun_pemilih`
--
ALTER TABLE `akun_pemilih`
  ADD KEY `FK_akun_pemilih_akun_akun_id` (`akun_id`),
  ADD KEY `FK_akun_pemilih_pemilih_pemilih_id` (`pemilih_id`);

--
-- Indexes for table `calon`
--
ALTER TABLE `calon`
  ADD PRIMARY KEY (`calon_id`),
  ADD KEY `FK_calon_pemilihan_pemilihan_id` (`pemilihan_id`);

--
-- Indexes for table `desa`
--
ALTER TABLE `desa`
  ADD PRIMARY KEY (`desa_id`),
  ADD KEY `FK_desa_kota_kota_id` (`kota_id`);

--
-- Indexes for table `jenis_pemilihan`
--
ALTER TABLE `jenis_pemilihan`
  ADD PRIMARY KEY (`jenis_pemilihan_id`);

--
-- Indexes for table `kota`
--
ALTER TABLE `kota`
  ADD PRIMARY KEY (`kota_id`),
  ADD KEY `FK_kota_provinsi_provinsi_id` (`provinsi_id`);

--
-- Indexes for table `memilih`
--
ALTER TABLE `memilih`
  ADD KEY `FK_memilih_pemilih_pemilih_id` (`pemilih_id`),
  ADD KEY `FK_memilih_calon_calon_id` (`calon_id`),
  ADD KEY `FK_memilih_suara_suara_id` (`suara_id`);

--
-- Indexes for table `pemilih`
--
ALTER TABLE `pemilih`
  ADD PRIMARY KEY (`pemilih_id`),
  ADD KEY `FK_pemilih_desa_desa_id` (`desa_id`);

--
-- Indexes for table `pemilihan`
--
ALTER TABLE `pemilihan`
  ADD PRIMARY KEY (`pemilihan_id`),
  ADD KEY `FK_pemilihan_jenis_pemilihan_jenis_pemilihan_id` (`jenis_pemilihan_id`);

--
-- Indexes for table `provinsi`
--
ALTER TABLE `provinsi`
  ADD PRIMARY KEY (`provinsi_id`);

--
-- Indexes for table `suara`
--
ALTER TABLE `suara`
  ADD PRIMARY KEY (`suara_id`),
  ADD KEY `FK_suara_provinsi_provinsi_id` (`provinsi_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akun`
--
ALTER TABLE `akun`
  MODIFY `akun_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `calon`
--
ALTER TABLE `calon`
  MODIFY `calon_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `desa`
--
ALTER TABLE `desa`
  MODIFY `desa_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jenis_pemilihan`
--
ALTER TABLE `jenis_pemilihan`
  MODIFY `jenis_pemilihan_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kota`
--
ALTER TABLE `kota`
  MODIFY `kota_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pemilih`
--
ALTER TABLE `pemilih`
  MODIFY `pemilih_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pemilihan`
--
ALTER TABLE `pemilihan`
  MODIFY `pemilihan_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `provinsi`
--
ALTER TABLE `provinsi`
  MODIFY `provinsi_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suara`
--
ALTER TABLE `suara`
  MODIFY `suara_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `akun_calon`
--
ALTER TABLE `akun_calon`
  ADD CONSTRAINT `FK_akun_calon_akun_akun_id` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`akun_id`),
  ADD CONSTRAINT `FK_akun_calon_calon_calon_id` FOREIGN KEY (`calon_id`) REFERENCES `calon` (`calon_id`);

--
-- Constraints for table `akun_pemilih`
--
ALTER TABLE `akun_pemilih`
  ADD CONSTRAINT `FK_akun_pemilih_akun_akun_id` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`akun_id`),
  ADD CONSTRAINT `FK_akun_pemilih_pemilih_pemilih_id` FOREIGN KEY (`pemilih_id`) REFERENCES `pemilih` (`pemilih_id`);

--
-- Constraints for table `calon`
--
ALTER TABLE `calon`
  ADD CONSTRAINT `FK_calon_pemilihan_pemilihan_id` FOREIGN KEY (`pemilihan_id`) REFERENCES `pemilihan` (`pemilihan_id`);

--
-- Constraints for table `desa`
--
ALTER TABLE `desa`
  ADD CONSTRAINT `FK_desa_kota_kota_id` FOREIGN KEY (`kota_id`) REFERENCES `kota` (`kota_id`);

--
-- Constraints for table `kota`
--
ALTER TABLE `kota`
  ADD CONSTRAINT `FK_kota_provinsi_provinsi_id` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi` (`provinsi_id`);

--
-- Constraints for table `memilih`
--
ALTER TABLE `memilih`
  ADD CONSTRAINT `FK_memilih_calon_calon_id` FOREIGN KEY (`calon_id`) REFERENCES `calon` (`calon_id`),
  ADD CONSTRAINT `FK_memilih_pemilih_pemilih_id` FOREIGN KEY (`pemilih_id`) REFERENCES `pemilih` (`pemilih_id`),
  ADD CONSTRAINT `FK_memilih_suara_suara_id` FOREIGN KEY (`suara_id`) REFERENCES `suara` (`suara_id`);

--
-- Constraints for table `pemilih`
--
ALTER TABLE `pemilih`
  ADD CONSTRAINT `FK_pemilih_desa_desa_id` FOREIGN KEY (`desa_id`) REFERENCES `desa` (`desa_id`);

--
-- Constraints for table `pemilihan`
--
ALTER TABLE `pemilihan`
  ADD CONSTRAINT `FK_pemilihan_jenis_pemilihan_jenis_pemilihan_id` FOREIGN KEY (`jenis_pemilihan_id`) REFERENCES `jenis_pemilihan` (`jenis_pemilihan_id`);

--
-- Constraints for table `suara`
--
ALTER TABLE `suara`
  ADD CONSTRAINT `FK_suara_provinsi_provinsi_id` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi` (`provinsi_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
