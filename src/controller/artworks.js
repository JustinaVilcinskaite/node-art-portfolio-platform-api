import { v4 as uuidv4 } from "uuid";
import ArtworkModel from "../model/artwork.js";

const ADD_ARTWORK = async (req, res) => {
  try {
    const artwork = new ArtworkModel({
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      medium: req.body.medium,
      creationDate: req.body.creationDate,
      // imageUrls: req.body.imageUrls,
      imgUrl: req.body.imgUrl,
      creatorId: req.body.creatorId,
    });

    await artwork.save();

    return res
      .status(201)
      .json({ message: "Artwork has been added", artwork: artwork });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in application" });
  }
};

const GET_ALL_ARTWORKS_BY_CREATOR = async (req, res) => {
  try {
    const creatorId = req.params.creatorId;

    const artworks = await ArtworkModel.find({ creatorId: creatorId });

    if (!artworks.length) {
      return res.status(404).json({
        message: `No artworks found for creator with id ${creatorId}`,
      });
    }

    return res.status(200).json({ artworks: artworks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in application" });
  }
};

//////////
const GET_CREATOR_ARTWORKS = async (req, res) => {
  try {
    const response = await ArtworkModel.find({ creatorId: req.body.creatorId });

    return res.status(200).json({ artworks: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const GET_ARTWORK_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const artwork = await ArtworkModel.findOne({ id: id });

    if (!artwork) {
      return res
        .status(404)
        .json({ message: `Artwork with id ${id} does not exist` });
    }

    return res.status(200).json({ artwork: artwork });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in application" });
  }
};

const UPDATE_ARTWORK_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const artwork = await ArtworkModel.findOne({ id: id });

    if (!artwork) {
      return res
        .status(404)
        .json({ message: `Artwork with id ${id} does not exist` });
    }

    if (artwork.creatorId !== req.body.creatorId) {
      return res.status(403).json({
        message: "You can only update artwork that belongs to your account",
      });
    }

    const updatedArtwork = await ArtworkModel.findOneAndUpdate(
      { id: id },
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      message: "Artwork has been updated successfully",
      artwork: updatedArtwork,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in application" });
  }
};

const DELETE_ARTWORK_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;

    const artwork = await ArtworkModel.findOne({ id: id });

    if (!artwork) {
      return res
        .status(404)
        .json({ message: `Artwork with id ${id} does not exist` });
    }

    if (artwork.creatorId !== req.body.creatorId) {
      return res.status(403).json({
        message: "You can only delete artwork that belongs to your account",
      });
    }

    await ArtworkModel.deleteOne({ id: id });

    return res
      .status(200)
      .json({ message: "Artwork has been deleted", artwork: artwork });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in application" });
  }
};

// const DELETE_ARTWORK_BY_ID = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const creatorId = req.body.creatorId;

//     const artwork = await ArtworkModel.findOneAndDelete({ id, creatorId });

//     if (!artwork) {
//       return res.status(404).json({ message: `Artwork with id ${id} does not exist or you do not have permission to delete it` });
//     }

//     return res.status(200).json({ message: "Artwork has been deleted", artwork });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Error in application" });
//   }
// };

export {
  ADD_ARTWORK,
  GET_ALL_ARTWORKS_BY_CREATOR,
  GET_ARTWORK_BY_ID,
  UPDATE_ARTWORK_BY_ID,
  DELETE_ARTWORK_BY_ID,
  GET_CREATOR_ARTWORKS,
};
