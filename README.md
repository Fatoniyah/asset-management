# ระบบบริหารจัดการครุภัณฑ์ในหน่วยงาน (Asset Management)

เว็บแอปสำหรับบริหารจัดการครุภัณฑ์ในหน่วยงาน/สำนักงาน  
รองรับการเก็บข้อมูลครุภัณฑ์, ตรวจนับทรัพย์สินประจำปี, บันทึกค่าเสื่อมราคา, การโยกย้ายครุภัณฑ์ และการวิเคราะห์ด้วย AI

โปรเจกต์นี้แบ่งเป็น 2 ส่วนหลัก:

- **backend/** – Node.js + Express + MySQL
- **frontend/** – React

## คุณสมบัติหลัก (Features)

- จัดเก็บข้อมูลครุภัณฑ์ (ทะเบียนสินทรัพย์)
  - รหัสครุภัณฑ์, ชื่อ, แผนก, ผู้รับผิดชอบ, สถานที่ตั้ง
  - วันที่ซื้อ, ราคาซื้อ, อายุการใช้งาน (useful life)
- ติดตามสถานะครุภัณฑ์
  - สถานะ `ใช้งาน/ ไม่ใช้งาน`
  - ประวัติการโอนย้ายระหว่างห้อง/แผนก
- บันทึกการตรวจสอบครุภัณฑ์ (Asset Inspections)
  - สถานะการตรวจ `found / not_found / not_checked`
  - หมายเหตุสภาพการใช้งาน
  - ผูกกับแผนก/ห้องที่ตรวจจริง
- บันทึกค่าเสื่อมราคา (Asset Depreciation)
  - เก็บข้อมูลค่าเสื่อมประจำปี และมูลค่าคงเหลือ
- การโยกย้ายครุภัณฑ์ (Asset Transfers)
  - สถานที่เดิม/ใหม่, เหตุผลการย้าย, ผู้ดำเนินการ
- **AI วิเคราะห์ครุภัณฑ์**
  - วิเคราะห์จากอายุการใช้งาน, ราคาซื้อ, สถานะ และข้อมูลอื่น ๆ
  - ให้คำแนะนำในการจัดการ/วางแผนงบประมาณ

## โครงสร้างโปรเจกต์ (Project Structure)

asset-management/
├─ backend/
│  ├─ models/
│  ├─ routes/
│  ├─ node_modules/
│  ├─ db.js
│  ├─ server.js
│  ├─ package.json
│  └─ .env           
│
├─ frontend/
│  ├─ public/
│  ├─ src/
│  ├─ node_modules/
│  ├─ package.json
│  └─ .env            
│
├─ asset_management.sql   
│
└─ .gitignore

## เทคโนโลยีที่ใช้ (Tech Stack)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- `mysql2` / `mysql` driver (เชื่อมต่อฐานข้อมูล)
- [OpenAI Node.js SDK](https://github.com/openai/openai-node) (ใช้สำหรับ AI วิเคราะห์ครุภัณฑ์)

### Frontend
- [React](https://react.dev/)
- [Axios](https://axios-http.com/) สำหรับเรียก REST API
- Component พื้นฐาน เช่น `Table`, `Button` (อยู่ใน `frontend/src/ui-core/`)



## การใช้งานฟีเจอร์ AI วิเคราะห์ครุภัณฑ์

ในหน้า **AI วิเคราะห์ครุภัณฑ์**

- ระบบจะโหลดข้อมูลครุภัณฑ์จาก `/api/assets`
- ผู้ใช้กดปุ่ม “วิเคราะห์” รายแถว
- Frontend จะส่งข้อมูลครุภัณฑ์ไปที่ `POST /api/ai/asset-analysis`
- Backend จะสร้าง `prompt` + เรียก OpenAI แล้วส่งข้อความวิเคราะห์กลับมา
- หน้าจอแสดงคำแนะนำของ AI ในคอลัมน์ “คำแนะนำ AI”


