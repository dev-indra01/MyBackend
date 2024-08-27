import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
const app = express()
app.use(cookieParser())

const allowedOrigins = process.env.CORSE_ORIGIN.split(", ");
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


// app.use(cors({ origin: process.env.CORSE_ORIGIN, credentials: true }))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))



//Routes import
import userRouter from './routes/user.routes.js'

//Routes declaration

app.use("/api/v1/users", userRouter)
//http://localhost:8000/api/v1/users/register


export { app }