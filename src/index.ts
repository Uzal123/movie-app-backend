import express from "express";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import app from "./app";

const port = 5000;

app.listen(port, () => console.log("Started server on port", port));
mongoose
  .connect(
    `mongodb+srv://rockinguzal:wAvOCfiRjN0Qw6q7@cluster0.uo7yr7y.mongodb.net/`
  )
  .then(async () => {
    console.log("Connected to Database!");
  })
  .catch((err) => console.error("Error connecting to database!", err));

export default app;
