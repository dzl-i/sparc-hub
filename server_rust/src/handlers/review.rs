use axum::{
    extract::Path,
    routing::{get, post},
    Extension, Json, Router,
};
use sqlx::PgPool;

use crate::{
    error::AppError,
    models::{
        auth::AuthUser,
        review::{CreateReviewRequest, Review},
    },
    services::review,
};

pub fn review_routers() -> Router {
    Router::new()
        .route(
            "/societies/:society_id/reviews",
            post(create_review_handler).get(get_all_society_review),
        )
        .route("/users/me/reviews", get(get_user_review))
}

pub async fn create_review_handler(
    Extension(pool): Extension<PgPool>,
    Path(society_id): Path<String>,
    auth_user: AuthUser,
    Json(mut review_req): Json<CreateReviewRequest>,
) -> Result<Json<Review>, AppError> {
    review_req.society_id = society_id;
    review::create_review(pool, auth_user.zid, review_req).await
}

pub async fn get_all_society_review(
    Extension(pool): Extension<PgPool>,
    Path(society_id): Path<String>,
) -> Result<Json<Vec<Review>>, AppError> {
    review::get_society_reviews(&pool, society_id).await
}

pub async fn get_user_review(
    Extension(pool): Extension<PgPool>,
    auth_user: AuthUser,
) -> Result<Json<Vec<Review>>, AppError> {
    review::get_user_reviews(&pool, auth_user.zid).await
}
