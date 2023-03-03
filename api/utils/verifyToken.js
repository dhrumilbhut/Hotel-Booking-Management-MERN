import JWT from "jsonwebtoken";
import customError from "./customError.js";

export const verifyToken = (req, res, next) => {
  const token = localStorage.getItem("access_token");
  console.log(token);

  if (!token) {
    return next(customError(401, "You are not authenticated !token"));
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return customError(403, "Token is not valid");
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
