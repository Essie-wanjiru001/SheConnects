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
-- Table structure for table `feedback_messages`
--

DROP TABLE IF EXISTS `feedback_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feedback_id` int NOT NULL,
  `user_id` int NOT NULL,
  `message` text NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `feedback_id` (`feedback_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `feedback_messages_ibfk_1` FOREIGN KEY (`feedback_id`) REFERENCES `platform_feedback` (`id`) ON DELETE CASCADE,
  CONSTRAINT `feedback_messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `platform_feedback`
--

DROP TABLE IF EXISTS `platform_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform_feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category` enum('bug','feature','improvement','other') NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `priority` varchar(20) NOT NULL,
  `attachment_path` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','IN_PROGRESS','RESOLVED') DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `platform_feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-06 22:51:57
