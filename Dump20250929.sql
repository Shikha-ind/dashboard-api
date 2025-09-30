-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: dashboard
-- ------------------------------------------------------
-- Server version	8.4.5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aspire`
--

DROP TABLE IF EXISTS `aspire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aspire` (
  `sp_id` int NOT NULL AUTO_INCREMENT,
  `to` varchar(255) NOT NULL,
  `from` varchar(255) NOT NULL,
  `service_name` varchar(250) DEFAULT NULL,
  `region_name` varchar(250) DEFAULT NULL,
  `award_type` varchar(100) NOT NULL,
  `award_name` varchar(255) NOT NULL,
  `url_link` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `likes` int DEFAULT '0',
  PRIMARY KEY (`sp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspire`
--

LOCK TABLES `aspire` WRITE;
/*!40000 ALTER TABLE `aspire` DISABLE KEYS */;
INSERT INTO `aspire` VALUES (8,'Johan','Roy','WEB','USA','Achievement','Hitting the Mark','example.com','2025-07-09 15:13:23',0),(9,'Roy','Mike','WEB','Canada','Achievement','Hitting the Mark','example.com','2025-07-09 16:26:38',1),(10,'Myke','Joy','WEB','Japan','Achievement','Innovation','example.com','2025-07-14 18:40:05',1),(11,'Carrie','Roy','WEB','INTL','Achievement','Hitting the Mark','example.com','2025-07-14 18:51:35',0),(12,'Ravi','Rai','WEB','EU','Achievement','Innovation','emple.com','2025-07-14 18:52:32',0),(13,'test','test','WEB','INTL','Achievement','Hitting the Mark','test.com','2025-07-14 19:24:55',1);
/*!40000 ALTER TABLE `aspire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspire_likes`
--

DROP TABLE IF EXISTS `aspire_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aspire_likes` (
  `asl_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) DEFAULT NULL,
  `sp_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`asl_id`),
  UNIQUE KEY `unique_like` (`sp_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspire_likes`
--

LOCK TABLES `aspire_likes` WRITE;
/*!40000 ALTER TABLE `aspire_likes` DISABLE KEYS */;
INSERT INTO `aspire_likes` VALUES (4,'palo@gmail.com',7,'2025-07-09 09:30:15'),(7,'palo@gmail.com',9,'2025-07-10 10:14:46'),(8,'palo@gmail.com',13,'2025-07-15 12:40:50'),(9,'palo@gmail.com',10,'2025-07-15 12:40:57');
/*!40000 ALTER TABLE `aspire_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_study`
--

DROP TABLE IF EXISTS `case_study`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `case_study` (
  `serial_no` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) NOT NULL,
  `related_to` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `file_action` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`serial_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_study`
--

LOCK TABLES `case_study` WRITE;
/*!40000 ALTER TABLE `case_study` DISABLE KEYS */;
INSERT INTO `case_study` VALUES (1,'test','test2','pdf','uk','example.pdf','2025-07-10 19:09:26'),(2,'sdt','yhy','PDF','Canada','1752157145812-976226288.pdf','2025-07-10 19:49:05'),(5,'Lorem ipsum is a dummy or placeholder text ','commonly used in graphic design','PPT','Canada','1752843870776-795017331.pptx','2025-07-18 18:34:30');
/*!40000 ALTER TABLE `case_study` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_type`
--

