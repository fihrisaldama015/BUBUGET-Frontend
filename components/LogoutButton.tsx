"use client";

import { signOut, getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import app from "@/utils/firebase";
import { deleteCookie } from "cookies-next";

const auth = getAuth(app);

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      deleteCookie("token");
      router.push("/auth/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <button type="button" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
