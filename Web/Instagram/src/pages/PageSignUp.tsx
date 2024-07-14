
import { FaFacebookSquare } from "react-icons/fa";

export default function PageSignUp() {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="bg-white px-12 py-6 rounded shadow mt-4">
          <div className="mb-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
              width={"160px"}
              height={"50px"}
              className="mx-auto"
              alt=""
            ></img>
          </div>
          <div className="text-[14px] font-semibold text-center my-3">
            Sign up to see photos and videos from your friends
          </div>
          <button className="w-full flex items-center justify-center p-2 rounded font-medium transition duration-200 text-white bg-[#0099e6] text-[14px]">
            <FaFacebookSquare className="bg-[#0099e6] text-[20px] text-white me-2" />
            Log in with Facebook
          </button>
          <div className="flex items-center justify-between my-4">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="mx-4 text-gray-400">OR</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>
          <form>
            <div className="space-y-2 mb-2">
              <input
                type="text"
                placeholder="Mobile Number or Email"
                className="w-full h-8 p-3 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                // value={username}
                // onChange={(e) => {
                //   setUsername(e.target.value);
                // }}
              />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-8 p-3 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                // value={username}
                // onChange={(e) => {
                //   setUsername(e.target.value);
                // }}
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full h-8 p-3 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                // value={username}
                // onChange={(e) => {
                //   setUsername(e.target.value);
                // }}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full h-8 p-3 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
              />
            </div>
            <button
              type="submit"
              className="w-full h-8 bg-[#0099e6] text-white rounded font-medium transition duration-200 text-[14px] mt-2"
            >
              Sign Up
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
      <footer className="text-center text-gray-600 my-[40px] text-[14px]">
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
