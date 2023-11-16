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
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `company` varchar(255) NOT NULL,
  `create_date` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_activated` bit(1) DEFAULT NULL,
  `login_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_lq5wej6688i1bd6b5c11neptj` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'SEMES','2023-10-24','whd1707@gmail.com',_binary '','asd','$2a$10$yKhu2plZcfO/PQPTQSbVbu8D.t0Rs9K6bwSQ..HZZYKa6yGkEwqqS','ADMIN','01021224429'),(2,'qwer','2023-10-24','whd1707@gmail.com',_binary '','qwer','$2a$10$sCBDqYVHSmHtFqvJtA14tOY.lumjhwQ8vqwK5zcXm.f17M0SSWRDa','ADMIN','01012345677'),(3,'ssafy9기','2023-10-31','whd1707@gmail.com',_binary '','지한얼','$2a$10$EqVVXxeDMZemgxQXPGGE7.DH/Ur7rZiBWMk3uAeIsA2u4Kayw0d9a','ADMIN','01027200204'),(4,'ssafy','2023-10-31','whd1707@gmail.com',_binary '','ssafy','$2a$10$LPLH0Vt28GLlXc2YKgyI.ejmb7dgxUZSqjNy4BJUoZxWlR8Re4g3G','USER','01000000000'),(5,'SSAFY','2023-11-10','whd1707@gmail.com',_binary '','test','$2a$10$.Y8qBeyADvLlVoPGlcG0tuwOvfowa6KfIltfcuW6t7FjV7d0nDiwa','ADMIN','01012345678'),(6,'삼성전자 SDS',NULL,'ssafy',_binary '','user','$2a$10$YfGYz5CAmBAN.kS.WyCm9uvagD2YVUkP5hKgiqa/SooKNjbH4vFay','USER','01021224429'),(7,'삼성SDI',NULL,'sdi@naver.com',_binary '','sdikkd','$2a$10$1OR9NsDZGIT1J/bdrpnLp.pf.q1Sy9q8PtG98L5jPLtlmiDb0YKM2','ADMIN','01021224429'),(8,'삼성전자 DX',NULL,'adj0707@gmail.com',_binary '','samsung01','$2a$10$1Of1UxMeXQRsnJnUgTGACu0GLQ0kwnNDSuCg6GY39PzRZjpLrGJka','USER','01073554659');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-16 23:17:31
