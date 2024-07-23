import { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { classifyInput } from "../utils";
import { SignUpAPI } from "../api";
import { useNavigate } from "react-router-dom";
import useSignUp from "../zustand/useSignUp";
import Logo from "../components/authen/Logo";
import Input from "../components/authen/Input";
import Button from "../components/authen/Button";
import BorderOr from "../components/authen/BorderOr";
import GetTheApp from "../components/authen/GetTheApp";
import Footer from "../components/authen/Footer";
import NavigateLogin from "../components/authen/NavigateLogin";

export default function PageSignUp() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    setMobile,
    setEmail,
    name,
    setName,
    username,
    setUsername,
    password,
    setPassword,
  } = useSignUp();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    let email: string | undefined = undefined;
    let mobile: string | undefined = undefined;
    const type = classifyInput(text);
    if (type === "email") {
      setEmail(text);
      email = text;
    } else if (type === "mobile") {
      setMobile(text);
      mobile = text;
    }
    setIsLoading(true);
    const data = await SignUpAPI({ email, mobile, name, username, password });
    if (data.status === 201) {
      navigate("/verifyCode");
    } else {
      setMessage(data.message);
    }
    setIsLoading(false);
  }
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="bg-white px-12 py-6 rounded shadow mt-4">
          <Logo className={"mb-3"} />
          {message ? (
            <div
              className="text-[14px] my-3 text-center"
              style={{ color: "red" }}
            >
              {message}
            </div>
          ) : (
            ""
          )}
          <div className="text-[14px] font-semibold text-center my-3">
            Sign up to see photos and videos from your friends
          </div>
          <button className="w-full flex items-center justify-center p-2 rounded font-medium transition duration-200 text-white bg-[#0099e6] text-[14px]">
            <FaFacebookSquare className="bg-[#0099e6] text-[20px] text-white me-2" />
            Log in with Facebook
          </button>
          <BorderOr />
          <form onSubmit={handleSubmit}>
            <div className="space-y-2 mb-2">
              <Input
                type="text"
                placeholder="Mobile Number or Email"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button isLoading={isLoading} name="Sign Up" />
          </form>
        </div>
        <NavigateLogin />
        <GetTheApp />
      </div>
      <Footer className={"my-[40px]"} />
    </div>
  );
}
