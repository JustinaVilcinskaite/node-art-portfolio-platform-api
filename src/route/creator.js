import express from "express";

import {
  SIGN_UP,
  LOGIN,
  GET_CREATOR_ACCOUNT_BY_ID,
  DELETE_CREATOR_ACCOUNT_BY_ID,
  GET_ALL_CREATORS,
  VALIDATE_LOGIN,
} from "../controller/creator.js";

import authCreator from "../middleware/auth.js";

const router = express.Router();

// Authenticated routes
router.post("/creators", SIGN_UP);
router.post("/login", LOGIN);
router.get("/login/validate", authCreator, VALIDATE_LOGIN);
router.get("/creators/:id", authCreator, GET_CREATOR_ACCOUNT_BY_ID);
router.delete("/creators/:id", authCreator, DELETE_CREATOR_ACCOUNT_BY_ID);

// Public route
router.get("/public/creators", GET_ALL_CREATORS);

export default router;
