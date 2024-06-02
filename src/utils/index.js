import jwt from "jsonwebtoken";

export function checkTokenExpiration(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey);
    const exp = decoded.exp;

    if (exp) {
      const expirationTime = new Date(exp * 1000);
      return expirationTime > new Date();
    }
    return false;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return false;
    }
    throw error;
  }
}
