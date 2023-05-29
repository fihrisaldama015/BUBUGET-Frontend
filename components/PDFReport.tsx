import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Stats } from "../pages/dashboard";
import { MonthTransaction } from "@/components/MonthTransaction";
import { RUPIAH } from "@/utils/format";
import React from "react";

Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter/Inter-Light.ttf", fontWeight: 300 },
    { src: "/fonts/Inter/Inter-Regular.ttf" },
    { src: "/fonts/Inter/Inter-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/Inter/Inter-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Inter/Inter-Bold.ttf", fontWeight: 700 },
    { src: "/fonts/Inter/Inter-ExtraBold.ttf", fontWeight: 800 },
    { src: "/fonts/Inter/Inter-Black.ttf", fontWeight: 900 },
  ],
});

const PDFReport = ({
  transaction,
  stats,
  userName,
  month,
  year,
}: {
  transaction: MonthTransaction;
  stats: Stats;
  userName: string;
  month: number;
  year: number;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Header userName={userName} month={month} year={year} />
        <Text
          style={{
            color: "#047857",
            fontWeight: "semibold",
            fontSize: 16,
            marginBottom: 16,
          }}
        >
          Ringkasan Portofolio Anda / Your Portofolio Summary
        </Text>
        <Table>
          <TR>
            <TDStats>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Saldo / Total Balance
              </Text>
            </TDStats>
            <TDStats>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Pemasukan / Total Income
              </Text>
            </TDStats>
            <TDStats>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Pengeluaran / Total Expense
              </Text>
            </TDStats>
          </TR>
          <TR>
            <TDStats>
              <Text style={{ fontSize: 12, textAlign: "center" }}>
                {RUPIAH.format(stats.balance)}
              </Text>
            </TDStats>
            <TDStats>
              <Text style={{ fontSize: 12, textAlign: "center" }}>
                {RUPIAH.format(stats.income)}
              </Text>
            </TDStats>
            <TDStats>
              <Text style={{ fontSize: 12, textAlign: "center" }}>
                {RUPIAH.format(stats.expense)}
              </Text>
            </TDStats>
          </TR>
        </Table>
        <View style={{ marginTop: 32 }}>
          <Text
            style={{
              color: "#047857",
              fontWeight: "semibold",
              fontSize: 16,
              marginBottom: 16,
            }}
          >
            Laporan Transaksi Anda / Your Transaction Statement
          </Text>
        </View>
        <Table>
          <TH>
            <TD>
              <Text style={styles.tableHeader}>Detail Transaksi</Text>
            </TD>
            <TD>
              <Text style={styles.tableHeader}>Jumlah Masuk</Text>
            </TD>
            <TD>
              <Text style={styles.tableHeader}>Jumlah Keluar</Text>
            </TD>
            <TD>
              <Text style={styles.tableHeader}>Kategori</Text>
            </TD>
          </TH>
          {Object.keys(transaction).map((date, id) => (
            <React.Fragment key={id}>
              <TDate>
                <TD type="date">
                  <Text style={styles.tableCell}>
                    {LocaleDateString({
                      dayName: new Date(date).getDay(),
                      month: new Date(date).getMonth(),
                      year: new Date(date).getFullYear(),
                      day: new Date(date).getDate(),
                    })}
                  </Text>
                </TD>
              </TDate>

              {transaction[date].map((data, id) => (
                <TR key={id}>
                  <TD>
                    <Text style={styles.tableCell}>{data.note}</Text>
                  </TD>
                  <TD>
                    <Text style={styles.tableCell}>
                      {data.transaction_type === "income"
                        ? RUPIAH.format(Number(data.amount))
                        : "-"}
                    </Text>
                  </TD>
                  <TD>
                    <Text style={styles.tableCell}>
                      {data.transaction_type === "expense"
                        ? RUPIAH.format(Number(data.amount))
                        : "-"}
                    </Text>
                  </TD>
                  <TD>
                    <Text style={styles.tableCell}>{data.category_name}</Text>
                  </TD>
                </TR>
              ))}
            </React.Fragment>
          ))}
        </Table>
      </View>
    </Page>
  </Document>
);

const Header = ({
  userName,
  month,
  year,
}: {
  userName: string;
  month: number;
  year: number;
}) => (
  <>
    <View
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#047857",
      }}
    >
      <View
        style={{
          backgroundColor: "#047857",
          paddingHorizontal: 32,
          paddingBottom: 8,
          paddingTop: 24,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            textAlign: "left",
            color: "#fff",
          }}
        >
          Transaction Report
        </Text>
      </View>
      <Text
        style={{
          fontWeight: "extrabold",
          fontSize: "16",
          color: "#047857",
          padding: 8,
        }}
      >
        Bubuget
      </Text>
    </View>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <View
        style={{
          paddingVertical: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Nama Pengguna / User Name
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center" }}>{userName}</Text>
      </View>
      <View
        style={{
          paddingVertical: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Periode / Statement Period
        </Text>
        <Text style={{ fontSize: 16 }}>{DateString({ month, year })}</Text>
      </View>
    </View>
  </>
);

const Table = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.table}>{children}</View>
);

const TR = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.tableRow}>{children}</View>
);

const TH = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.tableHead}>{children}</View>
);

const TDate = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.tableDateCell}>{children}</View>
);

const TD = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type?: "date";
}) => (
  <View style={type === "date" ? styles.tableDate : styles.tableCol}>
    {children}
  </View>
);

const TDStats = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.tableStats}>{children}</View>
);

function DateString({ month, year }: { month: number; year: number }): string {
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
  return `${monthName[month]} ${year}`;
}

function LocaleDateString({
  day,
  dayName,
  month,
  year,
}: {
  day: number;
  dayName: number;
  month: number;
  year: number;
}): string {
  const dayNameList = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
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
  return `${dayNameList[dayName]}, ${day} ${monthName[month]} ${year}`;
}

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Inter",
    backgroundColor: "#fff",
  },
  section: {
    marginTop: 24,
    marginHorizontal: 48,
    flexGrow: 1,
    color: "#0f172a",
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHead: {
    backgroundColor: "#047857",
    color: "#fff",
    margin: "auto",
    flexDirection: "row",
  },
  tableDateCell: {
    margin: "auto",
    flexDirection: "row",
    fontWeight: "bold",
    backgroundColor: "#e2e8f0",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableStats: {
    width: "33.3333333333333%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableDate: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 10,
  },
  tableHeader: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default PDFReport;
