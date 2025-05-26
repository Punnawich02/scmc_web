-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "prefix" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "house_no" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "sub_district" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "currently" TEXT NOT NULL,
    "citizen_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Form" (
    "form_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "request_reason" TEXT NOT NULL,
    "accident_area" TEXT NOT NULL,
    "accident_date" TEXT NOT NULL,
    "accident_time" TEXT NOT NULL,
    "security_noti_date" TEXT NOT NULL,
    "police_noti_date" TEXT NOT NULL,
    "police_noti_time" TEXT NOT NULL,
    "cctv_area_request1" TEXT,
    "cctv_area_request2" TEXT,
    "cctv_area_request3" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("form_id")
);

-- CreateTable
CREATE TABLE "NDA" (
    "nda_id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NDA_pkey" PRIMARY KEY ("nda_id")
);

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NDA" ADD CONSTRAINT "NDA_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("form_id") ON DELETE RESTRICT ON UPDATE CASCADE;
