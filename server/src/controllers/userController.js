import User from "../models/UserModel.js";

export const addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    if (!email || !data) return res.status(400).json({ message: "email and data are required" });

    const user = await User.findOne({ email });
    if (user) {
      const already = user.likedMovies.some((m) => m.id === data.id);
      if (already) {
        return res.json({ message: "Movie already added to the liked list" });
      }
      user.likedMovies.push(data);
      await user.save();
      return res.json({ message: "Movie added successfully" });
    } else {
      await User.create({ email, likedMovies: [data] });
      return res.json({ message: "Movie added successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error adding movie" });
  }
};

export const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User with given email not found" });
    return res.json({ message: "success", movies: user.likedMovies || [] });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching movies" });
  }
};

export const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User with given email not found" });

    const index = user.likedMovies.findIndex((m) => m.id === movieId);
    if (index === -1) return res.status(400).json({ message: "Movie not found" });

    user.likedMovies.splice(index, 1);
    await user.save();

    return res.json({ message: "Movie deleted", movies: user.likedMovies });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting movie" });
  }
};
