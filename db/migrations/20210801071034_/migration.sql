-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assign" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "utilization" INTEGER
);
INSERT INTO "new_Assign" ("createdAt", "end", "id", "start", "updatedAt", "utilization") SELECT "createdAt", "end", "id", "start", "updatedAt", "utilization" FROM "Assign";
DROP TABLE "Assign";
ALTER TABLE "new_Assign" RENAME TO "Assign";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
