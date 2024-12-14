use axum::{
    async_trait, extract::FromRequestParts, http::request::Parts, Extension, RequestPartsExt,
};
use axum_extra::{
    headers::{authorization::Bearer, Authorization},
    TypedHeader,
};
use jsonwebtoken::{decode, DecodingKey, Validation};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

use crate::error::AppError;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub zid: String,
    pub admin: bool,
    pub exp: usize,
}

pub struct AuthUser {
    pub zid: String,
    pub admin: bool,
}

#[async_trait]
impl<S> FromRequestParts<S> for AuthUser
where
    S: Send + Sync,
{
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, state: &S) -> Result<Self, Self::Rejection> {
        let TypedHeader(Authorization(bearer)) = parts
            .extract::<TypedHeader<Authorization<Bearer>>>()
            .await
            .map_err(|_| AppError::Unauthorized("Missing token".into()))?;

        // Check if token is blacklisted
        let Extension(pool) = parts
            .extract::<Extension<PgPool>>()
            .await
            .map_err(|_| AppError::Internal("Database pool not found".into()))?;

        let is_blacklisted = sqlx::query!(
            r#"
            SELECT EXISTS(
                SELECT 1
                FROM "BlacklistedTokens"
                WHERE token = $1 AND expires_at > CURRENT_TIMESTAMP
            ) as is_blacklisted
            "#,
            bearer.token()
        )
        .fetch_one(&pool)
        .await
        .map_err(|_| AppError::Internal("Database error".into()))?
        .is_blacklisted
        .unwrap_or(false);

        if is_blacklisted {
            return Err(AppError::Unauthorized("Token has been invalidated".into()));
        }

        // Rest of your token validation...
        let token_data = decode::<Claims>(
            bearer.token(),
            &DecodingKey::from_secret("your_secret_key".as_bytes()),
            &Validation::default(),
        )
        .map_err(|_| AppError::Unauthorized("Invalid token".into()))?;

        Ok(AuthUser {
            zid: token_data.claims.zid,
            admin: token_data.claims.admin,
        })
    }
}
