-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: sheconnects
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admins`
--

DROP TABLE IF EXISTS `Admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admins` (
  `adminID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`adminID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admins`
--

LOCK TABLES `Admins` WRITE;
/*!40000 ALTER TABLE `Admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `Admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notifications`
--

DROP TABLE IF EXISTS `Notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notifications` (
  `notificationID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `message` text NOT NULL,
  `uploadDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notificationID`),
  KEY `userID` (`userID`),
  CONSTRAINT `Notifications_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifications`
--

LOCK TABLES `Notifications` WRITE;
/*!40000 ALTER TABLE `Notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProgressReports`
--

DROP TABLE IF EXISTS `ProgressReports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProgressReports` (
  `reportID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `opportunityID` int DEFAULT NULL,
  `status` enum('Applied','In Progress','Accepted','Rejected') DEFAULT 'Applied',
  `reportDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reportID`),
  KEY `userID` (`userID`),
  KEY `opportunityID` (`opportunityID`),
  CONSTRAINT `ProgressReports_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `ProgressReports_ibfk_2` FOREIGN KEY (`opportunityID`) REFERENCES `scholarships` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProgressReports`
--

LOCK TABLES `ProgressReports` WRITE;
/*!40000 ALTER TABLE `ProgressReports` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProgressReports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internships`
--

DROP TABLE IF EXISTS `internships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `brief_description` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `deadline` datetime DEFAULT NULL,
  `apply_link` varchar(500) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internships`
--

LOCK TABLES `internships` WRITE;
/*!40000 ALTER TABLE `internships` DISABLE KEYS */;
INSERT INTO `internships` VALUES (1,'Software Developer Intern','Join our tech team for a summer internship','Backend Developer','0202-03-30 23:59:59','https://egjd.fa.us6.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/job/605/?utm_medium=jobshare&utm_source=External+Job+Share','2025-02-12 15:25:02','2025-02-12 15:25:02');
/*!40000 ALTER TABLE `internships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scholarships`
--

DROP TABLE IF EXISTS `scholarships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scholarships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `eligibility` text,
  `application_deadline` datetime DEFAULT NULL,
  `apply_link` varchar(500) NOT NULL,
  `amount` varchar(100) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `source_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` enum('Undergraduate','Masters','PhD') NOT NULL DEFAULT 'Undergraduate',
  `funding_type` enum('Full','Partial','Variable') DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `last_scraped_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_scholarship_source` (`name`,`source`(100))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scholarships`
--

LOCK TABLES `scholarships` WRITE;
/*!40000 ALTER TABLE `scholarships` DISABLE KEYS */;
INSERT INTO `scholarships` VALUES (1,'Women in Tech Scholarships','/uploads/scholarships/1739368200632.png','Scholarship for women pursuing tech careers','Female students in tech careers','2025-02-20 00:00:00','https://www.scholarshiptab.com/',NULL,NULL,NULL,'2025-02-12 13:50:00','2025-02-21 00:17:03','Masters',NULL,NULL,1,NULL),(2,'Mastercard Foundation Scholars Program','/uploads/scholarships/1740090062262.jpg','The Mastercard Foundation Scholars Program provides full scholarships to young African women pursuing undergraduate degrees in STEM fields. The scholarship covers tuition, accommodation, travel, and living expenses.','Must be a female Kenyan citizen under 25 years old, completed high school with a minimum grade B, demonstrated leadership potential and commitment to giving back to the community.','2025-03-15 23:59:59','https://www.mastercardfdn.org/scholarship',NULL,NULL,NULL,'2025-02-20 22:21:02','2025-02-20 22:21:02','Undergraduate',NULL,NULL,1,NULL),(3,'Kenya Women in Tech Scholarship','/uploads/scholarships/1740090223695.png',' A comprehensive scholarship program designed to support young Kenyan women pursuing degrees in Computer Science, Software Engineering, or related IT fields. Includes mentorship and internship opportunities.','Female graduates with a bachelors degree in sciences, research proposal in STEM fields, under 35 years old.','2025-04-30 23:59:59','https://www.kenyawomenintech.org/scholarships',NULL,NULL,NULL,'2025-02-20 22:23:43','2025-02-20 22:23:43','Undergraduate',NULL,NULL,1,NULL),(4,'Kenya Women in STEM Scholarship',NULL,'Full scholarship for Kenyan women pursuing STEM degrees','Female Kenyan students in STEM fields, minimum B grade','2025-08-15 03:00:00','https://example.com/kenya-stem',NULL,NULL,NULL,'2025-03-07 10:28:38','2025-03-07 10:28:38','Undergraduate',NULL,NULL,1,NULL),(5,'African Leadership Masters Fellowship',NULL,'Full funding for Masters studies in Business or Technology','Kenyan residents with Bachelor\'s degree, 2 years work experience','2025-09-30 03:00:00','https://example.com/masters-fellowship',NULL,NULL,NULL,'2025-03-07 10:28:38','2025-03-07 10:28:38','Masters',NULL,NULL,1,NULL),(6,'Kenya Women in STEM Scholarship','/uploads/scholarships/stem-scholarship.jpg','Full scholarship for Kenyan women pursuing STEM degrees','Female Kenyan students in STEM fields, minimum B grade','2025-08-15 03:00:00','https://example.com/kenya-stem',NULL,NULL,NULL,'2025-03-07 10:45:54','2025-03-07 10:45:54','Undergraduate',NULL,NULL,1,NULL),(7,'African Leadership Masters Fellowship','/uploads/scholarships/masters-fellowship.jpg','Full funding for Masters studies in Business or Technology','Kenyan residents with Bachelor\'s degree, 2 years work experience','2025-09-30 03:00:00','https://example.com/masters-fellowship',NULL,NULL,NULL,'2025-03-07 10:45:54','2025-03-07 10:45:54','Masters',NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `scholarships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` enum('female','male','other') DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `careerInterests` text,
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Esther Wanjiru','essie@gmail.com',NULL,NULL,'$2a$10$7M6aZHsSNcHBBvXdVRJPl.8UPNgUvjX0WtwKRWYMcBxxggq.y9bum',NULL,NULL,'2025-02-12 10:51:49','2025-02-12 10:51:49',0),(2,'Admin User','admin@sheconnects.com',NULL,NULL,'$2a$10$1WdW1rCuuuSsETmAF2VfwO8EvM761u6Sz3FOKqlHv2Ll68ilDlTcu',NULL,NULL,'2025-02-12 11:21:50','2025-02-12 11:21:50',1),(3,'Alvin Mbuthia','alvin@gmail.com',NULL,NULL,'$2a$10$nA0WrIaYarVimrZeb6Pi/.jM4XlbdLg/4l8eZbj36Xur9cNL2ik/m',NULL,NULL,'2025-02-14 07:29:37','2025-02-14 07:29:37',0),(4,'Walter Angoye','walter@gmail.com',NULL,NULL,'$2a$10$kuHvs5.9UiVI.X3ZhMtBfOIUgaidkIMKT.RBOQO9ec2DZrMYMeydS',NULL,NULL,'2025-02-18 10:25:02','2025-02-18 10:25:02',0),(5,'Stella Wanjiku','stella@gmail.com',NULL,NULL,'$2a$10$gg80UjnkfQOO1dXxeO4qlOJge.wxrUztGyMw/jG8ODJdxpJAgWdJq',NULL,NULL,'2025-02-25 07:36:49','2025-02-25 07:36:49',0),(6,'Stella Wanjiku','wanjiru@gmail.com',NULL,NULL,'$2a$10$ABd58ELjEdANhGwS7HiF/.WIcMVrAUCy2qI0nKZRCdUNfjMJXt3r6',NULL,NULL,'2025-02-25 08:11:13','2025-02-25 08:11:13',0),(7,'Jivin Mwangi','jivin@gmail.com','male','0796502241','$2a$10$.75DWbtdrMtEMXy2e.hV9OKAHnw5xVzDRR4XamA7qFFtveoSN6FYK','I am interested in Computer Sciences.','/uploads/profiles/1740751628895-She_connects (1).png','2025-02-28 07:05:10','2025-02-28 14:07:08',0),(8,'Diana Otieno','diana@gmail.com',NULL,NULL,'$2a$10$rGfRp8h8IEMW0ulnNpblIe8qWcdxDU5Rsaw3UdYAIIoTKTw2xE1HK',NULL,NULL,'2025-02-28 09:24:56','2025-02-28 09:24:56',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-09 15:23:52
