-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 29, 2026 at 02:10 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asset_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `assetdepreciation`
--

CREATE TABLE `assetdepreciation` (
  `asset_depreciation_depreciation_id` int NOT NULL,
  `asset_depreciation_asset_id` int NOT NULL,
  `asset_depreciation_calculation_date` date NOT NULL,
  `asset_depreciation_annual_depreciation` decimal(10,2) NOT NULL,
  `asset_depreciation_remaining_value` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `assetdepreciation`
--

INSERT INTO `assetdepreciation` (`asset_depreciation_depreciation_id`, `asset_depreciation_asset_id`, `asset_depreciation_calculation_date`, `asset_depreciation_annual_depreciation`, `asset_depreciation_remaining_value`) VALUES
(1, 1, '2023-12-31', 4600.00, 13800.00),
(2, 1, '2024-12-31', 4600.00, 9200.00),
(3, 2, '2023-12-31', 2375.00, 4750.00),
(4, 3, '2023-12-31', 350.00, 2450.00),
(5, 4, '2023-12-31', 900.00, 3600.00),
(6, 5, '2023-12-31', 7000.00, 21000.00),
(7, 6, '2023-12-31', 3000.00, 9000.00),
(8, 7, '2023-12-31', 2400.00, 7200.00),
(9, 8, '2023-12-31', 642.86, 1928.58),
(10, 9, '2023-12-31', 475.00, 1900.00),
(11, 10, '2023-12-31', 1083.33, 4333.35);

-- --------------------------------------------------------

--
-- Table structure for table `assetinspections`
--

CREATE TABLE `assetinspections` (
  `asset_inspections_inspection_id` int NOT NULL,
  `asset_inspections_asset_id` int NOT NULL,
  `asset_inspections_department` varchar(255) NOT NULL,
  `asset_inspections_department_id` int NOT NULL,
  `asset_inspections_inspection_date` date NOT NULL,
  `asset_inspections_status` enum('found','not_found','not_checked') NOT NULL,
  `asset_inspections_inspector_name` varchar(255) NOT NULL,
  `asset_inspections_notes` text,
  `asset_inspections_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `assetinspections`
--

INSERT INTO `assetinspections` (`asset_inspections_inspection_id`, `asset_inspections_asset_id`, `asset_inspections_department`, `asset_inspections_department_id`, `asset_inspections_inspection_date`, `asset_inspections_status`, `asset_inspections_inspector_name`, `asset_inspections_notes`, `asset_inspections_created_at`) VALUES
(1, 1, 'ฝ่ายบุคคล', 1, '2023-02-01', 'found', 'นิว แผนกบุคคล', 'สภาพดี ใช้งานทุกวัน', '2026-01-29 13:01:34'),
(2, 1, 'ฝ่ายบุคคล', 1, '2023-12-20', 'found', 'นิว แผนกบุคคล', 'ทำความสะอาดใหญ่ปลายปี', '2026-01-29 13:01:34'),
(3, 2, 'ฝ่ายการเงิน', 2, '2023-03-15', 'found', 'ก้อย การเงิน', 'พิมพ์ได้ปกติ มีกระดาษค้างเป็นบางครั้ง', '2026-01-29 13:01:34'),
(4, 3, 'ฝ่ายบุคคล', 1, '2023-01-10', 'not_found', 'เจ้าหน้าที่ฝ่ายบุคคล', 'โต๊ะตัวหนึ่งถูกย้ายไปมุมรับรอง', '2026-01-29 13:01:34'),
(5, 4, 'งานธุรการสำนักงาน', 3, '2023-04-20', 'found', 'เฟิร์น ธุรการ', 'เอกสารแน่นตู้ แนะนำจัดระเบียบ', '2026-01-29 13:01:34'),
(6, 5, 'ประชาสัมพันธ์', 4, '2023-06-05', 'found', 'เมย์ ประชาสัมพันธ์', 'แบตเริ่มเสื่อม ต้องเสียบปลั๊กบ่อย', '2026-01-29 13:01:34'),
(7, 6, 'งานประชุม', 6, '2023-07-18', 'found', 'บอล ไอที', 'ภาพเริ่มไม่คมชัดเท่าเดิม', '2026-01-29 13:01:34'),
(8, 7, 'ฝ่ายการเงิน', 2, '2023-08-10', 'found', 'ก้อย การเงิน', 'สแกนเอก���ารได้ปกติ', '2026-01-29 13:01:34'),
(9, 8, 'ฝ่ายบริหาร', 5, '2023-09-01', 'found', 'อาร์ต ผู้อำนวยการ', 'ใช้งานรับสายเป็นบางช่วง', '2026-01-29 13:01:34'),
(10, 9, 'งานธุรการสำนักงาน', 3, '2023-11-11', 'found', 'แม่บ้านเวรเช้า', 'ชั้นรับน้ำหนักแฟ้มได้ดี', '2026-01-29 13:01:34'),
(11, 10, 'งานแม่บ้าน', 7, '2023-10-01', 'not_checked', 'แม่บ้านเวรบ่าย', 'ติดภารกิจ ทำความสะอาดไม่ครบ', '2026-01-29 13:01:34'),
(12, 1, 'ฝ่ายบุคคล', 1, '2024-02-01', 'found', 'นิว แผนกบุคคล', 'ยังใช้งานได้ดี', '2026-01-29 13:01:34'),
(13, 2, 'ฝ่ายการเงิน', 2, '2024-03-20', 'found', 'ก้อย การเงิน', 'เริ่มมีปัญหาดึงกระดาษสองแผ่น', '2026-01-29 13:01:34'),
(14, 5, 'ประชาสัมพันธ์', 4, '2024-01-15', 'found', 'เมย์ ประชาสัมพันธ์', 'จอมีรอยขีดข่วนเล็กน้อย', '2026-01-29 13:01:34'),
(15, 6, 'งานประชุม', 6, '2024-04-10', 'not_found', 'บอล ไอที', 'โปรเจคเตอร์ถูกย้ายไปห้องอื่น ยังไม่ได้อัปเดต', '2026-01-29 13:01:34'),
(16, 7, 'ฝ่ายการเงิน', 2, '2024-05-05', 'found', 'ก้อย การเงิน', 'ยังใช้งานได้ปกติ', '2026-01-29 13:01:34'),
(17, 8, 'ฝ่ายบริหาร', 5, '2024-06-01', 'found', 'อาร์ต ผู้อำนวยการ', 'เสียงปกติ แต่สายโทรศัพท์ตึงเล็กน้อย', '2026-01-29 13:01:34'),
(18, 1, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'found', 'ผู้ตรวจ', '', '2026-01-29 13:33:04'),
(19, 3, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'found', 'ผู้ตรวจ', '', '2026-01-29 13:33:04'),
(20, 3, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'not_found', 'ผู้ตรวจ', '', '2026-01-29 13:34:28'),
(21, 3, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'not_found', 'ผู้ตรวจ', '', '2026-01-29 13:34:33'),
(22, 3, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'not_found', 'ผู้ตรวจ', '', '2026-01-29 13:34:43'),
(23, 6, 'ห้องประชุมเล็ก', 4, '2026-01-29', 'not_checked', 'ผู้ตรวจ', '', '2026-01-29 13:34:47'),
(24, 3, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'not_found', 'ผู้ตรวจ', '', '2026-01-29 13:35:22'),
(25, 1, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'not_found', 'ผู้ตรวจ', '', '2026-01-29 13:35:27'),
(26, 4, 'โถงสำนักงานกลาง', 3, '2026-01-29', 'not_checked', 'ผู้ตรวจ', '', '2026-01-29 13:35:31'),
(27, 1, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'not_found', 'ผู้ตรวจ', '', '2026-01-29 13:35:43'),
(28, 3, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'not_found', 'ผู้ตรวจ', '', '2026-01-29 13:35:43'),
(29, 1, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'not_found', 'ผู้ตรวจ', '', '2026-01-29 13:37:46'),
(30, 1, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'not_found', 'ผู้ตรวจ', '', '2026-01-29 13:37:55'),
(31, 1, 'ห้องฝ่ายบุคคล', 1, '2026-01-29', 'found', 'ผู้ตรวจ', '', '2026-01-29 13:40:13');

-- --------------------------------------------------------

--
-- Table structure for table `assetrecommendations`
--

CREATE TABLE `assetrecommendations` (
  `asset_recommendations_recommendation_id` int NOT NULL,
  `asset_recommendations_asset_id` int NOT NULL,
  `asset_recommendations_recommendation` text NOT NULL,
  `asset_recommendations_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `assetrecommendations`
--

INSERT INTO `assetrecommendations` (`asset_recommendations_recommendation_id`, `asset_recommendations_asset_id`, `asset_recommendations_recommendation`, `asset_recommendations_created_at`) VALUES
(1, 1, 'ใกล้ครบอายุการใช้งาน แนะนำเตรียมงบเปลี่ยนเครื่องคอมพิวเตอร์ฝ่ายบุคคลใน 2 ปีข้างหน้า', '2026-01-29 13:01:34'),
(2, 2, 'ควรเตรียมงบเปลี่ยนเครื่องพิมพ์ฝ่ายการเงิน เนื่องจากค่าเสื่อมใกล้หมดและมีปัญหาเรื่องการดึงกระดาษ', '2026-01-29 13:01:34'),
(3, 4, 'แนะนำสำรองงบสำหรับเปลี่ยนตู้เก็บเอกสาร หากเริ่มมีสนิมหรือบานประตูปิดไม่สนิท', '2026-01-29 13:01:34'),
(4, 5, 'โน้ตบุ๊กประชาสัมพันธ์เริ่มใช้งานหนัก แนะนำเตรียมงบเปลี่ยนใน 1-2 ปี', '2026-01-29 13:01:34'),
(5, 6, 'โปรเจคเตอร์เริ่มภาพไม่คม แนะนำตรวจสภาพและอาจตั้งงบเปลี่ยนหลอดหรือเครื่องใหม่', '2026-01-29 13:01:34'),
(6, 8, 'โทรศัพท์ตั้งโต๊ะเก่าแล้ว แต่ยังพอใช้งานได้ แนะนำเตรียมตัวเปลี่ยนหากเริ่มมีสัญญาณขาดๆ หายๆ', '2026-01-29 13:01:34');

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `assets_asset_id` int NOT NULL,
  `assets_asset_code` varchar(50) NOT NULL,
  `assets_asset_name` varchar(255) NOT NULL,
  `assets_supervisor_id` int DEFAULT NULL,
  `assets_responsible_person` varchar(255) NOT NULL,
  `assets_location_id` int NOT NULL,
  `assets_purchase_date` date NOT NULL,
  `assets_purchase_price` decimal(10,2) NOT NULL,
  `assets_useful_life_years` int NOT NULL,
  `assets_status` enum('active','disposed','damaged') DEFAULT 'active',
  `assets_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `assets_updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`assets_asset_id`, `assets_asset_code`, `assets_asset_name`, `assets_supervisor_id`, `assets_responsible_person`, `assets_location_id`, `assets_purchase_date`, `assets_purchase_price`, `assets_useful_life_years`, `assets_status`, `assets_created_at`, `assets_updated_at`) VALUES
(1, 'AS001', 'คอมพิวเตอร์ตั้งโต๊ะฝ่ายบุคคล', 1, 'นิว แผนกบุคคล', 1, '2022-05-10', 23000.00, 5, 'active', '2026-01-29 13:01:34', '2026-01-29 13:13:16'),
(2, 'AS002', 'เครื่องพิมพ์เอกสารเลเซอร์ฝ่ายการเงิน', 2, 'ก้อย การเงิน', 2, '2021-11-20', 9500.00, 4, 'active', '2026-01-29 13:01:34', '2026-01-29 13:01:34'),
(3, 'AS003', 'โต๊ะทำงานไม้ลายโอ๊ค ฝ่ายบุคคล', 1, 'เจ้าหน้าที่ฝ่ายบุคคล', 1, '2020-06-01', 3500.00, 10, 'active', '2026-01-29 13:01:34', '2026-01-29 13:01:34'),
(4, 'AS004', 'ตู้เก็บเอกสารเหล็ก 4 ชั้น', 3, 'เฟิร์น ธุรการ', 3, '2019-03-15', 7200.00, 8, 'active', '2026-01-29 13:01:34', '2026-01-29 13:01:34'),
(5, 'AS005', 'โน้ตบุ๊กงานประชาสัมพันธ์', 4, 'เมย์ ประชาสัมพันธ์', 7, '2023-01-12', 28000.00, 4, 'active', '2026-01-29 13:01:34', '2026-01-29 13:01:34'),
(6, 'AS006', 'โปรเจคเตอร์ห้องประชุมเล็ก', 6, 'บอล ไอที', 4, '2020-09-05', 15000.00, 5, 'active', '2026-01-29 13:01:34', '2026-01-29 13:01:34'),
(7, 'AS007', 'เครื่องสแกนเอกสาร', 2, 'เจ้าหน้าที่การเงิน', 2, '2022-03-18', 12000.00, 5, 'active', '2026-01-29 13:01:34', '2026-01-29 13:01:34'),
(8, 'AS008', 'โทรศัพท์ตั้งโต๊ะผู้อำนวยการ', 5, 'อาร์ต ผู้อำนวยการ', 6, '2018-11-01', 4500.00, 7, 'active', '2026-01-29 13:01:34', '2026-01-29 13:01:34'),
(9, 'AS009', 'ชั้นวางของในห้องเก็บของ', 7, 'แม่บ้านเวรเช้า', 9, '2019-07-22', 3800.00, 8, 'active', '2026-01-29 13:01:34', '2026-01-29 13:01:34'),
(10, 'AS010', 'เครื่องดูดฝุ่นสำนักงาน', 7, 'แม่บ้านเวรบ่าย', 10, '2021-02-10', 6500.00, 6, 'active', '2026-01-29 13:01:34', '2026-01-29 13:01:34');

-- --------------------------------------------------------

--
-- Table structure for table `assettransfers`
--

CREATE TABLE `assettransfers` (
  `asset_transfers_transfer_id` int NOT NULL,
  `asset_transfers_asset_id` int NOT NULL,
  `asset_transfers_previous_location` varchar(255) NOT NULL,
  `asset_transfers_new_location` varchar(255) NOT NULL,
  `asset_transfers_transfer_date` date NOT NULL,
  `asset_transfers_reason` varchar(255) DEFAULT NULL,
  `asset_transfers_transferred_by` varchar(255) DEFAULT NULL,
  `asset_transfers_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `assettransfers`
--

INSERT INTO `assettransfers` (`asset_transfers_transfer_id`, `asset_transfers_asset_id`, `asset_transfers_previous_location`, `asset_transfers_new_location`, `asset_transfers_transfer_date`, `asset_transfers_reason`, `asset_transfers_transferred_by`, `asset_transfers_created_at`) VALUES
(1, 1, 'ห้องประชุมเล็ก', 'ห้องฝ่ายบุคคล', '2023-01-10', 'ย้ายมาใช้สำหรับงานเอกสารบุคคลประจำวัน', 'เกล พัสดุ', '2026-01-29 13:01:34'),
(2, 2, 'โถงสำนักงานกลาง', 'ห้องการเงิน', '2022-08-05', 'ให้เครื่องพิมพ์อยู่ใกล้ฝ่ายการเงิน', 'เฟิร์น ธุรการ', '2026-01-29 13:01:34'),
(3, 4, 'ห้องเก็บของชั้นล่าง', 'โถงสำนักงานกลาง', '2021-05-20', 'ย้ายขึ้นมาเก็บแฟ้มที่ใช้งานบ่อย', 'นิว แผนกบุคคล', '2026-01-29 13:01:34'),
(4, 5, 'โถงสำนักงานกลาง', 'ห้องประชาสัมพันธ์', '2023-03-01', 'ให้ใช้ทำสื่อประชาสัมพันธ์', 'เมย์ ประชาสัมพันธ์', '2026-01-29 13:01:34'),
(5, 6, 'ห้องผู้อำนวยการ', 'ห้องประชุมเล็ก', '2021-10-15', 'ย้ายไปใช้ในห้องประชุมประจำ', 'บอล ไอที', '2026-01-29 13:01:34'),
(6, 7, 'ห้องจัดซื้อจัดจ้าง', 'ห้องการเงิน', '2023-09-01', 'ย้ายเครื่องสแกนมาใช้งานร่วมกับฝ่ายการเงิน', 'โบว์ จัดซื้อ', '2026-01-29 13:01:34');

-- --------------------------------------------------------

--
-- Table structure for table `auditlogs`
--

CREATE TABLE `auditlogs` (
  `audit_logs_log_id` int NOT NULL,
  `audit_logs_table_name` varchar(255) NOT NULL,
  `audit_logs_record_id` int NOT NULL,
  `audit_logs_change_type` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `audit_logs_old_data` text,
  `audit_logs_new_data` text,
  `audit_logs_changed_by` varchar(255) DEFAULT NULL,
  `audit_logs_changed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `auditlogs`
--

INSERT INTO `auditlogs` (`audit_logs_log_id`, `audit_logs_table_name`, `audit_logs_record_id`, `audit_logs_change_type`, `audit_logs_old_data`, `audit_logs_new_data`, `audit_logs_changed_by`, `audit_logs_changed_at`) VALUES
(1, 'Assets', 1, 'UPDATE', '{\"assets_location_id\":4}', '{\"assets_location_id\":1}', 'เกล พัสดุ', '2026-01-29 13:01:34'),
(2, 'Assets', 2, 'UPDATE', '{\"assets_status\":\"active\"}', '{\"assets_status\":\"damaged\"}', 'ก้อย การเงิน', '2026-01-29 13:01:34'),
(3, 'AssetInspections', 4, 'INSERT', NULL, '{\"asset_id\":3,\"status\":\"not_found\"}', 'เจ้าหน้าที่ฝ่ายบุคคล', '2026-01-29 13:01:34'),
(4, 'AssetDepreciation', 1, 'INSERT', NULL, '{\"asset_id\":1,\"year\":2023,\"annual\":4600}', 'เกล พัสดุ', '2026-01-29 13:01:34');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `departments_department_id` int NOT NULL,
  `departments_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`departments_department_id`, `departments_name`) VALUES
(1, 'ฝ่ายบุคคล'),
(2, 'ฝ่ายการเงิน'),
(3, 'งานธุรการสำนักงาน'),
(4, 'ประชาสัมพันธ์'),
(5, 'ฝ่ายบริหาร'),
(6, 'งานประชุม'),
(7, 'งานแม่บ้าน');

-- --------------------------------------------------------

--
-- Table structure for table `inspectioncriteria`
--

CREATE TABLE `inspectioncriteria` (
  `inspection_criteria_criteria_id` int NOT NULL,
  `inspection_criteria_asset_id` int NOT NULL,
  `inspection_criteria_criteria_type` enum('standard','custom') NOT NULL,
  `inspection_criteria_description` text NOT NULL,
  `inspection_criteria_frequency_days` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `inspectioncriteria`
--

INSERT INTO `inspectioncriteria` (`inspection_criteria_criteria_id`, `inspection_criteria_asset_id`, `inspection_criteria_criteria_type`, `inspection_criteria_description`, `inspection_criteria_frequency_days`) VALUES
(1, 1, 'standard', 'เช็คการเปิด–ปิดเครื่อง และทำความสะอาดคีย์บอร์ด/หน้าจอ', 30),
(2, 1, 'custom', 'สำรองข้อมูลเอกสารบุคคลลง External Drive', 90),
(3, 2, 'standard', 'ทดสอบการพิมพ์ ตรวจหมึกและกระดาษติดเครื่อง', 60),
(4, 3, 'standard', 'ตรวจน็อตขาโต๊ะและหน้าโต๊ะไม่แตกหรือบิ่น', 180),
(5, 4, 'custom', 'เช็คบานประตูตู้ ลิ้นชักเลื่อนเข้าออกได้ปกติ', 120),
(6, 5, 'standard', 'ตรวจสายชาร์จ แบตเตอรี่ และสภาพจอภาพ', 60),
(7, 6, 'standard', 'ทดสอบภาพและเสียงของโปรเจคเตอร์', 90),
(8, 7, 'standard', 'ทดสอบการสแกนและเชื่อมต่อกับคอมพิวเตอร์', 60),
(9, 8, 'standard', 'ทดสอบการโทรเข้า–ออก เสียงชัดเจน', 365),
(10, 9, 'standard', 'ตรวจความแน่นของชั้นวาง ไม่เอียงหรือโยก', 365),
(11, 10, 'standard', 'ทดสอบการดูดฝุ่น เช็คถุงเก็บฝุ่นและสายไฟ', 90);

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `locations_location_id` int NOT NULL,
  `locations_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`locations_location_id`, `locations_name`) VALUES
(1, 'ห้องฝ่ายบุคคล'),
(2, 'ห้องการเงิน'),
(3, 'โถงสำนักงานกลาง'),
(4, 'ห้องประชุมเล็ก'),
(5, 'ห้องเก็บของชั้นล่าง'),
(6, 'ห้องผู้อำนวยการ'),
(7, 'ห้องประชาสัมพันธ์'),
(8, 'ห้องจัดซื้อจัดจ้าง'),
(9, 'ห้องเก็บของสำรอง'),
(10, 'ห้องแม่บ้าน');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_user_id` int NOT NULL,
  `users_name` varchar(255) NOT NULL,
  `users_email` varchar(255) DEFAULT NULL,
  `users_role` enum('supervisor','responsible_person','admin') NOT NULL,
  `users_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_user_id`, `users_name`, `users_email`, `users_role`, `users_created_at`) VALUES
(1, 'นิว แผนกบุคคล', 'new.hr@example.com', 'supervisor', '2026-01-29 13:01:34'),
(2, 'ก้อย การเงิน', 'koi.finance@example.com', 'supervisor', '2026-01-29 13:01:34'),
(3, 'เฟิร์น ธุรการ', 'fern.office@example.com', 'responsible_person', '2026-01-29 13:01:34'),
(4, 'เกล พัสดุ', 'kae.asset@example.com', 'admin', '2026-01-29 13:01:34'),
(5, 'บอล ไอที', 'ball.it@example.com', 'responsible_person', '2026-01-29 13:01:34'),
(6, 'เมย์ ประชาสัมพันธ์', 'may.pr@example.com', 'responsible_person', '2026-01-29 13:01:34'),
(7, 'อาร์ต ผู้อำนวยการ', 'art.director@example.com', 'supervisor', '2026-01-29 13:01:34'),
(8, 'โบว์ จัดซื้อ', 'bow.procurement@example.com', 'responsible_person', '2026-01-29 13:01:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assetdepreciation`
--
ALTER TABLE `assetdepreciation`
  ADD PRIMARY KEY (`asset_depreciation_depreciation_id`),
  ADD KEY `asset_depreciation_asset_id` (`asset_depreciation_asset_id`);

--
-- Indexes for table `assetinspections`
--
ALTER TABLE `assetinspections`
  ADD PRIMARY KEY (`asset_inspections_inspection_id`),
  ADD KEY `asset_inspections_asset_id` (`asset_inspections_asset_id`),
  ADD KEY `asset_inspections_department_id` (`asset_inspections_department_id`);

--
-- Indexes for table `assetrecommendations`
--
ALTER TABLE `assetrecommendations`
  ADD PRIMARY KEY (`asset_recommendations_recommendation_id`),
  ADD KEY `asset_recommendations_asset_id` (`asset_recommendations_asset_id`);

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`assets_asset_id`),
  ADD KEY `assets_supervisor_id` (`assets_supervisor_id`),
  ADD KEY `assets_location_id` (`assets_location_id`);

