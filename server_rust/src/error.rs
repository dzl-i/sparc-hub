use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;
use validator::ValidationErrors; // Add this import

#[derive(Debug)]
pub enum AppError {
    Internal(String),
    NotFound(String),
    Unauthorized(String),
    BadRequest(String),
    Validation(ValidationErrors), // Add this variant
}

// Implement From<ValidationErrors> for AppError
impl From<ValidationErrors> for AppError {
    fn from(err: ValidationErrors) -> Self {
        AppError::Validation(err)
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            AppError::Internal(msg) => (StatusCode::INTERNAL_SERVER_ERROR, msg),
            AppError::NotFound(msg) => (StatusCode::NOT_FOUND, msg),
            AppError::Unauthorized(msg) => (StatusCode::UNAUTHORIZED, msg),
            AppError::BadRequest(msg) => (StatusCode::BAD_REQUEST, msg),
            AppError::Validation(errors) => (StatusCode::BAD_REQUEST, errors.to_string()),
        };

        Json(json!({
            "error": message
        }))
        .into_response()
    }
}
