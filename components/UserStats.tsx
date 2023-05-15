import { RUPIAH } from "@/utils/format";

function UserStats({ income, expense }: { income: number; expense: number }) {
  return (
    <div className="mx-4 p-6 bg-white rounded-2xl shadow-sm">
      <p className="pb-2 text-sm font-medium">Total Income</p>
      <div className="flex items-center gap-1">
        <p className="font-medium text-slate-800">Rp{income > 0 ? "+" : ""}</p>
        <span className="font-black text-3xl text-slate-800">
          {RUPIAH.format(income)}
        </span>
      </div>
      <div className="flex gap-2 mt-2 justify-center">
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
      </div>
    </div>
  );
}

export default UserStats;
