import { PrismaClient } from '@prisma/client'

declare global {
  // ป้องกันการสร้าง PrismaClient ซ้ำเวลาพัฒนา (hot reload)
  // @ts-ignore
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prisma = prisma
