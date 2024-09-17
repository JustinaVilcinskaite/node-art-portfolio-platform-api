import { v4 as uuidv4 } from "uuid";
import CreatorModel from "../model/creator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SIGN_UP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const creator = new CreatorModel({
      id: uuidv4(),
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email,
      password: hash,
      thumbnailUrl: req.body.thumbnailUrl,
    });

    await creator.save();

    return res
      .status(201)
      .json({ creator: creator, message: "Creator account has been created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in application" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const creator = await CreatorModel.findOne({ email: req.body.email });

    if (!creator) {
      return res
        .status(401)
        .json({ message: "Your email or password is incorrect" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      creator.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Your email or password is incorrect" });
    }

    const token = jwt.sign(
      {
        email: creator.email,
        creatorId: creator.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24H" }
    );

    //  creatorId: creator.id,
    return res.status(200).json({
      token: token,
      creatorId: creator.id,
      message: "Login was successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in application" });
  }
};

const GET_CREATOR_ACCOUNT_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const creator = await CreatorModel.findOne({ id: id });

    if (!creator) {
      return res
        .status(404)
        .json({ message: `Account with id ${id} does not exist` });
    }

    return res.status(200).json({ creator: creator });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const DELETE_CREATOR_ACCOUNT_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const requesterId = req.body.creatorId;

    const creator = await CreatorModel.findOne({ id: id });

    if (!creator) {
      return res
        .status(404)
        .json({ message: `Account with id ${id} does not exist` });
    }

    if (creator.id !== requesterId) {
      return res.status(403).json({
        message: "You can only delete your own account",
      });
    }

    await CreatorModel.deleteOne({ id: id });

    return res
      .status(200)
      .json({ message: "Your account has been deleted", creator: creator });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in application" });
  }
};

const GET_ALL_CREATORS = async (req, res) => {
  try {
    const creators = await CreatorModel.find({}, "fullName thumbnailUrl");

    return res.status(200).json({ creators: creators });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in application" });
  }
};

const VALIDATE_LOGIN = async (req, res) => {
  try {
    return res.status(200).json({ message: "user is validated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in application" });
  }
};

export {
  SIGN_UP,
  LOGIN,
  GET_CREATOR_ACCOUNT_BY_ID,
  DELETE_CREATOR_ACCOUNT_BY_ID,
  GET_ALL_CREATORS,
  VALIDATE_LOGIN,
};
