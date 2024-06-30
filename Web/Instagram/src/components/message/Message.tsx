import { useEffect, useState } from "react";

export default function Message({ message, userId, participants }) {
  const [rightUser, setRightUser] = useState(true);
  const [sender, setSender] = useState<any>({});
  useEffect(() => {
    setRightUser(userId === message.senderId ? true : false);
  }, [userId, message]);
  useEffect(() => {
    setSender(participants.find((participant) => participant._id === userId));
  }, []);
  return (
    <>
      <div
        className={`flex ${
          rightUser ? "flex-row-reverse" : ""
        } w-full my-[5px]`}
      >
        {!rightUser ? (
          <img
            src={sender.avatar}
            className="w-7 h-7 m-3 rounded-full my-auto"
          />
        ) : (
          ""
        )}
        {message.message === "❤️" ? (
          <div
            className="text-[60px]"
            style={{
              marginRight: rightUser ? "12px" : "0px",
            }}
          >
            ❤️
          </div>
        ) : (
          <div
            className={`text-[15px] py-2 px-[12px] my-auto ${
              rightUser
                ? "bg-blue-600 text-white"
                : "bg-[rgb(239,239,239)] text-black"
            } rounded-lg max-w-[300px]`}
            style={{
              marginRight: rightUser ? "12px" : "0px",
            }}
          >
            {message.message}
          </div>
        )}
      </div>
    </>
  );
}
