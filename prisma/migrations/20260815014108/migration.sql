/*
  Warnings:

  - You are about to alter the column `dueFees` on the `student` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `totalFees` on the `student` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "photo" TEXT,
    "course" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "dateOfBirth" DATETIME,
    "gender" TEXT,
    "admissionDate" DATETIME,
    "status" TEXT NOT NULL,
    "totalFees" INTEGER NOT NULL,
    "dueFees" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_student" ("address", "admissionDate", "course", "createdAt", "dateOfBirth", "dueFees", "email", "fullName", "gender", "id", "phone", "photo", "status", "studentId", "totalFees", "updatedAt", "userId") SELECT "address", "admissionDate", "course", "createdAt", "dateOfBirth", "dueFees", "email", "fullName", "gender", "id", "phone", "photo", "status", "studentId", "totalFees", "updatedAt", "userId" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_userId_key" ON "student"("userId");
CREATE UNIQUE INDEX "student_studentId_key" ON "student"("studentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
