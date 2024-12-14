use crate::{
    error::AppError,
    models::{
        auth::AuthUser,
        user::{SetAdminRequest, UpdateRequest},
        User,
    },
    services::user,
};
use axum::{
    extract::Path,
    routing::{get, patch, post},
    Extension, Json, Router,
};
use sqlx::PgPool;

pub fn user_routes() -> Router {
    Router::new()
        .route("/users/:zid/description", patch(update_description_handler))
        .route("/user/admin/set_admin", post(set_admin_handler))
        .route("/user/user_detail", get(get_user_details_handler))
}

pub async fn update_description_handler(
    pool: Extension<PgPool>,
    zid: Path<String>,
    description: Json<UpdateRequest>,
) -> Result<Json<String>, AppError> {
    user::update_description(pool, zid, description).await
}

pub async fn set_admin_handler(
    pool: Extension<PgPool>,
    auth_user: AuthUser,
    Json(req): Json<SetAdminRequest>,
) -> Result<Json<String>, AppError> {
    if !auth_user.admin {
        return Err(AppError::Unauthorized(
            "Only admins can set admin status".into(),
        ));
    }
    user::set_user_admin(pool, req.zid, req.admin).await
}

pub async fn get_user_details_handler(
    pool: Extension<PgPool>,
    auth_user: AuthUser,
) -> Result<Json<User>, AppError> {
    user::get_user_detail(pool, auth_user.zid).await
}
