-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('STARTUP', 'BUSINESS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "startup" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registeredName" TEXT,
    "websiteUrl" TEXT,
    "contactEmail" TEXT,
    "contactNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "trlLevel" TEXT NOT NULL,
    "logoUrl" TEXT,
    "description" TEXT,
    "progressStage" TEXT,
    "fundingStage" TEXT,
    "idea" TEXT,
    "problemStatement" TEXT,
    "potentialMarket" TEXT,
    "dpitRecognized" BOOLEAN,
    "majorCompetitor" TEXT,
    "demoVideoUrl" TEXT,
    "pitchDeckUrl" TEXT,
    "foundersName" TEXT,
    "teamSize" INTEGER,
    "fteEmployee" INTEGER,
    "pteEmployee" INTEGER,

    CONSTRAINT "startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,

    CONSTRAINT "competitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registeredName" TEXT,
    "websiteUrl" TEXT,
    "contactNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "categoryTags" TEXT[],

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunity" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT,
    "type" TEXT NOT NULL,
    "subtype" TEXT,
    "title" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "fundingAmount" TEXT,
    "targetIndustry" TEXT,
    "targetSector" TEXT,
    "targetWomenFounder" BOOLEAN,
    "targetProductStage" TEXT,
    "targetFundingStage" TEXT,
    "description" TEXT,
    "eligibility" TEXT,
    "bannerUrl" TEXT,
    "startDatetime" TIMESTAMP(3) NOT NULL,
    "endDatetime" TIMESTAMP(3),
    "noOfRegistrations" INTEGER,

    CONSTRAINT "opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "startup_userId_key" ON "startup"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "business_userId_key" ON "business"("userId");

-- AddForeignKey
ALTER TABLE "startup" ADD CONSTRAINT "startup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitor" ADD CONSTRAINT "competitor_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
