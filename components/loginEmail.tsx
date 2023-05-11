"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  UserCredential,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import app from "@/utils/firebase";
import axios from "axios";
import { InputEmail, InputPassword } from "./Input";
import { setCookie } from "cookies-next";

type LoginEmailPayload = {
  status: 200 | 404;
  message: string;
  token: string;
  data?: Array<string>;
};
const auth = getAuth(app);

const LoginEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false);

  const LoginWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      setError((prev) => ({
        ...prev,
        error: true,
        message: "Email tidak boleh kosong",
      }));
      return;
    }
    if (!password) {
      setError((prev) => ({
        ...prev,
        error: true,
        message: "Password tidak boleh kosong",
      }));
      return;
    }
    let uid = null;
    try {
      const payload: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      uid = payload.user.uid;
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code == "auth/user-not-found") {
          setError((prev) => ({
            ...prev,
            error: true,
            message: "Akun tidak ditemukan",
          }));
        } else if (error.code == "auth/wrong-password") {
          setError((prev) => ({
            ...prev,
            error: true,
            message: "Password salah",
          }));
        } else {
          const temp = error.code.split("/")[1];
          setError((prev) => ({
            ...prev,
            error: true,
            message: temp,
          }));
        }
      } else {
        console.log(error);
      }
      setLoading(false);
      return;
    }

    const { data } = await axios.post<LoginEmailPayload>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login_email`,
      // "http://localhost:8080/api/user/login_email",
      { uid }
    );
    setCookie("token", data.token, { maxAge: 60 * 60 });
    if (data.status === 200) {
      router.push("/dashboard");
    } else if (data.status === 404) {
      setError((prev) => ({
        ...prev,
        error: true,
        message: data.message,
      }));
    }
    setLoading(false);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={LoginWithEmail}>
      <InputEmail value={email} onChange={setEmail} />
      <InputPassword value={password} onChange={setPassword} />
      {error.error && (
        <p className="text-sm text-red-500 font-bold">{error.message}</p>
      )}
      <div className="flex justify-center">
        <button
          type="submit"
          className="py-2 px-8 rounded-xl font-bold text-sm bg-emerald-800 text-emerald-50 disabled:bg-slate-500 transition-all"
          disabled={password.length < 6 || loading}
        >
          {loading ? "Loading..." : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default LoginEmail;
