import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import { verifyToken } from "@/utils/jwt";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";
import Head from "next/head";
import DateString from "@/components/DateString";
import UserInfo from "@/components/UserInfo";
import UserStats from "@/components/UserStats";
import DayTransaction from "@/components/DayTransaction";
import MonthTransaction from "@/components/MonthTransaction";
import ReportDownload from "@/components/ReportDownload";
import Image from "next/image";

export type Stats = {
  balance: number;
  income: number;
  expense: number;
};

export type Transaction = {
  transaction_id: number;
  user_id: string;
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
  const [mode, setMode] = useState<"day" | "month">("day");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showExport, setShowExport] = useState<boolean>(false);

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
    <div className="px-4 py-8 flex flex-col gap-8">
      <Head>
        <title>Dashboard | Bubuget</title>
      </Head>
      <div className="flex flex-col gap-4">
        <div className="px-4 flex gap-4">
          <UserInfo userName={userName} balance={stats.balance} />
          <div className="p-4 gap-4 flex flex-col justify-center">
            <button
              className={`p-1 flex justify-center rounded-lg bg-emerald-900/10  transition-all ${
                validateMonth(month)
                  ? "cursor-pointer hover:bg-emerald-900/30"
                  : "cursor-not-allowed bg-transparent"
              }`}
              disabled={!validateMonth(month)}
              onClick={() => addMonth()}
            >
              <Image
                src="/arrowDown.svg"
                style={{ transform: "rotate(180deg)" }}
                width={24}
                height={24}
                alt="arrow"
              />
            </button>
            <DateString month={month} year={year} />
            <button
              className="p-1 flex justify-center rounded-lg bg-emerald-900/10 hover:bg-emerald-900/30 transition-all"
              onClick={() => subMonth()}
            >
              <Image src="/arrowDown.svg" width={24} height={24} alt="arrow" />
            </button>
          </div>
        </div>
        <UserStats income={stats.income} expense={stats.expense} />
      </div>
      <div className="px-4 flex gap-8">
        <div className="flex flex-1 bg-emerald-700 ring-2 ring-emerald-900/75 rounded-full shadow-sm">
          <div
            onClick={() => setMode("day")}
            className={`flex-1 px-4 py-2 text-center cursor-pointer transition-all ${
              mode === "day"
                ? "bg-white rounded-full"
                : "bg-emerald-700 rounded-l-full"
            }`}
          >
            Daily
          </div>
          <div
            onClick={() => setMode("month")}
            className={`flex-1 px-4 py-2 text-center cursor-pointer transition-all ${
              mode === "month"
                ? "bg-white rounded-full"
                : "bg-emerald-700 rounded-r-full"
            }`}
          >
            Monthly
          </div>
        </div>
        <div
          onClick={() => setShowExport((value) => !value)}
          className="p-2 flex items-center justify-center w-12 h-12 ring-2 ring-emerald-900/75 rounded-full bg-emerald-900/20 cursor-pointer hover:bg-emerald-900/10 transition-all"
        >
          <Image src="/export.svg" width={17} height={26} alt="export" />
        </div>
      </div>
      <div className={`${showExport ? "" : "hidden"}`}>
        <ReportDownload
          transaction={transaction}
          stats={stats}
          userName={userName}
          month={month}
          year={year}
        />
      </div>
      {mode === "day" ? (
        <DayTransaction transaction={transaction} />
      ) : (
        <MonthTransaction transaction={transaction} month={month} />
      )}
      <LogoutButton />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = cookies(context);
  const tokenFromCookie: string = token || "not found";
  const user = await verifyToken(tokenFromCookie);
  if (user.error?.length! > 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
      props: {},
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
