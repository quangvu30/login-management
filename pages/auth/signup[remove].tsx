import axios from "axios";
import { NextPage } from "next";
import Router from "next/router";
import { FormEventHandler, useState } from "react";

interface Props {}

const SignUp: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
    birthday: "1999-01-01",
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();
  };
  return (
    <div className="sign-up-form">
      <form onSubmit={handleSubmit} method="POST">
        <h1>Sign Up</h1>
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

        <input
          value={userInfo.name}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, name: target.value })
          }
          type="text"
          placeholder="john smith"
        />

        <input
          value={userInfo.birthday}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, birthday: target.value })
          }
          type="date"
        />
        <input
          type="submit"
          value="Register"
          onClick={async () => {
            const response = await axios("/api/auth/signup", {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json",
              },
              data: userInfo,
            });
            if (response.data.success === true) {
              Router.replace("/");
            }
          }}
        />
      </form>
    </div>
  );
};

export default SignUp;
