/*
Navicat MySQL Data Transfer

Source Server         : zhangjl
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : profitplus

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2016-11-02 16:25:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `annualinterest`
-- ----------------------------
DROP TABLE IF EXISTS `annualinterest`;
CREATE TABLE `annualinterest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `interest` double NOT NULL,
  `startDate` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of annualinterest
-- ----------------------------
INSERT INTO `annualinterest` VALUES ('1', '0.12', '2016-10-09');

-- ----------------------------
-- Table structure for `buyrecord`
-- ----------------------------
DROP TABLE IF EXISTS `buyrecord`;
CREATE TABLE `buyrecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `buyTime` datetime NOT NULL,
  `predictAmount` double NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `state` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_buyRecord_user` (`userId`),
  KEY `fk_buyRecord_product` (`productId`),
  CONSTRAINT `fk_buyRecord_product` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_buyRecord_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of buyrecord
-- ----------------------------
INSERT INTO `buyrecord` VALUES ('1', '1000', '2016-06-05 21:21:17', '1013.56', '8', '1', '1');
INSERT INTO `buyrecord` VALUES ('2', '400', '2016-11-01 21:33:09', '424.66', '8', '2', '0');
INSERT INTO `buyrecord` VALUES ('3', '200', '2016-11-01 21:50:35', '212.33', '9', '2', '0');

-- ----------------------------
-- Table structure for `credit`
-- ----------------------------
DROP TABLE IF EXISTS `credit`;
CREATE TABLE `credit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creditNum` int(11) NOT NULL,
  `restDepositCredit` int(11) NOT NULL,
  `restPurchaseCredit` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of credit
-- ----------------------------
INSERT INTO `credit` VALUES ('8', '200', '5', '9');
INSERT INTO `credit` VALUES ('9', '150', '5', '10');
INSERT INTO `credit` VALUES ('10', '100', '5', '10');

-- ----------------------------
-- Table structure for `credit2maxdebit`
-- ----------------------------
DROP TABLE IF EXISTS `credit2maxdebit`;
CREATE TABLE `credit2maxdebit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startCredit` int(11) NOT NULL,
  `endCredit` int(11) NOT NULL,
  `maxDebit` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of credit2maxdebit
-- ----------------------------
INSERT INTO `credit2maxdebit` VALUES ('1', '170', '180', '1000');
INSERT INTO `credit2maxdebit` VALUES ('2', '180', '190', '2000');
INSERT INTO `credit2maxdebit` VALUES ('3', '190', '200', '3000');
INSERT INTO `credit2maxdebit` VALUES ('4', '200', '210', '4000');
INSERT INTO `credit2maxdebit` VALUES ('5', '210', '220', '5000');
INSERT INTO `credit2maxdebit` VALUES ('6', '220', '230', '6000');
INSERT INTO `credit2maxdebit` VALUES ('7', '230', '99999999', '7000');
INSERT INTO `credit2maxdebit` VALUES ('8', '150', '170', '500');

-- ----------------------------
-- Table structure for `debit`
-- ----------------------------
DROP TABLE IF EXISTS `debit`;
CREATE TABLE `debit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `stageNum` int(11) NOT NULL,
  `state` char(1) DEFAULT '0',
  `debitDate` datetime NOT NULL,
  `eachAmount` double NOT NULL,
  `currStage` int(11) NOT NULL,
  `annualInterestId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_debit_annualInterest` (`annualInterestId`),
  KEY `fk_debit_user` (`userId`),
  CONSTRAINT `fk_debit_annualInterest` FOREIGN KEY (`annualInterestId`) REFERENCES `annualinterest` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_debit_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of debit
-- ----------------------------
INSERT INTO `debit` VALUES ('1', '500', '1', '3', '2016-09-22 21:37:30', '505', '1', '1', '8');
INSERT INTO `debit` VALUES ('2', '200', '2', '0', '2016-11-01 21:49:50', '101.5', '0', '1', '9');
INSERT INTO `debit` VALUES ('3', '200', '3', '0', '2016-11-03 00:05:44', '68', '0', '1', '8');
INSERT INTO `debit` VALUES ('5', '250', '1', '0', '2016-11-03 00:16:03', '252.5', '0', '1', '8');
INSERT INTO `debit` VALUES ('6', '100', '2', '0', '2016-11-03 00:21:08', '50.75', '0', '1', '9');
INSERT INTO `debit` VALUES ('7', '110', '3', '0', '2016-11-03 00:21:28', '37.4', '0', '1', '9');
INSERT INTO `debit` VALUES ('8', '10', '1', '0', '2016-11-03 00:23:19', '10.1', '0', '1', '9');
INSERT INTO `debit` VALUES ('9', '10', '1', '0', '2016-11-03 00:23:49', '10.1', '0', '1', '9');
INSERT INTO `debit` VALUES ('10', '200', '2', '2', '2016-09-10 00:39:49', '101.5', '0', '1', '8');
INSERT INTO `debit` VALUES ('11', '250', '5', '0', '2016-11-03 00:40:21', '51.51', '0', '1', '8');
INSERT INTO `debit` VALUES ('12', '200', '2', '1', '2016-09-27 11:05:14', '101.5', '0', '1', '8');

-- ----------------------------
-- Table structure for `manager`
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `password` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES ('2', 'admin', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO `manager` VALUES ('3', 'zhangAdmin', 'e10adc3949ba59abbe56e057f20f883e');

-- ----------------------------
-- Table structure for `merchant`
-- ----------------------------
DROP TABLE IF EXISTS `merchant`;
CREATE TABLE `merchant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `password` varchar(36) NOT NULL,
  `merchantName` varchar(25) NOT NULL,
  `description` varchar(150) NOT NULL,
  `legalIdcardImg` varchar(50) NOT NULL,
  `licenseImg` varchar(50) NOT NULL,
  `state` char(1) NOT NULL DEFAULT '0',
  `balance` double NOT NULL DEFAULT '0',
  `paymentPassword` varchar(36) NOT NULL,
  `email` varchar(20) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `registerTime` datetime NOT NULL,
  `managerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_merchant_manager` (`managerId`),
  CONSTRAINT `fk_merchant_manager` FOREIGN KEY (`managerId`) REFERENCES `manager` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of merchant
-- ----------------------------
INSERT INTO `merchant` VALUES ('2', 'xiaoniu', 'e10adc3949ba59abbe56e057f20f883e', '小牛资本', '小牛资本-为有闲散资金的多元客户提供低门槛、专业可信赖的互联网理财服务', '04500961-ed25-4d31-8bb8-8d10601f9512.jpg', '1b6793b1-e4d9-4a3e-b373-c528ca76f650.jpg', '1', '4786.44', 'e10adc3949ba59abbe56e057f20f883e', '415979576@qq.com', '15818348972', '2016-02-01 20:33:00', '2');
INSERT INTO `merchant` VALUES ('3', 'zhaozhaoli', 'e10adc3949ba59abbe56e057f20f883e', '朝朝金服', '为有闲散资金的多元客户提供低门槛、专业可信赖的互联网理财服务', '6f1a3e1e-00f5-4f96-bfb7-bb81a51acd0b.jpg', '6ce8dc8e-e974-4ebc-99af-cf683e179e4b.jpg', '0', '0', 'e10adc3949ba59abbe56e057f20f883e', '569750687@qq.com', '15818348972', '2016-11-05 00:25:36', null);

-- ----------------------------
-- Table structure for `notice`
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  `publishTime` datetime NOT NULL,
  `managerId` int(11) NOT NULL,
  `isShow` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_notice_manager` (`managerId`),
  CONSTRAINT `fk_notice_manager` FOREIGN KEY (`managerId`) REFERENCES `manager` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES ('5', '5911f945-c2a7-43ce-b5d6-387fbaa4ed9b.jpg', '有关9月30日18:00-24:00暂停爱月投续投说明', '<p>亲爱的朝朝利个人理财用户：<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 您好！为了促进朝朝利个人理财合规升级，爱月投投资计划续投功能在9月30日18:00-24:00期间暂时关闭，其余时间续投不受影响，请您安排好时间。<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 诚心感谢大家的理解，如有任何疑问请咨询客服热线：400-812-8808，或添加微信服务号：&ldquo;IQJVIP&rdquo;，咨询在线客服。朝朝利个人理财将一如既往地为您打造安全的投资环境，努力推出更优质的产品，期待大家的关注和支持。</p>\r\n\r\n<p>&nbsp;朝朝利个人理财&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<br />\r\n&nbsp;2016年9月27日</p>\r\n', '2016-11-01 21:16:57', '2', '');
INSERT INTO `notice` VALUES ('6', 'e4580ba5-c831-4ea1-80dc-f67474c3c21a.jpg', '关于Android AppStore朝朝利个人理财APP下载说明', '<p>尊敬的朝朝利个人理财用户：<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 您好！由于竞争对手恶意刷榜，苹果公司单方面决定隐藏朝朝利个人理财在App Store的搜索显示，导致目前暂时无法通过在苹果App Store搜索下载朝朝利个人理财APP，已下载的用户仍可以通过App Store进行升级，不受影响。<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 针对搜索屏蔽问题，我们已经第一时间向苹果公司进行申诉，正在协商解决。对仿冒朝朝利个人理财的山寨APP，我们将采取相应法律行动，追究相关侵权行为人的责任，维护我们的正当权益。<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 在此期间，您可以通过扫描下方二维码进行APP下载，或者至朝朝利个人理财官网www.iqianjin.com或m.iqianjin.com进行操作。<br />\r\n&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;朝朝利个人理财（北京）信息科技有限公司<br />\r\n2016-10-28&nbsp;&nbsp;</p>\r\n', '2016-11-01 21:18:08', '2', '');

-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `minAmount` double NOT NULL,
  `productName` varchar(20) NOT NULL,
  `description` varchar(50) NOT NULL,
  `rate` double NOT NULL,
  `keepDay` int(11) NOT NULL,
  `maxAmount` double NOT NULL,
  `restAmount` double NOT NULL,
  `deadline` date NOT NULL,
  `publishTime` datetime NOT NULL,
  `checkTime` datetime DEFAULT NULL,
  `state` char(1) NOT NULL,
  `merchantId` int(11) NOT NULL,
  `managerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_merchant` (`merchantId`),
  KEY `fk_product_manager` (`managerId`),
  CONSTRAINT `fk_product_manager` FOREIGN KEY (`managerId`) REFERENCES `manager` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_product_merchant` FOREIGN KEY (`merchantId`) REFERENCES `merchant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '500', '轻定投', '低门槛 高收益', '0.055', '90', '10000', '10013.56', '2017-05-01', '2016-05-24 20:48:31', '2016-08-25 20:50:01', '2', '2', '2');
INSERT INTO `product` VALUES ('2', '200', '整存宝+', '智能投资　锁定期越长收益率越高', '0.125', '180', '10000', '9400', '2017-03-01', '2016-10-26 21:31:32', '2016-10-26 21:32:03', '2', '2', '2');

-- ----------------------------
-- Table structure for `recommend`
-- ----------------------------
DROP TABLE IF EXISTS `recommend`;
CREATE TABLE `recommend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_recommend_user` (`userId`),
  KEY `fk_recommend_product` (`productId`),
  CONSTRAINT `fk_recommend_product` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_recommend_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of recommend
-- ----------------------------
INSERT INTO `recommend` VALUES ('6', '8', '1');
INSERT INTO `recommend` VALUES ('7', '8', '2');
INSERT INTO `recommend` VALUES ('8', '9', '1');
INSERT INTO `recommend` VALUES ('9', '9', '2');

-- ----------------------------
-- Table structure for `repayment`
-- ----------------------------
DROP TABLE IF EXISTS `repayment`;
CREATE TABLE `repayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `repayDate` datetime NOT NULL,
  `debitId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_repayment_debit` (`debitId`),
  CONSTRAINT `fk_repayment_debit` FOREIGN KEY (`debitId`) REFERENCES `debit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of repayment
-- ----------------------------
INSERT INTO `repayment` VALUES ('1', '505', '2016-11-02 00:04:35', '1');

-- ----------------------------
-- Table structure for `superadmin`
-- ----------------------------
DROP TABLE IF EXISTS `superadmin`;
CREATE TABLE `superadmin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `password` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of superadmin
-- ----------------------------
INSERT INTO `superadmin` VALUES ('1', 'super', 'e10adc3949ba59abbe56e057f20f883e');

-- ----------------------------
-- Table structure for `syslog`
-- ----------------------------
DROP TABLE IF EXISTS `syslog`;
CREATE TABLE `syslog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operatorId` int(11) DEFAULT NULL,
  `operateTime` datetime NOT NULL,
  `description` varchar(100) NOT NULL,
  `type` char(1) NOT NULL,
  `ip` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of syslog
-- ----------------------------
INSERT INTO `syslog` VALUES ('115', '1', '2016-11-01 20:14:20', '登录', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('116', '1', '2016-11-01 20:18:24', '添加管理员admin', '5', '127.0.0.1');
INSERT INTO `syslog` VALUES ('117', '1', '2016-11-01 20:22:36', '注销', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('118', '2', '2016-11-01 20:31:08', '登录', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('119', '2', '2016-11-01 20:31:38', '注销', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('120', '2', '2016-11-01 20:33:00', '商家入驻', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('121', '2', '2016-11-01 20:33:13', '登录', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('122', '2', '2016-11-01 20:34:09', '审核商家 ：2,pass', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('123', '2', '2016-11-01 20:35:16', '商家登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('124', '2', '2016-11-01 20:35:59', '商家注销登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('125', '2', '2016-11-01 20:36:05', '商家登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('126', '1', '2016-11-01 20:39:12', '登录', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('127', '1', '2016-11-01 20:39:32', '注销', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('128', '2', '2016-11-01 20:44:08', '商家登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('129', '2', '2016-11-01 20:48:31', '商家发布理财:2', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('130', '2', '2016-11-01 20:49:37', '商家注销登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('131', '2', '2016-11-01 20:49:43', '登录', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('132', '2', '2016-11-01 20:50:02', '审核产品 ：1,pass', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('133', '2', '2016-11-01 20:50:18', '注销', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('134', '2', '2016-11-01 20:50:25', '商家登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('135', '2', '2016-11-01 20:59:09', '商家登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('136', '2', '2016-11-01 21:01:48', '商家注销登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('137', '8', '2016-11-01 21:02:39', '新用户注册', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('138', '8', '2016-11-01 21:02:52', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('139', '8', '2016-11-01 21:02:58', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('140', '8', '2016-11-01 21:03:26', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('141', '8', '2016-11-01 21:07:34', '用户进行实名认证', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('142', '8', '2016-11-01 21:07:34', '用户进行实名认证', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('143', '8', '2016-11-01 21:12:34', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('144', '2', '2016-11-01 21:12:43', '登录', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('145', '2', '2016-11-01 21:13:21', '审核用户 ：8,pass', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('146', '2', '2016-11-01 21:16:57', '添加公告有关9月30日18:00-24:00暂停爱月投续投说明', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('147', '2', '2016-11-01 21:18:08', '添加公告关于Android AppStore朝朝利个人理财APP下载说明', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('148', '2', '2016-11-01 21:19:17', '注销', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('149', '8', '2016-11-01 21:19:24', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('150', '8', '2016-11-01 21:21:18', '用户购买理财1 金额:1000.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('151', '8', '2016-11-01 21:25:34', 'userRecharge;state=1;userId=8', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('152', '8', '2016-11-01 21:25:34', '即将跳转到易宝充值金额：0.01元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('153', null, '2016-11-01 21:27:17', '用户8充值0.01元', '4', null);
INSERT INTO `syslog` VALUES ('154', '8', '2016-11-01 21:27:48', '用户修改个人信息', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('155', null, '2016-11-01 21:27:49', '刷新用户：8的推荐信息', '4', null);
INSERT INTO `syslog` VALUES ('156', '8', '2016-11-01 21:29:35', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('157', '2', '2016-11-01 21:29:52', '商家登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('158', '2', '2016-11-01 21:31:32', '商家发布理财:2', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('159', '2', '2016-11-01 21:31:43', '商家注销登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('160', '2', '2016-11-01 21:31:50', '登录', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('161', '2', '2016-11-01 21:32:04', '审核产品 ：2,pass', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('162', '2', '2016-11-01 21:32:21', '注销', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('163', '8', '2016-11-01 21:32:33', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('164', '8', '2016-11-01 21:33:10', '用户购买理财2 金额:400.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('165', '8', '2016-11-01 21:37:31', '用户借款:500.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('166', '8', '2016-11-01 21:39:16', '用户修改个人信息', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('167', null, '2016-11-01 21:39:16', '刷新用户：8的推荐信息', '4', null);
INSERT INTO `syslog` VALUES ('168', '8', '2016-11-01 21:40:47', '用户修改个人信息', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('169', null, '2016-11-01 21:41:58', '刷新用户：8的推荐信息', '4', null);
INSERT INTO `syslog` VALUES ('170', '8', '2016-11-01 21:43:15', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('171', '8', '2016-11-01 21:43:41', '用户修改个人信息', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('172', null, '2016-11-01 21:44:17', '刷新用户：8的推荐信息', '4', null);
INSERT INTO `syslog` VALUES ('173', '8', '2016-11-01 21:44:39', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('174', '9', '2016-11-01 21:45:29', '新用户注册', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('175', '9', '2016-11-01 21:45:54', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('176', '9', '2016-11-01 21:46:48', '用户进行实名认证', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('177', '9', '2016-11-01 21:47:24', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('178', '2', '2016-11-01 21:47:34', '登录', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('179', '2', '2016-11-01 21:48:05', '审核用户 ：9,pass', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('180', '2', '2016-11-01 21:48:11', '注销', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('181', '9', '2016-11-01 21:48:20', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('182', '9', '2016-11-01 21:49:51', '用户借款:200.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('183', '9', '2016-11-01 21:50:36', '用户购买理财2 金额:200.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('184', '9', '2016-11-01 21:53:15', '用户修改个人信息', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('185', null, '2016-11-01 21:53:16', '刷新用户：9的推荐信息', '4', null);
INSERT INTO `syslog` VALUES ('186', '9', '2016-11-01 21:55:11', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('187', null, '2016-11-02 00:02:01', '还款日提醒通知，用户8', '4', null);
INSERT INTO `syslog` VALUES ('188', '8', '2016-11-02 00:03:58', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('189', '8', '2016-11-02 00:04:36', '用户还款:505.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('190', '8', '2016-11-02 00:04:36', '用户借款:0.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('191', null, '2016-11-03 00:00:08', '用户收入提醒通知，用户8', '4', null);
INSERT INTO `syslog` VALUES ('192', null, '2016-11-03 00:00:09', '商家支付用户购买理财产品金额提醒通知，商家xiaoniu', '4', null);
INSERT INTO `syslog` VALUES ('193', '8', '2016-11-03 00:00:50', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('194', '8', '2016-11-03 00:07:45', '用户借款:200.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('195', '8', '2016-11-03 00:20:16', '用户借款:250.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('196', '8', '2016-11-03 00:20:41', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('197', '9', '2016-11-03 00:20:50', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('198', '9', '2016-11-03 00:21:11', '用户借款:100.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('199', '9', '2016-11-03 00:23:00', '用户借款:110.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('200', '9', '2016-11-03 00:23:23', '用户借款:10.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('201', '9', '2016-11-03 00:23:55', '用户借款:10.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('202', '9', '2016-11-03 00:28:29', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('203', '8', '2016-11-03 00:28:42', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('204', '8', '2016-11-03 00:39:55', '用户借款:200.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('205', '8', '2016-11-03 00:40:22', '用户借款:250.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('206', null, '2016-11-04 00:00:12', '还款日提醒通知，用户8', '4', null);
INSERT INTO `syslog` VALUES ('207', '8', '2016-11-04 00:00:35', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('208', '8', '2016-11-04 00:06:55', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('209', '2', '2016-11-04 00:07:10', '商家登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('210', '2', '2016-11-04 00:08:29', '商家注销登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('211', '8', '2016-11-04 11:04:40', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('212', '8', '2016-11-04 11:05:16', '用户借款:200.0元', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('213', null, '2016-11-05 00:00:00', '逾期提醒通知，用户8', '4', null);
INSERT INTO `syslog` VALUES ('214', null, '2016-11-05 00:00:01', '还款日提醒通知，用户8', '4', null);
INSERT INTO `syslog` VALUES ('215', '8', '2016-11-05 00:00:13', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('216', '8', '2016-11-05 00:02:21', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('217', '1', '2016-11-05 00:03:38', '登录', '5', '127.0.0.1');
INSERT INTO `syslog` VALUES ('218', '1', '2016-11-05 00:04:06', '添加管理员zhangAdmin', '5', '127.0.0.1');
INSERT INTO `syslog` VALUES ('219', '1', '2016-11-05 00:05:23', '注销', '5', '127.0.0.1');
INSERT INTO `syslog` VALUES ('220', '2', '2016-11-05 00:05:30', '登录', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('221', '2', '2016-11-05 00:17:29', '注销', '3', '127.0.0.1');
INSERT INTO `syslog` VALUES ('222', '10', '2016-11-05 00:20:23', '新用户注册', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('223', '10', '2016-11-05 00:21:03', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('224', '10', '2016-11-05 00:22:47', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('225', '3', '2016-11-05 00:25:36', '商家入驻', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('226', '10', '2016-11-05 00:29:33', '登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('227', '10', '2016-11-05 00:29:47', '注销登录', '1', '127.0.0.1');
INSERT INTO `syslog` VALUES ('228', '2', '2016-11-05 00:30:00', '商家登录', '2', '127.0.0.1');
INSERT INTO `syslog` VALUES ('229', '2', '2016-11-05 00:30:26', '商家注销登录', '2', '127.0.0.1');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(36) NOT NULL,
  `realName` varchar(10) DEFAULT NULL,
  `email` varchar(20) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `creditId` int(11) NOT NULL,
  `address` varchar(25) DEFAULT NULL,
  `idcard` char(18) DEFAULT NULL,
  `idcardImg` varchar(50) DEFAULT NULL,
  `intentMoney` double DEFAULT NULL,
  `intentTime` int(11) DEFAULT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `paymentPassword` varchar(36) DEFAULT NULL,
  `state` char(1) NOT NULL DEFAULT '0',
  `registerTime` datetime NOT NULL,
  `managerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_credit` (`creditId`),
  KEY `fk_user_manager` (`managerId`),
  CONSTRAINT `fk_user_credit` FOREIGN KEY (`creditId`) REFERENCES `credit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_manager` FOREIGN KEY (`managerId`) REFERENCES `manager` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('8', 'zhangjl', 'e10adc3949ba59abbe56e057f20f883e', ' 孔令学', '415979576@qq.com', '15818348972', '1', '1983-01-30', '8', '广东省-深圳市-福田区', '321088198301304871', '6e84f29a-5abb-432d-aedb-d3e82c9a15b9.jpg', '1000', '90', '2713.87', 'e10adc3949ba59abbe56e057f20f883e', '1', '2016-08-01 21:02:39', '2');
INSERT INTO `user` VALUES ('9', 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e', ' 张树宝', '3072355897@qq.com', '15818348972', '1', '1989-10-17', '9', '北京市-北京市-东城区', '130823198910171014', '77b42a2f-e285-43ae-9c90-a136460f948a.jpg', '1000', '90', '1335.25', 'e10adc3949ba59abbe56e057f20f883e', '1', '2016-11-01 21:45:28', '2');
INSERT INTO `user` VALUES ('10', 'xiaomin', 'e10adc3949ba59abbe56e057f20f883e', null, '569750687@qq.com', null, null, null, '10', null, null, null, null, null, '0', null, '0', '2016-11-01 00:20:23', null);
