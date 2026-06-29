import { genToken } from "../Configs/token.js";
import User from "../Models/user.model.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    const token = genToken(user._id);

    return res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Google Auth Failed",
    });
  }
};