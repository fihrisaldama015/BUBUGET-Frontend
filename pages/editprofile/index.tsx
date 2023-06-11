import { verifyToken } from "@/utils/jwt";
import { GetServerSidePropsContext } from "next";
import cookies from "next-cookies";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type User = {
  user_id: string;
  cookie: string;
  email: string;
  user_name: string;
};
const EditProfile = ({ user }: { user: User }) => {
  const [username, setUsername] = useState<string>(user.user_name);
  const [email, setEmail] = useState<string>(user.email);
  const router = useRouter();

  const handleEdit = async () => {
    alert("Edit Profile Success");
    router.push("/dashboard");
  };
  return (
    <>
      <div
        className="back"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          gap: "15px",
          fontSize: "larger",
        }}
      >
        <div className="flex justify-between w-full">
          <Image
            src="/arrowRight.svg"
            width={24}
            height={24}
            alt="left"
            className="rotate-180"
          />
          <h5 className="font-bold text-2xl text-slate-900">EDIT PROFILE</h5>
          <div></div>
        </div>
      </div>
      <div className="flex flex-col px-8 py-4 gap-8">
        <div className="flex justify-between">
          <label htmlFor="name">
            <b>Nama</b>
          </label>
          <div className="flex gap-1">
            <input
              className="bg-transparent"
              type="text"
              id="name"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Image src="/arrowRight.svg" width={24} height={24} alt="right" />
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <div className="flex gap-1">
            <input
              className="bg-transparent w-56"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly
            />
            <Image src="/arrowRight.svg" width={24} height={24} alt="right" />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={() => handleEdit()}
            className="px-8 py-3 font-bold text-emerald-50 text-sm bg-emerald-700 hover:bg-emerald-800 transition-all rounded-xl disabled:bg-emerald-800/70"
          >
            SAVE
          </button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = cookies(context);
  const tokenFromCookie: string = token || "not found";
  const user = await verifyToken(tokenFromCookie);
  if (user.error?.length! > 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
      props: {},
    };
  }

  return {
    props: {
      user: user,
    },
  };
}

export default EditProfile;
