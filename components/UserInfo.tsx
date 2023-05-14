function UserInfo({
  userName,
  balance,
}: {
  userName: string;
  balance: number;
}) {
  return (
    <div className="p-6 flex-1 flex flex-col gap-2 bg-white rounded-2xl shadow-sm">
      <p className="pb-2 text-base font-medium">
        👋 Hi, <b>{userName}</b>
      </p>
      <p className="text-sm text-slate-700">💵 Balance</p>
      <div className="flex items-center gap-1">
        <p className="font-medium text-slate-800">
          Rp. {balance > 0 ? "+" : ""}
        </p>
        <span className="font-bold text-3xl text-slate-800">{balance}</span>
      </div>
    </div>
  );
}

export default UserInfo;
