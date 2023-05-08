import Link from "next/link";

export default function Home() {
  return (
    <main className="pt-32 px-8 flex flex-col gap-4">
      <h4 className="text-lg font-bold">Welcome Bubugu..!</h4>
      <h1 className="text-4xl font-extrabold">BE WISE TO MANAGE YOUR MONEY</h1>
      <div>
        <p className="text-sm">Bubuget will help you to manage your money.</p>
        <p className="text-sm">Simple way that will save your future budget.</p>
      </div>
      <div className="flex gap-4 mt-8">
        <button className="py-2 px-8 rounded-xl bg-emerald-600/60 text-emerald-950 font-black text-sm">
          <Link href="/auth/signup">Sign Up</Link>
        </button>
        <button className="py-2 px-8 rounded-xl bg-emerald-600/60 text-emerald-950 font-black text-sm">
          <Link href="/auth/login">Login</Link>
        </button>
      </div>
    </main>
  );
}
