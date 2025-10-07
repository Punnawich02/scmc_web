/*
  Warnings:

  - You are about to drop the `data_embed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transit_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transit_service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `create_by` to the `data_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `create_by` to the `publication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."data_embed" DROP CONSTRAINT "data_embed_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."transit_service" DROP CONSTRAINT "transit_service_category_id_fkey";

-- AlterTable
ALTER TABLE "data_category" ADD COLUMN     "create_by" TEXT NOT NULL,
ADD COLUMN     "edit_by" TEXT,
ADD COLUMN     "embed_code" TEXT,
ADD COLUMN     "embed_title" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "web_url" TEXT;

-- AlterTable
ALTER TABLE "publication" ADD COLUMN     "create_by" TEXT NOT NULL,
ADD COLUMN     "edit_by" TEXT;

-- DropTable
DROP TABLE "public"."data_embed";

-- DropTable
DROP TABLE "public"."transit_category";

-- DropTable
DROP TABLE "public"."transit_service";

-- CreateIndex
CREATE INDEX "idx_data_category_active" ON "data_category"("is_active");
