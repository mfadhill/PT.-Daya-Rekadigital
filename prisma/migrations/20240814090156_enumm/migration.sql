/*
  Warnings:

  - The values [Jurangan] on the enum `CustomerLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CustomerLevel_new" AS ENUM ('Warga', 'Juragan', 'Sultan', 'Konglomerat');
ALTER TABLE "Customer" ALTER COLUMN "level" DROP DEFAULT;
ALTER TABLE "Customer" ALTER COLUMN "level" TYPE "CustomerLevel_new" USING ("level"::text::"CustomerLevel_new");
ALTER TYPE "CustomerLevel" RENAME TO "CustomerLevel_old";
ALTER TYPE "CustomerLevel_new" RENAME TO "CustomerLevel";
DROP TYPE "CustomerLevel_old";
ALTER TABLE "Customer" ALTER COLUMN "level" SET DEFAULT 'Warga';
COMMIT;
