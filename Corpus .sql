-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： db
-- 產生時間： 2023 年 07 月 31 日 02:47
-- 伺服器版本： 8.0.33
-- PHP 版本： 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `Corpus`
--

-- --------------------------------------------------------

--
-- 資料表結構 `Administrator`
--

CREATE TABLE `Administrator` (
  `id` int NOT NULL,
  `account` varchar(45) NOT NULL,
  `pwd` varchar(45) NOT NULL,
  `Log_time` datetime NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `institution` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `Administrator`
--

INSERT INTO `Administrator` (`id`, `account`, `pwd`, `Log_time`, `name`, `institution`) VALUES
(1, 'qq', '123', '2023-06-10 15:34:36', '測試', 'yzu');

-- --------------------------------------------------------

--
-- 資料表結構 `Authorized_File`
--

CREATE TABLE `Authorized_File` (
  `id` int NOT NULL,
  `FName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Fcontent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `download_name` varchar(30) NOT NULL,
  `time` int NOT NULL DEFAULT '0',
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `Authorized_File`
--

INSERT INTO `Authorized_File` (`id`, `FName`, `Fcontent`, `download_name`, `time`, `Log_time`) VALUES
(6, '測試資料1', '這是一筆測試資料', '未命名.jpg', 0, '2023-07-31 08:44:04');

-- --------------------------------------------------------

--
-- 資料表結構 `Authorized_File_Download`
--

CREATE TABLE `Authorized_File_Download` (
  `id` int NOT NULL,
  `Mid` int NOT NULL,
  `FName` varchar(30) NOT NULL,
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Child`
--

CREATE TABLE `Child` (
  `id` int NOT NULL,
  `theme` varchar(45) NOT NULL,
  `Speaker_id` varchar(45) NOT NULL,
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Child_File`
--

CREATE TABLE `Child_File` (
  `id` int NOT NULL,
  `Cid` int NOT NULL,
  `IPUID` int NOT NULL,
  `IPUStart` double NOT NULL,
  `IPUEnd` double NOT NULL,
  `IPU` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Member`
--

CREATE TABLE `Member` (
  `id` int NOT NULL,
  `account` varchar(45) NOT NULL,
  `pwd` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `institution` varchar(45) DEFAULT NULL,
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `Member`
--

INSERT INTO `Member` (`id`, `account`, `pwd`, `name`, `email`, `phone`, `institution`, `Log_time`) VALUES
(20, 'test1', 'test', '測試帳號', 'hank77880@gmail.com', '0966123456', '測試帳號', '2023-07-31 09:09:08');

-- --------------------------------------------------------

--
-- 資料表結構 `Member_Log`
--

CREATE TABLE `Member_Log` (
  `id` int NOT NULL,
  `Member_id` int NOT NULL,
  `start_time` date NOT NULL,
  `end_time` date NOT NULL,
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `Member_Log`
--

INSERT INTO `Member_Log` (`id`, `Member_id`, `start_time`, `end_time`, `Log_time`) VALUES
(2, 20, '2023-07-31', '2024-07-31', '2023-07-31 09:09:08');

-- --------------------------------------------------------

--
-- 資料表結構 `MH_File`
--

CREATE TABLE `MH_File` (
  `id` int NOT NULL,
  `MH_id` int NOT NULL,
  `Filename` varchar(45) NOT NULL,
  `FileSn` varchar(45) NOT NULL,
  `IPUID` int NOT NULL,
  `IPUStart` double NOT NULL,
  `IPUEnd` double NOT NULL,
  `IPU` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Word` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `POS` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Pinyin` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Modern_Chinese`
--

CREATE TABLE `Modern_Chinese` (
  `id` int NOT NULL,
  `theme` varchar(45) NOT NULL,
  `Talk_id` varchar(45) NOT NULL,
  `Speaker_id` varchar(45) NOT NULL,
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Socio`
--

CREATE TABLE `Socio` (
  `id` int NOT NULL,
  `Speaker_id` varchar(45) NOT NULL,
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Speaker_data`
--

CREATE TABLE `Speaker_data` (
  `id` int NOT NULL,
  `Talk_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Speaker_id` varchar(30) NOT NULL,
  `age` varchar(20) NOT NULL,
  `location` varchar(30) NOT NULL,
  `sex` varchar(5) NOT NULL,
  `Talk_id_original` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Speaker_id_original` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sound_track_original` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sound_track` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Classification` varchar(20) NOT NULL,
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `S_File`
--

CREATE TABLE `S_File` (
  `id` int NOT NULL,
  `Sid` int NOT NULL,
  `IPUID` int NOT NULL,
  `IPUStart` double NOT NULL,
  `IPUEnd` double NOT NULL,
  `IPU` varchar(1500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Filename` varchar(45) NOT NULL,
  `Log_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `User_Log`
--

CREATE TABLE `User_Log` (
  `log_id` int NOT NULL,
  `time` datetime NOT NULL,
  `User_id` int NOT NULL,
  `Is_Administrator` tinyint(1) NOT NULL,
  `operate` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `User_Log`
--

INSERT INTO `User_Log` (`log_id`, `time`, `User_id`, `Is_Administrator`, `operate`) VALUES
(164, '2023-06-26 06:49:44', 1, 1, '上傳語料檔'),
(165, '2023-06-26 06:53:19', 1, 1, '刪除語料檔'),
(166, '2023-06-26 06:53:58', 1, 1, '上傳語料檔'),
(167, '2023-06-26 07:16:34', 1, 1, '刪除語料檔'),
(168, '2023-06-26 08:00:23', 1, 1, '上傳語料檔'),
(169, '2023-06-26 08:01:10', 1, 1, '刪除語料檔'),
(170, '2023-06-26 08:14:52', 1, 1, '上傳語料檔'),
(171, '2023-06-26 09:15:38', 1, 1, '刪除語料檔'),
(172, '2023-06-26 09:21:48', 1, 1, '上傳語料檔'),
(173, '2023-06-26 09:21:57', 1, 1, '刪除語料檔'),
(174, '2023-06-26 09:22:28', 1, 1, '上傳語料檔'),
(175, '2023-06-26 15:34:54', 1, 1, '刪除語料檔'),
(176, '2023-06-26 15:35:21', 1, 1, '上傳語料檔'),
(177, '2023-06-26 15:44:08', 1, 1, '新增授權資源'),
(178, '2023-06-26 16:03:11', 1, 1, '刪除語料檔'),
(179, '2023-06-26 16:03:42', 1, 1, '上傳語料檔'),
(180, '2023-06-27 15:50:15', 1, 1, '新增會員'),
(181, '2023-07-08 17:12:00', 1, 1, '下載語料檔'),
(182, '2023-07-30 04:27:51', 18, 0, '編輯帳號'),
(183, '2023-07-30 04:30:24', 18, 0, '編輯帳號'),
(184, '2023-07-30 04:40:59', 18, 0, '編輯帳號'),
(185, '2023-07-30 04:48:42', 18, 0, '編輯帳號'),
(186, '2023-07-30 04:48:56', 18, 0, '編輯帳號'),
(187, '2023-07-30 04:49:06', 18, 0, '編輯帳號'),
(188, '2023-07-30 04:49:14', 18, 0, '編輯帳號'),
(189, '2023-07-30 04:50:16', 18, 0, '編輯帳號'),
(190, '2023-07-30 04:51:00', 18, 0, '編輯帳號'),
(191, '2023-07-30 04:51:52', 18, 0, '編輯帳號'),
(192, '2023-07-30 04:56:26', 18, 0, '編輯帳號'),
(193, '2023-07-30 04:56:36', 18, 0, '編輯帳號'),
(194, '2023-07-30 04:59:06', 18, 0, '編輯帳號'),
(195, '2023-07-30 05:29:00', 18, 0, '變更密碼'),
(196, '2023-07-30 05:29:06', 18, 0, '變更密碼'),
(197, '2023-07-30 05:30:14', 18, 0, '變更密碼'),
(198, '2023-07-30 05:30:42', 18, 0, '變更密碼'),
(199, '2023-07-30 05:31:09', 18, 0, '變更密碼'),
(200, '2023-07-31 08:43:46', 1, 1, '刪除授權資源'),
(201, '2023-07-31 08:44:04', 1, 1, '新增授權資源'),
(202, '2023-07-31 09:09:09', 1, 1, '新增會員'),
(203, '2023-07-31 10:46:32', 1, 1, '刪除語料檔');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `Administrator`
--
ALTER TABLE `Administrator`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `Authorized_File`
--
ALTER TABLE `Authorized_File`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `Authorized_File_Download`
--
ALTER TABLE `Authorized_File_Download`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Mid` (`Mid`);

--
-- 資料表索引 `Child`
--
ALTER TABLE `Child`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `Child_File`
--
ALTER TABLE `Child_File`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Cid` (`Cid`);

--
-- 資料表索引 `Member`
--
ALTER TABLE `Member`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `Member_Log`
--
ALTER TABLE `Member_Log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Member_id` (`Member_id`);

--
-- 資料表索引 `MH_File`
--
ALTER TABLE `MH_File`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `MH_id` (`MH_id`),
  ADD KEY `IPUStart` (`IPUStart`),
  ADD KEY `IPUEnd` (`IPUEnd`),
  ADD KEY `IPU` (`IPU`),
  ADD KEY `Word` (`Word`),
  ADD KEY `POS` (`POS`),
  ADD KEY `Pinyin` (`Pinyin`);

--
-- 資料表索引 `Modern_Chinese`
--
ALTER TABLE `Modern_Chinese`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- 資料表索引 `Socio`
--
ALTER TABLE `Socio`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `Speaker_data`
--
ALTER TABLE `Speaker_data`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `S_File`
--
ALTER TABLE `S_File`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_Sid` (`Sid`);

--
-- 資料表索引 `User_Log`
--
ALTER TABLE `User_Log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `Fk_User_id_ad` (`User_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Administrator`
--
ALTER TABLE `Administrator`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Authorized_File`
--
ALTER TABLE `Authorized_File`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Authorized_File_Download`
--
ALTER TABLE `Authorized_File_Download`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Child`
--
ALTER TABLE `Child`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3309;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Child_File`
--
ALTER TABLE `Child_File`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24676;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Member`
--
ALTER TABLE `Member`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Member_Log`
--
ALTER TABLE `Member_Log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `MH_File`
--
ALTER TABLE `MH_File`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=430791;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Modern_Chinese`
--
ALTER TABLE `Modern_Chinese`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Socio`
--
ALTER TABLE `Socio`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1403;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Speaker_data`
--
ALTER TABLE `Speaker_data`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5985;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `S_File`
--
ALTER TABLE `S_File`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=694121;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `User_Log`
--
ALTER TABLE `User_Log`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=204;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `Authorized_File_Download`
--
ALTER TABLE `Authorized_File_Download`
  ADD CONSTRAINT `FK_Mid` FOREIGN KEY (`Mid`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `Child_File`
--
ALTER TABLE `Child_File`
  ADD CONSTRAINT `FK_Cid` FOREIGN KEY (`Cid`) REFERENCES `Child` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `Member_Log`
--
ALTER TABLE `Member_Log`
  ADD CONSTRAINT `FK_Member_id` FOREIGN KEY (`Member_id`) REFERENCES `Member` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `MH_File`
--
ALTER TABLE `MH_File`
  ADD CONSTRAINT `FK_MH_id` FOREIGN KEY (`MH_id`) REFERENCES `Modern_Chinese` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `S_File`
--
ALTER TABLE `S_File`
  ADD CONSTRAINT `FK_Sid` FOREIGN KEY (`Sid`) REFERENCES `Socio` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
