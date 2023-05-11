import Link from "next/link";
import LoginEmail from "@/components/loginEmail";
import LoginGoogle from "@/components/LoginGoogle";

function Login() {
  return (
    <div className="sm:p-16 p-4 flex flex-col gap-8 justify-center items-center h-full">
      <h1 className="text-4xl font-extrabold">Log in</h1>
      <div className="p-8 bg-emerald-900/20 rounded-2xl flex flex-col items-center">
        <LoginGoogle />
        <div className="my-4 px-4 w-full flex items-center gap-2">
          <div className="w-full bg-emerald-900 h-[1px]" />
          <p className="text-xs">OR</p>
          <div className="w-full bg-emerald-900 h-[1px]" />
        </div>
        <LoginEmail />
      </div>
      <p className="text-xs font-bold">
        Belum terdaftar?{" "}
        <Link href="/auth/signup" className="text-red-600">
          Daftarkan akun
        </Link>
      </p>
    </div>
  );
}

export default Login;
