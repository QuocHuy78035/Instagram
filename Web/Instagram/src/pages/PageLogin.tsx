import { useState } from "react";
import { LoginAPI } from "../api";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/AuthContext";
import { classifyInput } from "../utils";
import Footer from "../components/authen/Footer";

export default function PageLogin() {
  const [__, setCookies] = useCookies(["jwt", "user"]);
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserId } = useAuthContext();
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
          <div className="mb-7">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
              width={"160px"}
              height={"50px"}
              className="mx-auto"
            ></img>
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
            <input
              type="text"
              placeholder="Phone number, username, or email"
              className="w-full h-8 p-3 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setMessage(null);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-8 p-3 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage(null);
              }}
            />
            <button
              type="submit"
              className="w-full h-8 bg-[#0099e6] text-white rounded font-medium transition duration-200 text-[14px]"
            >
              {isLoading ? <div className="loader"></div> : "Log in"}
            </button>
            <div className="flex items-center justify-between mt-4">
              <hr className="flex-1 border-t border-gray-300" />
              <span className="mx-4 text-gray-400">OR</span>
              <hr className="flex-1 border-t border-gray-300" />
            </div>
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
        <div className="text-center mt-4">
          <p className="text-gray-700 my-4 text-[14px]">Get the app.</p>
          <div className="flex justify-center space-x-2">
            <a href="#">
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                alt="Google Play Store"
                className="w-32 h-10 rounded-sm"
              />
            </a>
            <a href="#">
              <img
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                alt="Microsoft Store"
                className="w-32 h-10 rounded-sm"
              />
            </a>
          </div>
        </div>
      </div>
      <Footer className={"mt-16"} />
    </div>
  );
}
