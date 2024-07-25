export default function NavigateLogin() {
  return (
    <div className="flex justify-center bg-white px-12 py-6 rounded shadow mt-4 text-center text-[14px] font-normal">
      <div className="text-gray-700">Have an account?</div>{" "}
      <a href="/login" className="text-[#0099e6] font-medium ms-1">
        Log in
      </a>
    </div>
  );
}
