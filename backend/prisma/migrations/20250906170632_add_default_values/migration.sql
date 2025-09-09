/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN "description" TEXT;
ALTER TABLE "Campaign" ADD COLUMN "endDate" DATETIME;
ALTER TABLE "Campaign" ADD COLUMN "imageUrl" TEXT;
ALTER TABLE "Campaign" ADD COLUMN "industry" TEXT;
ALTER TABLE "Campaign" ADD COLUMN "investors" INTEGER DEFAULT 0;
ALTER TABLE "Campaign" ADD COLUMN "location" TEXT DEFAULT 'Việt Nam';
ALTER TABLE "Campaign" ADD COLUMN "rating" REAL DEFAULT 3.0;
ALTER TABLE "Campaign" ADD COLUMN "riskLevel" TEXT DEFAULT 'medium';
ALTER TABLE "Campaign" ADD COLUMN "startDate" DATETIME;
ALTER TABLE "Campaign" ADD COLUMN "type" TEXT DEFAULT 'equity';

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'investor',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "role") SELECT "createdAt", "email", "id", "name", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
