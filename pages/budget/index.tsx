import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { verifyToken } from "@/utils/jwt";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";
import { RUPIAH } from "@/utils/format";
import Link from "next/link";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);
type Stats = {
  balance: number;
  income: number;
  expense: number;
};

function Budget({ stats, budget }: { stats: Stats; budget: AllBudget }) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const deleteBudget = async (id: number) => {
    if (!window.confirm("Are you sure want to delete this budget?")) return;
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/budget/${id}`
      );
      alert(data.message);
      refreshData();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error?.message);
      }
      console.log(error);
    }
  };

  const calculatePercentage = (budget: number, spend: number) => {
    let result = Math.floor((spend / budget) * 100);
    if (result > 100) return 100;
    return result;
  };

  const data = {
    labels: budget.map((data) => data.category_name),
    datasets: [
      {
        label: "Total Budget",
        data: budget.map((data) => Number(data.spend)),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(34, 197, 94,1)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 1)",
        ],
        borderColor: ["rgba(2, 44, 34, 1)"],

        borderWidth: 1,
      },
    ],
    options: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="mx-20 p-6 bg-white rounded-2xl shadow-sm">
        <p className="pb-2 text-sm text-slate-800 font-medium text-center">
          💵Balance
        </p>
        <div className="flex justify-center items-center">
          <p className="font-medium text-slate-800">
            Rp{stats.balance > 0 ? "+" : ""}
          </p>
          <p className="font-black text-3xl text-slate-800">
            {RUPIAH.format(stats.balance)}
          </p>
        </div>
      </div>
      <div className="mx-5 p-6 ring-4 ring-emerald-950/50  rounded-2xl shadow-sm">
        <div className="mx-10">
          <Doughnut data={data} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-extrabold text-2xl text-emerald-950">
            Your Budget
          </h1>
          <Link href="/addbudget">
            <div className="py-2 px-4 flex gap-2 bg-emerald-900/10 hover:bg-emerald-900/20 cursor-pointer rounded-xl transition-all">
              <p className="font-black text-md text-emerald-950">ADD</p>
              <Image
                src="/addBudget.svg"
                width={11}
                height={14}
                alt="addBudget"
              />
            </div>
          </Link>
        </div>
        {budget &&
          budget.map((data, id) => (
            <div
              key={id}
              className="relative p-6 bg-white rounded-xl shadow-sm"
            >
              <div
                onClick={() => deleteBudget(data.budget_id)}
                className="absolute p-2 cursor-pointer opacity-20 transition-all hover:opacity-80 top-0 right-0"
              >
                <Image src="/trash.svg" height={24} width={24} alt="trash" />
              </div>
              <div className="w-full flex justify-between">
                <div>
                  <h1 className="font-bold text-xl text-slate-900">
                    {data.category_name}
                  </h1>
                  <span className="text-xs text-slate-500">
                    {RUPIAH.format(data.spend)} / {RUPIAH.format(data.budget)}
                  </span>
                </div>
                <p className="flex items-center">
                  Rp
                  <span className="font-black text-3xl text-slate-900">
                    {RUPIAH.format(data.budget)}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${
                      calculatePercentage(data.budget, data.spend) > 80
                        ? "bg-red-500"
                        : "bg-emerald-600"
                    }`}
                    style={{
                      width: `${calculatePercentage(data.budget, data.spend)}%`,
                    }}
                  ></div>
                </div>
                <p className="font-bold text-slate-600 text-xl">
                  {calculatePercentage(data.budget, data.spend)}%
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

type Budget = {
  budget_id: number;
  user_id: number;
  category_id: number;
  budget: number;
  spend: number;
  category_name: string;
};

type AllBudget = Budget[];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = cookies(context);
  const tokenFromCookie: string = token || "not found";
  const user = await verifyToken(tokenFromCookie);
  if (user.error?.length! > 0) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
      props: {},
    };
  }

  const res_stats = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user.user_id}/stats`
  );
  const stats: Stats = await res_stats.json();

  const res_budget = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user.user_id}/budget`
  );
  const budget: AllBudget = await res_budget.json();

  return {
    props: {
      stats,
      budget,
    },
  };
}
export default Budget;
