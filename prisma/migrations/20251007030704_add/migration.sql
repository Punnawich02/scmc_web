/*
  Warnings:

  - You are about to drop the column `created_by` on the `data_page` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `data_page` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `data_page` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `publications` table. All the data in the column will be lost.
  - Added the required column `create_by` to the `data_page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `create_by` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."data_page" DROP CONSTRAINT "data_page_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."data_page" DROP CONSTRAINT "data_page_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."publications" DROP CONSTRAINT "publications_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."publications" DROP CONSTRAINT "publications_updated_by_fkey";

-- DropIndex
DROP INDEX "public"."data_page_created_by_idx";

-- DropIndex
DROP INDEX "public"."data_page_updated_by_idx";

-- DropIndex
DROP INDEX "public"."publications_created_by_idx";

-- DropIndex
DROP INDEX "public"."publications_updated_by_idx";

-- AlterTable
ALTER TABLE "data_page" DROP COLUMN "created_by",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
ADD COLUMN     "create_by" TEXT NOT NULL,
ADD COLUMN     "delete_at" TIMESTAMP(3),
ADD COLUMN     "delete_by" TEXT,
ADD COLUMN     "update_at" TIMESTAMP(3),
ADD COLUMN     "update_by" TEXT;

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "created_by",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
ADD COLUMN     "create_by" TEXT NOT NULL,
ADD COLUMN     "delete_at" TIMESTAMP(3),
ADD COLUMN     "delete_by" TEXT,
ADD COLUMN     "update_at" TIMESTAMP(3),
ADD COLUMN     "update_by" TEXT;

-- CreateIndex
CREATE INDEX "data_page_create_by_idx" ON "data_page"("create_by");

-- CreateIndex
CREATE INDEX "data_page_update_by_idx" ON "data_page"("update_by");

-- CreateIndex
CREATE INDEX "publications_create_by_idx" ON "publications"("create_by");

-- CreateIndex
CREATE INDEX "publications_update_by_idx" ON "publications"("update_by");

-- AddForeignKey
ALTER TABLE "data_page" ADD CONSTRAINT "data_page_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_page" ADD CONSTRAINT "data_page_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_page" ADD CONSTRAINT "data_page_delete_by_fkey" FOREIGN KEY ("delete_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_delete_by_fkey" FOREIGN KEY ("delete_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
