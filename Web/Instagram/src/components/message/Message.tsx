import { useEffect, useState } from "react";

export default function Message({ message, userId }) {
  const [rightUser, setRightUser] = useState(true);
  useEffect(() => {
    setRightUser(userId === message.senderId._id ? true : false);
  }, [userId, message]);
  return (
    <>
      <div
        className={`flex ${
          rightUser ? "flex-row-reverse" : ""
        } w-full my-[5px]`}
      >
        {!rightUser ? (
          <img
            src={message.senderId.avatar}
            className="w-7 h-7 m-3 rounded-full my-auto"
          />
        ) : (
          ""
        )}
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
      </div>
    </>
  );
}
