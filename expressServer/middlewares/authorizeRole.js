export default function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).send("Access denied: insufficient permissions");
    }
    next();
  };
}
