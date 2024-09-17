import jwt from "jsonwebtoken";

const authCreator = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Auth failed" });
      }

    const decryptedInfo = jwt.verify(token, process.env.JWT_SECRET);

    if (!decryptedInfo) {
        return res.status(401).json({ message: "Auth failed" });
    }

    req.body.creatorId = decryptedInfo.creatorId;


    return next();

};

export default authCreator;




