require('dotenv').config();
const jwt = require('jsonwebtoken');

// Mock user for token generation
const user = {
  email: "test@example.com",
  id: 1
};

// Generate token
try {
  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  
  console.log("Generated JWT Token:");
  console.log(token);
  console.log("\nUse this token in your Authorization header:");
  console.log(`Authorization: Bearer ${token}`);
} catch (error) {
  console.error("Error generating token:", error.message);
}
