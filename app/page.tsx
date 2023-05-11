import Link from "next/link";
import style from "./home.module.css";

export default function Home() {
  return (
    <main>
      <div className={style.splash}>
        <div className={style.splash1}>
          <h4>WELCOME BUBUGU..!</h4>
        </div>
        <div className={style.splash2}>
          <h1>
            BE WISE TO <br />
            MANAGE <br />
            YOUR MONEY
          </h1>
        </div>
        <div className={style.splash3}>
          Bubuget will help you to <br />
          manage your money. <br />
          It{"'"}s a simple way to save <br />
          your future budget.
        </div>
      </div>

      <table cellPadding="5" width="300" className={style.splash}>
        <tbody>
          <tr>
            <td></td>

            <td className={style.in}>
              <Link href="auth/signup">Sign Up</Link>
            </td>
            <td></td>
            <td className={style.in}>
              <Link href="auth/login">Log In</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
