import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { ForgotPasswordAPI } from "../api";
import { classifyInput } from "../utils";
import Footer from "../components/authen/Footer";
import Input from "../components/authen/Input";
import Button from "../components/authen/Button";
import BorderOr from "../components/authen/BorderOr";

export default function PageForgotPassword() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    let username: string | undefined;
    let email: string | undefined;
    let mobile: string | undefined;
    const type = classifyInput(text);
    if (type === "mobile") {
      mobile = text;
    } else if (type === "email") {
      email = text;
    } else {
      username = text;
    }
    setIsLoading(true);
    const data = await ForgotPasswordAPI({ username, email, mobile });
    if (data.status === 200) {
      setMessage(data.message);
    }
    setIsLoading(false);
  }
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-sm mt-8 mb-[80px]">
        <div className="bg-white px-12 py-6 rounded shadow">
          <div className="flex flex-col justify-center rounded-full border-[4px] border-black w-[100px] h-[100px] mx-auto">
            <FiLock className="text-[50px] mx-auto" />
          </div>
          <div className="text-[15px] font-semibold text-center my-3">
            Trouble logging in?
          </div>
          <div className="text-[14px] text-gray-500 text-center my-3">
            Enter your email, phone, or username and we'll send you a link to
            get back into your account.
          </div>
          {message ? (
            <div
              className="text-[14px] my-3 text-center"
              style={{ color: "green" }}
            >
              {message}
            </div>
          ) : (
            ""
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder={"Phone number, username, or email"}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button isLoading={isLoading} name="Send Login Link" />
          </form>
          <div className="text-[14px] text-[#0099e6] text-center my-3">
            <a href="/">Can't reset your password</a>
          </div>
          <BorderOr/>
          <div className="text-[14px] text-black font-semibold text-center my-3 hover:text-gray-400">
            <a href="/signUp">Create new account</a>
          </div>
          <div className="text-[14px] text-black font-semibold text-center my-3 hover:text-gray-400 border-[2px] border-gray-200 p-2">
            <a href="/login">Back to login</a>
          </div>
        </div>
      </div>
      <Footer className={""} />
    </div>
  );
}
