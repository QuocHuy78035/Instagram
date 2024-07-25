import { useEffect, useState } from "react";

function InputPassword(body: {
  name: string;
  value: string;
  setValue: (val: string) => void;
}) {
  return (
    <>
      <label className="font-bold text-[17px]">{body.name}</label>
      <input
        type="password"
        placeholder={body.name}
        className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 mb-6"
        value={body.value}
        onChange={(e) => {
          body.setValue(e.target.value);
        }}
      />
    </>
  );
}

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
      <InputPassword
        name="Current Password"
        value={currentPassword}
        setValue={setCurrentPassword}
      />
      <InputPassword
        name="New Password"
        value={newPassword}
        setValue={setNewPassword}
      />
      <InputPassword
        name="Re-type new password"
        value={retypeNewPassword}
        setValue={setRetypeNewPassword}
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
