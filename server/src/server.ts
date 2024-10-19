// Server imports
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorHandler from 'middleware-http-errors';
import cors from 'cors';
import 'dotenv/config';
import { Server } from 'http';

// Helper functions here if needed

// Route imports here


// Set up web app using JSON
const app = express();
app.use(express.json());
const httpServer = new Server(app);


// Use middleware that allows for access from other domains
app.use(cors({
  origin: ["http://localhost:8080", "https://sparchub.denzeliskandar.com"],
  credentials: true
}));


const PORT: number = parseInt(process.env.PORT || '3030');
const isProduction: boolean = process.env.NODE_ENV === "production";


///////////////////////// ROUTES /////////////////////////


// HEALTH CHECK ROUTE
app.get('/', (req: Request, res: Response) => {
  console.log("Health check")
  return res.status(200).json({
    message: "Server is up!"
  });
});


// OTHER ROUTES HERE


///////////////////////// SERVER /////////////////////////


// Logging errors
app.use(morgan('dev'));

app.use(errorHandler());

// Start server
const server = httpServer.listen(PORT, () => {
  console.log(`⚡️ Server listening on port ${PORT}`);
});

// For coverage, handle Ctrl+C
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server.'));
});
