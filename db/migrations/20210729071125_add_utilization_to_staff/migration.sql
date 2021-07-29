-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "utilization" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Staff" ("cost", "createdAt", "id", "name", "updatedAt") SELECT "cost", "createdAt", "id", "name", "updatedAt" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
