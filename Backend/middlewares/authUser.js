import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library


const authUser = (req, res, next) => {
    const {token} = req.cookies; // Check for token in cookies or headers
    if (!token) {
        return res.json({ success: false, message: "Unauthorized" });
    }
    try {
        const tokenDecode =jwt.verify(token, process.env.JWT_SECRET);
         // Verify the token using JWT secret
         if (tokenDecode.id) {
           req.userId=tokenDecode.id; // Attach user ID to the request body
        
        }else {
            return res.json({ success: false, message: "Unauthorized" });
        }
        
        next(); // Call the next middleware or route handler
    } catch (error) {
         res.json({ success: false, message: error.message });    
    }
}

export default authUser; // Export the middleware function  