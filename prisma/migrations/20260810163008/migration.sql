/*
  Warnings:

  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Student";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Teacher";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "student" (
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
    "totalFees" DECIMAL NOT NULL,
    "dueFees" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "photo" TEXT,
    "department" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "dateOfBirth" DATETIME,
    "gender" TEXT,
    "joiningDate" DATETIME,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "student_userId_key" ON "student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "student_studentId_key" ON "student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_userId_key" ON "teacher"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_teacherId_key" ON "teacher"("teacherId");
