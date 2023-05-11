import jwt from "jsonwebtoken";

export interface TokenPayload {
  user_id: string;
  user_name: string;
  email: string;
  error?: string;
  cookie?: string;
}

const verifyToken = async (token: string): Promise<TokenPayload> => {
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const tokenFromCookie: string = token;
    let decoded: TokenPayload = { user_id: "", user_name: "", email: "" };
    decoded = jwt.verify(tokenFromCookie, "awokawok") as TokenPayload;
    decoded.cookie = tokenFromCookie;
    return decoded;
  } catch (err) {
    if (err instanceof Error) {
      return {
        user_id: "",
        user_name: "",
        email: "",
        error: err.message,
      };
    } else {
      return {
        user_id: "",
        user_name: "",
        email: "",
        error: `${String(err)}`,
      };
    }
  }
};

export { verifyToken };
