-- AlterTable
ALTER TABLE "data_page" ADD COLUMN     "link_url" TEXT,
ALTER COLUMN "embed_code" DROP NOT NULL;
