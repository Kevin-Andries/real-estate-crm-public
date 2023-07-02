import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
// Routers
import mainRouter from "./routers/mainRouter";
import authRouter from "./routers/authRouter";
import estateRouter from "./routers/estateRouter";
import userRouter from "./routers/userRouter";
// Controllers
import errorController from "./controllers/errorController/errorController";

const app = express();

// TODO: replace "any" by correct type everywhere

const corsConfig = {
	// TODO: replace empty string with prod URL
	origin: process.env.NODE_ENV === "dev" ? "http://localhost:3000" : "",
	credentials: true,
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(compression());

// log every incoming requests
app.use((req, _, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

// Routers
app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/estate", estateRouter);
app.use("/user", userRouter);

// Handle errors
app.use("*", errorController);

export default app;
