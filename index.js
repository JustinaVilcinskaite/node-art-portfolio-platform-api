import express from "express";
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from "cors";

import ArtworkRouter from "./src/route/artwork.js";
import CreatorRouter from "./src/route/creator.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION)
  .then(() => console.log('Connected to DB successfully'))
  .catch((error) => {
    console.log(error);
  });

app.use(ArtworkRouter);
app.use(CreatorRouter);

app.use((req, res) => {
    return res.status(404).send({ message: "Sorry, endpoint does not exist" });
  });

app.listen(process.env.PORT, () => {
    console.log(`Your application is launched successfully on port ${process.env.PORT}`);
});
