-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: k9a201.p.ssafy.io    Database: almighty
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `alarm`
--

DROP TABLE IF EXISTS `alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm` (
  `alarm_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `is_read` tinytext,
  `title` varchar(255) NOT NULL,
  `client_id` bigint DEFAULT NULL,
  `receiver` varchar(255) NOT NULL,
  PRIMARY KEY (`alarm_id`),
  KEY `FKcxuiryv0u7cjb93ne951mygxd` (`client_id`),
  CONSTRAINT `FKcxuiryv0u7cjb93ne951mygxd` FOREIGN KEY (`client_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=547 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm`
--

LOCK TABLES `alarm` WRITE;
/*!40000 ALTER TABLE `alarm` DISABLE KEYS */;
INSERT INTO `alarm` VALUES (191,'2023-11-10 10:18:43.836267','2023-11-10 10:18:43.836267','이거 되노','Y','RETURN',1,'ADMIN'),(192,'2023-11-10 10:22:16.490573','2023-11-10 10:22:16.490573','으하하하 박종성','Y','RETURN',1,'ADMIN'),(193,'2023-11-10 10:28:36.783830','2023-11-10 10:28:36.783830','vcxvcx','Y','RETURN',2,'ADMIN'),(194,'2023-11-10 10:30:17.820318','2023-11-10 10:30:17.820318','dsa','Y','RETURN',2,'ADMIN'),(195,'2023-11-10 10:31:16.891157','2023-11-10 10:31:16.891157','이거 맞냐','Y','RETURN',1,'ADMIN'),(196,'2023-11-10 10:34:02.332252','2023-11-10 10:34:02.332252','t1 화이팅','Y','RETURN',1,'ADMIN'),(197,'2023-11-10 10:34:48.374619','2023-11-10 10:34:48.374619','왜 되냐고','Y','RETURN',1,'ADMIN'),(199,'2023-11-10 13:44:48.547500','2023-11-10 13:44:48.547500','테스트용','N','RETURN',3,'ADMIN'),(201,'2023-11-13 10:14:09.054704','2023-11-13 10:14:09.054704','과열 감지','N','RETURN',5,'ADMIN'),(202,'2023-11-13 12:48:06.369156','2023-11-13 12:48:06.369156','','N','RETURN',1,'ADMIN'),(203,'2023-11-13 14:10:32.028415','2023-11-13 14:10:32.028415','','N','RETURN',1,'ADMIN'),(204,'2023-11-13 14:11:54.153823','2023-11-13 14:11:54.153823','ㅁ','N','RETURN',1,'ADMIN'),(209,'2023-11-13 15:33:47.716850','2023-11-13 15:33:47.716850','counter error','N','RETURNREJECTION',3,'USER'),(210,'2023-11-13 15:36:36.759733','2023-11-13 15:36:36.759733','counter error','N','RETURNREJECTION',1,'USER'),(211,'2023-11-13 15:39:27.706748','2023-11-13 15:39:27.706748','counter error','N','RETURNREJECTION',3,'USER'),(212,'2023-11-13 15:45:02.898696','2023-11-13 15:45:02.898696','counter error','N','RETURNREJECTION',3,'USER'),(213,'2023-11-13 15:46:31.631929','2023-11-13 15:46:31.631929','counter error','N','RETURNREJECTION',1,'USER'),(214,'2023-11-13 15:57:52.583148','2023-11-13 15:57:52.583148','너무 뜨거워요','N','RETURN',1,'ADMIN'),(215,'2023-11-13 16:00:11.594532','2023-11-13 16:00:11.594532','너무 뜨거워요','N','RETURN',1,'ADMIN'),(216,'2023-11-13 16:01:21.876885','2023-11-13 16:01:21.876885','너무 뜨거워요','N','RETURN',1,'ADMIN'),(217,'2023-11-13 16:02:26.476983','2023-11-13 16:02:26.476983','너무 뜨거워요','N','RETURN',1,'ADMIN'),(218,'2023-11-13 16:03:50.853889','2023-11-13 16:03:50.853889','너무 뜨거워요','N','RETURN',1,'ADMIN'),(219,'2023-11-13 16:04:14.357140','2023-11-13 16:04:14.357140','312312123123','N','RETURN',5,'ADMIN'),(220,'2023-11-13 16:05:47.613727','2023-11-13 16:05:47.613727','너무 뜨거워요','N','RETURN',1,'ADMIN'),(221,'2023-11-13 16:07:41.718994','2023-11-13 16:07:41.718994','너무 뜨거워요','N','RETURN',1,'ADMIN'),(222,'2023-11-13 16:11:23.264307','2023-11-13 16:11:23.264307','너무 뜨거워요','N','RETURN',1,'ADMIN'),(223,'2023-11-13 16:23:27.592076','2023-11-13 16:23:27.592076','너무 뜨거워요','N','RETURN',1,'ADMIN'),(224,'2023-11-13 16:49:44.312373','2023-11-13 16:49:44.312373','온도 비사아앙','N','RETURN',1,'ADMIN'),(225,'2023-11-13 16:54:33.993239','2023-11-13 16:54:33.993239','온도 비사아앙','N','RETURN',1,'ADMIN'),(226,'2023-11-13 17:37:19.222243','2023-11-13 17:37:19.222243','온도 비사아앙','N','RETURN',1,'ADMIN'),(227,'2023-11-13 17:38:27.047351','2023-11-13 17:38:27.047351','온도 비사아앙','N','RETURN',1,'ADMIN'),(228,'2023-11-13 17:40:23.042661','2023-11-13 17:40:23.042661','온도 비사아앙','N','RETURN',1,'ADMIN'),(229,'2023-11-13 17:42:34.499142','2023-11-13 17:42:34.499142','온도 비사아앙','N','RETURN',1,'ADMIN'),(230,'2023-11-13 17:50:23.858373','2023-11-13 17:50:23.858373','온도 비사아앙','N','RETURN',1,'ADMIN'),(231,'2023-11-13 17:55:48.734770','2023-11-13 17:55:48.734770','온도 비사아앙','N','RETURN',1,'ADMIN'),(232,'2023-11-13 17:57:08.571473','2023-11-13 17:57:08.571473','온도 비사아앙','N','RETURN',1,'ADMIN'),(233,'2023-11-14 09:21:05.649978','2023-11-14 09:21:05.649978','온도 비사아앙','N','RETURN',1,'ADMIN'),(236,'2023-11-14 10:10:48.229263','2023-11-14 10:10:48.229263','온도 비사아앙','N','RETURN',1,'ADMIN'),(237,'2023-11-14 10:32:00.610411','2023-11-14 10:32:00.610411','온도 비사아앙','N','RETURN',1,'ADMIN'),(238,'2023-11-14 10:35:34.373181','2023-11-14 10:35:34.373181','온도 비사아앙','N','RETURN',1,'ADMIN'),(239,'2023-11-14 10:41:31.040481','2023-11-14 10:41:31.040481','','N','RETURN',1,'ADMIN'),(240,'2023-11-14 10:49:03.264078','2023-11-14 10:49:03.264078','','N','RETURN',1,'ADMIN'),(241,'2023-11-14 10:55:52.970009','2023-11-14 10:55:52.970009','wwwww','N','RETURN',1,'ADMIN'),(242,'2023-11-14 11:01:37.315192','2023-11-14 11:01:37.315192','배터리 박종32','N','RETURN',3,'ADMIN'),(243,'2023-11-14 11:10:11.080461','2023-11-14 11:10:11.080461','','N','RETURN',1,'ADMIN'),(244,'2023-11-14 11:11:17.764939','2023-11-14 11:11:17.764939','온도 비사아앙','N','RETURN',1,'ADMIN'),(245,'2023-11-14 11:14:25.214142','2023-11-14 11:14:25.214142','온도 비사아앙','N','RETURN',1,'ADMIN'),(246,'2023-11-14 11:16:29.209138','2023-11-14 11:16:29.209138','제바라라랄','N','RETURN',1,'ADMIN'),(247,'2023-11-14 11:21:41.186598','2023-11-14 11:21:41.186598','테스트','N','RETURN',3,'ADMIN'),(248,'2023-11-14 11:23:28.651194','2023-11-14 11:23:28.651194','테스트','N','RETURN',3,'ADMIN'),(249,'2023-11-14 11:24:53.371776','2023-11-14 11:24:53.371776','테스트','N','RETURN',3,'ADMIN'),(250,'2023-11-14 11:30:32.860959','2023-11-14 11:30:32.860959','테스트','N','RETURN',3,'ADMIN'),(251,'2023-11-14 12:09:28.736342','2023-11-14 12:09:28.736342','테스트','N','RETURN',3,'ADMIN'),(252,'2023-11-14 12:12:07.322906','2023-11-14 12:12:07.322906','테스트','N','RETURN',3,'ADMIN'),(253,'2023-11-14 12:19:00.918853','2023-11-14 12:19:00.918853','','N','RETURN',1,'ADMIN'),(254,'2023-11-14 12:24:29.348230','2023-11-14 12:24:29.348230','진짜진짜','N','RETURN',1,'ADMIN'),(255,'2023-11-14 12:33:15.905564','2023-11-14 12:33:15.905564','','N','RETURN',1,'ADMIN'),(256,'2023-11-14 12:34:49.392992','2023-11-14 12:34:49.392992','','N','RETURN',1,'ADMIN'),(257,'2023-11-14 12:37:59.526707','2023-11-14 12:37:59.526707','안동준 농구','N','RETURN',1,'ADMIN'),(258,'2023-11-14 12:41:35.545287','2023-11-14 12:41:35.545287','','N','RETURN',1,'ADMIN'),(259,'2023-11-14 12:52:14.316237','2023-11-14 12:52:14.316237','배터리가 뜨거워용','N','RETURN',1,'ADMIN'),(260,'2023-11-14 12:56:10.185830','2023-11-14 12:56:10.185830','','N','RETURN',1,'ADMIN'),(261,'2023-11-14 13:10:27.624394','2023-11-14 13:10:27.624394','SDI님 봐주세요옹','N','RETURN',1,'ADMIN'),(262,'2023-11-14 13:12:37.363091','2023-11-14 13:12:37.363091','','N','RETURN',1,'ADMIN'),(263,'2023-11-14 13:15:30.068155','2023-11-14 13:15:30.068155','ㅇㅇㅇ','N','RETURN',1,'ADMIN'),(264,'2023-11-14 13:26:39.955376','2023-11-14 13:26:39.955376','counter error','N','RETURNREJECTION',1,'USER'),(265,'2023-11-14 14:06:50.894733','2023-11-14 14:06:50.894733','온도가 너무 높습니다','N','RETURN',1,'ADMIN'),(266,'2023-11-14 14:47:02.054771','2023-11-14 14:47:02.054771','','N','RETURN',1,'ADMIN'),(267,'2023-11-14 15:03:24.773624','2023-11-14 15:03:24.773624','counter error','N','RETURNREJECTION',1,'USER'),(268,'2023-11-14 15:05:37.244709','2023-11-14 15:05:37.244709','','N','RETURN',1,'ADMIN'),(269,'2023-11-14 15:08:23.049441','2023-11-14 15:08:23.049441','','N','RETURN',1,'ADMIN'),(270,'2023-11-14 15:09:34.201575','2023-11-14 15:09:34.201575','','N','RETURN',1,'ADMIN'),(271,'2023-11-14 16:34:44.271346','2023-11-14 16:34:44.271346','되냐?','N','RETURN',1,'ADMIN'),(272,'2023-11-14 16:40:31.604768','2023-11-14 16:40:31.604768','조태규','N','RETURN',1,'ADMIN'),(273,'2023-11-14 16:53:26.636120','2023-11-14 16:53:26.636120','ㅈㅈㅈ','N','RETURN',1,'ADMIN'),(274,'2023-11-14 16:59:03.064651','2023-11-14 16:59:03.064651','이러다 다죽어','N','RETURN',1,'ADMIN'),(275,'2023-11-14 17:13:21.276368','2023-11-14 17:13:21.276368','이러다 신청할게 없을듯','N','RETURN',1,'ADMIN'),(276,'2023-11-14 17:49:35.884253','2023-11-14 17:49:35.884253','','N','RETURN',1,'ADMIN'),(277,'2023-11-15 08:55:53.741632','2023-11-15 08:55:53.741632','','N','RETURN',1,'ADMIN'),(278,'2023-11-15 09:49:14.753490','2023-11-15 09:49:14.753490','온도가 뜨거워요','N','RETURN',1,'ADMIN'),(279,'2023-11-15 09:53:29.509821','2023-11-15 09:53:29.509821','','N','RETURN',1,'ADMIN'),(280,'2023-11-15 09:56:53.278712','2023-11-15 09:56:53.278712','','N','RETURN',1,'ADMIN'),(281,'2023-11-15 09:58:19.775931','2023-11-15 09:58:19.775931','','N','RETURN',1,'ADMIN'),(282,'2023-11-15 09:59:31.937909','2023-11-15 09:59:31.937909','ijij','N','RETURN',1,'ADMIN'),(283,'2023-11-15 10:00:00.559151','2023-11-15 10:00:00.559151','','N','RETURN',1,'ADMIN'),(284,'2023-11-15 10:02:03.659397','2023-11-15 10:02:03.659397','','N','RETURN',1,'ADMIN'),(285,'2023-11-15 10:12:55.139467','2023-11-15 10:12:55.139467','제발 이제','N','RETURN',1,'ADMIN'),(286,'2023-11-15 10:14:52.730112','2023-11-15 10:14:52.730112','되냐?','N','RETURN',1,'ADMIN'),(287,'2023-11-15 10:19:27.425519','2023-11-15 10:19:27.425519','counter error','N','RETURNREJECTION',1,'USER'),(288,'2023-11-15 10:20:22.311252','2023-11-15 10:20:22.311252','제발','N','RETURN',1,'ADMIN'),(289,'2023-11-15 10:22:01.111886','2023-11-15 10:22:01.111886','counter error','N','RETURNREJECTION',1,'USER'),(290,'2023-11-15 10:25:10.426082','2023-11-15 10:25:10.426082','counter error','N','RETURNACCEPT',1,'USER'),(291,'2023-11-15 10:31:19.226709','2023-11-15 10:31:19.226709','counter error','N','RETURNREJECTION',1,'USER'),(292,'2023-11-15 10:37:10.101424','2023-11-15 10:37:10.101424','counter error','N','RETURNREJECTION',1,'USER'),(293,'2023-11-15 10:55:10.675837','2023-11-15 10:55:10.675837','충전, 방전입니까?','N','RETURN',1,'ADMIN'),(294,'2023-11-15 10:56:07.789764','2023-11-15 10:56:07.789764','counter error','N','RETURNREJECTION',1,'USER'),(295,'2023-11-15 10:59:01.246865','2023-11-15 10:59:01.246865','counter error','N','RETURNREJECTION',1,'USER'),(296,'2023-11-15 11:00:22.203752','2023-11-15 11:00:22.203752','','N','RETURN',1,'ADMIN'),(297,'2023-11-15 11:03:18.017400','2023-11-15 11:03:18.017400','counter error','N','RETURNREJECTION',1,'USER'),(298,'2023-11-15 11:04:45.598092','2023-11-15 11:04:45.598092','counter error','N','RETURNREJECTION',1,'USER'),(299,'2023-11-15 11:05:05.955533','2023-11-15 11:05:05.955533','이건?','N','RETURN',1,'ADMIN'),(300,'2023-11-15 11:07:26.225857','2023-11-15 11:07:26.225857','','N','RETURN',1,'ADMIN'),(301,'2023-11-15 11:09:14.335895','2023-11-15 11:09:14.335895','counter error','N','RETURNREJECTION',1,'USER'),(302,'2023-11-15 11:16:13.728831','2023-11-15 11:16:13.728831','communication error','N','RETURNREJECTION',1,'USER'),(303,'2023-11-15 11:27:27.420814','2023-11-15 11:27:27.420814','GPT야','N','RETURN',1,'ADMIN'),(304,'2023-11-15 11:31:05.481498','2023-11-15 11:31:05.481498','GPT야 이번엔?','N','RETURN',1,'ADMIN'),(305,'2023-11-15 12:39:16.082109','2023-11-15 12:39:16.082109','','N','RETURN',1,'ADMIN'),(306,'2023-11-15 12:55:03.345381','2023-11-15 12:55:03.345381','rrrrrrrrrrrr','N','RETURN',1,'ADMIN'),(307,'2023-11-15 13:01:56.966905','2023-11-15 13:01:56.966905','배터리에 문제 발생\n열이 너무 높아요!','N','RETURN',1,'ADMIN'),(308,'2023-11-15 13:03:17.971782','2023-11-15 13:03:17.971782','전압이 상태가 이상한 거 같습니다.','N','RETURN',1,'ADMIN'),(309,'2023-11-15 13:07:13.945121','2023-11-15 13:07:13.945121','배터리가 빨리 닳아요!!!','N','RETURN',1,'ADMIN'),(310,'2023-11-15 13:09:32.591791','2023-11-15 13:09:32.591791','배터리가 너무 빨리 닳아요 ㅠㅠ','N','RETURN',1,'ADMIN'),(311,'2023-11-15 13:20:11.016969','2023-11-15 13:20:11.016969','온도가 뜨거워요!!!','N','RETURN',1,'ADMIN'),(312,'2023-11-15 13:20:41.191817','2023-11-15 13:20:41.191817','전압이 높아요!!!','N','RETURN',1,'ADMIN'),(313,'2023-11-15 13:21:27.011245','2023-11-15 13:21:27.011245','뜨거워서 찌릿찌릿해요!! ','N','RETURN',1,'ADMIN'),(314,'2023-11-15 13:22:06.692114','2023-11-15 13:22:06.692114','이거 배터리 왜 안되는 거죠? 받은 지 얼마 안되었거든요??','N','RETURN',1,'ADMIN'),(315,'2023-11-15 13:44:33.085379','2023-11-15 13:44:33.085379','유저 테스트 입니다.','N','RETURN',6,'ADMIN'),(316,'2023-11-15 13:45:22.448008','2023-11-15 13:45:22.448008','counter error','N','RETURNREJECTION',1,'USER'),(317,'2023-11-15 13:49:54.338041','2023-11-15 13:49:54.338041','','N','RETURN',1,'ADMIN'),(318,'2023-11-15 13:50:31.806750','2023-11-15 13:50:31.806750','communication error','N','RETURNACCEPT',1,'USER'),(319,'2023-11-15 13:51:26.338486','2023-11-15 13:51:26.338486','온도가 높은거 같아요!','N','RETURN',1,'ADMIN'),(320,'2023-11-15 13:53:12.016541','2023-11-15 13:53:12.016541','','N','RETURN',1,'ADMIN'),(321,'2023-11-15 13:54:11.128290','2023-11-15 13:54:11.128290',';','N','RETURN',1,'ADMIN'),(322,'2023-11-15 13:55:58.922692','2023-11-15 13:55:58.922692','counter error','N','RETURNREJECTION',1,'USER'),(323,'2023-11-15 13:55:52.740016','2023-11-15 13:55:52.740016','','N','RETURN',1,'ADMIN'),(324,'2023-11-15 14:08:07.206926','2023-11-15 14:08:07.206926','communication error','N','RETURNACCEPT',1,'USER'),(325,'2023-11-15 14:22:54.078569','2023-11-15 14:22:54.078569','counter error','N','RETURNREJECTION',1,'USER'),(326,'2023-11-15 14:29:06.906719','2023-11-15 14:29:06.906719','온도 비사아앙','N','RETURN',1,'ADMIN'),(327,'2023-11-15 14:30:02.414264','2023-11-15 14:30:02.414264','제발','N','RETURN',1,'ADMIN'),(328,'2023-11-15 14:34:32.575509','2023-11-15 14:34:32.575509','제발','N','RETURN',1,'ADMIN'),(329,'2023-11-15 14:36:14.418690','2023-11-15 14:36:14.418690','전압이 너무 높아요','N','RETURN',1,'ADMIN'),(330,'2023-11-15 14:38:33.595112','2023-11-15 14:38:33.595112','되냐?','N','RETURN',1,'ADMIN'),(331,'2023-11-15 14:39:49.785199','2023-11-15 14:39:49.785199','제발','N','RETURN',1,'ADMIN'),(332,'2023-11-15 14:41:04.058487','2023-11-15 14:41:04.058487','제발','N','RETURN',1,'ADMIN'),(333,'2023-11-15 14:45:01.986864','2023-11-15 14:45:01.986864','이번엔 진짜?','N','RETURN',1,'ADMIN'),(334,'2023-11-15 14:50:14.061906','2023-11-15 14:50:14.061906','제발','N','RETURN',1,'ADMIN'),(335,'2023-11-15 15:04:27.827767','2023-11-15 15:04:27.827767','','N','RETURN',1,'ADMIN'),(336,'2023-11-15 15:07:44.529868','2023-11-15 15:07:44.529868','ㄴㅇㄹ','N','RETURN',1,'ADMIN'),(337,'2023-11-15 15:07:57.795795','2023-11-15 15:07:57.795795','ㅇㄴㄹ','N','RETURN',1,'ADMIN'),(338,'2023-11-15 15:18:06.691117','2023-11-15 15:18:06.691117','이건?','N','RETURN',1,'ADMIN'),(339,'2023-11-15 15:20:56.590880','2023-11-15 15:20:56.590880','','N','RETURN',1,'ADMIN'),(340,'2023-11-15 15:39:19.996993','2023-11-15 15:39:19.996993','테스트','N','RETURN',1,'ADMIN'),(341,'2023-11-15 15:39:44.313792','2023-11-15 15:39:44.313792','ㄴㅁㅇㄴㅇ','N','RETURN',1,'ADMIN'),(342,'2023-11-15 15:40:50.782552','2023-11-15 15:40:50.782552','','N','RETURN',1,'ADMIN'),(343,'2023-11-15 15:42:07.342086','2023-11-15 15:42:07.342086','이거 되나영','N','RETURN',6,'ADMIN'),(344,'2023-11-15 15:47:36.996408','2023-11-15 15:47:36.996408','유저 테스트','N','RETURN',6,'ADMIN'),(345,'2023-11-15 15:49:16.860025','2023-11-15 15:49:16.860025','제발','N','RETURN',1,'ADMIN'),(346,'2023-11-15 15:50:44.473473','2023-11-15 15:50:44.473473','유저유저유저','N','RETURN',6,'ADMIN'),(347,'2023-11-15 15:51:32.078397','2023-11-15 15:51:32.078397','유우우우우저','N','RETURN',6,'ADMIN'),(348,'2023-11-15 15:53:37.898183','2023-11-15 15:53:37.898183','ㅁㄴㅇㅁㄴㅇㅁㄴㅇ','N','RETURN',6,'ADMIN'),(349,'2023-11-15 15:54:22.932411','2023-11-15 15:54:22.932411','껏다킴','N','RETURN',6,'ADMIN'),(350,'2023-11-15 15:56:19.922060','2023-11-15 15:56:19.922060','ㅁㄴㅇㅁㄴㅇ','N','RETURN',6,'ADMIN'),(351,'2023-11-15 15:57:22.089801','2023-11-15 15:57:22.089801','counter error','N','RETURNREJECTION',6,'USER'),(352,'2023-11-15 16:03:37.596116','2023-11-15 16:03:37.596116','배터리가 너무 뜨겁다','N','RETURN',6,'ADMIN'),(353,'2023-11-15 16:04:53.851912','2023-11-15 16:04:53.851912','기타 상세 사유 : ','N','RETURNREJECTION',6,'USER'),(354,'2023-11-15 16:08:19.515797','2023-11-15 16:08:19.515797','낭러ㅣㅁㄴ어라ㅣ','N','RETURN',1,'ADMIN'),(355,'2023-11-15 16:08:36.458066','2023-11-15 16:08:36.458066','ㄹ','N','RETURN',1,'ADMIN'),(356,'2023-11-15 16:16:17.338218','2023-11-15 16:16:17.338218','트라이트라이','N','RETURN',6,'ADMIN'),(357,'2023-11-15 16:20:19.098317','2023-11-15 16:20:19.098317','counter error','N','RETURNREJECTION',6,'USER'),(358,'2023-11-15 16:32:36.940928','2023-11-15 16:32:36.940928','큰일','N','RETURN',1,'ADMIN'),(359,'2023-11-15 16:33:54.783504','2023-11-15 16:33:54.783504','가긴하는데','N','RETURN',1,'ADMIN'),(360,'2023-11-15 16:36:00.800147','2023-11-15 16:36:00.800147','ㅁㄴㅇ','N','RETURN',1,'ADMIN'),(361,'2023-11-15 16:38:34.894162','2023-11-15 16:38:34.894162','ㄴㅇㄹ','N','RETURN',1,'ADMIN'),(362,'2023-11-15 16:40:34.176190','2023-11-15 16:40:34.176190','ㄴㅁㅇ','N','RETURN',1,'ADMIN'),(363,'2023-11-15 16:44:28.213852','2023-11-15 16:44:28.213852','ㅇㄴㅁㅇㄴㅁㅇ','N','RETURN',1,'ADMIN'),(364,'2023-11-15 16:44:41.710979','2023-11-15 16:44:41.710979','ㅊㅌㅋㅊㅋ','N','RETURN',1,'ADMIN'),(365,'2023-11-15 16:46:07.519684','2023-11-15 16:46:07.519684','ㅇㄴ','N','RETURN',1,'ADMIN'),(366,'2023-11-15 16:53:30.391024','2023-11-15 16:53:30.391024','동시1','N','RETURN',1,'ADMIN'),(367,'2023-11-15 16:54:06.020359','2023-11-15 16:54:06.020359','','N','RETURN',1,'ADMIN'),(368,'2023-11-15 16:55:26.392999','2023-11-15 16:55:26.392999','','N','RETURN',1,'ADMIN'),(369,'2023-11-15 16:55:30.978102','2023-11-15 16:55:30.978102','','N','RETURN',1,'ADMIN'),(370,'2023-11-15 16:56:42.150754','2023-11-15 16:56:42.150754','','N','RETURN',1,'ADMIN'),(371,'2023-11-15 16:56:45.740538','2023-11-15 16:56:45.740538','','N','RETURN',1,'ADMIN'),(372,'2023-11-15 16:56:52.967461','2023-11-15 16:56:52.967461','','N','RETURN',1,'ADMIN'),(373,'2023-11-15 17:00:24.059452','2023-11-15 17:00:24.059452','ㅎㅍㅍ효','N','RETURN',1,'ADMIN'),(374,'2023-11-15 17:07:22.586705','2023-11-15 17:07:22.586705','분산1','N','RETURN',1,'ADMIN'),(375,'2023-11-15 17:07:28.833465','2023-11-15 17:07:28.833465','분산2','N','RETURN',1,'ADMIN'),(376,'2023-11-15 17:07:35.470839','2023-11-15 17:07:35.470839','분산3','N','RETURN',1,'ADMIN'),(377,'2023-11-15 17:07:42.593786','2023-11-15 17:07:42.593786','분산4','N','RETURN',1,'ADMIN'),(378,'2023-11-15 17:07:49.006786','2023-11-15 17:07:49.006786','분산5','N','RETURN',1,'ADMIN'),(379,'2023-11-15 17:12:14.926692','2023-11-15 17:12:14.926692','ㄴㅇ','N','RETURN',1,'ADMIN'),(380,'2023-11-15 17:12:21.861778','2023-11-15 17:12:21.861778','되냐?','N','RETURN',1,'ADMIN'),(381,'2023-11-15 17:13:45.003296','2023-11-15 17:13:45.003296','제발 이번엔?제발 이번엔?제발 이번엔?제발 이번엔?','N','RETURN',1,'ADMIN'),(382,'2023-11-15 17:17:17.645534','2023-11-15 17:17:17.645534','이번엔?','N','RETURN',1,'ADMIN'),(383,'2023-11-15 17:17:20.695611','2023-11-15 17:17:20.695611','ㄹ','N','RETURN',1,'ADMIN'),(384,'2023-11-15 17:17:30.260700','2023-11-15 17:17:30.260700','ㄴㅇㄹ','N','RETURN',1,'ADMIN'),(385,'2023-11-15 17:20:47.437937','2023-11-15 17:20:47.437937','뭔가?','N','RETURN',1,'ADMIN'),(386,'2023-11-15 17:21:42.656898','2023-11-15 17:21:42.656898','ㅇㄹ','N','RETURN',1,'ADMIN'),(387,'2023-11-15 17:22:09.354344','2023-11-15 17:22:09.354344','ㅇㄹ','N','RETURN',1,'ADMIN'),(388,'2023-11-15 17:23:39.074677','2023-11-15 17:23:39.074677','드가자','N','RETURN',1,'ADMIN'),(389,'2023-11-15 17:38:05.506213','2023-11-15 17:38:05.506213','이번엔 찐이냐?','N','RETURN',1,'ADMIN'),(390,'2023-11-15 17:56:48.076091','2023-11-15 17:56:48.076091','분산1','N','RETURN',1,'ADMIN'),(391,'2023-11-15 17:56:57.882985','2023-11-15 17:56:57.882985','분산2','N','RETURN',1,'ADMIN'),(392,'2023-11-15 17:57:12.478163','2023-11-15 17:57:12.478163','분산3','N','RETURN',1,'ADMIN'),(393,'2023-11-15 17:57:26.582962','2023-11-15 17:57:26.582962','분산4','N','RETURN',1,'ADMIN'),(394,'2023-11-15 17:57:39.259905','2023-11-15 17:57:39.259905','분산5','N','RETURN',1,'ADMIN'),(395,'2023-11-15 17:57:48.287566','2023-11-15 17:57:48.287566','분산6','N','RETURN',1,'ADMIN'),(396,'2023-11-15 17:57:57.014483','2023-11-15 17:57:57.014483','분산7','N','RETURN',1,'ADMIN'),(397,'2023-11-15 17:58:07.099578','2023-11-15 17:58:07.099578','분산8','N','RETURN',1,'ADMIN'),(398,'2023-11-15 17:58:18.230124','2023-11-15 17:58:18.230124','분산9','N','RETURN',1,'ADMIN'),(399,'2023-11-15 20:24:35.267611','2023-11-15 20:24:35.267611','communication error','N','RETURNREJECTION',1,'USER'),(400,'2023-11-15 20:25:46.761611','2023-11-15 20:25:46.761611','counter error','N','RETURNREJECTION',1,'USER'),(401,'2023-11-15 20:26:27.080403','2023-11-15 20:26:27.080403','testing','N','RETURN',1,'ADMIN'),(402,'2023-11-15 20:27:10.946506','2023-11-15 20:27:10.946506','test2','N','RETURN',1,'ADMIN'),(403,'2023-11-15 20:27:37.754216','2023-11-15 20:27:37.754216','test3','N','RETURN',1,'ADMIN'),(404,'2023-11-16 03:43:11.747333','2023-11-16 03:43:11.747333','ㅇ','N','RETURN',1,'ADMIN'),(405,'2023-11-16 09:43:13.678602','2023-11-16 09:43:13.678602','dkl;kfds','N','RETURN',1,'ADMIN'),(406,'2023-11-16 10:03:08.229246','2023-11-16 10:03:08.229246','이번엔?','N','RETURN',1,'ADMIN'),(407,'2023-11-16 10:04:35.551907','2023-11-16 10:04:35.551907','sdf','N','RETURN',1,'ADMIN'),(408,'2023-11-16 10:04:45.897721','2023-11-16 10:04:45.897721','dfasf','N','RETURN',1,'ADMIN'),(409,'2023-11-16 10:06:04.023357','2023-11-16 10:06:04.023357','','N','RETURN',1,'ADMIN'),(410,'2023-11-16 10:21:12.993491','2023-11-16 10:21:12.993491','에러있어?','N','RETURN',1,'ADMIN'),(411,'2023-11-16 10:24:06.502741','2023-11-16 10:24:06.502741','','N','RETURN',1,'ADMIN'),(413,'2023-11-16 10:29:23.433019','2023-11-16 10:29:23.433019','조태규는 보아라','N','RETURN',6,'ADMIN'),(414,'2023-11-16 10:33:12.245133','2023-11-16 10:33:12.245133','메일 댐?','N','RETURN',1,'ADMIN'),(415,'2023-11-16 10:35:50.230075','2023-11-16 10:35:50.230075','이건 됌?','N','RETURN',1,'ADMIN'),(416,'2023-11-16 10:37:54.148785','2023-11-16 10:37:54.148785','counter error','N','RETURNACCEPT',1,'USER'),(417,'2023-11-16 10:38:15.911010','2023-11-16 10:38:15.911010','조태규 꿀밤 500배','N','RETURN',6,'ADMIN'),(418,'2023-11-16 10:38:43.076510','2023-11-16 10:38:43.076510','counter error','N','RETURNREJECTION',6,'USER'),(419,'2023-11-16 10:40:50.031185','2023-11-16 10:40:50.031185','counter error','N','RETURNREJECTION',1,'USER'),(420,'2023-11-16 10:43:34.138806','2023-11-16 10:43:34.138806','온도가 너무 뜨거워서 못살겠어요','N','RETURN',6,'ADMIN'),(421,'2023-11-16 10:44:21.368498','2023-11-16 10:44:21.368498','counter error','N','RETURNACCEPT',6,'USER'),(422,'2023-11-16 10:45:07.741217','2023-11-16 10:45:07.741217','counter error','N','RETURNREJECTION',1,'USER'),(423,'2023-11-16 10:45:15.898868','2023-11-16 10:45:15.898868','온도가 너무 뜨겁습니다.','N','RETURN',6,'ADMIN'),(424,'2023-11-16 10:45:31.388575','2023-11-16 10:45:31.388575','counter error','N','RETURNREJECTION',1,'USER'),(425,'2023-11-16 10:47:13.992184','2023-11-16 10:47:13.992184','communication error','N','RETURNREJECTION',6,'USER'),(426,'2023-11-16 10:48:57.962629','2023-11-16 10:48:57.962629','communication error','N','RETURNREJECTION',1,'USER'),(427,'2023-11-16 10:49:24.489069','2023-11-16 10:49:24.489069','배터리가 정상이 아닌것 같습니다.','N','RETURN',6,'ADMIN'),(428,'2023-11-16 10:50:57.499701','2023-11-16 10:50:57.499701','communication error','N','RETURNREJECTION',6,'USER'),(429,'2023-11-16 11:08:19.249696','2023-11-16 11:08:19.249696','ewq','N','RETURN',1,'ADMIN'),(430,'2023-11-16 11:09:41.734481','2023-11-16 11:09:41.734481','counter error','N','RETURNREJECTION',1,'USER'),(431,'2023-11-16 11:11:24.928159','2023-11-16 11:11:24.928159','counter error','N','RETURNREJECTION',1,'USER'),(432,'2023-11-16 11:12:17.297516','2023-11-16 11:12:17.297516','counter error','N','RETURNREJECTION',1,'USER'),(433,'2023-11-16 11:28:40.301489','2023-11-16 11:28:40.301489','counter error','N','RETURNREJECTION',1,'USER'),(434,'2023-11-16 12:31:59.922486','2023-11-16 12:31:59.922486','온도가 이상해요오','N','RETURN',8,'ADMIN'),(435,'2023-11-16 12:33:25.426764','2023-11-16 12:33:25.426764','counter error','N','RETURNREJECTION',1,'USER'),(436,'2023-11-16 12:34:55.510105','2023-11-16 12:34:55.510105','counter error','N','RETURNREJECTION',1,'USER'),(437,'2023-11-16 12:39:34.367506','2023-11-16 12:39:34.367506','counter error','N','RETURNREJECTION',1,'USER'),(438,'2023-11-16 12:40:31.305355','2023-11-16 12:40:31.305355','가즈아','N','RETURN',8,'ADMIN'),(439,'2023-11-16 12:41:39.355464','2023-11-16 12:41:39.355464','counter error','N','RETURNREJECTION',1,'USER'),(440,'2023-11-16 12:42:54.368642','2023-11-16 12:42:54.368642','전압이 높아요!!','N','RETURN',8,'ADMIN'),(441,'2023-11-16 12:43:34.832675','2023-11-16 12:43:34.832675','counter error','N','RETURNREJECTION',1,'USER'),(442,'2023-11-16 12:48:25.260688','2023-11-16 12:48:25.260688','counter error','N','RETURNREJECTION',1,'USER'),(443,'2023-11-16 12:50:21.094920','2023-11-16 12:50:21.094920','1','N','RETURN',8,'ADMIN'),(444,'2023-11-16 12:50:25.919367','2023-11-16 12:50:25.919367','2','N','RETURN',8,'ADMIN'),(445,'2023-11-16 12:50:30.777011','2023-11-16 12:50:30.777011','3','N','RETURN',8,'ADMIN'),(446,'2023-11-16 12:50:43.776181','2023-11-16 12:50:43.776181','counter error','N','RETURNREJECTION',1,'USER'),(447,'2023-11-16 12:50:43.166536','2023-11-16 12:50:43.166536','4','N','RETURN',8,'ADMIN'),(448,'2023-11-16 12:50:51.260255','2023-11-16 12:50:51.260255','5','N','RETURN',8,'ADMIN'),(449,'2023-11-16 12:51:08.858988','2023-11-16 12:51:08.858988','6','N','RETURN',8,'ADMIN'),(450,'2023-11-16 12:51:15.543177','2023-11-16 12:51:15.543177','7','N','RETURN',8,'ADMIN'),(451,'2023-11-16 12:51:23.190388','2023-11-16 12:51:23.190388','8','N','RETURN',8,'ADMIN'),(452,'2023-11-16 12:51:33.411359','2023-11-16 12:51:33.411359','9','N','RETURN',8,'ADMIN'),(453,'2023-11-16 12:51:42.122704','2023-11-16 12:51:42.122704','10','N','RETURN',8,'ADMIN'),(454,'2023-11-16 13:03:46.558571','2023-11-16 13:03:46.558571','counter error','N','RETURNREJECTION',1,'USER'),(455,'2023-11-16 13:05:47.604878','2023-11-16 13:05:47.604878','sf','N','RETURN',1,'ADMIN'),(456,'2023-11-16 13:31:30.117641','2023-11-16 13:31:30.117641','counter error','N','RETURNREJECTION',1,'USER'),(457,'2023-11-16 13:35:54.762361','2023-11-16 13:35:54.762361','전압','N','RETURN',8,'ADMIN'),(458,'2023-11-16 13:45:28.378861','2023-11-16 13:45:28.378861','counter error','N','RETURNREJECTION',1,'USER'),(459,'2023-11-16 13:47:35.398654','2023-11-16 13:47:35.398654','전류 ','N','RETURN',8,'ADMIN'),(460,'2023-11-16 13:50:00.871593','2023-11-16 13:50:00.871593','이번엔?','N','RETURN',8,'ADMIN'),(461,'2023-11-16 13:52:13.324705','2023-11-16 13:52:13.324705','counter error','N','RETURNREJECTION',1,'USER'),(462,'2023-11-16 13:53:06.495727','2023-11-16 13:53:06.495727','이번엔?2','N','RETURN',8,'ADMIN'),(463,'2023-11-16 13:54:20.833730','2023-11-16 13:54:20.833730','이번?','N','RETURN',8,'ADMIN'),(464,'2023-11-16 13:56:29.626435','2023-11-16 13:56:29.626435','counter error','N','RETURNREJECTION',1,'USER'),(465,'2023-11-16 13:58:47.771921','2023-11-16 13:58:47.771921','이번엔?','N','RETURN',8,'ADMIN'),(466,'2023-11-16 14:07:02.290794','2023-11-16 14:07:02.290794','제발','N','RETURN',8,'ADMIN'),(467,'2023-11-16 14:07:20.468980','2023-11-16 14:07:20.468980','counter error','N','RETURNREJECTION',1,'USER'),(468,'2023-11-16 14:08:33.260255','2023-11-16 14:08:33.260255','ㅇㄹㅇ','N','RETURN',8,'ADMIN'),(469,'2023-11-16 14:09:01.115408','2023-11-16 14:09:01.115408','counter error','N','RETURNREJECTION',1,'USER'),(470,'2023-11-16 14:10:16.250142','2023-11-16 14:10:16.250142','ㅇㄹㅇ','N','RETURN',8,'ADMIN'),(471,'2023-11-16 14:14:10.614533','2023-11-16 14:14:10.614533','counter error','N','RETURNREJECTION',1,'USER'),(472,'2023-11-16 14:16:30.262346','2023-11-16 14:16:30.262346','counter error','N','RETURNREJECTION',1,'USER'),(473,'2023-11-16 14:16:26.634569','2023-11-16 14:16:26.634569','이건?','N','RETURN',8,'ADMIN'),(474,'2023-11-16 14:18:17.463682','2023-11-16 14:18:17.463682','counter error','N','RETURNREJECTION',1,'USER'),(475,'2023-11-16 14:18:56.444562','2023-11-16 14:18:56.444562','ㅇㄹ','N','RETURN',8,'ADMIN'),(476,'2023-11-16 14:20:22.870622','2023-11-16 14:20:22.870622','counter error','N','RETURNREJECTION',1,'USER'),(477,'2023-11-16 14:26:13.845956','2023-11-16 14:26:13.845956','counter error','N','RETURNREJECTION',1,'USER'),(478,'2023-11-16 14:28:23.381140','2023-11-16 14:28:23.381140','counter error','N','RETURNREJECTION',1,'USER'),(479,'2023-11-16 14:30:56.050401','2023-11-16 14:30:56.050401','counter error','N','RETURNREJECTION',1,'USER'),(480,'2023-11-16 14:43:07.745243','2023-11-16 14:43:07.745243','counter error','N','RETURNREJECTION',1,'USER'),(481,'2023-11-16 14:45:18.325220','2023-11-16 14:45:18.325220','counter error','N','RETURNREJECTION',1,'USER'),(482,'2023-11-16 14:55:05.786524','2023-11-16 14:55:05.786524','counter error','N','RETURNREJECTION',1,'USER'),(483,'2023-11-16 15:06:28.204784','2023-11-16 15:06:28.204784','counter error','N','RETURNREJECTION',1,'USER'),(484,'2023-11-16 15:07:38.226035','2023-11-16 15:07:38.226035','counter error','N','RETURNREJECTION',1,'USER'),(485,'2023-11-16 15:10:41.576936','2023-11-16 15:10:41.576936','counter error','N','RETURNREJECTION',1,'USER'),(486,'2023-11-16 15:12:05.907657','2023-11-16 15:12:05.907657','counter error','N','RETURNREJECTION',1,'USER'),(487,'2023-11-16 15:12:29.512621','2023-11-16 15:12:29.512621','counter error','N','RETURNREJECTION',1,'USER'),(488,'2023-11-16 15:13:03.911234','2023-11-16 15:13:03.911234','배터리가 이상한 거 같습니다','N','RETURN',8,'ADMIN'),(489,'2023-11-16 15:22:41.579869','2023-11-16 15:22:41.579869','안녕하세요 테스트','N','RETURN',6,'ADMIN'),(490,'2023-11-16 15:23:09.489622','2023-11-16 15:23:09.489622','counter error','N','RETURNREJECTION',8,'USER'),(491,'2023-11-16 15:24:37.854645','2023-11-16 15:24:37.854645','크하하하하하하','N','RETURN',6,'ADMIN'),(492,'2023-11-16 15:25:33.598782','2023-11-16 15:25:33.598782','기타 상세 사유 : ','N','RETURNREJECTION',6,'USER'),(493,'2023-11-16 15:34:57.323414','2023-11-16 15:34:57.323414','누구구야야야','N','RETURN',8,'ADMIN'),(494,'2023-11-16 16:06:56.330024','2023-11-16 16:06:56.330024','','N','RETURN',1,'ADMIN'),(495,'2023-11-16 16:24:07.558488','2023-11-16 16:24:07.558488','저희 배터리가 이상해요','N','RETURN',8,'ADMIN'),(496,'2023-11-16 16:24:31.254104','2023-11-16 16:24:31.254104','저희 배터리가 이상해요','N','RETURN',1,'ADMIN'),(497,'2023-11-16 16:24:47.971995','2023-11-16 16:24:47.971995','저희 배터리가 진짜 이상해요','N','RETURN',1,'ADMIN'),(498,'2023-11-16 16:54:05.765569','2023-11-16 16:54:05.765569','이번엔?','N','RETURN',1,'ADMIN'),(499,'2023-11-16 16:54:22.787155','2023-11-16 16:54:22.787155','온도가 높아요!','N','RETURN',1,'ADMIN'),(500,'2023-11-16 17:02:37.507458','2023-11-16 17:02:37.507458','배터리가 터질려고 해요!','N','RETURN',1,'ADMIN'),(501,'2023-11-16 17:04:48.593321','2023-11-16 17:04:48.593321','배터리가 뜨거워요','N','RETURN',1,'ADMIN'),(502,'2023-11-16 17:05:06.865538','2023-11-16 17:05:06.865538','배터리가 이상해요','N','RETURN',1,'ADMIN'),(503,'2023-11-16 17:07:39.186548','2023-11-16 17:07:39.186548','온도가 뜨거워요','N','RETURN',1,'ADMIN'),(504,'2023-11-16 17:12:00.935312','2023-11-16 17:12:00.935312','이게 안돼?','N','RETURN',6,'ADMIN'),(505,'2023-11-16 17:13:32.014101','2023-11-16 17:13:32.014101','counter error','N','RETURNREJECTION',6,'USER'),(506,'2023-11-16 17:13:40.884681','2023-11-16 17:13:40.884681','진짜 안됌?','N','RETURN',6,'ADMIN'),(507,'2023-11-16 17:19:52.896568','2023-11-16 17:19:52.896568','counter error','N','RETURNREJECTION',6,'USER'),(508,'2023-11-16 17:20:04.093165','2023-11-16 17:20:04.093165','ㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈㅈ','N','RETURN',6,'ADMIN'),(509,'2023-11-16 17:22:13.801137','2023-11-16 17:22:13.801137','counter error','N','RETURNREJECTION',6,'USER'),(510,'2023-11-16 17:22:26.380677','2023-11-16 17:22:26.380677','이거 무어마','N','RETURN',6,'ADMIN'),(511,'2023-11-16 17:26:10.264120','2023-11-16 17:26:10.264120','배터리 노화','N','RETURNREJECTION',1,'USER'),(512,'2023-11-16 17:26:37.406107','2023-11-16 17:26:37.406107','counter error','N','RETURNREJECTION',6,'USER'),(513,'2023-11-16 17:26:49.973976','2023-11-16 17:26:49.973976','또또또','N','RETURN',6,'ADMIN'),(514,'2023-11-16 17:26:50.729487','2023-11-16 17:26:50.729487','배터리가 금방 과열되요','N','RETURN',8,'ADMIN'),(515,'2023-11-16 17:31:27.811988','2023-11-16 17:31:27.811988','배터리가 뜨거워요','N','RETURN',8,'ADMIN'),(516,'2023-11-16 17:36:52.213680','2023-11-16 17:36:52.213680','반송하고 싶어요','N','RETURN',8,'ADMIN'),(517,'2023-11-16 17:47:11.577696','2023-11-16 17:47:11.577696','연결 이상','N','RETURNREJECTION',8,'USER'),(518,'2023-11-16 17:48:09.286853','2023-11-16 17:48:09.286853','연결 이상','N','RETURNREJECTION',8,'USER'),(519,'2023-11-16 17:51:55.545996','2023-11-16 17:51:55.545996','전압 이상','N','RETURNACCEPT',8,'USER'),(520,'2023-11-16 17:57:33.031868','2023-11-16 17:57:33.031868','연결 이상','N','RETURNREJECTION',8,'USER'),(521,'2023-11-16 19:01:42.900712','2023-11-16 19:01:42.900712','배터리 온도가 높아요','N','RETURN',8,'ADMIN'),(522,'2023-11-16 19:04:50.795193','2023-11-16 19:04:50.795193','반품 신청합니다','N','RETURN',8,'ADMIN'),(523,'2023-11-16 19:06:51.694046','2023-11-16 19:06:51.694046','정상','N','RETURNREJECTION',8,'USER'),(524,'2023-11-16 19:07:19.478439','2023-11-16 19:07:19.478439','연결 이상','N','RETURNREJECTION',8,'USER'),(525,'2023-11-16 19:09:04.296015','2023-11-16 19:09:04.296015','전류 이상','N','RETURNACCEPT',8,'USER'),(526,'2023-11-16 19:32:32.790314','2023-11-16 19:32:32.790314','정상','N','RETURNREJECTION',8,'USER'),(527,'2023-11-16 19:35:45.662467','2023-11-16 19:35:45.662467','정상','N','RETURNREJECTION',8,'USER'),(528,'2023-11-16 19:37:01.588747','2023-11-16 19:37:01.588747','연결 이상','N','RETURNREJECTION',8,'USER'),(529,'2023-11-16 19:37:49.630298','2023-11-16 19:37:49.630298','정상','N','RETURNREJECTION',8,'USER'),(530,'2023-11-16 19:43:53.210733','2023-11-16 19:43:53.210733','정상','N','RETURNREJECTION',8,'USER'),(531,'2023-11-16 19:53:48.165792','2023-11-16 19:53:48.165792','정상','N','RETURNREJECTION',8,'USER'),(532,'2023-11-16 19:55:53.890918','2023-11-16 19:55:53.890918','정상','N','RETURNREJECTION',8,'USER'),(533,'2023-11-16 20:20:20.334225','2023-11-16 20:20:20.334225','배터리가 \n뜨거워요','N','RETURN',1,'ADMIN'),(534,'2023-11-16 20:21:09.624748','2023-11-16 20:21:09.624748','전류 이상','N','RETURNACCEPT',1,'USER'),(535,'2023-11-16 20:22:25.354835','2023-11-16 20:22:25.354835','온도가 높아요!','N','RETURN',1,'ADMIN'),(536,'2023-11-16 20:39:12.543049','2023-11-16 20:39:12.543049','','N','RETURN',1,'ADMIN'),(537,'2023-11-16 20:39:14.638214','2023-11-16 20:39:14.638214','','N','RETURN',1,'ADMIN'),(538,'2023-11-16 20:39:17.857853','2023-11-16 20:39:17.857853','','N','RETURN',1,'ADMIN'),(539,'2023-11-16 20:39:22.973691','2023-11-16 20:39:22.973691','','N','RETURN',1,'ADMIN'),(540,'2023-11-16 20:39:30.062922','2023-11-16 20:39:30.062922','정상','N','RETURNREJECTION',1,'USER'),(541,'2023-11-16 20:39:43.703037','2023-11-16 20:39:43.703037','','N','RETURN',1,'ADMIN'),(542,'2023-11-16 20:41:13.563626','2023-11-16 20:41:13.563626','정상','N','RETURNREJECTION',1,'USER'),(543,'2023-11-16 20:47:58.873104','2023-11-16 20:47:58.873104','연결 이상','N','RETURNREJECTION',1,'USER'),(544,'2023-11-16 20:49:16.362262','2023-11-16 20:49:16.362262','배터리 노화','N','RETURNREJECTION',1,'USER'),(545,'2023-11-16 20:50:51.552065','2023-11-16 20:50:51.552065','','N','RETURN',8,'ADMIN'),(546,'2023-11-16 20:50:53.135549','2023-11-16 20:50:53.135549','','N','RETURN',8,'ADMIN');
/*!40000 ALTER TABLE `alarm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-16 23:17:32