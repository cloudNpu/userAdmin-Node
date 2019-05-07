/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : node_user

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 05/05/2019 15:39:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for types
-- ----------------------------
DROP TABLE IF EXISTS `types`;
CREATE TABLE `types` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `t_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of types
-- ----------------------------
BEGIN;
INSERT INTO `types` VALUES (1, '军官');
INSERT INTO `types` VALUES (2, '士官');
INSERT INTO `types` VALUES (3, '义务兵');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `u_age` int(11) DEFAULT NULL,
  `type_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `type_id` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, '张小磊', 30, 1);
INSERT INTO `users` VALUES (2, '李辉', 33, 1);
INSERT INTO `users` VALUES (3, '张明', 21, 2);
INSERT INTO `users` VALUES (4, '丁江', 23, 2);
INSERT INTO `users` VALUES (5, '王大峰', 25, 2);
INSERT INTO `users` VALUES (6, '张义国', 18, 3);
INSERT INTO `users` VALUES (7, '赵刚', 18, 3);
INSERT INTO `users` VALUES (8, '王刚', 19, 3);
INSERT INTO `users` VALUES (9, '宋全兵', 19, 3);
INSERT INTO `users` VALUES (10, '杨义伟', 18, 3);
INSERT INTO `users` VALUES (11, 'test_user', 18, 3);
INSERT INTO `users` VALUES (12, 'test_user', 18, 3);
INSERT INTO `users` VALUES (13, 'test_user', 18, 3);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
