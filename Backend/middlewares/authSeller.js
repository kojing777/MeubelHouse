import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library

const authSeller = (req, res, next) => {
  const { sellerToken } = req.cookies; // Check for token in cookies or headers
  if (!sellerToken) {
    return res.json({ success: false, message: "Unauthorized" });
  }
  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
    // Verify the token using JWT secret
    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Call the next middleware or route handler
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authSeller;