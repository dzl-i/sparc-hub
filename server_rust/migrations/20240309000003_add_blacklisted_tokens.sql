-- migrations/20240309000002_add_blacklisted_tokens.sql
CREATE TABLE "BlacklistedTokens" (
    token TEXT NOT NULL PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL
);

-- Create index for faster lookups
CREATE INDEX idx_blacklisted_tokens_expires_at ON "BlacklistedTokens"(expires_at);