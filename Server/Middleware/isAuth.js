import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "User does not have token",
      });
    }

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};