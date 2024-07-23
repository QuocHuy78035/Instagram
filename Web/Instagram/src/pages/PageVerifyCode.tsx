import { useState } from "react";
import { VerifyCodeAPI } from "../api";
import useSignUp from "../zustand/useSignUp";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/AuthContext";
import Footer from "../components/authen/Footer";
import Input from "../components/authen/Input";
import Button from "../components/authen/Button";
import NavigateLogin from "../components/authen/NavigateLogin";
import GetTheApp from "../components/authen/GetTheApp";
import Logo from "../components/authen/Logo";

export default function PageVerifyCode() {
  const [__, setCookies] = useCookies(["jwt", "user"]);
  const { email, mobile } = useSignUp();
  const [OTP, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const { setUserId, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = await VerifyCodeAPI({ email, mobile, OTP });
    if (data.status === 201) {
      setCookies("jwt", data.metadata.tokens.accessToken, { path: "/" });
      setCookies("user", data.metadata.user._id, { path: "/" });
      setUser(data.metadata.user);
    } else {
      setMessage(data.message);
    }
    setIsLoading(false);
    setUserId(data.metadata.user._id);
  }
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-sm mt-8 mb-[100px]">
        <div className="bg-white px-12 py-6 rounded shadow">
          <Logo className="mb-3" />
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
            Just more one step, enter the 6-digit code we sent to{" "}
            {email ? email : mobile}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder={"######"}
              value={OTP}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            />
            <Button isLoading={isLoading} name="Confirm" />
          </form>
        </div>
        <NavigateLogin />
        <GetTheApp />
      </div>
      <Footer className={""} />
    </div>
  );
}
