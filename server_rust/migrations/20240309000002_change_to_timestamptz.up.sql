-- migrations/20240309000002_change_to_timestamptz.up.sql
-- Change User table timestamps
ALTER TABLE "User" 
    ALTER COLUMN created_at TYPE TIMESTAMPTZ,
    ALTER COLUMN updated_at TYPE TIMESTAMPTZ;

-- Change Society table timestamps
ALTER TABLE "Society"
    ALTER COLUMN created_at TYPE TIMESTAMPTZ,
    ALTER COLUMN updated_at TYPE TIMESTAMPTZ;

-- Change Review table timestamps
ALTER TABLE "Review"
    ALTER COLUMN created_at TYPE TIMESTAMPTZ,
    ALTER COLUMN updated_at TYPE TIMESTAMPTZ;

-- Change Tag table timestamps
ALTER TABLE "Tag"
    ALTER COLUMN created_at TYPE TIMESTAMPTZ,
    ALTER COLUMN updated_at TYPE TIMESTAMPTZ;