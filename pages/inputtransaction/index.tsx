import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import cookies from "next-cookies";
import { verifyToken } from "@/utils/jwt";
import axios from "axios";
import { useRouter } from "next/router";

type Category = {
  category_id: number;
  category_name: string;
};

function InputTransaction({
  user_budget,
  user_id,
}: {
  user_budget: AllBudget;
  user_id: string;
}) {
  const [transaction_type, setTransactionType] = useState<"expense" | "income">(
    "expense"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [category_id, setCategory_id] = useState<number | null>(null);
  const router = useRouter();

  const myDate = new Date(Date.now());
  const today = `${myDate.getFullYear()}-${
    myDate.getMonth() + 1
  }-${myDate.getDate()}`;
  const [date, setDate] = useState<string>(today);

  const availableCategory: Category[] = [];
  user_budget.filter((data) => {
    let temp = {
      category_id: 0,
      category_name: "",
    };
    temp["category_id"] = data.category_id;
    temp["category_name"] = data.category_name;
    availableCategory.push(temp);
  });

  const AddTransaction = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction`,
        {
          user_id,
          transaction_type,
          amount,
          note,
          date,
          category_id,
        }
      );
      alert(data.message);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (transaction_type === "income") setCategory_id(null);
  }, [transaction_type]);

  return (
    <>
      <div className="mt-10 pb-2 text-sm font-bold flex justify-between">
        <div
          onClick={() => setTransactionType("income")}
          className={`ml-8 pb-3 pt-3 pl-6 pr-6 ${
            transaction_type === "income"
              ? "bg-emerald-800 text-white"
              : "bg-white hover:bg-emerald-800/10"
          } rounded-2xl text-lg cursor-pointer`}
        >
          Pemasukan
        </div>
        <div
          onClick={() => setTransactionType("expense")}
          className={`mr-8 pb-3 pt-3 pl-6 pr-6 ${
            transaction_type === "expense"
              ? "bg-emerald-800 text-white"
              : "bg-white hover:bg-emerald-800/10"
          } rounded-2xl text-lg cursor-pointer`}
        >
          Pengeluaran
        </div>
      </div>
      <div className="pl-10 pr-10 rounded-2xl">
        <form className="grid" onSubmit={AddTransaction}>
          <div className="grid mt-4">
            Tanggal
            <input
              type="datetime-local"
              id="date"
              placeholder="date"
              className="rounded-xl py-2 px-4 focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="grid mt-4">
            Jumlah Uang
            <div>
              <input
                type="number"
                name="amount"
                placeholder="Rp.xx.xxx"
                className="rounded-xl py-2 px-4 focus:outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid mt-4">
            Keterangan
            <input
              type="text"
              name="description"
              placeholder="Masukan Keterangan"
              className="rounded-xl py-2 px-4 focus:outline-none"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div
            className={`grid mt-4 ${
              transaction_type === "income" ? "hidden" : ""
            }`}
          >
            Kategori budget
            <select
              name="kategori"
              className="rounded-xl py-2 px-4 focus:outline-none"
              value={category_id === null ? "" : category_id}
              onChange={(e) => setCategory_id(Number(e.target.value))}
              required={transaction_type === "expense" ? true : false}
            >
              <option value="">Pilih</option>
              {availableCategory &&
                availableCategory.map((data, id) => (
                  <option key={id} value={data.category_id}>
                    {data.category_name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-end py-8">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 font-bold text-emerald-50 text-sm bg-emerald-700 hover:bg-emerald-800 transition-all rounded-xl disabled:bg-emerald-800/70"
            >
              {loading ? "Creating..." : "SAVE"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

type Budget = {
  budget_id: number;
  user_id: string;
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
        permanent: false,
        destination: "/auth/login",
      },
      props: {},
    };
  }

  const res_budget = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${user.user_id}/budget`
  );
  const user_budget: AllBudget = await res_budget.json();

  return {
    props: {
      user_budget,
      user_id: user.user_id,
    },
  };
}

export default InputTransaction;
