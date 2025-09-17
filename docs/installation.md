# การติดตั้งและการรันโปรเจค

## ข้อกำหนดเบื้องต้น
* **Node.js:** เวอร์ชั้น 18.x หรือใหม่กว่า
* **npm:** เวอร์ชัน 8.x หรือใหม่กว่า
* **OS:** macOS, Windows(ลง WSL แล้ว) หรือ Linux

**ขั้นตอนการติดตั้ง**

-  **[ติดตั้ง Node.js 18+](https://nodejs.org/en)**
-  **Clone Repository:**
	``` bash
		git clone https://github.com/Punnawich02/scmc_web.git
		cd scmc_web
	```
- **ตั้งค่า Environment Variables**
    สร้างไฟล์ `.env` ในโฟลเดอร์หลักของโปรเจกต์ และใส่ตัวแปรที่จำเป็น
- **ติดตั้ง dependencies ทั้งหมด**
	```bash
		npm install
		# หรือ
		# yarn install
		# pnpm install
	```

**การรันโปรเจค**
- **การรันสำหรับ Developer (เฉพาะ Frontend/Backend)**
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

- **โหมด Production (เฉพาะ Frontend/Backend)**
	```bash
		npm run build
        npm run start
	```
	จากนั้น เว็บไซต์จะถูกเปิดมาที่ http://localhost:3000 (โดย Defult)