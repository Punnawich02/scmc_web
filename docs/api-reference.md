# API Reference

เอกสารนี้รวบรวมข้อมูลเกี่ยวกับ API endpoints ที่มีอยู่ในโปรเจกต์นี้

[ไปส่วน API หมวดหมู่ข้อมูล](#api-หมวดหมู่ข้อมูล)
[ไปส่วน API เนื้อหาข้อมูล](#api-เนื้อหาข้อมูล)
[ไปส่วน API ข่าว](#api-ข่าว)
[ไปส่วน API ไฟล์เอกสาร](#api-ไฟล์เอกสาร)
[ไปส่วน API หมวดหมู่ตารางรถ](#api-หมวดหมู่ตารางรถ)
[ไปส่วน API รูปภาพตารางรถ](#api-รูปภาพตารางรถ)

## API หมวดหมู่ข้อมูล

### Endpoint: /api/data_page

### [ไปที่ File API นี้](/app/api/data_page/route.ts)

#### Method GET

**รายละเอียด:** ใช้สำหรับการแสดงผลหมวดหมู่ทั้งหมดในหน้า บริการข้อมูล
**Response Body:**

```json
[
  {
    "id": 0,
    "name": "",
    "description": "",
    "createdAt": "",
    "displayNameEn": "",
    "displayNameTh": "",
    "createBy": "",
    "editBy": "",
    "web_url": ""
  }
]
```

#### Method POST

**รายละเอียด:** ใช้สำหรับการเพิ่มหมวดหมู่ในหน้า บริการข้อมูล
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

- Request Body:

```json
{
  "name": "",
  "description": "",
  "displayNameTh": "",
  "displayNameEn": "",
  "createBy": ""
}
```

- Response Body:

```json
{
  "id": 0,
  "name": "",
  "description": "",
  "createdAt": "",
  "displayNameEn": "",
  "displayNameTh": "",
  "createBy": "",
  "editBy": "",
  "embeds": "",
  "web_url": ""
}
```

#### Method PUT

**รายละเอียด:** ใช้สำหรับการแก้ไขหมวดหมู่ในหน้า บริการข้อมูล
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

- Request Body:

```json
{
  "id": 0,
  "name": "",
  "description": "",
  "displayNameTh": "",
  "displayNameEn": "",
  "editBy": ""
}
```

- Response Body:

```json
{
  "id": 0,
  "name": "",
  "description": "",
  "createdAt": "",
  "displayNameEn": "",
  "displayNameTh": "",
  "createBy": "",
  "editBy": "",
  "embeds": "",
  "web_url": ""
}
```

#### Method DELETE

- **รายละเอียด:** ใช้สำหรับการลบหมวดหมู่ในหน้า บริการข้อมูล
- **Authenticator:** ใช้ Basic Auth

```text
	username:password
```

- Request Body:

```json
{
  "id": 0
}
```

- Response Body:

```json
{
  "id": 0,
  "name": "",
  "description": "",
  "createdAt": "",
  "displayNameEn": "",
  "displayNameTh": "",
  "createBy": "",
  "editBy": "",
  "embeds": "",
  "web_url": ""
}
```

## API เนื้อหาข้อมูล

### Endpoint: /api/data_page/[category]

โดยที่ [category] คือ ชื่อของหมวดหมู่นั้นๆ

### [ไปที่ File API นี้](/app/api/data_page/[category]/route.ts)

#### Method GET

**รายละเอียด:** ใช้สำหรับการแสดงผลข้อมูล(Data)ในหน้า บริการข้อมูล
**Response Body:**

```json
[
  {
    "id": int,
    "categoryId": int,
    "title": string,
    "embedCode": string,
    "createdAt": string,
    "isActive": boolean,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method POST

**รายละเอียด:** ใช้สำหรับการเพิ่มข้อมูล(Data)ในหน้า บริการข้อมูล
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Resquest Body:**

```json
  {
    "categoryId": int,
    "title": string,
    "embedCode": string,
    "createBy": string,
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "categoryId": int,
    "title": string,
    "embedCode": string,
    "createdAt": string,
    "isActive": boolean,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method PUT

**รายละเอียด:** ใช้สำหรับการแก้ไขข้อมูล(Data)ในหน้า บริการข้อมูล
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Resquest Body:**

```json
  {
	  "id": int,
    "title": string,
    "embedCode": string,
    "editBy": string,
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "categoryId": int,
    "title": string,
    "embedCode": string,
    "createdAt": string,
    "isActive": boolean,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method DELETE

**รายละเอียด:** ใช้สำหรับการลบข้อมูล(Data)ในหน้า บริการข้อมูล
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Resquest Body:**

```json
  {
	  "id": int,
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "categoryId": int,
    "title": string,
    "embedCode": string,
    "createdAt": string,
    "isActive": boolean,
    "createBy": string,
    "editBy": string
  }
]
```

## API ข่าว

### Endpoint: /api/news

### [ไปที่ File API นี้](app/api/news/route.ts)

API นี้มีไว้จัดการ CORS ของ API ข่าวเท่านั้น

## API ไฟล์เอกสาร

### Endpoint: /api/public_doc

### [ไปที่ File API นี้](/app/api/public_doc/route.ts)

#### Method GET

**รายละเอียด:** ใช้สำหรับการแสดงไฟล์เอกสาร
**Response Body:**

```json
[
  {
    "id": int,
    "linkUrl": string,
    "publishedAt": string,
    "isActive": boolean,
    "descriptionEn": string,
    "descriptionTh": string,
    "titleEn": string,
    "titleTh": string,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method POST

**รายละเอียด:** ใช้สำหรับการเพิ่มลิงค์ไฟล์เอกสาร
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Resquest Body:**

```json
  {
    "titleTh": string,
    "titleEn": string,
    "descriptionTh": string,
    "descriptionEn": string,
    "link_url": string,
    "createBy": string,
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "linkUrl": string,
    "publishedAt": string,
    "isActive": boolean,
    "descriptionEn": string,
    "descriptionTh": string,
    "titleEn": string,
    "titleTh": string,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method PUT

**รายละเอียด:** ใช้สำหรับการแก้ไขลิงค์ไฟล์เอกสาร
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Resquest Body:**

```json
  {
	  "id": int
    "titleTh": string,
    "titleEn": string,
    "descriptionTh": string,
    "descriptionEn": string,
    "link_url": string,
    "editBy": string,
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "linkUrl": string,
    "publishedAt": string,
    "isActive": boolean,
    "descriptionEn": string,
    "descriptionTh": string,
    "titleEn": string,
    "titleTh": string,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method PUT

**รายละเอียด:** ใช้สำหรับการแก้ไขลิงค์ไฟล์เอกสาร
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Resquest Body:**

```json
  {
	  "id": int
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "linkUrl": string,
    "publishedAt": string,
    "isActive": boolean,
    "descriptionEn": string,
    "descriptionTh": string,
    "titleEn": string,
    "titleTh": string,
    "createBy": string,
    "editBy": string
  }
]
```

## API หมวดหมู่ตารางรถ

### Endpoint: /api/transit_page

### [ไปที่ File API นี้](/app/api/transit_page/route.ts)

#### Method GET

**รายละเอียด:** ใช้สำหรับการแสดงหมวดหมู่ของตารางเดินรถ
**Response Body:**

```json
[
  {
    "id": int,
    "name": string,
    "displayNameTh": string,
    "displayNameEn": string,
    "createdAt": string,
    "updatedAt": string,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method POST

**รายละเอียด:** ใช้สำหรับการสร้างหมวดหมู่ของตารางเดินรถ
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Request Body:**

```json
  {
    "name": string,
    "displayNameTh": string,
    "displayNameEn": string,
    "createBy": string,
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "name": string,
    "displayNameTh": string,
    "displayNameEn": string,
    "createdAt": string,
    "updatedAt": string,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method PUT

**รายละเอียด:** ใช้สำหรับการแก้ไขหมวดหมู่ของตารางเดินรถ
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Request Body:**

```json
  {
    "id": int,
    "name": string,
    "displayNameTh": string,
    "displayNameEn": string,
    "editBy": string
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "name": string,
    "displayNameTh": string,
    "displayNameEn": string,
    "createdAt": string,
    "updatedAt": string,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method DELETE

**รายละเอียด:** ใช้สำหรับการลบหมวดหมู่ของตารางเดินรถ
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Request Body:**

```json
  {
    "id": int
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "name": string,
    "displayNameTh": string,
    "displayNameEn": string,
    "createdAt": string,
    "updatedAt": string,
    "createBy": string,
    "editBy": string
  }
]
```

## API รูปภาพตารางรถ

### Endpoint: /api/transit_page/[category]/route.ts

โดยที่ [category] คือ ชื่อของหมวดหมู่นั้นๆ

### [ไปที่ File API นี้](/app/api/transit_page/[category]/route.ts)

#### Method GET

**รายละเอียด:** ใช้สำหรับการแสดงหมวดหมู่ของตารางเดินรถ
**Response Body:**

```json
[
  {
    "id": int,
    "categoryId": int,
    "imageUrl": string,
    "title": string,
    "uploadAt": string,
    "isActive": boolean,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method POST

**รายละเอียด:** ใช้สำหรับการแสดงหมวดหมู่ของตารางเดินรถ
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Request Body:**

```json
  {
    "imageUrl": string,
    "title": string,
    "createBy": string,
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "categoryId": int,
    "imageUrl": string,
    "title": string,
    "uploadAt": string,
    "isActive": boolean,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method PUT

**รายละเอียด:** ใช้สำหรับการแสดงหมวดหมู่ของตารางเดินรถ
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Request Body:**

```json
  {
    "id": int,
    "imageUrl": string,
    "title": string,
    "editBy": string
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "categoryId": int,
    "imageUrl": string,
    "title": string,
    "uploadAt": string,
    "isActive": boolean,
    "createBy": string,
    "editBy": string
  }
]
```

#### Method DELETE

**รายละเอียด:** ใช้สำหรับการแสดงหมวดหมู่ของตารางเดินรถ
**Authenticator:** ใช้ Basic Auth

```text
	username:password
```

**Request Body:**

```json
  {
    "id": int
  }
```

**Response Body:**

```json
[
  {
    "id": int,
    "categoryId": int,
    "imageUrl": string,
    "title": string,
    "uploadAt": string,
    "isActive": boolean,
    "createBy": string,
    "editBy": string
  }
]
```

## MinIO

สำหรับ upload ไฟล์ หรือรูปที่จะเก็บไว้ เข้าผ่าน **http://your-domain:9001**
และเข้าถึงไฟล์ได้ผ่าน **http://your-domain:9001/your-bucket-name/file-name**
โดยเบื้องต้น ได้เซ็ตให้ bucket มี 2 อัน คือ cmu-routes และ documents ซึ่งเป็น public bucket และสามารถ Download ไฟล์ได้เท่านั้น
