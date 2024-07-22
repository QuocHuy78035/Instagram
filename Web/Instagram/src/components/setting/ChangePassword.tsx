import { useEffect, useState } from "react";

export default function ChangePassword() {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

  useEffect(() => {
    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      retypeNewPassword !== ""
    ) {
      setDisabledBtn(false);
    }
  }, [currentPassword, newPassword, retypeNewPassword]);
  async function handleSubmit() {}
  return (
    <form className="mt-6">
      <div className="mt-2 mb-4">
        Your password must be at least 8 characters and should include a
        combination of numbers, letters and special characters (!$@%).
      </div>
      <label className="font-bold text-[17px]">Current Password</label>
      <input
        type="password"
        placeholder="Current password"
        className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 mb-6"
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
        }}
      />
      <label className="font-bold text-[17px]">New Password</label>
      <input
        type="password"
        placeholder="New password"
        className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 mb-6"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <label className="font-bold text-[17px]">Re-type new password</label>
      <input
        type="password"
        placeholder="Re-type new password"
        className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 mb-6"
        value={retypeNewPassword}
        onChange={(e) => {
          setRetypeNewPassword(e.target.value);
        }}
      />
      <a
        href="/forgotPassword"
        className="block text-blue-700 mb-6 text-[17px] font-[500]"
      >
        Forgot password?
      </a>
      <button
        onClick={handleSubmit}
        disabled={disabledBtn}
        type="submit"
        className="w-full h-12 bg-[#0099e6] text-white rounded font-medium transition duration-200 text-[14px] px-3 py-3 disabled:opacity-40 outline-none"
      >
        {"Submit"}
      </button>
    </form>
  );
}
