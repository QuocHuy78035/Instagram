import { useState } from "react";
import Footer from "../components/authen/Footer";
import { ResetPasswordAPI } from "../api/authenAPI";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/AuthContext";
import Input from "../components/authen/Input";
import Button from "../components/authen/Button";
import NavigateLogin from "../components/authen/NavigateLogin";

export default function PageResetPassword() {
  const params = useParams();
  const [__, setCookies] = useCookies(["jwt", "user"]);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserId, setUser } = useAuthContext();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!params.resetToken) {
      return;
    }
    setIsLoading(true);
    const data = await ResetPasswordAPI(params.resetToken, {
      password,
      passwordConfirm,
    });
    if (data.status === 200) {
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
      <div className="w-full max-w-sm mt-6 mb-[150px]">
        <div className="bg-white px-12 py-6 rounded shadow">
          <div className="text-[15px] font-semibold text-center my-3">
            Create A Strong Password
          </div>
          <div className="text-[14px] text-gray-500 text-center my-3">
            Enter your email, phone, or username and we'll send you a link to
            get back into your account.
          </div>
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="password"
              placeholder={"New Password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage(null);
              }}
            />
            <Input
              type="password"
              placeholder={"Confirm New Password"}
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                setMessage(null);
              }}
            />
            <Button isLoading={isLoading} name={"Reset Password"} />
          </form>
        </div>
        <NavigateLogin />
      </div>
      <Footer className={""} />
    </div>
  );
}
