-- migrations/20240309000002_change_to_timestamptz.down.sql
-- Revert User table timestamps
ALTER TABLE "User" 
    ALTER COLUMN created_at TYPE TIMESTAMP(3),
    ALTER COLUMN updated_at TYPE TIMESTAMP(3);

-- Revert Society table timestamps
ALTER TABLE "Society"
    ALTER COLUMN created_at TYPE TIMESTAMP(3),
    ALTER COLUMN updated_at TYPE TIMESTAMP(3);

-- Revert Review table timestamps
ALTER TABLE "Review"
    ALTER COLUMN created_at TYPE TIMESTAMP(3),
    ALTER COLUMN updated_at TYPE TIMESTAMP(3);

-- Revert Tag table timestamps
ALTER TABLE "Tag"
    ALTER COLUMN created_at TYPE TIMESTAMP(3),
    ALTER COLUMN updated_at TYPE TIMESTAMP(3);