import { Router } from "express";
import { addToLikedMovies, getLikedMovies, removeFromLikedMovies } from "../controllers/userController.js";

const router = Router();

router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/delete", removeFromLikedMovies);

export default router;
