-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "budget" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL
);
INSERT INTO "new_Project" ("budget", "createdAt", "end", "id", "name", "start", "updatedAt") SELECT "budget", "createdAt", "end", "id", "name", "start", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
