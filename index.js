// import dotenv and call config function to load environment
require("dotenv").config();
const express = require("express");

// Get routes to the variabel

const app = express();
const API = "/api/v1";

const port = 5000;

app.use(express.json());

// Add endpoint grouping and router

// add route here to serving static file
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
