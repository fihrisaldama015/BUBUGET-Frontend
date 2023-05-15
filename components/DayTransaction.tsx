import { AllTransaction } from "@/pages/dashboard";
import { RUPIAH } from "@/utils/format";
import { useEffect, useState } from "react";

function DayTransaction({ transaction }: { transaction: AllTransaction }) {
  const [dayTransaction, setDayTransaction] = useState<AllTransaction>([]);

  useEffect(() => {
    const today = new Date();
    const filteredDayTransaction: AllTransaction = transaction.filter(
      (data) => {
        const dataDate = new Date(data.date);
        if (
          dataDate.getDate() == today.getDate() &&
          dataDate.getMonth() == today.getMonth()
        ) {
          return data;
        }
      }
    );
    setDayTransaction(filteredDayTransaction);
  }, []);
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white">
      {dayTransaction.length === 0 && (
        <div className="py-8 text-slate-800 text-center text-sm font-normal">
          No transaction today
        </div>
      )}
      {dayTransaction ? (
        dayTransaction.map((data, id) => (
          <div key={id}>
            <div className="p-6 ring-1 ring-emerald-900/10 flex relative rounded-xl bg-white shadow-md">
              <div>
                <p className="text-lg text-slate-700 font-bold">
                  {data.category_id !== null ? data.category_name : "Income"}
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
                  {RUPIAH.format(Number(data.amount))}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default DayTransaction;
