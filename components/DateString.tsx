function DateString({ month, year }: { month: number; year: number }) {
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  return (
    <p className="font-bold text-lg">
      {monthName[month]} {year}
    </p>
  );
}

export default DateString;
