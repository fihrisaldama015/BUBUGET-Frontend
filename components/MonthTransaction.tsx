import { AllTransaction, Transaction } from "@/pages/dashboard";
import { useEffect, useState } from "react";

type MonthTransaction = Record<string, Transaction[]>;

function MonthTransaction({
  transaction,
  month,
}: {
  transaction: AllTransaction;
  month: number;
}) {
  const [monthTransaction, setMonthTransaction] = useState<MonthTransaction>();

  function groupBy(arr: AllTransaction, fn: (item: Transaction) => any) {
    return arr.reduce<Record<string, Transaction[]>>((prev, curr) => {
      const groupKey = fn(curr);
      const group = prev[groupKey] || [];
      group.push(curr);
      return { ...prev, [groupKey]: group };
    }, {});
  }

  function calculateSum(array: Transaction[], property: string): string {
    const total = array.reduce((accumulator, object: Transaction) => {
      if (object.transaction_type === "income")
        return accumulator + Number(object[property as keyof Transaction]);
      return accumulator - Number(object[property as keyof Transaction]);
    }, 0);

    if (total < 0) return "-Rp." + Math.abs(total);
    return "Rp" + total;
  }

  useEffect(() => {
    const today = new Date();
    const thisMonth = new Date(today.getFullYear(), month, 1);
    const filteredTransaction: AllTransaction = transaction.filter((data) => {
      const dataDate = new Date(data.date);
      if (dataDate.getMonth() == thisMonth.getMonth()) {
        return data;
      }
    });

    const groupTransaction = groupBy(
      filteredTransaction,
      (transaction) => transaction.date
    );
    setMonthTransaction(groupTransaction);
  }, [month]);
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white">
      {monthTransaction && Object.keys(monthTransaction).length === 0 && (
        <div className="py-8 text-slate-800 text-center text-sm font-normal">
          No transaction in this month
        </div>
      )}
      {monthTransaction ? (
        Object.keys(monthTransaction).map((date, id) => (
          <div key={id}>
            <div className="py-1 px-6 flex justify-between items-center bg-emerald-700/10 rounded-lg">
              <p className="text-sm text-slate-700 font-bold">{date}</p>
              <p className="text-md font-bold text-slate-700">
                {calculateSum(monthTransaction[date], "amount")}
              </p>
            </div>
            {monthTransaction[date].map((data, id) => (
              <div key={id}>
                <div className="p-6 mt-4 ring-1 ring-emerald-900/10 flex relative rounded-xl bg-white shadow-md">
                  <div>
                    <p className="text-lg text-slate-700 font-bold">
                      {data.category_id !== null
                        ? data.category_name
                        : "Income"}
                    </p>
                    <p className="text-base text-slate-600">{data.note}</p>
                  </div>
                  <div
                    className={`flex flex-1 items-center justify-end font-bold text-lg
                  ${
                    data.transaction_type === "income"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }
                  `}
                  >
                    <span>
                      {data.transaction_type === "income" ? "+" : "-"}Rp
                      {data.amount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="py-8 text-slate-800 text-center text-sm font-normal">
          Loading
        </div>
      )}
    </div>
  );
}

export default MonthTransaction;
