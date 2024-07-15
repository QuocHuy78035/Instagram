import { useState } from "react";
import { VerifyCodeAPI } from "../api";
import useSignUp from "../zustand/useSignUp";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/AuthContext";

export default function PageVerifyCode() {
  const [__, setCookies] = useCookies(["jwt", "user"]);
  const { email, mobile } = useSignUp();
  const [OTP, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const { setUserId } = useAuthContext();
  async function handleSubmit(e) {
    e.preventDefault();
    const data = await VerifyCodeAPI({ email, mobile, OTP });
    if (data.status === 201) {
      setCookies("jwt", data.metadata.tokens.accessToken, { path: "/" });
      setCookies("user", data.metadata.user._id, { path: "/" });
    } else {
      setMessage(data.message);
    }
    setUserId(data.metadata.user._id);
  }
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-sm mt-8 mb-[100px]">
        <div className="bg-white px-12 py-6 rounded shadow">
          <div className="mb-3">
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
          <div className="text-[14px] font-semibold text-center my-3">
            Just more one step, enter the 6-digit code we sent to{" "}
            {email ? email : mobile}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="######"
              className="w-full h-8 p-3 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              value={OTP}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            />
            <button
              type="submit"
              className="w-full h-8 bg-[#0099e6] text-white rounded font-medium transition duration-200 text-[14px] mt-2"
            >
              Confirm
            </button>
          </form>
        </div>
        <div className="flex justify-center bg-white px-12 py-6 rounded shadow mt-4 text-center text-[14px] font-normal">
          <div className="text-gray-700">Have an account?</div>{" "}
          <a href="/login" className="text-[#0099e6] font-medium ms-1">
            Log in
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
      <footer className="text-center text-gray-600 text-[14px]">
        <nav className="space-x-4">
          <a href="#" className="hover:underline">
            Meta
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Blog
          </a>
          <a href="#" className="hover:underline">
            Jobs
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
          <a href="#" className="hover:underline">
            API
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Locations
          </a>
          <a href="#" className="hover:underline">
            Instagram Lite
          </a>
          <a href="#" className="hover:underline">
            Threads
          </a>
          <a href="#" className="hover:underline">
            Contact Uploading & Non-Users
          </a>
          <a href="#" className="hover:underline">
            Meta Verified
          </a>
        </nav>
      </footer>
    </div>
  );
}
