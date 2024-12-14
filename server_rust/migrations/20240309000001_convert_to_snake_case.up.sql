-- migrations/20240310000000_convert_to_snake_case.up.sql
ALTER TABLE "User" RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE "User" RENAME COLUMN "updatedAt" TO updated_at;

ALTER TABLE "Society" RENAME COLUMN "abbreviatedName" TO abbreviated_name;
ALTER TABLE "Society" RENAME COLUMN "averageRating" TO average_rating;
ALTER TABLE "Society" RENAME COLUMN "totalReviews" TO total_reviews;
ALTER TABLE "Society" RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE "Society" RENAME COLUMN "updatedAt" TO updated_at;

ALTER TABLE "Review" RENAME COLUMN "userId" TO user_id;
ALTER TABLE "Review" RENAME COLUMN "societyId" TO society_id;
ALTER TABLE "Review" RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE "Review" RENAME COLUMN "updatedAt" TO updated_at;

ALTER TABLE "Tag" RENAME COLUMN "createdAt" TO created_at;
ALTER TABLE "Tag" RENAME COLUMN "updatedAt" TO updated_at;

ALTER TABLE "TagsOnSocieties" RENAME COLUMN "societyId" TO society_id;
ALTER TABLE "TagsOnSocieties" RENAME COLUMN "tagId" TO tag_id;

ALTER TABLE "TagsOnReviews" RENAME COLUMN "reviewId" TO review_id;
ALTER TABLE "TagsOnReviews" RENAME COLUMN "tagId" TO tag_id;

-- Rename the constraints and indexes to match the new column names
ALTER INDEX "Society_name_key" RENAME TO society_name_key;
ALTER INDEX "Society_abbreviatedName_key" RENAME TO society_abbreviated_name_key;
ALTER INDEX "Tag_name_key" RENAME TO tag_name_key;

ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey",
    ADD CONSTRAINT review_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES "User"(zid) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Review" DROP CONSTRAINT "Review_societyId_fkey",
    ADD CONSTRAINT review_society_id_fkey 
    FOREIGN KEY (society_id) REFERENCES "Society"(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnSocieties" DROP CONSTRAINT "TagsOnSocieties_societyId_fkey",
    ADD CONSTRAINT tags_on_societies_society_id_fkey 
    FOREIGN KEY (society_id) REFERENCES "Society"(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnSocieties" DROP CONSTRAINT "TagsOnSocieties_tagId_fkey",
    ADD CONSTRAINT tags_on_societies_tag_id_fkey 
    FOREIGN KEY (tag_id) REFERENCES "Tag"(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnReviews" DROP CONSTRAINT "TagsOnReviews_reviewId_fkey",
    ADD CONSTRAINT tags_on_reviews_review_id_fkey 
    FOREIGN KEY (review_id) REFERENCES "Review"(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnReviews" DROP CONSTRAINT "TagsOnReviews_tagId_fkey",
    ADD CONSTRAINT tags_on_reviews_tag_id_fkey 
    FOREIGN KEY (tag_id) REFERENCES "Tag"(id) ON DELETE RESTRICT ON UPDATE CASCADE;