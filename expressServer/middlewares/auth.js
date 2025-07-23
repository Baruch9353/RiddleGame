import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

// Middleware: verifies token from cookie or Authorization header
export function verifyToken(req, res, next) {
  const token = req.cookies?.token || (req.headers.authorization?.split(" ")[1]);
  if (!token) return res.status(403).send("Missing token");
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).send("Invalid token");
  }
}
// Middleware: checks if user's role is allowed
export function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).send("Permission denied");
    }
    next();
  };
}
