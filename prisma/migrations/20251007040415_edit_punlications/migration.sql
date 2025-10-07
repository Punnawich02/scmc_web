/*
  Warnings:

  - You are about to drop the column `embed_code` on the `publications` table. All the data in the column will be lost.
  - Added the required column `link_url` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publications" DROP COLUMN "embed_code",
ADD COLUMN     "link_url" TEXT NOT NULL;