DROP TABLE IF EXISTS `document_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_type` (
  `dt_id` int NOT NULL AUTO_INCREMENT,
  `document_name` varchar(100) NOT NULL,
  `iconUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_type`
--

LOCK TABLES `document_type` WRITE;
/*!40000 ALTER TABLE `document_type` DISABLE KEYS */;
INSERT INTO `document_type` VALUES (1,'PDF','https://cdn-icons-png.flaticon.com/512/16425/16425457.png'),(2,'PPT','https://cdn-icons-png.flaticon.com/512/11927/11927219.png'),(3,'DOC','https://cdn-icons-png.flaticon.com/512/4725/4725970.png'),(4,'EXCEL','https://cdn-icons-png.flaticon.com/512/4726/4726040.png'),(5,'MP4','https://cdn-icons-png.flaticon.com/512/9034/9034499.png');
/*!40000 ALTER TABLE `document_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `serial_no` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) NOT NULL,
  `related_to` varchar(255) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`serial_no`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,'TeamOverview.pdf','Team Lead','PDF','US','Download','2025-07-11 12:58:56'),(9,'sdsdds','ssdsd','ssdd','uk','GB-62244-Resource.pdf','2025-07-11 12:58:56'),(25,'Eample','Presentation','PPT','Canada','1752220469381-577370532.pptx','2025-07-11 13:24:29'),(26,'test','test1','PDF','USA','1752669453383-168491740.pdf','2025-07-16 18:07:33');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issues_tracker`
--

DROP TABLE IF EXISTS `issues_tracker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issues_tracker` (
  `it_id` int NOT NULL AUTO_INCREMENT,
  `region` varchar(100) DEFAULT NULL,
  `reported_by` varchar(100) DEFAULT NULL,
  `campaign_name` varchar(100) DEFAULT NULL,
  `workstream` varchar(100) DEFAULT NULL,
  `reported_date` date DEFAULT NULL,
  `ticket_no` varchar(50) DEFAULT NULL,
  `stage` varchar(100) DEFAULT NULL,
  `paid` varchar(100) DEFAULT NULL,
  `likelyhood` varchar(100) DEFAULT NULL,
  `impact` varchar(100) DEFAULT NULL,
  `issue_owner` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `issue_description` text,
  `mitigation_plan` text,
  `rc_summary` text,
  `created_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`it_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues_tracker`
--

LOCK TABLES `issues_tracker` WRITE;
/*!40000 ALTER TABLE `issues_tracker` DISABLE KEYS */;
INSERT INTO `issues_tracker` VALUES (1,'USA','gfggdfd','gfggdfd','gfggdfd','2025-07-10','gfggdfd','gfggdfd','gfggdfd','gfggdfd','gfggdfd','gfggdfd','In Progress','Lorem ipsum is a dummy or placeholder text commonly used in graphic design','Lorem ipsum is a dummy or placeholder text commonly used in graphic design','Lorem ipsum is a dummy or placeholder text commonly used in graphic design',NULL,'2025-07-17 09:15:33','2025-07-18 10:27:34'),(3,'INTL','Lorem','Lorem','Lorem','2025-07-16','gfgfgf','tyyh','thress','ddffggfg','sdfddfd','fdfdf','Open','gfgfgf','hghg','hhhj',NULL,'2025-07-18 12:45:21','2025-07-18 12:45:21'),(4,'UK','test','test','test','2025-07-16','test','test','test','test','test','test','Open','test','test','test',NULL,'2025-07-18 12:55:26','2025-07-18 12:55:26'),(5,'Canada','test','test','test','2025-07-16','test','test','test','test','test','test','Open','test','test','test',NULL,'2025-07-18 12:55:59','2025-07-18 12:55:59'),(6,'EU','test','test','test','2025-07-15','test','test','test','test','test','test','In Progress','Lorem ipsum is a dummy or placeholder text commonly used in graphic design','Lorem ipsum is a dummy or placeholder text commonly used in graphic design','Lorem ipsum is a dummy or placeholder text commonly used in graphic design',NULL,'2025-07-18 12:56:25','2025-07-18 13:00:40'),(7,'Japan','test','test','test','2025-07-16','test','test','test','test','test','test','Unresolved','Lorem ipsum is a dummy or placeholder text commonly used in graphic design','Lorem ipsum is a dummy or placeholder text commonly used in graphic design','Lorem ipsum is a dummy or placeholder text commonly used in graphic design',NULL,'2025-07-18 12:56:54','2025-07-18 13:00:13'),(8,'USA','test1','test1','test1','2025-07-15','test1','test1','test1','test1','test1','test1','Closed','Lorem ipsum is a dummy or placeholder text commonly used in graphic design','Lorem ipsum is a dummy or placeholder text commonly used in graphic design','Lorem ipsum is a dummy or placeholder text commonly used in graphic design',NULL,'2025-07-18 12:57:43','2025-07-18 12:59:56');
/*!40000 ALTER TABLE `issues_tracker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_reports`
--

DROP TABLE IF EXISTS `projects_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_reports` (
  `pr_id` int NOT NULL AUTO_INCREMENT,
  `next_id` varchar(100) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `region` varchar(100) NOT NULL,
  `market` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `project_manager` varchar(100) DEFAULT NULL,
  `developer` varchar(100) DEFAULT NULL,
  `reviewer` varchar(100) DEFAULT NULL,
  `scope` text,
  `status` enum('Open','In Progress','Resolved','Closed','Unresolved') NOT NULL,
  `po_number` varchar(100) DEFAULT NULL,
  `cost` decimal(15,2) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `no_of_pages` int DEFAULT NULL,
  `comments` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_reports`
--

LOCK TABLES `projects_reports` WRITE;
/*!40000 ALTER TABLE `projects_reports` DISABLE KEYS */;
INSERT INTO `projects_reports` VALUES (1,'txy1','fdfdf','INTL','dsd','2025-07-18','2025-07-19','fffdfd','fdfd','dfdf','fdfdf','Open','ffff',44455.00,'fdff',5,'fdfdfdfdfd','2025-07-21 15:57:31','2025-07-22 14:22:58'),(2,'dfdfd','gtrree','USA','dssdd','2025-07-21','2025-07-21','dsfdfd','dfdf','fdfds','dffd','In Progress','fdfdfd',43454.00,'fdfffd',343,'no comments','2025-07-22 09:02:46','2025-07-22 09:02:46'),(3,'cxq123','theas','EU','theas','2025-07-18','2025-07-19','theas','theas','theas','theas','In Progress','theas',65656.00,'fgfgf',35,'theasjjj','2025-07-22 14:25:58','2025-07-22 14:28:40'),(4,'fgsr89','fgsr89','Canada','fgsr89','2025-07-20','2025-07-21','fgsr89','fgsr89','fgsr89','fgsr89','Open','fgsr89',4567.00,'fgsr89',20,'fgfgfgfgfgf','2025-07-22 14:36:52','2025-07-22 14:36:52');
/*!40000 ALTER TABLE `projects_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rca`
--

DROP TABLE IF EXISTS `rca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rca` (
  `rca_id` int NOT NULL AUTO_INCREMENT,
  `region` varchar(100) NOT NULL,
  `reported_by` varchar(100) NOT NULL,
  `root_cause` text NOT NULL,
  `action_file` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`rca_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rca`
--

LOCK TABLES `rca` WRITE;
/*!40000 ALTER TABLE `rca` DISABLE KEYS */;
INSERT INTO `rca` VALUES (2,'INTL','test1','testing','1752606523776-430198557.pdf','2025-07-16 00:38:43','PDF'),(3,'USA','Joy','Lorem Ipsum is simply dummy text of the printing and typesetting industry. ','1752656587103-281617742.pdf','2025-07-16 14:33:07','PDF'),(4,'INTL','example','example','1752660810607-771406224.pptx','2025-07-16 15:43:30','PPT'),(10,'INTL','test','test','1752669309827-256235233.pptx','2025-07-16 18:05:09','PPT'),(11,'INTL','testi','testing','1754050296285-103165709.docx','2025-08-01 17:41:36','DOC');
/*!40000 ALTER TABLE `rca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'USA'),(2,'INTL'),(3,'UK'),(4,'EU'),(5,'Canada'),(6,'Japan');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revenue`
--

DROP TABLE IF EXISTS `revenue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue` (
  `rhc_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `region` varchar(100) DEFAULT NULL,
  `onsite_revenue` decimal(10,2) DEFAULT NULL,
  `onsite_hc` decimal(5,2) DEFAULT NULL,
  `offshore_revenue` decimal(5,2) DEFAULT NULL,
  `offshore_hc` decimal(5,2) DEFAULT NULL,
  `ideal_hc_nearshore` decimal(5,2) DEFAULT NULL,
  `ideal_hc_offshore` decimal(5,2) DEFAULT NULL,
  `excess_offshore` decimal(5,2) DEFAULT NULL,
  `excess_nearshore` decimal(5,2) DEFAULT NULL,
  `canada_fte` decimal(10,2) DEFAULT NULL,
  `uk_fte` decimal(10,2) DEFAULT NULL,
  `uk_catalog` decimal(10,2) DEFAULT NULL,
  `ceeba_hcp` decimal(10,2) DEFAULT NULL,
  `wese_catalog` decimal(10,2) DEFAULT NULL,
  `canada_catalog` decimal(10,2) DEFAULT NULL,
  `plan_of_action` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rhc_id`),
  UNIQUE KEY `rhc_id` (`rhc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revenue`
--

LOCK TABLES `revenue` WRITE;
/*!40000 ALTER TABLE `revenue` DISABLE KEYS */;
INSERT INTO `revenue` VALUES (17,'USA',10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,80.00,90.00,100.00,60.00,10.00,10.00,'Testing','2025-07-29 07:41:07'),(18,'INTL',12.00,12.00,11.00,11.00,12.00,12.00,12.00,12.00,800.00,600.00,4000.00,900.00,1000.00,500.80,'Lorem Ipsum','2025-07-29 07:41:07');
/*!40000 ALTER TABLE `revenue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `risk_register`
--

DROP TABLE IF EXISTS `risk_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `risk_register` (
  `rr_id` int NOT NULL AUTO_INCREMENT,
  `region` varchar(100) NOT NULL,
  `reported_by` varchar(100) NOT NULL,
  `priority` enum('Low','Medium','High','Critical') NOT NULL,
  `status` enum('Open','In Progress','Resolved','Closed','Unresolved') NOT NULL,
  `risk_description` text NOT NULL,
  `impact_area` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `risk_register`
--

LOCK TABLES `risk_register` WRITE;
/*!40000 ALTER TABLE `risk_register` DISABLE KEYS */;
INSERT INTO `risk_register` VALUES (1,'USA','test','Low','Open','test','test','2025-07-11 17:41:01'),(2,'Canada','test','Medium','Open','testing','testing','2025-07-14 18:47:33'),(3,'UK','carry ','Medium','In Progress','tets','fsthgds','2025-07-14 18:53:22'),(4,'Japan','thhd','Critical','Resolved','thdsd','dfdf','2025-07-14 18:53:54'),(5,'INTL','thsd','High','Resolved','thdds','vghh','2025-07-14 18:54:15'),(6,'EU','ghjj','Low','Closed','the','sddt','2025-07-14 18:55:14'),(7,'USA','thsde','Medium','Resolved','the','thrds rhh','2025-07-14 18:56:11'),(8,'UK','thse','High','In Progress','thsade','thse','2025-07-14 18:56:42'),(9,'Canada','testd','Low','Open','tetsd','tess','2025-07-14 19:34:04'),(10,'USA','test','Critical','Open','testing purpose','testing purpose','2025-07-18 18:08:07');
/*!40000 ALTER TABLE `risk_register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_type`
--

DROP TABLE IF EXISTS `service_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_type` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_type`
--

LOCK TABLES `service_type` WRITE;
/*!40000 ALTER TABLE `service_type` DISABLE KEYS */;
INSERT INTO `service_type` VALUES (1,'WEB');
/*!40000 ALTER TABLE `service_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats`
--

DROP TABLE IF EXISTS `stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `metric_name` varchar(100) DEFAULT NULL,
  `value` int DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats`
--

LOCK TABLES `stats` WRITE;
/*!40000 ALTER TABLE `stats` DISABLE KEYS */;
/*!40000 ALTER TABLE `stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `empId` varchar(50) DEFAULT NULL,
  `band` varchar(20) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `emailId` varchar(100) DEFAULT NULL,
  `emailPrid` varchar(100) DEFAULT NULL,
  `emailAz` varchar(100) DEFAULT NULL,
  `imageUrl` text,
  `market` varchar(100) DEFAULT NULL,
  `date_of_joining` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `role` varchar(255) DEFAULT NULL,
  `skill_set_1` int DEFAULT NULL,
  `skill_set_2` int DEFAULT NULL,
  `skill_set_3` int DEFAULT NULL,
  `skill_set_4` int DEFAULT NULL,
  `skill_set_5` int DEFAULT NULL,
  `skill_set_6` int DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_empId` (`empId`),
  UNIQUE KEY `emailId` (`emailId`),
  UNIQUE KEY `emailPrid` (`emailPrid`),
  UNIQUE KEY `emailAz` (`emailAz`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (43,'Alice','IND1','A4','Web Developer','INTL','alice@indegene.com','1xty@astrazeneca.com','alice@astrazeneca.com','https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg?semt=ais_hybrid&w=740','','2024-10-11 00:00:00.000000','Employee',NULL,NULL,NULL,NULL,NULL,NULL,'ambarish@gmail.com','2025-07-06 10:15:58.000000'),(44,'Roy','IND2','A3','Design Engineer','USA','roy@indegene.com','xy12@astrazeneca.com','roy@astrazeneca.com','https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg?semt=ais_hybrid&w=740','','2024-12-29 00:00:00.000000','Employee',NULL,NULL,NULL,NULL,NULL,NULL,'ambarish@gmail.com','2025-07-06 12:22:45.000000'),(81,'asa','IND3','A3','Developer','INTL','asa@gmail.com','asa@gmail.com','asa@gmail.com','https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg?semt=ais_hybrid&w=740','','2025-06-30 00:00:00.000000','Employee',NULL,NULL,NULL,NULL,NULL,NULL,'palo@gmail.com','2025-07-06 14:57:19.000000');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_skills`
--

DROP TABLE IF EXISTS `team_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_skills` (
  `ts_id` int NOT NULL AUTO_INCREMENT,
  `team_id` int NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  `skill_level` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ts_id`),
  UNIQUE KEY `unique_skill_per_team` (`team_id`,`skill_name`),
  KEY `idx_team_id` (`team_id`),
  CONSTRAINT `fk_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_skills`
--

LOCK TABLES `team_skills` WRITE;
/*!40000 ALTER TABLE `team_skills` DISABLE KEYS */;
INSERT INTO `team_skills` VALUES (94,44,'Figma',8,'2025-07-06 18:28:38','2025-07-06 18:28:38'),(95,44,'Photoshop',7,'2025-07-06 18:28:38','2025-07-06 18:28:38'),(96,44,'CSS',3,'2025-07-06 18:28:38','2025-07-06 18:28:38'),(109,81,'Angular',9,'2025-07-07 13:29:45','2025-07-07 13:29:45'),(110,81,'Node.js',5,'2025-07-07 13:29:45','2025-07-07 13:29:45'),(111,81,'Photoshop',3,'2025-07-07 13:29:45','2025-07-07 13:29:45'),(134,43,'Angular',8,'2025-08-01 08:46:26','2025-08-01 08:46:26'),(135,43,'Figma',4,'2025-08-01 08:46:26','2025-08-01 08:46:26'),(136,43,'Javascript',6,'2025-08-01 08:46:26','2025-08-01 08:46:26'),(137,43,'Node.js',7,'2025-08-01 08:46:26','2025-08-01 08:46:26'),(138,43,'Photoshop',6,'2025-08-01 08:46:26','2025-08-01 08:46:26');
/*!40000 ALTER TABLE `team_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonial_likes`
--

DROP TABLE IF EXISTS `testimonial_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonial_likes` (
  `tl_id` int NOT NULL AUTO_INCREMENT,
  `t_id` int NOT NULL,
  `user_id` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tl_id`),
  UNIQUE KEY `unique_like` (`t_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonial_likes`
--

LOCK TABLES `testimonial_likes` WRITE;
/*!40000 ALTER TABLE `testimonial_likes` DISABLE KEYS */;
INSERT INTO `testimonial_likes` VALUES (11,1,'shikhasingh9517@gmail.com','2025-07-04 15:27:52'),(13,4,'palo@gmail.com','2025-07-04 15:28:53'),(20,7,'ambarish@gmail.com','2025-07-05 18:11:25'),(22,4,'ambarish@gmail.com','2025-07-05 18:11:49'),(35,1,'ambarish@gmail.com','2025-07-05 18:52:35'),(58,2,'palo@gmail.com','2025-07-07 15:46:55'),(60,1,'palo@gmail.com','2025-07-07 16:08:08'),(69,15,'palo@gmail.com','2025-07-08 08:19:10'),(70,10,'palo@gmail.com','2025-07-08 08:19:23'),(92,19,'palo@gmail.com','2025-07-11 08:37:50'),(93,17,'palo@gmail.com','2025-07-16 11:53:04');
/*!40000 ALTER TABLE `testimonial_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `to` varchar(100) DEFAULT NULL,
  `from` varchar(100) DEFAULT NULL,
  `service_name` varchar(50) DEFAULT NULL,
  `region_name` varchar(50) DEFAULT NULL,
  `upload_path` varchar(500) DEFAULT NULL,
  `likes` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (17,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500','asd','sdd','WEB','INTL','1751964977363-845524928.png',1,'2025-07-08 08:56:17'),(18,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500','Shikha','test','WEB','USA','1751965381577-418839382.png',0,'2025-07-08 09:03:01'),(19,'testing','Tom','Jery','WEB','Canada','1752147147095-750929676.png',1,'2025-07-10 11:32:27'),(20,'test','Test','test1','WEB','UK',NULL,0,'2025-08-01 12:20:21');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'Admin','2025-06-17 21:17:44'),(2,'Employee','2025-06-17 21:19:01'),(3,'Team Lead','2025-06-17 21:19:17'),(4,'Project Manager','2025-06-17 21:19:36');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `empId` varchar(50) DEFAULT NULL,
  `band` varchar(20) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `emailId` varchar(100) DEFAULT NULL,
  `emailPrid` varchar(100) DEFAULT NULL,
  `emailAz` varchar(100) DEFAULT NULL,
  `imageUrl` text,
  `market` varchar(100) DEFAULT NULL,
  `date_of_joining` date DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1750097681345','admin','','','','','admin1@gmail.com','','','','','2025-06-16','$2b$10$nUh9SVvhjwYtmJX0dRfUxefR5GhMwe9RODd/4dteOxRFgUgfIwabS','Admin',NULL,NULL),('1750188112206','Palo','','','','','palo@gmail.com','','','','','2025-06-17','$2b$10$VGHMGMpuLfQ3wWJGHL0rs.fQqWCMCRQl6wuypnC50EQ5XJyj/zpb.','Team Lead',NULL,NULL),('1750230945162','Shikha','','','','','shikha@gmail.com','','','','','2025-06-18','$2b$10$W6qS0z5aQbcmdPgWxPS38.O0OjmqnP7.OB1bHX.IsU.1Lzq4dccwm','Employee',NULL,NULL),('1750231786021','Ambarish','','','','','ambarish@gmail.com','','','','','2025-06-18','$2b$10$A2m5HTEVLxceE7tJ4TOZr.Py.zHzPqrLRv9g3m9Eaa2wj7wN9NHVu','Project Manager',NULL,NULL),('1750317665110','Lio','','','','','Lio@gmail.com','','','','','2025-06-19','$2b$10$pOS5CbKc729vVDTwXtdP2.AMQqdD7c3pwB.82iZe7PN/T1QOXu9fa','Employee',NULL,NULL),('1750328463606','test','','','','','test@gmail.com','','','','','2025-06-19','$2b$10$xVCbMAIzaufp2EjYENmxeuGJ0YMBBMY2G3k.1qLl2xmpG5Jpndaja','Employee',NULL,NULL),('1750330962167','pallavi','','','','','pallavi@gmail.com','','','','','2025-06-19','$2b$10$b5o/1.SQZIXtxn8Y.E.T8uCVJdSfotnVFRd/1/1GBa42uWM24eFni','Employee',NULL,NULL),('1750421417955','lio@gmail.com','','','','','lio@gmail.com','','','','','2025-06-20','$2b$10$Tc9cotS9xrp6P2DEocn9z.1A.WuGL1xBnEdvGMop3hmC2qLQABiqy','Employee',NULL,NULL),('1750609579845','test','','','','','shikhasingh9517@gmail.com','','','','','2025-06-22','$2b$10$UZP2dL5biQ/D4c4BqhAkIOSb5ghaC33jv6X/x5EiA0WuOtKUvqmYS','Employee','811ebce76c5530d73f772684e048ce9161bb58642e4499674cc8e87a1a8569ff','2025-06-22 23:19:46');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weekly_report`
--

DROP TABLE IF EXISTS `weekly_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weekly_report` (
  `wr_id` int NOT NULL AUTO_INCREMENT,
  `region` varchar(100) NOT NULL,
  `project_count` int NOT NULL,
  `quality_issue` int DEFAULT '0',
  `timeline_issue` int DEFAULT '0',
  `remark` text,
  `issue_description` text,
  `remediation_steps` text,
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`wr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weekly_report`
--

LOCK TABLES `weekly_report` WRITE;
/*!40000 ALTER TABLE `weekly_report` DISABLE KEYS */;
INSERT INTO `weekly_report` VALUES (1,'test',4,4,4,'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.','Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.','Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.','palo@gmail.com','2025-08-01 12:05:16'),(2,'INTL',1,1,1,'Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.','Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.','Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.','palo@gmail.com','2025-08-01 16:31:41'),(3,'Canada',2,0,1,'testing','testing','testing','palo@gmail.com','2025-08-04 09:05:53');
/*!40000 ALTER TABLE `weekly_report` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-29 12:20:57
