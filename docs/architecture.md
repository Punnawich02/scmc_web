# สถาปัตยกรรม (Architecture)

เอกสารนี้จะอธิบายภาพรวมของสถาปัตยกรรมของโปรเจกต์ รวมถึงการไหลของข้อมูลและส่วนประกอบหลักๆ

---

### **ภาพรวมสถาปัตยกรรม**

โปรเจกต์นี้ใช้ **Next.js App Router** ที่ใช้สถาปัตยกรรมแบบ **Component-based** และ **File-system-based routing**

- **Client Components:** Components ที่รันบน Client-side (Browser) สามารถใช้ Hooks และจัดการ State ได้
- **Server Components:** Components ที่รันบน Server-side (และ Staticly Rendered)
- **API Routes:** Backend API ที่เขียนด้วย Next.js และรันบน Server-side

---

### **การไหลของข้อมูล (Data Flow)**

1.  **ผู้ใช้เข้าถึง URL:** Browser ส่ง Request ไปยังเซิร์ฟเวอร์
2.  **Next.js Server:** Next.js ตรวจสอบ URL และกำหนดว่าจะ Render Page หรือ Route handler ตัวไหน
3.  **Server Components:** Render บน Server, ดึงข้อมูล (fetch data) จากฐานข้อมูลหรือ API ภายนอก
4.  **Client Components:** Server ส่ง HTML พร้อมกับ JavaScript ของ Client Components ไปยัง Browser
5.  **การโต้ตอบ:** เมื่อโค้ด JavaScript รันบน Client-side ผู้ใช้สามารถโต้ตอบกับ Components ที่เป็น Client Components ได้ เช่น การกดปุ่ม หรือการกรอกข้อมูล

---

### **เทคโนโลยีหลัก**

- **Frontend Framework:** Next.js 15+
- **Styling:** Tailwind CSS
- **ภาษา:** TypeScript
- **ฐานข้อมูล:** PostgreSQL + PrismaORM
