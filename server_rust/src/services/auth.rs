// src/services/auth.rs
use axum::{Extension, Json};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::Deserialize;
use sqlx::PgPool;
use validator::Validate;

use crate::models::User;
use crate::{error::AppError, models::auth::Claims};
use sqlx::Error as SqlxError;

impl From<SqlxError> for AppError {
    fn from(err: SqlxError) -> Self {
        match err {
            SqlxError::Database(db_err) => {
                if db_err.code() == Some("23505".into()) {
                    // Unique violation
                    AppError::BadRequest("User already exists".into())
                } else {
                    AppError::Internal(format!("Database error: {}", db_err))
                }
            }
            SqlxError::RowNotFound => AppError::NotFound("User not found".into()),
            _ => AppError::Internal(format!("Database error: {}", err)),
        }
    }
}

#[derive(Debug, Deserialize, Validate)]
pub struct RegisterRequest {
    #[validate(length(min = 7, max = 8, message = "zID must be 7-8 characters"))]
    pub zid: String,
    #[validate(length(min = 1, message = "Degree is required"))]
    pub degree: String,
    #[validate(range(min = 1, max = 5, message = "Year must be between 1 and 5"))]
    pub year: i32,
}

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub zid: String,
}

pub async fn register(
    Extension(pool): Extension<PgPool>,
    Json(credentials): Json<RegisterRequest>,
) -> Result<Json<String>, AppError> {
    credentials.validate()?;

    let new_user = sqlx::query_as!(
        User,
        r#"
        INSERT INTO "User" (
            zid, 
            degree, 
            year, 
            verified, 
            admin,
            created_at,
            updated_at
        )
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING *
        "#,
        credentials.zid,
        credentials.degree,
        credentials.year,
        false,
        false
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| match e {
        SqlxError::Database(db_err) if db_err.code() == Some("23505".into()) => {
            AppError::BadRequest("User already exists".into())
        }
        err => AppError::Internal(format!("Failed to create user: {}", err)),
    })?;

    let claims = Claims {
        zid: new_user.zid,
        admin: new_user.admin,
        exp: (chrono::Utc::now() + chrono::Duration::hours(24)).timestamp() as usize,
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret("your_secret_key".as_bytes()),
    )
    .map_err(|e| AppError::Internal(format!("Token creation failed: {}", e)))?;

    Ok(Json(token))
}

pub async fn login(
    Extension(pool): Extension<PgPool>,
    Json(login_req): Json<LoginRequest>,
) -> Result<Json<String>, AppError> {
    let user = sqlx::query_as!(
        User,
        r#"SELECT * FROM "User" WHERE zid = $1"#,
        login_req.zid
    )
    .fetch_optional(&pool)
    .await
    .map_err(|e| AppError::Internal(format!("Database error: {}", e)))?
    .ok_or_else(|| AppError::NotFound("User not found".into()))?;

    let claims = Claims {
        zid: user.zid,
        admin: user.admin,
        exp: (chrono::Utc::now() + chrono::Duration::hours(24)).timestamp() as usize,
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret("your_secret_key".as_bytes()),
    )
    .map_err(|e| AppError::Internal(format!("Token creation failed: {}", e)))?;

    Ok(Json(token))
}

pub async fn logout(
    Extension(pool): Extension<PgPool>,
    bearer_token: String,
) -> Result<Json<String>, AppError> {
    sqlx::query!(
        r#"
        INSERT INTO "BlacklistedTokens" (
            token,
            expires_at
        )
        VALUES ($1, $2)
        "#,
        bearer_token,
        chrono::Utc::now() + chrono::Duration::hours(24)
    )
    .execute(&pool)
    .await?;

    Ok(Json("Successfully logged out".to_string()))
}
