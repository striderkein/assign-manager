-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "budget" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "assignId" INTEGER,
    FOREIGN KEY ("assignId") REFERENCES "Assign" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("budget", "createdAt", "end", "id", "name", "start", "updatedAt") SELECT "budget", "createdAt", "end", "id", "name", "start", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_assignId_unique" ON "Project"("assignId");
CREATE TABLE "new_Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "utilization" INTEGER NOT NULL DEFAULT 0,
    "assignId" INTEGER,
    FOREIGN KEY ("assignId") REFERENCES "Assign" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Staff" ("cost", "createdAt", "id", "name", "updatedAt", "utilization") SELECT "cost", "createdAt", "id", "name", "updatedAt", "utilization" FROM "Staff";
DROP TABLE "Staff";
ALTER TABLE "new_Staff" RENAME TO "Staff";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
