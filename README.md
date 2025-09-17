
# SCMC WEBSITE

เว็บไซต์นี้เป็นเว็บไซต์ของ **ศูนย์บริหารจัดการเมืองอัจฉริยะ มหาวิทยาลัยเชียงใหม่ (SCMC)** ซึ่งรวมลิงค์ และบริการต่างๆทั้งหมดของมหาวิทยาลัยเชียงใหม่ไว้ในที่เดียว

## คุณสมบัติหลัก

-  **Next.js 15.2.4:** ใช้ระบบ Routing ใหม่ล่าสุดของ Next.js เพื่อประสิทธิภาพที่ดียิ่งขึ้น
-  **TypeScript:** เพิ่มความปลอดภัยในการเขียนโค้ดและลดข้อผิดพลาดด้วย TypeScript
-  **Tailwind CSS:** จัดการ Style ได้อย่างรวดเร็วด้วย Utility-first framework
-  **i18next:** รองรับการจัดการภาษาได้หลากหลายภาษา
-  **MinIO:** สำหรับการเก็บ Object file 
-  **pgAdmin:** สำหรับการจัดการ Database
- **PostgreSQL:** เป็น Database หลักของ Project นี้ 

## การติดตั้งและรันโปรเจค

  
**การติดตั้งสิ่งจำเป็นต่างๆ**

-  **Clone Repository:**
	``` bash
		git clone https://github.com/Punnawich02/scmc_web.git
		cd scmc_web
	```
-  **[ติดตั้ง Node.js 18+](https://nodejs.org/en)**
- **ติดตั้ง dependencies ทั้งหมด**
	```bash
		npm install
		# หรือ
		# yarn install
		# pnpm install
	```
- **ตั้งค่า Environment Variables**
สร้างไฟล์ `.env` ในโฟลเดอร์หลักของโปรเจกต์ และใส่ตัวแปรที่จำเป็น

**การรันโปรเจค**
- **การรันสำหรับ Developer (เฉพาะ Frontend)**
	```bash
		npm run dev
	```
	จากนั้น เว็บไซต์จะถูกเปิดมาที่ http://localhost:3000 (โดย Defult)

- **การรันสำหรับ Developer (ใน Docker)**
	การรันด้วย Docker จะรันทั้ง Database ,pgAdmin ,minio และ nextjs project ด้วยคำสั่ง
	```bash
		docker compose up -d
	```	
	โดยที่ 
	- Database จะรันที่ port 5433
	- pgAmin จะรันที่ port 5050
	- MinIO จะรันที่ port 9000(API) / 9001(WebUI)

## โครงสร้างไฟล์คร่าวๆ
```text
scmc_web/
	├── docs/                 	# เก็บ doc ต่างๆของโปรเจคนี้
	├── message/                # เก็บไฟล์ภาษาต่างๆ
	├── prisma/                	# เก็บไฟล์เกี่ยวกับโครงสร้าง Database
	├── public/                 # เก็บรูปภาพต่างๆ
	├── src/
	│   ├── app/                # App Router (หน้าและ Routes ทั้งหมด)
	|		│   ├── [locale]/   # เก็บหน้าเว็บ และ layout
	|		│   ├── api/        # เก็บไฟล์ api route ทั้งหมด
	|		│   └── lib/        # เก็บ lib ทั้งหมดที่ใช้
	│   ├── i18n/         	    # ใช้สำหรับเก็บไฟล์เกี่ยวกับระบบเปลี่ยนนภาษา
	└── ...
```

## สคริปต์ที่ใช้บ่อย

-   `npm run dev`: รันเซิร์ฟเวอร์ในโหมด Developer พร้อม Hot-reloading
    
-   `npm run build`: สร้างโปรเจกต์สำหรับ Production
    
-   `npm run start`: รันโปรเจกต์ที่ Build แล้วในโหมด Production
    
-   `npm run lint`: ตรวจสอบและแก้ไขโค้ดที่ผิดตามหลัก ESLint