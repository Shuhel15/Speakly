import jwt from 'jsonwebtoken';

 export const genToken = async (UserId)=>{
  try
  {const token = jwt.sign({userId: UserId}, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
}catch (error) {
  console.log("Error while generating token",error);
}
}