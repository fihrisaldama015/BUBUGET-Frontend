import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import app from "@/utils/firebase";
import { setCookie } from "cookies-next";
import Image from "next/image";

const auth = getAuth(app);

type LoginGooglePayload = {
  message: string;
  token: string;
};

const LoginGoogle = () => {
  const router = useRouter();
  const LoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const payload: UserCredential = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(payload);
      const token = credential?.idToken;
      const name = payload?.user?.displayName;
      const { data } = await axios.post<LoginGooglePayload>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,
        // "http://localhost:8080/api/user/login",
        {
          token,
          name,
        }
      );
      setCookie("token", data.token, { maxAge: 60 * 60 * 24 });
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={LoginWithGoogle}
      className="flex gap-2 bg-white hover:bg-emerald-700 hover:text-white transition-all px-4 py-4 rounded-xl text-sm font-bold"
    >
      <Image
        src={
          "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        }
        className="w-5 h-5"
        width={20}
        height={20}
        alt="G"
      />
      Continue with Google
    </button>
  );
};

export default LoginGoogle;
