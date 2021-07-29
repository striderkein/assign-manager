/*
  Warnings:

  - Added the required column `end` to the `Term` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "cost" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Term" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL
);
INSERT INTO "new_Term" ("createdAt", "id", "start", "updatedAt") SELECT "createdAt", "id", "start", "updatedAt" FROM "Term";
DROP TABLE "Term";
ALTER TABLE "new_Term" RENAME TO "Term";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
