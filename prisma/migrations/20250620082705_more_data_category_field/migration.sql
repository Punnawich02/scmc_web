/*
  Warnings:

  - Added the required column `displayNameEN` to the `data_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayNameTH` to the `data_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "data_category" ADD COLUMN     "displayNameEN" TEXT NOT NULL,
ADD COLUMN     "displayNameTH" TEXT NOT NULL;
