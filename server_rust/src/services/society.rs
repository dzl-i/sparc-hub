use axum::{extract::Path, Extension, Json};
use sqlx::PgPool;

use crate::{
    error::AppError,
    models::{
        auth::AuthUser,
        society::{CreateSocietyRequest, Society},
    },
};

pub async fn get_all_society(
    Extension(pool): Extension<PgPool>,
) -> Result<Json<Vec<Society>>, AppError> {
    let societies = sqlx::query_as!(
        Society,
        r#"
            SELECT * FROM "Society"
        "#
    )
    .fetch_all(&pool)
    .await?;

    Ok(Json(societies))
}

pub async fn get_society_id(
    Extension(pool): Extension<PgPool>,
    Path(society_id): Path<String>,
) -> Result<Json<Society>, AppError> {
    let society = sqlx::query_as!(
        Society,
        r#"
            SELECT * FROM "Society" WHERE id = $1
        "#,
        society_id
    )
    .fetch_one(&pool)
    .await?;

    Ok(Json(society))
}

pub async fn create_society(
    Extension(pool): Extension<PgPool>,
    Json(society_details): Json<CreateSocietyRequest>,
) -> Result<Json<String>, AppError> {
    // Create new society
    let new_society = sqlx::query_as!(
        Society,
        r#"
        INSERT INTO "Society" (
            id,
            name, 
            abbreviated_name, 
            description,
            icon,
            facebook,
            discord,
            email,
            website,
            average_rating,
            total_reviews,
            created_at,
            updated_at
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 
            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )
        RETURNING *
        "#,
        uuid::Uuid::new_v4().to_string(),
        society_details.name,
        society_details.abbreviated_name,
        society_details.description,
        society_details.icon,
        society_details.facebook,
        society_details.discord,
        society_details.email,
        society_details.website,
        0.0,
        0
    )
    .fetch_one(&pool)
    .await
    .map_err(|e| match e {
        sqlx::Error::Database(db_err) if db_err.code() == Some("23505".into()) => {
            AppError::BadRequest("Society with this name or abbreviated name already exists".into())
        }
        err => AppError::Internal(format!("Failed to create society: {}", err)),
    })?;

    Ok(Json(new_society.id))
}

pub async fn delete_society_id(
    Extension(pool): Extension<PgPool>,
    Path(society_id): Path<String>,
) -> Result<Json<String>, AppError> {
    let mut tx = pool.begin().await?;

    let society = sqlx::query!(
        r#"
    SELECT id FROM "Society" where id = $1
        "#,
        society_id
    )
    .fetch_optional(&mut *tx)
    .await?
    .ok_or_else(|| AppError::NotFound("Society not found".into()));

    sqlx::query!(
        r#"
        DELETE FROM "TagsOnReviews"
        WHERE review_id IN (
            SELECT id FROM "Review" WHERE society_id = $1
        )
        "#,
        society_id
    )
    .execute(&mut *tx)
    .await?;

    // Delete related TagsOnSocieties entries
    sqlx::query!(
        r#"DELETE FROM "TagsOnSocieties" WHERE society_id = $1"#,
        society_id
    )
    .execute(&mut *tx)
    .await?;

    // Delete related reviews
    sqlx::query!(r#"DELETE FROM "Review" WHERE society_id = $1"#, society_id)
        .execute(&mut *tx)
        .await?;

    // Finally, delete the society
    sqlx::query!(r#"DELETE FROM "Society" WHERE id = $1"#, society_id)
        .execute(&mut *tx)
        .await?;

    // Commit transaction
    tx.commit().await?;

    Ok(Json("Society successfully deleted".to_string()))
}
