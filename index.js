import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import morgan from "morgan";
import cookieSession from "cookie-session";
import "express-async-errors";

// error middleware
import errorMiddelware from "./middlewares/errorMiddleware.js";

//security packages
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";

dotenv.config();
connectDb();
const app = express();

// middlewares
app.use(ExpressMongoSanitize()); //to secure database
app.use(helmet()); //to secure header data
app.use(xss()); //to prevent from cross site scripting
app.use(express.json()); //to use json data in our application
app.use(
   cookieSession({
      name: "session",
      keys: ["eduleague"],
      maxAge: 24 * 60 * 60 * 100,
   }),
);

app.use(morgan("dev")); //logs which api route has been called and other info

// error middleWare
app.use(errorMiddelware);

//listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`listening to post ${PORT} on ${process.env.DEV_MODE} mode`);
});
