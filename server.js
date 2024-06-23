import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

// creating my own _dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__dirname);

import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import productsRoute from "./routes/product.route.js";
import emailRoute from "./routes/email.route.js";
import settingsRoute from "./routes/settings.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/products", productsRoute);
app.use("/api/email", emailRoute);
app.use("/api/settings", settingsRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/client/dist/index.html")))

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});