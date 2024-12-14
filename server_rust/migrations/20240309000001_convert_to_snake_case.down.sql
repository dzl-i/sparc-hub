-- migrations/20240310000000_convert_to_snake_case.down.sql
ALTER TABLE "User" RENAME COLUMN created_at TO "createdAt";
ALTER TABLE "User" RENAME COLUMN updated_at TO "updatedAt";

ALTER TABLE "Society" RENAME COLUMN abbreviated_name TO "abbreviatedName";
ALTER TABLE "Society" RENAME COLUMN average_rating TO "averageRating";
ALTER TABLE "Society" RENAME COLUMN total_reviews TO "totalReviews";
ALTER TABLE "Society" RENAME COLUMN created_at TO "createdAt";
ALTER TABLE "Society" RENAME COLUMN updated_at TO "updatedAt";

ALTER TABLE "Review" RENAME COLUMN user_id TO "userId";
ALTER TABLE "Review" RENAME COLUMN society_id TO "societyId";
ALTER TABLE "Review" RENAME COLUMN created_at TO "createdAt";
ALTER TABLE "Review" RENAME COLUMN updated_at TO "updatedAt";

ALTER TABLE "Tag" RENAME COLUMN created_at TO "createdAt";
ALTER TABLE "Tag" RENAME COLUMN updated_at TO "updatedAt";

ALTER TABLE "TagsOnSocieties" RENAME COLUMN society_id TO "societyId";
ALTER TABLE "TagsOnSocieties" RENAME COLUMN tag_id TO "tagId";

ALTER TABLE "TagsOnReviews" RENAME COLUMN review_id TO "reviewId";
ALTER TABLE "TagsOnReviews" RENAME COLUMN tag_id TO "tagId";

-- Rename the constraints and indexes back to original names
ALTER INDEX society_name_key RENAME TO "Society_name_key";
ALTER INDEX society_abbreviated_name_key RENAME TO "Society_abbreviatedName_key";
ALTER INDEX tag_name_key RENAME TO "Tag_name_key";

ALTER TABLE "Review" DROP CONSTRAINT review_user_id_fkey,
    ADD CONSTRAINT "Review_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"(zid) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Review" DROP CONSTRAINT review_society_id_fkey,
    ADD CONSTRAINT "Review_societyId_fkey" 
    FOREIGN KEY ("societyId") REFERENCES "Society"(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnSocieties" DROP CONSTRAINT tags_on_societies_society_id_fkey,
    ADD CONSTRAINT "TagsOnSocieties_societyId_fkey" 
    FOREIGN KEY ("societyId") REFERENCES "Society"(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnSocieties" DROP CONSTRAINT tags_on_societies_tag_id_fkey,
    ADD CONSTRAINT "TagsOnSocieties_tagId_fkey" 
    FOREIGN KEY ("tagId") REFERENCES "Tag"(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnReviews" DROP CONSTRAINT tags_on_reviews_review_id_fkey,
    ADD CONSTRAINT "TagsOnReviews_reviewId_fkey" 
    FOREIGN KEY ("reviewId") REFERENCES "Review"(id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "TagsOnReviews" DROP CONSTRAINT tags_on_reviews_tag_id_fkey,
    ADD CONSTRAINT "TagsOnReviews_tagId_fkey" 
    FOREIGN KEY ("tagId") REFERENCES "Tag"(id) ON DELETE RESTRICT ON UPDATE CASCADE;