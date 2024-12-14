-- migrations/20240309000002_add_blacklisted_tokens.down.sql
DROP INDEX IF EXISTS idx_blacklisted_tokens_expires_at;
DROP TABLE IF EXISTS "BlacklistedTokens";