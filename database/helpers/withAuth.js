const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../../config").JWT_SECRET_KEY;
const withAuth = (req, res, next) => {
  console.log(req.cookies);
  const token =
    req.body.poseidon_auth_urs ||
    req.query.poseidon_auth_urs ||
    req.headers["x-access-poseidon_auth_urs"] ||
    req.cookies.poseidon_auth_urs;

  console.log(token);
  if (!token) {
    res.json({
      error: {
        message: "Unauthorized Request 1"
      },
      success: null
    });
  } else {
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({
          error: {
            message: "Unauthorized Request"
          },
          success: null
        });
      } else {
        req.auth = decoded.auth;
        next();
      }
    });
  }
};

module.exports = withAuth;
