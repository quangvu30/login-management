import { useUserIp } from "@/components/useUserIp";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Router from "next/router";
import { FormEventHandler, useEffect, useState } from "react";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const {status } = useSession()
  const ip = useUserIp();
  const [userInfo, setUserInfo] = useState({ email: "", password: "", ip });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      ip,
      redirect: false,
    });

    Router.replace("/protected");
  };

  useEffect(() => {
    if (status === "authenticated") Router.replace("/protected");
  }, [status])

  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type="email"
          placeholder="john@email.com"
        />
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="********"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default SignIn;