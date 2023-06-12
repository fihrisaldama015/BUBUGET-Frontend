import { RUPIAH } from "@/utils/format";
import Image from "next/image";
import { useState } from "react";

function UserStats({ income, expense }: { income: number; expense: number }) {
  const [mode, setMode] = useState<"income" | "expense">("income");
  return (
    <div className="mx-4 p-6 bg-white rounded-2xl shadow-sm flex justify-between">
      <button
        className={`p-1 flex justify-center items-center rounded-lg bg-emerald-900/10  transition-all hover:bg-emerald-900/30`}
        onClick={() =>
          setMode((mode) => (mode === "income" ? "expense" : "income"))
        }
      >
        <Image
          src="/arrowDown.svg"
          style={{ transform: "rotate(90deg)" }}
          width={24}
          height={24}
          alt="arrow"
        />
      </button>
      <div>
        <p className="pb-2 text-sm font-medium">
          {mode === "income" ? "Total Income" : "Total Expense"}
        </p>
        <div className="flex items-center gap-1">
          <p className="font-medium text-slate-800">
            Rp{income > 0 ? "+" : ""}
          </p>
          <span className="font-black text-3xl text-slate-800">
            {mode === "income" ? RUPIAH.format(income) : RUPIAH.format(expense)}
          </span>
        </div>
        <div className="flex gap-2 mt-2 justify-center">
          <div
            className={`w-2 h-2 rounded-full ${
              mode === "income" ? "bg-red-500" : "bg-slate-200"
            }`}
          ></div>
          <div
            className={`w-2 h-2 rounded-full ${
              mode === "expense" ? "bg-red-500" : "bg-slate-200"
            }`}
          ></div>
        </div>
      </div>
      <button
        className={`p-1 flex justify-center items-center rounded-lg bg-emerald-900/10  transition-all hover:bg-emerald-900/30`}
        onClick={() =>
          setMode((mode) => (mode === "income" ? "expense" : "income"))
        }
      >
        <Image
          src="/arrowDown.svg"
          style={{ transform: "rotate(270deg)" }}
          width={24}
          height={24}
          alt="arrow"
        />
      </button>
    </div>
  );
}

export default UserStats;
