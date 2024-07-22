import { useState } from "react";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";

export default function EditProfile() {
  const [tab, setTab] = useState(1);
  return (
    <div className="flex-grow pt-7 pb-[100px] px-[100px] overflow-y-scroll">
      <div className="flex justify-between mb-5">
        <div className="flex py-2">
          <h2 className="font-bold text-[20px]">Edit Profile</h2>
        </div>
      </div>{" "}
      <ul className="flex border-b">
        <li
          className="-mb-px mr-1 cursor-pointer"
          onClick={function () {
            setTab(1);
          }}
        >
          <div
            className={`inline-block ${
              tab === 1 ? "bg-white  border-l border-t border-r rounded-t" : ""
            } py-2 px-4 text-[#0099e6] font-semibold`}
          >
            User Info
          </div>
        </li>
        <li
          className="mr-1 cursor-pointer"
          onClick={function () {
            setTab(2);
          }}
        >
          <div
            className={`inline-block ${
              tab === 2 ? "bg-white border-l border-t border-r rounded-t" : ""
            } py-2 px-4 text-[#0099e6] font-semibold`}
          >
            Change Password
          </div>
        </li>
        <li
          className="mr-1 cursor-pointer"
          onClick={function () {
            setTab(3);
          }}
        >
          <div
            className={`inline-block ${
              tab === 3 ? "bg-white border-l border-t border-r rounded-t" : ""
            } py-2 px-4 text-[#0099e6] font-semibold`}
          >
            Tab
          </div>
        </li>
      </ul>
      {tab === 1 ? <UserInfo /> : ""}
      {tab === 2 ? <ChangePassword /> : ""}
    </div>
  );
}
