-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "inform" TEXT NOT NULL DEFAULT 'exporter';
ALTER TABLE "Inquiry" ADD COLUMN     "country" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Inquiry" ADD COLUMN     "businessDetails" TEXT NOT NULL DEFAULT '';
