# API Documentation

## 🔗 Postman Collection
[View Postman Workspace](https://punnawich02-1308399.postman.co/workspace/836ed485-0dba-40be-a951-4c41f2c5895e)

## Table of Contents
1. [Data Category API](#data-category-api)
2. [Publications API](#publications-api)

---

## Data Category API

### Overview
API สำหรับจัดการหมวดหมู่ข้อมูล (Data Categories) รองรับการสร้าง, อ่าน, แก้ไข และลบข้อมูล

### Base URL
```
/api/data-category
```

### Authentication
ใช้ **Basic Authentication** สำหรับ POST, PUT, DELETE methods

**Header:**
```
Authorization: Basic <base64(username:password)>
```

### Rate Limiting
- **Limit:** 100 requests ต่อ 15 นาที
- **Response (เมื่อเกิน limit):** HTTP 429 - Too many requests

### Payload Size Limit
- **Maximum:** 1 MB
- **Response (เมื่อเกินขนาด):** HTTP 413 - Payload Must Not Exceed 1MB

---

## 1. GET - ดึงรายการหมวดหมู่ทั้งหมด

### Endpoint
```
GET /api/data-category
```

### Headers
ไม่ต้องการ Authentication

### Response Success (200)
```json
[
  {
    "id": 1,
    "name": "category-name",
    "categoryNameTh": "ชื่อหมวดหมู่ไทย",
    "categoryNameEn": "Category Name EN",
    "embedCode": "<iframe>...</iframe>",
    "linkUrl": "https://example.com",
    "isActive": true,
    "createAt": "2025-01-15T10:30:00.000Z",
    "createBy": "user-id",
    "updateAt": null,
    "updateBy": null,
    "deleteAt": null,
    "deleteBy": null
  }
]
```

### Response Error
- **429:** Too many requests
- **500:** Failed to fetch data categories

---

## 2. POST - สร้างหมวดหมู่ใหม่

### Endpoint
```
POST /api/data-category
```

### Headers
```
Authorization: Basic <credentials>
Content-Type: application/json
```

### Request Body
```json
{
  "name": "category-name",
  "categoryNameTh": "ชื่อหมวดหมู่ไทย",
  "categoryNameEn": "Category Name EN",
  "embedCode": "<iframe>...</iframe>",
  "linkUrl": "https://example.com"
}
```

### Field Validations
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | ✅ | ชื่อหมวดหมู่ (ต้องไม่ว่าง) |
| categoryNameTh | string | ✅ | ชื่อหมวดหมู่ภาษาไทย (ต้องไม่ว่าง) |
| categoryNameEn | string | ✅ | ชื่อหมวดหมู่ภาษาอังกฤษ (ต้องไม่ว่าง) |
| embedCode | string | ❌ | โค้ด embed (optional) |
| linkUrl | string | ❌ | URL ลิงก์ (optional) |

### Response Success (201)
```json
{
  "status": "success",
  "message": "Category created successfully",
  "data": {
    "id": 1,
    "name": "category-name",
    "categoryNameTh": "ชื่อหมวดหมู่ไทย",
    "categoryNameEn": "Category Name EN",
    "embedCode": "<iframe>...</iframe>",
    "linkUrl": "https://example.com",
    "createBy": "user-id",
    "createAt": "2025-01-15T10:30:00.000Z"
  }
}
```

### Response Error
- **400:** Validation failed
- **401:** Unauthorized
- **413:** Payload Must Not Exceed 1MB
- **429:** Too many requests
- **500:** Failed to create data category

---

## 3. PUT - แก้ไขหมวดหมู่

### Endpoint
```
PUT /api/data-category
```

### Headers
```
Authorization: Basic <credentials>
Content-Type: application/json
```

### Request Body
```json
{
  "id": 1,
  "name": "updated-category-name",
  "categoryNameTh": "ชื่อหมวดหมู่ไทยใหม่",
  "categoryNameEn": "Updated Category Name",
  "embedCode": "<iframe>...</iframe>",
  "linkUrl": "https://example.com/updated"
}
```

### Field Validations
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number | ✅ | ID ของหมวดหมู่ (ต้องเป็นจำนวนเต็มบวก) |
| name | string | ❌ | ชื่อหมวดหมู่ (optional) |
| categoryNameTh | string | ❌ | ชื่อหมวดหมู่ภาษาไทย (optional) |
| categoryNameEn | string | ❌ | ชื่อหมวดหมู่ภาษาอังกฤษ (optional) |
| embedCode | string | ❌ | โค้ด embed (optional) |
| linkUrl | string | ❌ | URL ลิงก์ (optional) |

### Response Success (200)
```json
{
  "message": "Data category updated successfully",
  "data": {
    "id": 1,
    "name": "updated-category-name",
    "categoryNameTh": "ชื่อหมวดหมู่ไทยใหม่",
    "categoryNameEn": "Updated Category Name",
    "updateBy": "user-id",
    "updateAt": "2025-01-15T11:00:00.000Z"
  }
}
```

### Response Error
- **400:** Validation failed
- **401:** Unauthorized
- **404:** Data category not found
- **413:** Payload Must Not Exceed 1MB
- **429:** Too many requests
- **500:** Error occurred

---

## 4. DELETE - ลบหมวดหมู่ (Soft Delete)

### Endpoint
```
DELETE /api/data-category
```

### Headers
```
Authorization: Basic <credentials>
Content-Type: application/json
```

### Request Body
```json
{
  "id": 1
}
```

### Field Validations
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number | ✅ | ID ของหมวดหมู่ (ต้องเป็นจำนวนเต็มบวก) |

### Response Success (200)
```json
{
  "id": 1,
  "isActive": false,
  "deleteBy": "user-id",
  "deleteAt": "2025-01-15T12:00:00.000Z"
}
```

### Response Error
- **400:** Validation failed
- **401:** Unauthorized
- **404:** Data category not found
- **413:** Payload Must Not Exceed 1MB
- **429:** Too many requests
- **500:** Error occurred

---

## Publications API

### Overview
API สำหรับจัดการเอกสารเผยแพร่ (Publications) รองรับการสร้าง, อ่าน, แก้ไข และลบข้อมูล

### Base URL
```
/api/publications
```

### Authentication
ใช้ **Basic Authentication** สำหรับ POST, PUT, DELETE methods

**Header:**
```
Authorization: Basic <base64(username:password)>
```

### Rate Limiting
- **Limit:** 100 requests ต่อ 15 นาที
- **Response (เมื่อเกิน limit):** HTTP 429 - Too many requests

### Payload Size Limit
- **Maximum:** 1 MB
- **Response (เมื่อเกินขนาด):** HTTP 413 - Payload Must Not Exceed 1MB

---

## 1. GET - ดึงรายการเอกสารทั้งหมด

### Endpoint
```
GET /api/publications
```

### Headers
ไม่ต้องการ Authentication

### Response Success (200)
```json
[
  {
    "id": 1,
    "titleTh": "ชื่อเอกสารภาษาไทย",
    "titleEn": "Document Title EN",
    "descriptionTh": "คำอธิบายภาษาไทย",
    "descriptionEn": "Description in English",
    "linkUrl": "https://example.com/document.pdf",
    "isActive": true,
    "createAt": "2025-01-15T10:30:00.000Z",
    "createBy": "user-id",
    "updateAt": null,
    "updateBy": null,
    "deleteAt": null,
    "deleteBy": null
  }
]
```

### Response Error
- **500:** Failed to fetch publication Doc

---

## 2. POST - สร้างเอกสารใหม่

### Endpoint
```
POST /api/publications
```

### Headers
```
Authorization: Basic <credentials>
Content-Type: application/json
```

### Request Body
```json
{
  "titleTh": "ชื่อเอกสารภาษาไทย",
  "titleEn": "Document Title EN",
  "descriptionTh": "คำอธิบายภาษาไทย",
  "descriptionEn": "Description in English",
  "linkUrl": "https://example.com/document.pdf"
}
```

### Field Validations
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| titleTh | string | ✅ | ชื่อเอกสารภาษาไทย (ต้องไม่ว่าง) |
| titleEn | string | ✅ | ชื่อเอกสารภาษาอังกฤษ (ต้องไม่ว่าง) |
| descriptionTh | string | ❌ | คำอธิบายภาษาไทย (optional) |
| descriptionEn | string | ❌ | คำอธิบายภาษาอังกฤษ (optional) |
| linkUrl | string (URL) | ✅ | URL ของเอกสาร (ต้องเป็น URL ที่ถูกต้อง) |

### Response Success (201)
```json
{
  "status": "success",
  "message": "Publication created successfully",
  "data": {
    "id": 1,
    "titleTh": "ชื่อเอกสารภาษาไทย",
    "titleEn": "Document Title EN",
    "descriptionTh": "คำอธิบายภาษาไทย",
    "descriptionEn": "Description in English",
    "linkUrl": "https://example.com/document.pdf",
    "createBy": "user-id",
    "createAt": "2025-01-15T10:30:00.000Z"
  }
}
```

### Response Error
- **400:** Validation failed
- **401:** Unauthorized
- **413:** Payload Must Not Exceed 1MB
- **429:** Too many requests
- **500:** Failed to create Publication

---

## 3. PUT - แก้ไขเอกสาร

### Endpoint
```
PUT /api/publications
```

### Headers
```
Authorization: Basic <credentials>
Content-Type: application/json
```

### Request Body
```json
{
  "id": 1,
  "titleTh": "ชื่อเอกสารใหม่ภาษาไทย",
  "titleEn": "Updated Document Title",
  "descriptionTh": "คำอธิบายใหม่ภาษาไทย",
  "descriptionEn": "Updated description",
  "linkUrl": "https://example.com/updated-document.pdf"
}
```

### Field Validations
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number | ✅ | ID ของเอกสาร (ต้องเป็นจำนวนเต็มบวก) |
| titleTh | string | ✅ | ชื่อเอกสารภาษาไทย (ต้องไม่ว่าง) |
| titleEn | string | ✅ | ชื่อเอกสารภาษาอังกฤษ (ต้องไม่ว่าง) |
| descriptionTh | string | ❌ | คำอธิบายภาษาไทย (optional) |
| descriptionEn | string | ❌ | คำอธิบายภาษาอังกฤษ (optional) |
| linkUrl | string (URL) | ✅ | URL ของเอกสาร (ต้องเป็น URL ที่ถูกต้อง) |

### Response Success (200)
```json
{
  "id": 1,
  "titleTh": "ชื่อเอกสารใหม่ภาษาไทย",
  "titleEn": "Updated Document Title",
  "descriptionTh": "คำอธิบายใหม่ภาษาไทย",
  "descriptionEn": "Updated description",
  "linkUrl": "https://example.com/updated-document.pdf",
  "updateBy": "user-id",
  "updateAt": "2025-01-15T11:00:00.000Z"
}
```

### Response Error
- **400:** Validation failed
- **401:** Unauthorized
- **404:** Document not found
- **413:** Payload Must Not Exceed 1MB
- **429:** Too many requests
- **500:** Error occurred

---

## 4. DELETE - ลบเอกสาร (Soft Delete)

### Endpoint
```
DELETE /api/publications
```

### Headers
```
Authorization: Basic <credentials>
Content-Type: application/json
```

### Request Body
```json
{
  "id": 1
}
```

### Field Validations
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | number | ✅ | ID ของเอกสาร (ต้องเป็นจำนวนเต็มบวก) |

### Response Success (200)
```json
{
  "id": 1,
  "isActive": false,
  "deleteBy": "user-id",
  "deleteAt": "2025-01-15T12:00:00.000Z"
}
```

### Response Error
- **400:** Validation failed
- **401:** Unauthorized
- **404:** Document not found
- **413:** Payload Must Not Exceed 1MB
- **429:** Too many requests
- **500:** Error occurred

---

## Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request สำเร็จ |
| 201 | Created - สร้างข้อมูลสำเร็จ |
| 400 | Bad Request - ข้อมูล validation ไม่ผ่าน |
| 401 | Unauthorized - ไม่มีสิทธิ์เข้าถึง (Authentication ล้มเหลว) |
| 404 | Not Found - ไม่พบข้อมูลที่ต้องการ |
| 413 | Payload Too Large - ข้อมูลเกิน 1 MB |
| 429 | Too Many Requests - เกิน rate limit |
| 500 | Internal Server Error - เกิดข้อผิดพลาดในระบบ |

---

## Notes
- ทั้งสอง APIs ใช้ระบบ **Soft Delete** (ไม่ลบข้อมูลจริง แต่เปลี่ยน `isActive` เป็น `false`)
- การ GET จะดึงเฉพาะข้อมูลที่ `isActive = true` เท่านั้น
- ข้อมูลจะถูกเรียงตาม `createAt` จากใหม่ไปเก่า (descending)
- ทุก operation ที่ต้อง authentication จะบันทึก user ที่ทำการเปลี่ยนแปลงใน fields: `createBy`, `updateBy`, `deleteBy`