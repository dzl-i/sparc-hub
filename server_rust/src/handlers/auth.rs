use axum::{routing::post, Extension, Form, Json, Router};
use axum_extra::{
    headers::{authorization::Bearer, Authorization},
    TypedHeader,
};
use sqlx::{PgPool, Pool};

use crate::{
    error::AppError,
    services::auth::{self, LoginRequest, RegisterRequest},
};

pub fn auth_routes() -> Router {
    Router::new()
        .route("/auth/register", post(register_handler))
        .route("/auth/login", post(login_handler))
        .route("/auth/logout", post(logout_handler))
}

pub async fn register_handler(
    Extension(pool): Extension<PgPool>,
    form: Json<RegisterRequest>,
) -> Result<Json<String>, AppError> {
    auth::register(Extension(pool), form).await
}

pub async fn login_handler(
    Extension(pool): Extension<PgPool>,
    Json(credentials): Json<LoginRequest>,
) -> Result<Json<String>, AppError> {
    auth::login(Extension(pool), Json(credentials)).await
}

pub async fn logout_handler(
    Extension(pool): Extension<PgPool>,
    TypedHeader(Authorization(bearer)): TypedHeader<Authorization<Bearer>>,
) -> Result<Json<String>, AppError> {
    auth::logout(Extension(pool), bearer.token().to_string()).await
}
