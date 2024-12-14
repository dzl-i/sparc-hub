use axum::{extract::Path, Extension, Json};
use sqlx::PgPool;

use crate::error::AppError;
use crate::models::user::UpdateRequest;
use crate::models::User;

pub async fn update_description(
    Extension(pool): Extension<PgPool>,
    Path(zid): Path<String>,
    Json(update): Json<UpdateRequest>,
) -> Result<Json<String>, AppError> {
    sqlx::query!(r#"SELECT * FROM "User" WHERE zid = $1"#, zid)
        .fetch_optional(&pool)
        .await?
        .ok_or_else(|| AppError::NotFound("User not found".into()))?;

    sqlx::query!(
        r#"
        UPDATE "User"
        SET description = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE zid = $2
        "#,
        update.new_description,
        zid
    )
    .execute(&pool)
    .await?;

    Ok(Json("Description updated successfully".to_string()))
}

pub async fn set_user_admin(
    Extension(pool): Extension<PgPool>,
    zid: String,
    admin_status: bool,
) -> Result<Json<String>, AppError> {
    // First check if user exists
    sqlx::query!(r#"SELECT * FROM "User" WHERE zid = $1"#, zid)
        .fetch_optional(&pool)
        .await?
        .ok_or_else(|| AppError::NotFound("User not found".into()))?;

    // Update user's admin status
    sqlx::query!(
        r#"
        UPDATE "User"
        SET admin = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE zid = $2
        "#,
        admin_status,
        zid
    )
    .execute(&pool)
    .await?;

    Ok(Json("User admin status updated successfully".to_string()))
}

pub async fn get_user_detail(
    Extension(pool): Extension<PgPool>,
    zid: String,
) -> Result<Json<User>, AppError> {
    let user = sqlx::query_as!(
        User,
        r#"
    SELECT * FROM "User" where zid = $1
        "#,
        zid
    )
    .fetch_optional(&pool)
    .await?
    .ok_or_else(|| AppError::NotFound("User not found".into()))?;

    Ok(Json(user))
}
