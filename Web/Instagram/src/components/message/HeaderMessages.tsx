import useHeaderConversation from "../../hooks/useHeaderConversation";

export default function HeaderMessages({ conversation }) {
  const { name, username, avatar1, avatar2 } =
    useHeaderConversation(conversation);
  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <div
          className={`mt-3 relative z-4 w-[80px] ${
            conversation.participants.length >= 3 ? "h-[110px]" : "h-[90px]"
          }`}
        >
          {avatar1 ? (
            <img
              src={avatar1}
              alt="Profile Picture"
              className={`w-[80px] h-[80px] rounded-full mb-4 z-[4] ${
                conversation.participants.length >= 3
                  ? "absolute top-2 left-2 mt-4 ml-4"
                  : ""
              }}`}
            />
          ) : (
            ""
          )}
          {avatar2 ? (
            <img
              src={avatar2}
              alt="Profile Picture"
              className={`absolute -top-1 -left-3 w-[80px] h-[80px] rounded-full z-[2]`}
            />
          ) : (
            ""
          )}
        </div>
        <h4 className="text-[22px] font-semibold">{name}</h4>
        <p className="text-gray-500 text-[14px]">
          {username !== "" ? username + " . " : ""} Instagram
        </p>
        {conversation.participants.length >= 3 ? (
          ""
        ) : (
          <button className="text-[14px] mt-4 px-3 py-1 bg-gray-200 text-black rounded font-semibold">
            View profile
          </button>
        )}
      </div>
    </div>
  );
}
