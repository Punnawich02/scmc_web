/*
  Warnings:

  - You are about to drop the `data_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `publication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."data_category";

-- DropTable
DROP TABLE "public"."publication";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_page" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_name_th" TEXT NOT NULL,
    "category_name_en" TEXT NOT NULL,
    "embed_code" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "data_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publications" (
    "id" SERIAL NOT NULL,
    "title_th" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "description_th" TEXT,
    "description_en" TEXT,
    "embed_code" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "data_page_created_by_idx" ON "data_page"("created_by");

-- CreateIndex
CREATE INDEX "data_page_updated_by_idx" ON "data_page"("updated_by");

-- CreateIndex
CREATE INDEX "data_page_is_active_idx" ON "data_page"("is_active");

-- CreateIndex
CREATE INDEX "publications_created_by_idx" ON "publications"("created_by");

-- CreateIndex
CREATE INDEX "publications_updated_by_idx" ON "publications"("updated_by");

-- CreateIndex
CREATE INDEX "publications_is_active_idx" ON "publications"("is_active");

-- AddForeignKey
ALTER TABLE "data_page" ADD CONSTRAINT "data_page_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_page" ADD CONSTRAINT "data_page_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
