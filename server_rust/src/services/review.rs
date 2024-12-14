use axum::{extract::Path, Json};
use sqlx::PgPool;

use crate::{
    error::AppError,
    models::{
        auth::AuthUser,
        review::{CreateReviewRequest, Review},
    },
};

pub async fn create_review(
    pool: PgPool,
    user_id: String,
    review_req: CreateReviewRequest,
) -> Result<Json<Review>, AppError> {
    let mut tx = pool.begin().await?;

    let new_review = sqlx::query_as!(
        Review,
        r#"
        INSERT INTO "Review" (
            id,
            title,
            content,
            rating,
            anonymous,
            user_id,
            society_id,
            created_at,
            updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING *
        "#,
        uuid::Uuid::new_v4().to_string(),
        review_req.title,
        review_req.content,
        review_req.rating,
        review_req.anonymous,
        user_id,
        review_req.society_id,
    )
    .fetch_one(&mut *tx)
    .await?;

    sqlx::query!(
        r#"
        UPDATE "Society"
        SET average_rating = (
            SELECT AVG(rating)::float
            FROM "Review"
            WHERE society_id = $1
        ),
        total_reviews = total_reviews + 1,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        "#,
        review_req.society_id
    )
    .execute(&mut *tx)
    .await?;

    if let Some(tags) = review_req.tags {
        for tag_name in tags {
            let tag = sqlx::query!(
                r#"
                INSERT INTO "Tag" (id, name, created_at, updated_at)
                VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                ON CONFLICT (name) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
                RETURNING id
                "#,
                uuid::Uuid::new_v4().to_string(),
                tag_name
            )
            .fetch_one(&mut *tx)
            .await?;

            sqlx::query!(
                r#"
                INSERT INTO "TagsOnReviews" (review_id, tag_id)
                VALUES ($1, $2)
                "#,
                new_review.id,
                tag.id
            )
            .execute(&mut *tx)
            .await?;
        }
    }

    tx.commit().await?;
    Ok(Json(new_review))
}

pub async fn get_society_reviews(
    pool: &PgPool,
    society_id: String,
) -> Result<Json<Vec<Review>>, AppError> {
    let mut tx = pool.begin().await?;

    let reviews = sqlx::query_as!(
        Review,
        r#"
        SELECT DISTINCT r.*
        FROM "Review" r
        LEFT JOIN "TagsOnReviews" tr ON r.id = tr.review_id
        LEFT JOIN "Tag" t ON tr.tag_id = t.id
        WHERE r.society_id = $1
        ORDER BY r.created_at DESC
        "#,
        society_id
    )
    .fetch_all(&mut *tx)
    .await?;

    tx.commit().await?;
    Ok(Json(reviews))
}

pub async fn get_user_reviews(
    pool: &PgPool,
    user_id: String,
) -> Result<Json<Vec<Review>>, AppError> {
    let mut tx = pool.begin().await?;

    let reviews = sqlx::query_as!(
        Review,
        r#"
        SELECT DISTINCT r.*
        FROM "Review" r
        LEFT JOIN "TagsOnReviews" tr ON r.id = tr.review_id
        LEFT JOIN "Tag" t ON tr.tag_id = t.id
        WHERE r.user_id = $1
        ORDER BY r.created_at DESC
        "#,
        user_id
    )
    .fetch_all(&mut *tx)
    .await?;

    tx.commit().await?;
    Ok(Json(reviews))
}

pub async fn get_zid_reviews(pool: &PgPool, zid: String) -> Result<Json<Vec<Review>>, AppError> {
    let mut tx = pool.begin().await?;

    // First check if user exists
    let user_exists = sqlx::query!(
        r#"SELECT EXISTS(SELECT 1 FROM "User" WHERE zid = $1) as exists"#,
        zid
    )
    .fetch_one(&mut *tx)
    .await?
    .exists
    .unwrap_or(false);

    if !user_exists {
        return Err(AppError::NotFound("User not found".into()));
    }

    let reviews = sqlx::query_as!(
        Review,
        r#"
        SELECT DISTINCT r.*
        FROM "Review" r
        LEFT JOIN "TagsOnReviews" tr ON r.id = tr.review_id
        LEFT JOIN "Tag" t ON tr.tag_id = t.id
        WHERE r.user_id = $1 AND r.anonymous = false
        ORDER BY r.created_at DESC
        "#,
        zid
    )
    .fetch_all(&mut *tx)
    .await?;

    tx.commit().await?;
    Ok(Json(reviews))
}

pub async fn delete_user_review(
    pool: &PgPool,
    review_id: String,
    auth_user: AuthUser,
) -> Result<Json<String>, AppError> {
    let mut tx = pool.begin().await?;

    // First check if user exists
    let user_exists = sqlx::query!(
        r#"SELECT EXISTS(SELECT 1 FROM "User" WHERE zid = $1) as exists"#,
        auth_user.zid
    )
    .fetch_optional(&mut *tx)
    .await?
    .ok_or_else(|| AppError::NotFound("User not found".into()));

    // check if review was made by the user
    let review = sqlx::query!(
        r#"
        SELECT * FROM "Review" 
        WHERE id = $1 AND user_id = $2
        "#,
        review_id,
        auth_user.zid
    )
    .fetch_optional(&mut *tx)
    .await?
    .ok_or_else(|| AppError::NotFound("Review not found or not owned by user".into()))?;

    sqlx::query!(
        r#"DELETE FROM "TagsOnReviews" WHERE review_id = $1 "#,
        review_id
    )
    .execute(&mut *tx)
    .await?;

    sqlx::query!(
        r#"
        DELETE FROM "Review"
        WHERE id = $1 AND user_id = $2
        "#,
        review_id,
        auth_user.zid
    )
    .execute(&mut *tx)
    .await?;

    tx.commit().await?;
    Ok(Json("Review successfully deleted".to_string()))
}
