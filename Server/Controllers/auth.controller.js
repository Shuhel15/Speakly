import { genToken } from "../Configs/token.js";
import User from "../Models/user.model.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email });
      user = await user.create({ name, email });
    }
    const token = await genToken(user._id);
    res.cookie("token", token,{
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: `Goole Auth error ${error}` });
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token",{
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json({ message: `Logout Sucessfully` });
  }catch(error){
    return res.status(500).json({ message: `Logout Failed ${error}` });
    console.log("Error while logging out",error);
  }
  }
