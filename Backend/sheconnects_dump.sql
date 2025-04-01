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
CREATE DATABASE sheconnects;

USE sheconnects;
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
  CONSTRAINT `ProgressReports_ibfk_2` FOREIGN KEY (`opportunityID`) REFERENCES `scholarships` (`scholarshipID`) ON DELETE CASCADE
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
-- Table structure for table `application_notes`
--

DROP TABLE IF EXISTS `application_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application_notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application_id` int NOT NULL,
  `message` text NOT NULL,
  `created_by` int NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `application_notes_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `scholarship_applications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `application_notes_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_notes`
--

LOCK TABLES `application_notes` WRITE;
/*!40000 ALTER TABLE `application_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `application_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_replies`
--

DROP TABLE IF EXISTS `discussion_replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion_replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `discussion_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `discussion_id` (`discussion_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `discussion_replies_ibfk_1` FOREIGN KEY (`discussion_id`) REFERENCES `forum_discussions` (`id`),
  CONSTRAINT `discussion_replies_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_replies`
--

LOCK TABLES `discussion_replies` WRITE;
/*!40000 ALTER TABLE `discussion_replies` DISABLE KEYS */;
INSERT INTO `discussion_replies` VALUES (1,30,96,'me too','2025-04-01 00:42:25','2025-04-01 02:19:30',0),(2,32,92,'very true','2025-04-01 03:59:10','2025-04-01 03:59:10',1);
/*!40000 ALTER TABLE `discussion_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_attendance`
--

DROP TABLE IF EXISTS `event_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_attendance` (
  `attendanceID` int NOT NULL AUTO_INCREMENT,
  `eventID` int NOT NULL,
  `userID` int NOT NULL,
  `attendance_status` enum('INTERESTED','GOING','NOT_GOING','ATTENDED') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`attendanceID`),
  UNIQUE KEY `unique_attendance` (`eventID`,`userID`),
  KEY `userID` (`userID`),
  CONSTRAINT `event_attendance_ibfk_1` FOREIGN KEY (`eventID`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `event_attendance_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_attendance`
--

LOCK TABLES `event_attendance` WRITE;
/*!40000 ALTER TABLE `event_attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_feedback`
--

DROP TABLE IF EXISTS `event_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_feedback` (
  `feedbackID` int NOT NULL AUTO_INCREMENT,
  `eventID` int NOT NULL,
  `userID` int NOT NULL,
  `rating` int DEFAULT NULL,
  `feedback_text` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedbackID`),
  UNIQUE KEY `unique_feedback` (`eventID`,`userID`),
  KEY `userID` (`userID`),
  CONSTRAINT `event_feedback_ibfk_1` FOREIGN KEY (`eventID`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `event_feedback_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `event_feedback_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_feedback`
--

LOCK TABLES `event_feedback` WRITE;
/*!40000 ALTER TABLE `event_feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `event_date` date NOT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `event_type` varchar(50) DEFAULT NULL,
  `isVirtual` tinyint(1) DEFAULT '0',
  `isFree` tinyint(1) DEFAULT '1',
  `registration_link` varchar(255) DEFAULT NULL,
  `seats_available` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Women in Tech Summit 2025','Join leading women in technology for a day of inspiring talks, workshops, and networking opportunities. Get ready to learn.','2025-05-17','09:00:00','15:00:00','Radisson Blu Hotel, Nairobi','Conference',1,1,'https://womenintechsummit.co.ke','100','2025-03-12 17:20:03','2025-03-27 20:21:40',0),(2,'Coding Workshop: Python for Beginners','Learn the basics of Python programming in this hands-on workshop. No prior coding experience required.','2025-04-20','15:00:00','17:00:00','Online','Conference',1,1,'https://shecodescommunity.org/workshops','100','2025-03-12 17:20:03','2025-03-27 20:17:11',1),(3,'Tech Career Fair','Meet top tech companies hiring in Kenya. Bring your resume and portfolio.','2025-05-31','10:00:00','16:00:00','KICC, Nairobi','Career Fair',0,1,'https://techcareerfair.co.ke','100','2025-03-12 17:20:03','2025-03-27 20:01:11',1);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_discussions`
--

DROP TABLE IF EXISTS `forum_discussions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_discussions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `forum_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `forum_id` (`forum_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `forum_discussions_ibfk_1` FOREIGN KEY (`forum_id`) REFERENCES `forums` (`id`),
  CONSTRAINT `forum_discussions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_discussions`
--

LOCK TABLES `forum_discussions` WRITE;
/*!40000 ALTER TABLE `forum_discussions` DISABLE KEYS */;
INSERT INTO `forum_discussions` VALUES (1,1,96,'I am currently learning web 3 development','2025-04-01 00:21:51','2025-04-01 02:20:17',0),(2,1,96,'I am currently learning web 3 development','2025-04-01 00:21:53','2025-04-01 02:21:34',0),(3,1,96,'I am currently learning web 3 development','2025-04-01 00:21:54','2025-04-01 02:20:17',0),(4,1,96,'I am currently learning web 3 development','2025-04-01 00:21:54','2025-04-01 02:20:20',0),(5,1,96,'I am currently learning web 3 development','2025-04-01 00:21:54','2025-04-01 02:20:23',0),(6,1,96,'I am currently learning web 3 development','2025-04-01 00:21:54','2025-04-01 02:20:27',0),(7,1,96,'I am currently learning web 3 development','2025-04-01 00:21:54','2025-04-01 00:21:54',1),(8,1,96,'I am currently learning web 3 development','2025-04-01 00:22:05','2025-04-01 02:21:09',0),(9,1,96,'I am currently learning web 3 development','2025-04-01 00:22:05','2025-04-01 02:21:12',0),(10,1,96,'I am currently learning web 3 development','2025-04-01 00:22:05','2025-04-01 02:21:25',0),(11,1,96,'I am currently learning web 3 development','2025-04-01 00:22:05','2025-04-01 02:21:29',0),(12,1,96,'I am currently learning web 3 development','2025-04-01 00:22:08','2025-04-01 02:20:54',0),(13,1,96,'I am currently learning web 3 development','2025-04-01 00:22:08','2025-04-01 02:20:56',0),(14,1,96,'I am currently learning web 3 development','2025-04-01 00:22:08','2025-04-01 02:20:59',0),(15,1,96,'I am currently learning web 3 development','2025-04-01 00:22:08','2025-04-01 02:21:01',0),(16,1,96,'I am currently learning web 3 development','2025-04-01 00:22:08','2025-04-01 02:21:04',0),(17,1,96,'I am currently learning web 3 development','2025-04-01 00:22:08','2025-04-01 02:21:07',0),(18,1,96,'I am currently learning web 3 development','2025-04-01 00:22:10','2025-04-01 02:20:51',0),(19,1,96,'I am currently learning web 3 development','2025-04-01 00:22:10','2025-04-01 02:20:06',0),(20,1,96,'I am currently learning web 3 development','2025-04-01 00:22:11','2025-04-01 02:20:09',0),(21,1,96,'I am currently learning web 3 development','2025-04-01 00:22:12','2025-04-01 02:20:02',0),(22,1,96,'I am currently learning web 3 development','2025-04-01 00:22:12','2025-04-01 02:20:47',0),(23,1,96,'I am currently learning web 3 development','2025-04-01 00:22:12','2025-04-01 02:19:59',0),(24,1,96,'I am currently learning web 3 development','2025-04-01 00:22:12','2025-04-01 02:20:48',0),(25,1,96,'I am currently learning web 3 development','2025-04-01 00:22:14','2025-04-01 02:19:54',0),(26,1,96,'I am currently learning web 3 development','2025-04-01 00:22:14','2025-04-01 02:20:44',0),(27,1,96,'I am currently learning web 3 development','2025-04-01 00:22:18','2025-04-01 02:19:50',0),(28,1,96,'I am currently learning web 3 development','2025-04-01 00:22:18','2025-04-01 02:19:41',0),(29,1,96,'I am currently learning web 3 development','2025-04-01 00:22:18','2025-04-01 02:20:41',0),(30,1,96,'I am also interested','2025-04-01 00:25:08','2025-04-01 02:19:34',0),(31,1,96,'Hello\n','2025-04-01 01:30:10','2025-04-01 02:19:24',0),(32,2,96,'This is a very interesting topic\n','2025-04-01 02:03:19','2025-04-01 02:03:19',1),(33,2,92,'hello\n','2025-04-01 03:28:38','2025-04-01 03:54:18',0);
/*!40000 ALTER TABLE `forum_discussions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forums`
--

DROP TABLE IF EXISTS `forums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `category` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `forums_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forums`
--

LOCK TABLES `forums` WRITE;
/*!40000 ALTER TABLE `forums` DISABLE KEYS */;
INSERT INTO `forums` VALUES (1,92,'Web 3 Development','Anyone with an advice on web 3','Tech Talk','2025-03-31 23:48:17',1),(2,96,'Financial Literacy','Lets talk about budgetting','General Discussion','2025-04-01 02:02:45',1);
/*!40000 ALTER TABLE `forums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internship_applications`
--

DROP TABLE IF EXISTS `internship_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internship_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `internship_id` int NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `internship_id` (`internship_id`),
  CONSTRAINT `internship_applications_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `internship_applications_ibfk_2` FOREIGN KEY (`internship_id`) REFERENCES `internships` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internship_applications`
--

LOCK TABLES `internship_applications` WRITE;
/*!40000 ALTER TABLE `internship_applications` DISABLE KEYS */;
INSERT INTO `internship_applications` VALUES (1,92,1,'SUBMITTED','2025-03-30 10:57:21','2025-03-30 11:37:17'),(2,92,2,'NO_OFFER','2025-03-30 10:57:49','2025-03-30 11:37:11'),(3,92,3,'DELETE','2025-03-30 15:35:56','2025-03-30 15:35:58');
/*!40000 ALTER TABLE `internship_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internships`
--

DROP TABLE IF EXISTS `internships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `description` text,
  `location` varchar(100) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `isPaid` tinyint(1) DEFAULT '0',
  `apply_link` varchar(255) DEFAULT NULL,
  `category` enum('technology','business','engineering','healthcare') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internships`
--

LOCK TABLES `internships` WRITE;
/*!40000 ALTER TABLE `internships` DISABLE KEYS */;
INSERT INTO `internships` VALUES (1,'Software Development Intern','Microsoft Africa','Join our dynamic team to work on cutting-edge cloud solutions. You will gain hands-on experience with Azure and contribute to real projects.','Nairobi, Kenya','2025-06-27','Full-time','6 months',1,'https://careers.microsoft.com/internships','technology','2025-03-12 17:19:31','2025-03-31 17:22:37',1),(2,'Data Science Intern','Safaricom','Help analyze customer data and build predictive models. Strong Python and statistical analysis skills required.','Nairobi, Kenya','2025-05-14','Full-time','3 months',1,'https://careers.safaricom.co.ke/interns','technology','2025-03-12 17:19:31','2025-03-31 17:22:46',1),(3,'UX Design Intern','Andela','Design user interfaces for web and mobile applications. Experience with Figma and user research preferred.','Remote','2025-06-29','Part-time','4 months',1,'https://andela.com/careers','technology','2025-03-12 17:19:31','2025-03-31 17:22:52',1),(4,'Test Internship','Test Company','Test Description','Remote','2025-12-31','Full-time',NULL,0,NULL,NULL,'2025-03-15 12:03:53','2025-03-27 22:31:37',0),(5,'Test Internship','Test Company','Test Description','Remote','2025-12-31','Full-time',NULL,0,'https://example.com/apply',NULL,'2025-03-15 12:09:00','2025-03-27 22:31:35',0),(6,'Test Internship','Test Company','Test Description','Remote','2025-12-31','Full-time',NULL,0,'https://example.com/apply',NULL,'2025-03-15 12:10:17','2025-03-27 22:31:32',0),(7,'Test Internship','Test Company','Test Description','Remote','2025-12-31','Full-time',NULL,0,'https://example.com/apply',NULL,'2025-03-17 19:16:48','2025-03-27 22:31:28',0),(8,'Test Internship','Test Company','Test Description','Remote','2025-12-31','Full-time',NULL,0,'https://example.com/apply',NULL,'2025-03-17 19:17:51','2025-03-27 22:31:21',0),(9,'Test Internship','Test Company','Test Description','Remote','2025-12-31','Full-time',NULL,0,'https://example.com/apply',NULL,'2025-03-17 19:29:19','2025-03-27 22:31:17',0),(10,'Test Internship','Test Company','Test Description','Remote','2025-12-31','Full-time',NULL,0,'https://example.com/apply',NULL,'2025-03-17 20:04:18','2025-03-27 22:31:13',0),(11,'Test Internship','Test Company','Test Description','Remote','2025-12-31','Full-time',NULL,0,'https://example.com/apply',NULL,'2025-03-17 20:22:03','2025-03-27 22:30:59',0);
/*!40000 ALTER TABLE `internships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note_attachments`
--

DROP TABLE IF EXISTS `note_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note_attachments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `note_id` int NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(100) NOT NULL,
  `file_size` int NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `note_id` (`note_id`),
  CONSTRAINT `note_attachments_ibfk_1` FOREIGN KEY (`note_id`) REFERENCES `application_notes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note_attachments`
--

LOCK TABLES `note_attachments` WRITE;
/*!40000 ALTER TABLE `note_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `note_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform_feedback`
--

DROP TABLE IF EXISTS `platform_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform_feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `priority` varchar(20) NOT NULL,
  `attachment_path` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'PENDING',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `platform_feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform_feedback`
--

LOCK TABLES `platform_feedback` WRITE;
/*!40000 ALTER TABLE `platform_feedback` DISABLE KEYS */;
INSERT INTO `platform_feedback` VALUES (1,92,'bug','Internships','Cant update the status of the internships','medium',NULL,'PENDING','2025-04-01 10:13:54','2025-04-01 10:13:54');
/*!40000 ALTER TABLE `platform_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scholarship_applications`
--

DROP TABLE IF EXISTS `scholarship_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scholarship_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `scholarshipID` int NOT NULL,
  `status` enum('NOT_STARTED','IN_PROGRESS','SUBMITTED','ACCEPTED','REJECTED') DEFAULT 'NOT_STARTED',
  `notes` text,
  `submission_date` date DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_applied` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `scholarshipID` (`scholarshipID`),
  CONSTRAINT `scholarship_applications_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `scholarship_applications_ibfk_2` FOREIGN KEY (`scholarshipID`) REFERENCES `scholarships` (`scholarshipID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scholarship_applications`
--

LOCK TABLES `scholarship_applications` WRITE;
/*!40000 ALTER TABLE `scholarship_applications` DISABLE KEYS */;
INSERT INTO `scholarship_applications` VALUES (1,92,8,'SUBMITTED',NULL,NULL,'2025-03-26 08:24:00','2025-03-28 03:25:54'),(4,92,4,'ACCEPTED',NULL,NULL,'2025-03-27 23:26:28','2025-03-28 03:25:54'),(5,92,3,'ACCEPTED',NULL,NULL,'2025-03-27 22:20:30','2025-03-28 03:25:54'),(7,92,2,'SUBMITTED',NULL,NULL,'2025-03-26 08:23:47','2025-03-28 03:25:54'),(9,92,11,'SUBMITTED',NULL,NULL,'2025-03-27 22:11:45','2025-03-28 03:25:54'),(12,92,15,'SUBMITTED',NULL,NULL,'2025-03-27 23:45:52','2025-03-28 03:25:54'),(14,94,2,'IN_PROGRESS',NULL,NULL,'2025-03-28 14:40:52','2025-03-28 17:40:52'),(16,92,1,'IN_PROGRESS',NULL,NULL,'2025-03-30 15:35:02','2025-03-30 18:35:02'),(17,92,9,'IN_PROGRESS',NULL,NULL,'2025-03-31 21:08:53','2025-04-01 00:08:53');
/*!40000 ALTER TABLE `scholarship_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scholarship_conversations`
--

DROP TABLE IF EXISTS `scholarship_conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scholarship_conversations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scholarship_application_id` int NOT NULL,
  `user_id` int NOT NULL,
  `message` text NOT NULL,
  `attachment_url` varchar(255) DEFAULT NULL,
  `attachment_type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `scholarship_application_id` (`scholarship_application_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `scholarship_conversations_ibfk_1` FOREIGN KEY (`scholarship_application_id`) REFERENCES `scholarship_applications` (`id`),
  CONSTRAINT `scholarship_conversations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scholarship_conversations`
--

LOCK TABLES `scholarship_conversations` WRITE;
/*!40000 ALTER TABLE `scholarship_conversations` DISABLE KEYS */;
INSERT INTO `scholarship_conversations` VALUES (1,9,92,'Hey i have an issue',NULL,NULL,'2025-03-26 15:25:43'),(3,5,92,'Hey I got accepted',NULL,NULL,'2025-03-27 23:44:23'),(4,12,92,'I have an issue with my essay, can I attach it you give me feedback on where to improve.',NULL,NULL,'2025-03-27 23:45:31'),(5,5,2,'Congratulations',NULL,NULL,'2025-03-28 00:42:29'),(6,7,2,'Have you had any updates yet?',NULL,NULL,'2025-03-28 00:54:48'),(7,7,92,'Not yet',NULL,NULL,'2025-03-28 01:03:04'),(8,14,94,'I need help to review the essay',NULL,NULL,'2025-03-28 14:41:36');
/*!40000 ALTER TABLE `scholarship_conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scholarships`
--

DROP TABLE IF EXISTS `scholarships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scholarships` (
  `scholarshipID` int NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`scholarshipID`),
  UNIQUE KEY `idx_scholarship_source` (`name`,`source`(100))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scholarships`
--

LOCK TABLES `scholarships` WRITE;
/*!40000 ALTER TABLE `scholarships` DISABLE KEYS */;
INSERT INTO `scholarships` VALUES (1,'Women in Tech Scholarships','/placeholder-scholarship.jpg','Scholarship for women pursuing tech careers','Female students in tech careers','2025-02-20 00:00:00','https://www.scholarshiptab.com/',NULL,NULL,NULL,'2025-02-12 13:50:00','2025-03-13 22:27:23','Masters',NULL,NULL,1,NULL),(2,'Technology Innovation Scholarship','/placeholder-scholarship.jpg','The Mastercard Foundation Scholars Program provides full scholarships to young African women pursuing undergraduate degrees in STEM fields. The scholarship covers tuition, accommodation, travel, and living expenses.','Must be a female Kenyan citizen under 25 years old, completed high school with a minimum grade B, demonstrated leadership potential and commitment to giving back to the community.','2025-03-14 00:00:00','https://mcfscholars.asu.edu/phase-three-innovation-and-technology','Ful funded',NULL,NULL,'2025-02-20 22:21:02','2025-03-14 14:14:47','Undergraduate',NULL,'Rwanda',1,NULL),(3,'Kenya Women in Tech Scholarship','/placeholder-scholarship.jpg',' A comprehensive scholarship program designed to support young Kenyan women pursuing degrees in Computer Science, Software Engineering, or related IT fields. Includes mentorship and internship opportunities.','Female graduates with a bachelors degree in sciences, research proposal in STEM fields, under 35 years old.','2025-04-30 23:59:59','https://www.kenyawomenintech.org/scholarships',NULL,NULL,NULL,'2025-02-20 22:23:43','2025-03-13 22:27:23','Undergraduate',NULL,NULL,1,NULL),(4,'Kenya Women in STEM Scholarship','/placeholder-scholarship.jpg','Full scholarship for Kenyan women pursuing STEM degrees','Female Kenyan students in STEM fields, minimum B grade','2025-08-15 03:00:00','https://example.com/kenya-stem',NULL,NULL,NULL,'2025-03-07 10:28:38','2025-03-13 22:27:23','Undergraduate',NULL,NULL,1,NULL),(5,'African Leadership Masters Fellowship','/placeholder-scholarship.jpg','Full funding for Masters studies in Business or Technology','Kenyan residents with Bachelor\'s degree, 2 years work experience','2025-09-30 03:00:00','https://example.com/masters-fellowship',NULL,NULL,NULL,'2025-03-07 10:28:38','2025-03-14 12:53:48','Masters',NULL,NULL,0,NULL),(6,'Kenya Women in STEM Scholarship','/placeholder-scholarship.jpg','Full scholarship for Kenyan women pursuing STEM degrees','Female Kenyan students in STEM fields, minimum B grade','2025-08-15 03:00:00','https://example.com/kenya-stem',NULL,NULL,NULL,'2025-03-07 10:45:54','2025-03-14 12:53:40','Undergraduate',NULL,NULL,0,NULL),(7,'African Leadership Masters Fellowship','/placeholder-scholarship.jpg','Full funding for Masters studies in Business or Technology','Kenyan residents with Bachelor\'s degree, 2 years work experience','2025-09-30 03:00:00','https://example.com/masters-fellowship',NULL,NULL,NULL,'2025-03-07 10:45:54','2025-03-14 12:25:31','Masters',NULL,NULL,0,NULL),(8,'Test Scholarship',NULL,'Test Description','Test Eligibility','2025-12-31 00:00:00','https://example.com/apply',NULL,NULL,NULL,'2025-03-15 12:09:00','2025-03-27 22:03:25','Undergraduate',NULL,NULL,0,NULL),(9,'Test Scholarship',NULL,'Test Description','Test Eligibility','2025-12-31 00:00:00','https://example.com/apply',NULL,NULL,NULL,'2025-03-15 12:10:18','2025-03-15 12:10:18','Undergraduate',NULL,NULL,1,NULL),(10,'Test Scholarship',NULL,'Test Description','Test Eligibility','2025-12-31 00:00:00','https://example.com/apply',NULL,NULL,NULL,'2025-03-17 19:16:48','2025-03-27 22:03:33','Undergraduate',NULL,NULL,0,NULL),(11,'Test Scholarship',NULL,'Test Description','Test Eligibility','2025-12-31 00:00:00','https://example.com/apply',NULL,NULL,NULL,'2025-03-17 19:17:51','2025-03-27 22:03:03','Undergraduate',NULL,NULL,0,NULL),(12,'Test Scholarship',NULL,'Test Description','Test Eligibility','2025-12-30 00:00:00','https://example.com/apply','',NULL,NULL,'2025-03-17 19:29:19','2025-03-27 22:03:52','Undergraduate',NULL,'USA',1,NULL),(13,'Test Scholarship',NULL,'Test Description','Test Eligibility','2025-12-31 00:00:00','https://example.com/apply',NULL,NULL,NULL,'2025-03-17 20:04:18','2025-03-27 22:03:12','Undergraduate',NULL,NULL,0,NULL),(14,'Test Scholarship',NULL,'Test Description','Test Eligibility','2025-12-30 00:00:00','https://example.com/apply','Fully funded',NULL,NULL,'2025-03-17 20:22:03','2025-03-27 21:50:13','Undergraduate',NULL,'Australia',1,NULL),(15,'Women in Business scholarship',NULL,'This scholarship is for woen in  business related fields.','An undergraduate degree in a business related field with at least a second class upper.','2025-07-10 00:00:00','https://www.pavehq.com/','Fully funded',NULL,NULL,'2025-03-27 21:43:33','2025-03-27 21:43:33','Masters',NULL,'Canada',1,NULL);
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
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  `accepted_privacy_policy` tinyint(1) DEFAULT '0',
  `privacy_policy_acceptance_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Sheconnects Admin','admin@sheconnects.com',NULL,NULL,'$2a$10$R8zVefuQNEPkaNkBCxi0j.5aJtt4Nic.sR0k5yI3REAxUWUS2OUtm',NULL,NULL,'2025-02-12 11:21:50','2025-03-14 14:50:56',1,NULL,NULL,0,NULL),(92,'Esther Wanjiru','e.wanjiru@alustudent.com',NULL,NULL,'$2b$10$hE39Mhi4Jit1FeyHni7pKOQeHKu5An5cJrzqyevi/KHqLEI.nezXu',NULL,NULL,'2025-03-25 17:52:55','2025-03-25 17:52:55',0,NULL,NULL,0,NULL),(93,'Diana Otieno','d.otieno@gmail.com',NULL,NULL,'$2b$10$ux7CvEUESYS/BnApKc78OOtRxEH289Tx2ld2xy8/GDt8h.7pgcSPC',NULL,NULL,'2025-03-28 13:08:51','2025-03-28 13:08:51',0,NULL,NULL,1,'2025-03-28 13:08:51'),(94,'Shyleen Njeri','shailinmuthoni@gmail.com',NULL,NULL,'$2b$10$56OC4wkyS8bUkS7FYex1Ie3FUot7YWGayOuqUmA/a.MUhBbclOaLi',NULL,NULL,'2025-03-28 14:39:49','2025-03-28 14:39:49',0,NULL,NULL,1,'2025-03-28 14:39:49'),(95,'Stella Wanjiku','stella@gmail.com',NULL,NULL,'$2b$10$Lle9bipnYFiIFsJfRPqbUeqf3bEpptlJbnv/hH/KoqhKcf.YPUzBm',NULL,NULL,'2025-03-31 17:55:39','2025-03-31 17:55:39',0,NULL,NULL,1,'2025-03-31 17:55:39'),(96,'Abigael Muthoni','abi@gmail.com',NULL,NULL,'$2b$10$t3rmot2mcUBQrwnleQySlu/igiDbOWyPuPFTFXFsfbAqVF5thZEc.',NULL,NULL,'2025-03-31 23:50:45','2025-03-31 23:50:45',0,NULL,NULL,1,'2025-03-31 23:50:45');
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

-- Dump completed on 2025-04-01 10:22:48
