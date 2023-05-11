import { AllTransaction } from "@/pages/dashboard";

function HomeTransaction({ transaction }: { transaction: AllTransaction }) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white">
      {transaction ? (
        transaction.map((data, id) => (
          <div key={id}>
            <div className="p-6 ring-1 ring-emerald-900/10 flex relative rounded-xl bg-white shadow-md">
              <div>
                {/* <p className="text-xs text-slate-800 font-medium">
                  {data.date}
                </p> */}
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
                  {data.amount}
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

export default HomeTransaction;
