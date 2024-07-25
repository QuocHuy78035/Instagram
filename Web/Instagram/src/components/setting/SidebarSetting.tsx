import { IconType } from "react-icons";
import { FaUserAltSlash } from "react-icons/fa";
import { FaRegCircleUser, FaRegComment } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdBlockFlipped } from "react-icons/md";
import { TbMessageCircle2Filled } from "react-icons/tb";
import {
  NavigateFunction,
  Params,
  useNavigate,
  useParams,
} from "react-router-dom";

function Button(body: {
  name: string;
  params: Readonly<Params<string>>;
  mode: string;
  navigate: NavigateFunction;
  Icon: IconType;
}) {
  return (
    <button
      className={`flex w-full h-[52px] hover:bg-[rgb(239,239,239)] bg-[${
        body.params.mode === body.mode ? "rgb(239,239,239)" : "white"
      }] rounded-lg outline-none px-3 text-[15px]`}
      onClick={function () {
        body.navigate(`/accounts/${body.mode}`);
      }}
    >
      <body.Icon className="w-[26px] h-[26px] ms-[10px] my-auto" />
      <div className="ms-[10px] my-auto">{body.name}</div>
    </button>
  );
}

export default function SidebarSetting() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 flex h-screen relative">
      <div className="flex flex-col w-[320px] h-full bg-white border-r border-gray-200 pt-7 px-8">
        <div className="flex justify-between ps-6 mb-3">
          <div className="flex py-2">
            <h2 className="font-bold text-[20px]">Settings</h2>
          </div>
        </div>
        <Button
          name="Edit Profiles"
          params={params}
          mode="edit"
          navigate={navigate}
          Icon={FaRegCircleUser}
        />
        <Button
          name="Notifications"
          params={params}
          mode="notifications"
          navigate={navigate}
          Icon={IoMdNotificationsOutline}
        />
        <Button
          name="Account Privacy"
          params={params}
          mode="privacy_setting"
          navigate={navigate}
          Icon={FiLock}
        />
        <Button
          name="Blocked"
          params={params}
          mode="blocked_accounts"
          navigate={navigate}
          Icon={MdBlockFlipped}
        />
        <Button
          name="Messages and story replies"
          params={params}
          mode="messages_and_story_replies"
          navigate={navigate}
          Icon={TbMessageCircle2Filled}
        />
        <Button
          name="Comments"
          params={params}
          mode="comments"
          navigate={navigate}
          Icon={FaRegComment}
        />
        <Button
          name="Restricted accounts"
          params={params}
          mode="restricted_accounts"
          navigate={navigate}
          Icon={FaUserAltSlash}
        />
      </div>
    </div>
  );
}
