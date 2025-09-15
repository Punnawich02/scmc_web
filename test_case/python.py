import json
import os

# สร้างข้อมูลขนาดใหญ่
data = {
    'titleTh': 'A' * 1000000,
    'titleEn': 'B' * 1000000,
    'descriptionTh': 'C' * 1000000,
    'descriptionEn': 'D' * 1000000,
    'link_url': 'https://example.com',
    'createBy': 'attacker'
}

# กำหนด path เป็นโฟลเดอร์ที่รันสคริปต์ (ปัจจุบัน)
current_dir = os.getcwd()        # หรือใช้ os.path.dirname(__file__) ถ้าต้องการโฟลเดอร์ของไฟล์สคริปต์เอง
out_path = os.path.join(current_dir, 'data.json')

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)

print(f"Saved file to: {out_path}")
