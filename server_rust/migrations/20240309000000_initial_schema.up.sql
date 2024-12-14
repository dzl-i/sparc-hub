-- migrations/20240309000000_initial_schema.sql
-- Create User table
CREATE TABLE "User" (
    "zid" TEXT NOT NULL,
    "description" TEXT,
    "degree" TEXT,
    "year" INTEGER,
    "verified" BOOLEAN NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("zid")
);

-- Create Society table
CREATE TABLE "Society" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviatedName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg',
    "facebook" TEXT,
    "discord" TEXT,
    "email" TEXT,
    "website" TEXT,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Society_pkey" PRIMARY KEY ("id")
);

-- Create Review table
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "anonymous" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- Create Tag table
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- Create TagsOnSocieties table
CREATE TABLE "TagsOnSocieties" (
    "societyId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    CONSTRAINT "TagsOnSocieties_pkey" PRIMARY KEY ("societyId","tagId")
);

-- Create TagsOnReviews table
CREATE TABLE "TagsOnReviews" (
    "reviewId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    CONSTRAINT "TagsOnReviews_pkey" PRIMARY KEY ("reviewId","tagId")
);

-- Create unique indices
CREATE UNIQUE INDEX "Society_name_key" ON "Society"("name");
CREATE UNIQUE INDEX "Society_abbreviatedName_key" ON "Society"("abbreviatedName");
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- Add foreign key constraints
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("zid") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Review" ADD CONSTRAINT "Review_societyId_fkey" 
    FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnSocieties" ADD CONSTRAINT "TagsOnSocieties_societyId_fkey" 
    FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnSocieties" ADD CONSTRAINT "TagsOnSocieties_tagId_fkey" 
    FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnReviews" ADD CONSTRAINT "TagsOnReviews_reviewId_fkey" 
    FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnReviews" ADD CONSTRAINT "TagsOnReviews_tagId_fkey" 
    FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;