import LogoutButton from "@/components/LogoutButton";
import { verifyToken } from "@/utils/jwt";

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

type AllTransaction = Array<Transaction>;

async function Dashboard() {
  const user = await verifyToken();

  const stats: Stats = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user.user_id}/stats`,
    // `http://localhost:8080/api/user/${user.user_id}/stats`,
    { cache: "no-cache" }
  ).then((res) => res.json());

  const transaction: AllTransaction = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user.user_id}/transaction`,
    // `http://localhost:8080/api/user/${user.user_id}/transaction`,
    { cache: "no-cache" }
  ).then((res) => res.json());

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="px-4 flex gap-4">
        <div className="py-4 px-8 flex-1 flex flex-col gap-2 bg-white rounded-2xl">
          <p className="pb-2 text-lg font-medium">👋 Hi, Bubugu</p>
          <p className="text-xs text-slate-700">💵 Balance</p>
          <div className="flex items-center gap-1">
            <p className="font-medium text-slate-800">
              Rp. {stats.balance > 0 ? "+" : ""}
            </p>
            <span className="font-bold text-3xl text-slate-800">
              {stats.balance}
            </span>
          </div>
        </div>
        <div className="p-4 flex items-center">
          <p className="font-bold text-lg">Apr 2023</p>
        </div>
      </div>
      <div className="mx-4 py-4 px-8 bg-white rounded-2xl">
        <p className="pb-2 text-xs font-medium">Total Pemasukan</p>
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
      <div className="flex bg-emerald-700 ring-1 ring-emerald-900 rounded-full">
        <div className="flex-1 px-4 py-2 bg-white rounded-full text-center">
          Harian
        </div>
        <div className="flex-1 px-4 py-2 bg-emerald-700 rounded-r-full text-center">
          Mingguan
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {transaction.map((data, id) => (
          <div key={id}>
            <div className="p-4 relative rounded-xl bg-white">
              <p className="text-xs text-slate-800 font-medium">{data.date}</p>
              <p className="text-slate-700 font-bold">
                {data.category_id !== null ? data.category_name : "Income"}
              </p>
              <span
                className={`flex font-bold text-lg absolute top-2 right-4 ${
                  data.transaction_type == "expense"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                <p>{data.transaction_type === "income" ? "+" : "-"}Rp</p>
                <p>{data.amount}</p>
              </span>
              <p className="text-slate-600">{data.note}</p>
            </div>
          </div>
        ))}
      </div>

      <LogoutButton />
    </div>
  );
}

export default Dashboard;
