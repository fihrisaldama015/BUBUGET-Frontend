import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface TokenPayload {
  user_id: string;
  user_name: string;
  email: string;
  error?: string;
  cookie?: string;
}

const verifyToken = async (): Promise<TokenPayload> => {
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const cookie = cookies();
    const tokenFromCookie: string = cookie.get("token")?.value || "";
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
