import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // This code retrieves the "Authorization" header from the request. If the header is missing, it returns a 401 status code with the message "Access denied".
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied" });
  }
  
  // This code splits the authorization header into the scheme and the token. It checks if the scheme is "Bearer" and ensures that a token exists. If the scheme is not "Bearer" or there is no token, it returns a 401 status code with the message "Invalid token".
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  
  // In this block, the code attempts to verify the token using jwt.verify and the provided secret key from the environment variable process.env.JWT_SECRET. If the token is successfully verified, the decoded payload is accessed, and the req.user object is populated with the email and id extracted from the decoded payload. Finally, the next() function is called to pass control to the next middleware or route handler. If an error occurs during token verification, such as an invalid token or a token that has expired, a 400 status code is returned with the message "Invalid token".
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      email: decoded.email,
      id: decoded.id,
      name: decoded.name,
      role: decoded.role,
    };
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default auth;
