/*
  Warnings:

  - Added the required column `targetAmount` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Investment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'active',
    CONSTRAINT "Investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Investment_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campaign" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "description" TEXT DEFAULT '',
    "target" INTEGER NOT NULL,
    "raised" INTEGER NOT NULL DEFAULT 0,
    "currentAmount" INTEGER NOT NULL DEFAULT 0,
    "targetAmount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "category" TEXT NOT NULL DEFAULT 'Khác',
    "ownerId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrl" TEXT,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "riskLevel" TEXT DEFAULT 'medium',
    "industry" TEXT,
    "type" TEXT DEFAULT 'equity',
    "location" TEXT DEFAULT 'Việt Nam',
    "rating" REAL DEFAULT 3.0,
    "investors" INTEGER DEFAULT 0,
    CONSTRAINT "Campaign_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Campaign" ("createdAt", "description", "endDate", "id", "imageUrl", "industry", "investors", "location", "ownerId", "raised", "rating", "riskLevel", "startDate", "status", "summary", "target", "title", "type") SELECT "createdAt", "description", "endDate", "id", "imageUrl", "industry", "investors", "location", "ownerId", "raised", "rating", "riskLevel", "startDate", "status", "summary", "target", "title", "type" FROM "Campaign";
DROP TABLE "Campaign";
ALTER TABLE "new_Campaign" RENAME TO "Campaign";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
