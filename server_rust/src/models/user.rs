use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub zid: String,
    pub description: Option<String>,
    pub degree: Option<String>,
    pub year: Option<i32>,
    pub verified: bool,
    pub admin: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenClaims {
    pub zid: String,
    pub admin: bool,
    pub exp: usize,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateRequest {
    pub new_description: String,
}

#[derive(Debug, Deserialize)]
pub struct SetAdminRequest {
    pub zid: String,
    pub admin: bool,
}