--
-- Indexes for table `assettransfers`
--
ALTER TABLE `assettransfers`
  ADD PRIMARY KEY (`asset_transfers_transfer_id`),
  ADD KEY `asset_transfers_asset_id` (`asset_transfers_asset_id`);

--
-- Indexes for table `auditlogs`
--
ALTER TABLE `auditlogs`
  ADD PRIMARY KEY (`audit_logs_log_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`departments_department_id`);

--
-- Indexes for table `inspectioncriteria`
--
ALTER TABLE `inspectioncriteria`
  ADD PRIMARY KEY (`inspection_criteria_criteria_id`),
  ADD KEY `inspection_criteria_asset_id` (`inspection_criteria_asset_id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`locations_location_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_user_id`),
  ADD UNIQUE KEY `users_email` (`users_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assetdepreciation`
--
ALTER TABLE `assetdepreciation`
  MODIFY `asset_depreciation_depreciation_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `assetinspections`
--
ALTER TABLE `assetinspections`
  MODIFY `asset_inspections_inspection_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `assetrecommendations`
--
ALTER TABLE `assetrecommendations`
  MODIFY `asset_recommendations_recommendation_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `assets_asset_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `assettransfers`
--
ALTER TABLE `assettransfers`
  MODIFY `asset_transfers_transfer_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `auditlogs`
--
ALTER TABLE `auditlogs`
  MODIFY `audit_logs_log_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `departments_department_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `inspectioncriteria`
--
ALTER TABLE `inspectioncriteria`
  MODIFY `inspection_criteria_criteria_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `locations_location_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `users_user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assetdepreciation`
--
ALTER TABLE `assetdepreciation`
  ADD CONSTRAINT `assetdepreciation_ibfk_1` FOREIGN KEY (`asset_depreciation_asset_id`) REFERENCES `assets` (`assets_asset_id`);

--
-- Constraints for table `assetinspections`
--
ALTER TABLE `assetinspections`
  ADD CONSTRAINT `assetinspections_ibfk_1` FOREIGN KEY (`asset_inspections_asset_id`) REFERENCES `assets` (`assets_asset_id`),
  ADD CONSTRAINT `assetinspections_ibfk_2` FOREIGN KEY (`asset_inspections_department_id`) REFERENCES `departments` (`departments_department_id`);

--
-- Constraints for table `assetrecommendations`
--
ALTER TABLE `assetrecommendations`
  ADD CONSTRAINT `assetrecommendations_ibfk_1` FOREIGN KEY (`asset_recommendations_asset_id`) REFERENCES `assets` (`assets_asset_id`);

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`assets_supervisor_id`) REFERENCES `departments` (`departments_department_id`),
  ADD CONSTRAINT `assets_ibfk_2` FOREIGN KEY (`assets_location_id`) REFERENCES `locations` (`locations_location_id`);

--
-- Constraints for table `assettransfers`
--
ALTER TABLE `assettransfers`
  ADD CONSTRAINT `assettransfers_ibfk_1` FOREIGN KEY (`asset_transfers_asset_id`) REFERENCES `assets` (`assets_asset_id`);

--
-- Constraints for table `inspectioncriteria`
--
ALTER TABLE `inspectioncriteria`
  ADD CONSTRAINT `inspectioncriteria_ibfk_1` FOREIGN KEY (`inspection_criteria_asset_id`) REFERENCES `assets` (`assets_asset_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
