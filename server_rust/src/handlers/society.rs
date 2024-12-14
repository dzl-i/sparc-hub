use axum::{extract::Path, routing::get, Extension, Json, Router};
use sqlx::PgPool;

use crate::{
    error::AppError,
    models::{auth::AuthUser, society::Society, User},
    services::society,
};

pub fn society_routes() -> Router {
    Router::new()
        .route(
            "/societies",
            get(get_all_society_handler).post(create_society),
        )
        .route(
            "/societies/:society_id",
            get(get_society_id).delete(delete_society),
        )
}

pub async fn get_all_society_handler(
    pool: Extension<PgPool>,
) -> Result<Json<Vec<Society>>, AppError> {
    society::get_all_society(pool).await
}

pub async fn get_society_id(
    pool: Extension<PgPool>,
    path: Path<String>,
) -> Result<Json<Society>, AppError> {
    society::get_society_id(pool, path).await
}

pub async fn create_society(
    pool: Extension<PgPool>,
    body: Json<crate::models::society::CreateSocietyRequest>,
) -> Result<Json<String>, AppError> {
    society::create_society(pool, body).await
}

pub async fn delete_society(
    pool: Extension<PgPool>,
    path: Path<String>,
    auth_user: AuthUser,
) -> Result<Json<String>, AppError> {
    if !auth_user.admin {
        return Err(AppError::Unauthorized(
            "Only admin can delete a society".into(),
        ));
    };

    society::delete_society_id(pool, path).await
}
