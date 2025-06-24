/*
  Warnings:

  - You are about to drop the column `description` on the `publication` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `publication` table. All the data in the column will be lost.
  - Added the required column `titleEn` to the `publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleTh` to the `publication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publication" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "descriptionTh" TEXT,
ADD COLUMN     "titleEn" TEXT NOT NULL,
ADD COLUMN     "titleTh" TEXT NOT NULL;
