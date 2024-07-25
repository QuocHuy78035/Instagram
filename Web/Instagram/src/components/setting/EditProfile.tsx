import { useState } from "react";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";

function Tab(body: {
  num: number;
  name: string;
  tab: number;
  setTab: (num: number) => void;
}) {
  return (
    <li
      className="mr-1 cursor-pointer"
      onClick={function () {
        body.setTab(body.num);
      }}
    >
      <div
        className={`inline-block ${
          body.tab === body.num
            ? "bg-white  border-l border-t border-r rounded-t"
            : ""
        } py-2 px-4 text-[#0099e6] font-semibold`}
      >
        {body.name}
      </div>
    </li>
  );
}

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
        <Tab num={1} name="User Info" tab={tab} setTab={setTab} />
        <Tab num={2} name="Change Password" tab={tab} setTab={setTab} />
        <Tab num={3} name="Tab" tab={tab} setTab={setTab} />
      </ul>
      {tab === 1 ? <UserInfo /> : ""}
      {tab === 2 ? <ChangePassword /> : ""}
    </div>
  );
}
