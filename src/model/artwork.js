import mongoose from "mongoose";

const artworkSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  medium: { type: String, required: true },
  creationDate: { type: Number, required: true },
  // imageUrls: { type: [String], required: true },
  imgUrl: { type: String, required: true },
  creatorId: { type: String, required: true },
});

export default mongoose.model("Artwork", artworkSchema);
