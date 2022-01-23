const express = require("express");

// Get routes to the variabel
const authRouter = require("./app/auth/router");

const app = express();
const API = "/api/v1";

const port = 5000;

app.use(express.json());

// Add endpoint grouping and router
app.use(`${API}`, authRouter);
// add route here to serving static file
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
