# คำแนะนำสำหรับการพัฒนา

เอกสารนี้รวบรวมหลักการและคำแนะนำสำหรับการพัฒนาในโปรเจกต์นี้ เพื่อให้การทำงานเป็นไปอย่างมีประสิทธิภาพและมีทิศทางเดียวกัน

## Coding Principles

- **เน้นความอ่านง่าย (Readability):** เขียนโค้ดให้คนอื่นสามารถอ่านและทำความเข้าใจได้ง่าย ใช้ชื่อตัวแปรและฟังก์ชันที่สื่อความหมาย
- **ใช้ TypeScript อย่างเคร่งครัด:** ใช้ Type ที่เหมาะสมกับข้อมูลเสมอเพื่อลดข้อผิดพลาด
- **สร้าง Components ให้เป็นอิสระ:** Components ควรทำหน้าที่ของตัวเองให้ดีที่สุด และไม่ควรมี Logic ที่ซับซ้อนเกินไป
- **หลีกเลี่ยงการเขียนโค้ดซ้ำซ้อน (Don't Repeat Yourself - DRY):** หากพบโค้ดที่ต้องเขียนซ้ำ ให้พิจารณาสร้างเป็น Utility Function หรือ Component ที่นำไปใช้ซ้ำได้

## โครงสร้างไฟล์และโฟลเดอร์

```text
scmc_web/
├── docs/                # เก็บเอกสารประกอบโปรเจ็กต์
├── message/             # ไฟล์ภาษาต่าง ๆ (i18n messages)
├── prisma/              # โครงสร้างและการตั้งค่า Database
├── public/              # ไฟล์สาธารณะ เช่น รูปภาพ, favicon
├── src/
│   ├── app/             # App Router (เพจ + Routes ทั้งหมด)
│   │   ├── [locale]/    # Component ของหน้าเว็บ + layout ตามภาษา
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── components/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── ...
│   │   ├── api/         # ไฟล์ API routes ทั้งหมด
│   │   └── lib/         # ไลบรารีที่ใช้ร่วมกัน
│   ├── i18n/            # การตั้งค่าระบบหลายภาษา
└── ...
```

### message/

เก็บไฟล์ .json สำหรับการแสดงผลตัวอักษรหลายภาษา เช่น

```json
// en.json
{
	"Header": {
		"home": "Home",
		...
	},
	"Footer": {
		"contact_us": "Contact Us",
		...
	},
}
```

```json
// th.json
{
	"Header": {
		"home": "หน้าหลัก",
		...
	},
	"Footer": {
		"contact_us": "ติดต่อเรา",
		...
	},
}
```

### prisma/

เก็บไฟล์โครงสร้างของ Database และประวัติ Migrations

```typescript
generator  client  {
	provider = "prisma-client-js"
}

datasource  db  {
	provider = "postgresql"
	url = env("DATABASE_URL")
}

model  TransitCategory  {
	id Int @id  @default(autoincrement())
	name String @unique
	...

	@@map("transit_category")
}
...
```
