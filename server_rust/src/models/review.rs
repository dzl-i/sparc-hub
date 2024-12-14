use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Serialize, Deserialize)]
pub struct Review {
    pub id: String,
    pub title: String,
    pub content: String,
    pub rating: i32,
    pub anonymous: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub user_id: String,
    pub society_id: String,
}

#[derive(Debug, Deserialize, Validate)]
pub struct CreateReviewRequest {
    #[validate(length(min = 1, message = "Title is required"))]
    pub title: String,
    #[validate(length(min = 1, message = "Content is required"))]
    pub content: String,
    #[validate(range(min = 1, max = 5, message = "Rating must be between 1 and 5"))]
    pub rating: i32,
    pub anonymous: bool,
    pub society_id: String,
    pub tags: Option<Vec<String>>,
}
