#!/bin/bash
# สร้างไฟล์ test_rate_limit.sh

URL="http://localhost:3000/api/public_doc"
AUTH="Authorization: Basic $(echo -n 'admin:12345678' | base64)"

echo "Testing rate limiting..."

# ส่ง requests จำนวนมาก
for i in {1..200}; do
  curl -X POST "$URL" \
    -H "Content-Type: application/json" \
    -H "$AUTH" \
    -d '{
      "titleTh": "Test '${i}'",
      "titleEn": "Test '${i}'",
      "link_url": "https://example.com",
      "createBy": "tester"
    }' \
    -w "Request $i: %{http_code}\n" \
    -s -o /dev/null &
done

wait