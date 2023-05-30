import users from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find().sort({ createdAt: -1 });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  if (req.params.id === req.userId) {
    try {
      const updatedProfile = await users.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  }
};

export const follow = async (req, res) => {
  const currentUserId = req.userId;
  const friendId = req.params.id;
  try {
    const updatedUser = await users.findByIdAndUpdate(
      currentUserId,
      {
        $addToSet: { followings: friendId },
      },
      { new: true }
    );
    await users.findByIdAndUpdate(
      friendId,
      {
        $addToSet: { followers: currentUserId },
      },
      { new: true }
    );
    const { password, ...user_data } = updatedUser._doc;
    res.status(200).json(user_data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const unfollow = async (req, res) => {
  const currentUserId = req.userId;
  const friendId = req.params.id;
  try {
    const updatedUser = await users.findByIdAndUpdate(
      currentUserId,
      {
        $pull: { followings: friendId },
      },
      { new: true }
    );
    await users.findByIdAndUpdate(
      friendId,
      {
        $pull: { followers: currentUserId },
      },
      { new: true }
    );
    const { password, ...user_data } = updatedUser._doc;
    res.status(200).json(user_data);
  } catch (error) {
    res.status(500).json(error);
  }
};
