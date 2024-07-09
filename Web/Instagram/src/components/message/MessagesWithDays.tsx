import Message from "./Message";

export default function MessageWithDays({
  messageWithDays,
  userId,
  conversation,
}) {
  return (
    <>
      <div className="my-4">
        {messageWithDays.messages
          .map((message) => {
            return (
              <div className="w-full">
                <Message
                  message={message}
                  userId={userId}
                  participants={conversation.participants}
                />
              </div>
            );
          })
          .reverse()}
      </div>
      <div className="mx-auto my-3 text-[12px] text-gray-700 font-semibold">
        {messageWithDays.date}
      </div>
    </>
  );
}
