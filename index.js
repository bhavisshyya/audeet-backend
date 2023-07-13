import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import morgan from "morgan";
import cookieSession from "cookie-session";
import "express-async-errors";

// importing routes
import authRoutes from "./routes/authRoute.js";
import customerRoute from "./routes/customerRoute.js";
import supplierRoute from "./routes/supplierRoute.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import expanceRoute from "./routes/expanceRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";

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

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/customer", customerRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/purchase", purchaseRoutes);
app.use("/api/v1/expance", expanceRoute);
app.use("/api/v1/invoice", invoiceRoutes);
// error middleWare
app.use(errorMiddelware);

//listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`listening to post ${PORT} on ${process.env.DEV_MODE} mode`);
});
