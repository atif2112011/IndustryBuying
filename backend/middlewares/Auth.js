//Verify Auth Token
const verifyAuthToken = async (req, res, next) => {
  //TODO : verify the JWT token, if valid, send a success response, if not valid, send an error response.
  // You can use a library like jsonwebtoken to verify the token.
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format

    if (!token) throw new Error("Token Not Found.");

    // verify
    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (!data) throw new Error(" User Not Logged In. ");

    req.user = data;

    res
      .json({ message: "Token Verified Successfully", success: true })
      .status(200);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyAuthToken