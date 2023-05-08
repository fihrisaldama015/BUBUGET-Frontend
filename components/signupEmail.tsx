"use client";

import { useEffect, useState } from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import app from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { InputEmail, InputPassword } from "./Input";
import axios from "axios";

const auth = getAuth(app);

type SignupEmailPayload = {
  status: 200 | 400;
  message: string;
  data?: Array<string>;
};

const SignupEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false);

  const SignUpWithEmail = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
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
    try {
      const payload: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { email: user_email, displayName: name, uid } = payload.user;
      const { data } = await axios.post<SignupEmailPayload>(
        "http://localhost:8080/api/user/signup_email",
        { uid, email: user_email, name }
      );
      if (data.status === 200) {
        router.push("/auth/login");
      } else if (data.status === 400) {
        setError((prev) => ({
          ...prev,
          error: true,
          message: data.message,
        }));
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code == "auth/email-already-in-use") {
          setError((prev) => ({
            ...prev,
            error: true,
            message: "Email sudah terdaftar",
          }));
          setTimeout(() => {
            router.push("/auth/login");
          }, 1000);
          return;
        } else if (error.code == "auth/invalid-email") {
          setError((prev) => ({
            ...prev,
            error: true,
            message: "Email tidak valid",
          }));
        } else if (error.code == "auth/weak-password") {
          setError((prev) => ({
            ...prev,
            error: true,
            message: "Password terlalu lemah",
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
    }

    setLoading(false);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={SignUpWithEmail}>
      <InputEmail value={email} onChange={setEmail} />
      <InputPassword value={password} onChange={setPassword} />
      <p
        className={`${
          password.length >= 6 ? "text-green-700" : "text-red-500"
        } text-xs font-medium`}
      >
        * 6 Character Password
      </p>
      {error.error && (
        <p className="text-sm text-red-500 font-bold">{error.message}</p>
      )}
      <div className="flex justify-center">
        <button
          type="submit"
          className="py-2 px-8 rounded-xl font-bold text-sm bg-emerald-800 text-emerald-50 disabled:bg-slate-500 transition-all"
          disabled={password.length < 6 || loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default SignupEmail;
