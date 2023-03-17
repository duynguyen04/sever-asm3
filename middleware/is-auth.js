// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const authHeader = req.get("Authorization");
//   // console.log("authHeader", authHeader);
//   if (!authHeader) {
//     const error = new Error("Not authenticated.");
//     error.statusCode = 401;
//     throw error;
//   }
//   const token = authHeader.split(" ")[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, "somesupersecretsecret");
//     // console.log("decodedToken", decodedToken);
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     const error = new Error("Not authenticated.");
//     error.statusCode = 401;
//     throw error;
//   }
//   req.userId = decodedToken.userId;
//   req.role = decodedToken.role;
//   next();
// };

module.exports = (req, res, next) => {
  console.log("@@@@@",req.session.isLoggedIn); //req.session.isLoggedIn
  if (req.session.isLoggedIn) {
    next();
  } else {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
};
