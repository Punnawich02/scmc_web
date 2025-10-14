-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createAt" TIMESTAMP(3),
ADD COLUMN     "createBy" TEXT,
ADD COLUMN     "deleteAt" TIMESTAMP(3),
ADD COLUMN     "deleteBy" TEXT,
ADD COLUMN     "updateAt" TIMESTAMP(3),
ADD COLUMN     "updateBy" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_updateBy_fkey" FOREIGN KEY ("updateBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_deleteBy_fkey" FOREIGN KEY ("deleteBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
