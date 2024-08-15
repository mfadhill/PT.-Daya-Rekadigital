/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Transaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CustomerLevel" AS ENUM ('Warga', 'Jurangan', 'Sultan');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "level" "CustomerLevel" NOT NULL DEFAULT 'Warga';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
