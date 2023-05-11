import Link from "next/link";
import SignupEmail from "@/components/signupEmail";
import LoginGoogle from "@/components/LoginGoogle";

function Signup() {
  return (
    <div className="sm:p-16 p-4 flex flex-col gap-8 justify-center items-center h-full">
      <h1 className="text-4xl font-extrabold">Sign Up</h1>
      <div className="p-8 bg-emerald-900/20 rounded-2xl flex flex-col items-center">
        <LoginGoogle />
        <div className="my-4 px-4 w-full flex items-center gap-2">
          <div className="w-full bg-emerald-900 h-[1px]" />
          <p className="text-xs">OR</p>
          <div className="w-full bg-emerald-900 h-[1px]" />
        </div>
        <SignupEmail />
      </div>
      <p className="text-xs font-bold">
        Sudah Punya Akun?{" "}
        <Link href="/auth/login" className="text-red-600">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
