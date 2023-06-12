import { verifyToken } from "@/utils/jwt";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import React, { useState } from "react";

type BudgetError = {
  status: number;
  error: number;
  messages: {
    error: string;
  };
};

function Addbudget({
  category,
  user_id,
}: {
  category: AllCategory;
  user_id: string;
}) {
  const [amount, setAmount] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [category_id, setCategory_id] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<"percent" | "number">("number");
  const router = useRouter();

  const addBudget = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/budget`,
        {
          budget: amount,
          category_id,
          user_id,
        }
      );

      setLoading(false);
      alert(data.message);
      router.push("/budget");
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.log(error?.message);
      }
      if (error instanceof AxiosError<BudgetError>) {
        alert(error?.response?.data.messages.error);
      }
    }
  };
  return (
    <div className="p-8 relative">
      <div className="text-2xl text-emerald-950 font-extrabold text-center">
        Add Budget
      </div>
      <form className="grid" onSubmit={addBudget}>
        <div className="grid mt-4">
          <label htmlFor="category">Pilih Kategori Budget</label>
          <div className="bg-white mt-2 pr-4 rounded-xl shadow-sm focus:ring-2 ring-emerald-800/40">
            <select
              name="category"
              id="category"
              className="rounded-xl py-2 px-4 w-full focus:outline-none"
              required
              onChange={(e) => setCategory_id(Number(e.target.value))}
            >
              <option value="">Pilih Category</option>
              {category &&
                category.map((data, id) => (
                  <option key={id} value={data.category_id}>
                    {data.category_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          {mode && mode === "number" ? (
            <div>
              <label htmlFor="amount">Budget Amount</label>
              <div className="flex justify-between">
                <input
                  type="number"
                  id="amount"
                  className="rounded-xl mt-2 py-2 px-4 focus:font-bold md:w-36 text-emerald-950 text-right focus:outline-none shadow-sm"
                  value={amount > 0 ? amount?.toString() : ""}
                  placeholder="Rp.1xx.xxx"
                  onChange={(e) => setAmount(e.target.valueAsNumber)}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <label htmlFor="outcome">Pengeluaran per bulan</label>
              <input
                className="rounded-xl my-2 py-2 px-4 focus:font-bold text-emerald-950 text-right focus:outline-none shadow-sm"
                type="number"
                onChange={(e) => setIncome(e.target.valueAsNumber)}
                value={income > 0 ? income?.toString() : ""}
                placeholder="Rp.1xx.xxx"
                required
              />
              <label htmlFor="percent">Budget Amount</label>
              <div className="flex gap-1 focus:font-bold text-emerald-950 bg-white rounded-xl py-2 px-4 mt-2">
                <input
                  className="text-right focus:outline-none shadow-sm"
                  type="number"
                  onChange={(e) =>
                    setAmount((e.target.valueAsNumber * income) / 100)
                  }
                  placeholder="set angka"
                  required
                />
                <b>%</b>
              </div>
            </div>
          )}
          <div className="flex flex-1 flex-col items-center">
            <p>Mode</p>
            <div className="p-2 w-16 flex flex-col gap-2 bg-white shadow-inner shadow-emerald-900/20 text-center rounded-lg text-sm">
              <p
                onClick={() => setMode("number")}
                className={`${
                  mode === "number"
                    ? "bg-emerald-700 text-white"
                    : "hover:bg-emerald-700/10"
                } p-1 rounded-md cursor-pointer shadow-md`}
              >
                Rp.
              </p>
              <p
                onClick={() => setMode("percent")}
                className={`${
                  mode === "percent"
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                    : "hover:bg-emerald-700/10"
                } p-1 rounded-md cursor-pointer shadow-md`}
              >
                %
              </p>
            </div>
          </div>
        </div>

        {/* <div className="grid mt-4">
          Description
          <input
            type="text"
            name="description"
            id=""
            disabled
            placeholder="Coming Soon"
            className="rounded-xl bg-white px-4 py-2"
          />
        </div> */}
        <div className="flex justify-end py-8">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 font-bold text-emerald-50 text-sm bg-emerald-700 hover:bg-emerald-800 transition-all rounded-xl disabled:bg-emerald-800/70"
          >
            {loading ? "Creating..." : "CREATE"}
          </button>
        </div>
      </form>
    </div>
  );
}

type Category = {
  category_id: string;
  category_name: string;
};

type AllCategory = Category[];

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`);
  const category: AllCategory = await res.json();
  return {
    props: {
      category,
      user_id: user.user_id,
    },
  };
}

export default Addbudget;
