use axum::{
    http::{
        header::{AUTHORIZATION, CONTENT_TYPE},
        Method,
    },
    routing::get,
    Extension, Router,
};
use handlers::{
    auth::auth_routes, review::review_routers, society::society_routes, user::user_routes,
};
use sqlx::postgres::PgPoolOptions;
use tower_http::cors::{Any, Cors, CorsLayer};

// mod
mod error;
mod handlers;
mod models;
mod services;

#[tokio::main]
async fn main() {
    // build our application with a single route
    dotenv::dotenv().ok();
    let port = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse::<u16>().ok())
        .unwrap_or(8080);
    let address = format!("127.0.0.1:{}", port);

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
        .allow_origin(Any)
        .allow_headers([AUTHORIZATION, CONTENT_TYPE]);

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("failed to create pool");

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("migration failed");

    let app = Router::new()
        .merge(auth_routes())
        .merge(user_routes())
        .merge(society_routes())
        .merge(review_routers())
        .layer(Extension(pool))
        .layer(cors);

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind(address).await.unwrap();
    println!(
        "The server is listening on port: {:?}",
        listener.local_addr().unwrap()
    );
    axum::serve(listener, app).await.unwrap();
}
