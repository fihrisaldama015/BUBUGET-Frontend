import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import { verifyToken } from "@/utils/jwt";
import HomeTransaction from "@/components/HomeTransaction";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";

type Stats = {
  balance: number;
  income: number;
  expense: number;
};

type Transaction = {
  transaction_id: number;
  user_id: number;
  transaction_type: "income" | "expense";
  amount: string;
  category_id: number | null;
  category_name: string | false;
  date: string;
  note: string;
};

export type AllTransaction = Array<Transaction>;

function Dashboard({
  transaction,
  stats,
  userName,
}: {
  transaction: AllTransaction;
  stats: Stats;
  userName: string;
}) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const montName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const addMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const subMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const validateMonth = (month: number) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    if (month >= currentMonth && year === currentYear) {
      return false;
    }
    return true;
  };
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="px-4 flex gap-4">
        <div className="p-6 flex-1 flex flex-col gap-2 bg-white rounded-2xl shadow-sm">
          <p className="pb-2 text-base font-medium">
            👋 Hi, <b>{userName}</b>
          </p>
          <p className="text-sm text-slate-700">💵 Balance</p>
          <div className="flex items-center gap-1">
            <p className="font-medium text-slate-800">
              Rp. {stats.balance > 0 ? "+" : ""}
            </p>
            <span className="font-bold text-3xl text-slate-800">
              {stats.balance}
            </span>
          </div>
        </div>
        <div className="p-4 gap-4 flex flex-col justify-center">
          <button
            className={`p-1 bg-emerald-900/10 rounded-lg ${
              validateMonth(month)
                ? "cursor-pointer"
                : "cursor-not-allowed bg-transparent"
            }`}
            disabled={!validateMonth(month)}
            onClick={() => addMonth()}
          >
            &uarr;
          </button>
          <p className="font-bold text-lg">
            {montName[month]} {year}
          </p>
          <button
            className="p-1 bg-emerald-900/10 rounded-lg"
            onClick={() => subMonth()}
          >
            &darr;
          </button>
        </div>
      </div>
      <div className="mx-4 p-6 bg-white rounded-2xl shadow-sm">
        <p className="pb-2 text-sm font-medium">Total Pemasukan</p>
        <div className="flex items-center gap-1">
          <p className="font-medium text-slate-800">
            Rp. {stats.income > 0 ? "+" : ""}
          </p>
          <span className="font-bold text-3xl text-slate-800">
            {stats.income}
          </span>
        </div>
        <div className="flex gap-2 mt-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
        </div>
      </div>
      <div className="flex bg-emerald-700 ring-1 ring-emerald-900/20 rounded-full shadow-sm">
        <div className="flex-1 px-4 py-2 bg-white rounded-full text-center">
          Harian
        </div>
        <div className="flex-1 px-4 py-2 bg-emerald-700 rounded-r-full text-center">
          Mingguan
        </div>
      </div>
      <HomeTransaction transaction={transaction} />
      <LogoutButton />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = cookies(context);
  const tokenFromCookie: string = token || "not found";
  const user = await verifyToken(tokenFromCookie);
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user.user_id}/transaction`
  );
  const transaction: AllTransaction = await res.json();

  const res_stats = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user.user_id}/stats`
  );
  const stats: Stats = await res_stats.json();

  return {
    props: {
      transaction,
      stats,
      userName: user.user_name,
    },
  };
}

export default Dashboard;
