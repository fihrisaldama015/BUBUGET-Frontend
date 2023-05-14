import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import { verifyToken } from "@/utils/jwt";
import HomeTransaction from "@/components/HomeTransaction";
import LogoutButton from "@/components/LogoutButton";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
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


export const data = {
    labels: ['Makan ', 'Minum', 'Sarapan'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
function Budget({
  transaction,
  stats,
  userName,
}: {
  transaction: AllTransaction;
  stats: Stats;
  userName: string;
})

 {return (   
<>

<div className="mx-20 p-6 bg-white rounded-2xl shadow-sm">
 <p className="pb-2 text-sm font-medium text-center">💵Balance</p>
    <p className="pb-2 text-sm font-medium text-center">RP{stats.balance}</p>
 </div>
 <div className="mx-5 mt-5 p-6 ring-1 ring-black  rounded-2xl shadow-sm">
    <div className="mx-10">
    <Doughnut data={data} />
    </div>
 </div>
 <div className="">
    <div className="mx-5 mt-5 flex justify-between">
    Your Budget
    <div className="mr-5">
        ADD
    </div>
    </div>
 </div>
 <div className="mx-5 p-2 bg-white rounded-2xl shadow-sm">
 <div className="flex justify-between">
    Budget Name
    <p className="">
        RP.30000    
    </p>
    </div>
    <div className="flex justify-between text-xs">
    Keterangan 
    <p className="">
        8%    
    </p>
    </div>
 </div>
 <div className="mx-5 mt-4 p-2 bg-white rounded-2xl shadow-sm"> 
 <div className="flex justify-between">
    Budget Name
    <p className="">
        RP.30000    
    </p>
    </div>
    <div className="flex justify-between text-xs">
    Keterangan 
    <p className="">
        8%    
    </p>
    </div>
 </div>
 <div className="mx-5 mt-4 p-2 bg-white rounded-2xl shadow-sm">
 <div className="flex justify-between">
    Budget Name
    <p className="">
        RP.30000    
    </p>
    </div>
    <div className="flex justify-between text-xs">
    Keterangan 
    <p className="">
        8%    
    </p>
    </div>
 </div>
 <div className="mx-5 mt-4 p-2 bg-white rounded-2xl shadow-sm">
 <div className="flex justify-between">
    Budget Name
    <p className="">
        RP.30000    
    </p>
    </div>
    <div className="flex justify-between text-xs">
    Keterangan 
    <p className="">
        8%    
    </p>
    </div>
 </div>
 
 
</>
)

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
export default Budget