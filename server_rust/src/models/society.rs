use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Society {
    pub id: String,
    pub name: String,
    pub abbreviated_name: String,
    pub description: String,
    pub icon: String,
    pub facebook: Option<String>,
    pub discord: Option<String>,
    pub email: Option<String>,
    pub website: Option<String>,
    pub average_rating: f64,
    pub total_reviews: i32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateSocietyRequest {
    pub name: String,
    pub abbreviated_name: String,
    pub description: String,
    pub icon: String,
    pub facebook: Option<String>,
    pub discord: Option<String>,
    pub email: Option<String>,
    pub website: Option<String>,
    pub average_rating: f64,
    pub total_reviews: i32,
}
