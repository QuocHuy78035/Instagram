import { useState } from "react";
import { LoginAPI } from "../api";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/AuthContext";
import { classifyInput } from "../utils";
import Footer from "../components/authen/Footer";
import Logo from "../components/authen/Logo";
import Input from "../components/authen/Input";
import Button from "../components/authen/Button";
import BorderOr from "../components/authen/BorderOr";
import GetTheApp from "../components/authen/GetTheApp";

export default function PageLogin() {
  const [__, setCookies] = useCookies(["jwt", "user"]);
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserId, setUser } = useAuthContext();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let email: string | undefined = undefined;
    let mobile: string | undefined = undefined;
    let username: string | undefined = undefined;
    const type = classifyInput(text);
    if (type === "email") {
      email = text;
    } else if (type === "mobile") {
      mobile = text;
    } else {
      username = text;
    }
    setIsLoading(true);
    const data = await LoginAPI({ email, mobile, username, password });
    if (data.status === 200) {
      setCookies("jwt", data.metadata.tokens.accessToken, { path: "/" });
      setCookies("user", data.metadata.user._id, { path: "/" });
      setUser(data.metadata.user);
    } else {
      setMessage(data.message);
    }
    setIsLoading(false);
    setUserId(data.metadata.user._id);
  };
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-sm">
        <div className="bg-white px-12 py-6 rounded shadow">
          <Logo className={"mb-7"} />
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
              type="text"
              placeholder="Phone number, username, or email"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setMessage(null);
              }}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage(null);
              }}
            />
            <Button isLoading={isLoading} name={"Log in"} />
            <BorderOr />
            <button className="w-full flex items-center justify-center p-3 rounded font-medium transition duration-200 text-blue-900 text-[14px]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook logo"
                className="w-5 h-5 mr-2"
              />
              Log in with Facebook
            </button>
            <a
              href="/forgotPassword"
              className="block text-center text-blue-500 mt-4 text-[14px]"
            >
              Forgot password?
            </a>
          </form>
        </div>
        <div className="bg-white p-4 rounded shadow mt-4 text-center">
          <span className="text-gray-700 text-[14px]">
            Don't have an account?{" "}
          </span>
          <a href="/signup" className="text-blue-500 font-medium text-[14px]">
            Sign up
          </a>
        </div>
        <GetTheApp/>
      </div>
      <Footer className={"mt-16"} />
    </div>
  );
}
