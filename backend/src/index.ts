import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import * as cors from "cors";
import movieRouter from './routes/movie.route'
import userRouter from "./routes/user.route";
import sessionRouter from "./routes/session.route";

// Load enviornment variables from .env file
dotenv.config();

const app: Express = express();

// Middleware (functions that intercept requests)
app.use(cors.default()); // Allows us to connect to the api from any website
app.use(express());
app.use(express.json()); // Reads the body from a post request properly

const port = process.env.PORT || 8000;



app.get("/healthcheck", (request: Request, res: Response) => res.sendStatus(200));

app.use('/api/movies', movieRouter)

// TODO
app.use('/api/session', sessionRouter)
app.use('/api/user', userRouter)


app
  .listen(port, () => {
    console.log(`Backend is running at http://localhost:${port}`);
  })
  .on("error", (error) => {
    console.log(error);
  });
