import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFReport from "./PDFReport";
import { EventHandler, useEffect, useState } from "react";
import { AllTransaction, Stats, Transaction } from "../pages/dashboard";
import { RUPIAH } from "@/utils/format";
import { MonthTransaction } from "@/components/MonthTransaction";

const ReportDownload = ({
  transaction,
  stats,
  userName,
  month,
  year,
}: {
  transaction: AllTransaction;
  stats: Stats;
  userName: string;
  month: number;
  year: number;
}) => {
  const [isClient, setIsClient] = useState(false);
  const [monthTransaction, setMonthTransaction] = useState<MonthTransaction>();
  const [preview, setPreview] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dateNow = new Date()
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
    .split("/")
    .join("");

  function groupBy(arr: AllTransaction, fn: (item: Transaction) => any) {
    return arr.reduce<Record<string, Transaction[]>>((prev, curr) => {
      const groupKey = fn(curr);
      const group = prev[groupKey] || [];
      group.push(curr);
      return { ...prev, [groupKey]: group };
    }, {});
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

  const openPDFInNewTab = (FileURL: any) => {
    console.log(FileURL);
    let url = window.URL.createObjectURL(FileURL);
    // window.open(url, "_blank");
    window.location.href = url;
  };
  return (
    <div className="p-6 flex flex-col justify-center items-center bg-white rounded-2xl">
      <p className="mb-4 text-2xl font-bold text-slate-900">
        Export Transaction
      </p>
      {isClient && monthTransaction && (
        <PDFDownloadLink
          document={
            <PDFReport
              transaction={monthTransaction}
              stats={stats}
              userName={userName}
              month={month}
              year={year}
            />
          }
          fileName={`REPORT_${userName}_${dateNow}.pdf`}
        >
          {({ blob, url, loading, error }) => (
            <div className="py-2 px-4 bg-emerald-700 hover:bg-emerald-800 transition-all rounded-xl text-white font-bold">
              {loading ? <p>Loading...</p> : <p>Donwload PDF</p>}
            </div>
          )}
        </PDFDownloadLink>
      )}

      {isClient && monthTransaction && (
        <>
          <div
            onClick={() => setPreview((value) => !value)}
            className="py-2 px-4 my-4 bg-red-400 hover:bg-red-500 transition-all rounded-xl text-white font-bold cursor-pointer"
          >
            <p>{preview ? "Close Preview" : "Preview Document"}</p>
          </div>
          <PDFViewer
            width="100%"
            height="600px"
            className={`${preview ? "" : "hidden"}`}
          >
            <PDFReport
              transaction={monthTransaction}
              stats={stats}
              userName={userName}
              month={month}
              year={year}
            />
          </PDFViewer>
        </>
      )}
    </div>
  );
};

export default ReportDownload;
