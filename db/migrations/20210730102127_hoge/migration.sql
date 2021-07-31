/*
  Warnings:

  - Added the required column `assignId` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_AssignToStaff" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Assign" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "utilization" INTEGER NOT NULL DEFAULT 0,
    "assignId" INTEGER NOT NULL,
    FOREIGN KEY ("assignId") REFERENCES "Assign" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("cost", "createdAt", "id", "name", "updatedAt", "utilization") SELECT "cost", "createdAt", "id", "name", "updatedAt", "utilization" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_AssignToStaff_AB_unique" ON "_AssignToStaff"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignToStaff_B_index" ON "_AssignToStaff"("B");
