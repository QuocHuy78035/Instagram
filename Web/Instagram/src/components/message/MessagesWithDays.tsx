import Message from "./Message";

export default function MessageWithDays({
  messageWithDays,
  lastMessageRef,
  userId,
  conversation,
}) {
  return (
    <>
      <div className="mx-auto my-3 text-[12px] text-gray-700 font-semibold">
        {messageWithDays.date}
      </div>
      <div className="my-4">
        {messageWithDays.messages.map((message) => {
          return (
            <div className="w-full" ref={lastMessageRef}>
              <Message
                message={message}
                userId={userId}
                participants={conversation.participants}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
