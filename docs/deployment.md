# การ Deploy

เอกสารนี้จะแนะนำวิธีการ Deploy โปรเจกต์นี้สู่ Production

## การ Deploy ด้วย Docker

### บนเครื่องที่ Dev

- **Build เป็น image**
  ```bash
  	docker compose up -d --build
  ```
- **Tag docker image**
  ```bash
  	docker tag image-name:tag-name your-docker-username/image-name:tag-name
  ```
- **Push docker image to docker hub**
  ```bash
  	docker push your-docker-username/image-name:tag-name
  ```

### บนเครื่อง Server

- **สร้าง Folder**

  ```bash
  	mkdir your-folder-name
  	cd your-folder-name
  ```

- **สร้างไฟล์**
  ```bash
  	# ctrl + O เพื่อ save และ ctrl + X เพื่อออก
  	sudo nano .env
  	sudo nano docker-compose.server.yml
  ```
- **ไฟล์ docker-compose.server.yml:** สร้างตาม [docker-compose.server.yml](scmc_web/docker-compose.server.yml) ที่อยู่ในโปรเจค

- **Run Image**
  ```bash
  	docker compose -f docker-compose.server.yml up -d
  ```
