/*
  Warnings:

  - You are about to drop the column `displayNameEN` on the `data_category` table. All the data in the column will be lost.
  - You are about to drop the column `displayNameTH` on the `data_category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "data_category" DROP COLUMN "displayNameEN",
DROP COLUMN "displayNameTH",
ADD COLUMN     "display_name_en" TEXT,
ADD COLUMN     "display_name_th" TEXT;
