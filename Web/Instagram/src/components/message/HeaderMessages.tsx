export default function HeaderMessages({ conversation }) {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <img
          src={conversation ? conversation.participants[0].avatar : ""}
          alt="Profile Picture"
          className="w-[80px] h-[80px] rounded-full mb-4"
        />
        <h4 className="text-[22px] font-semibold">
          {conversation ? conversation.participants[0].name : ""}
        </h4>
        <p className="text-gray-500 text-[14px]">
          {conversation ? conversation.participants[0].username : ""} ·
          Instagram
        </p>
        <button className="text-[14px] mt-4 px-3 py-1 bg-gray-200 text-black rounded font-semibold">
          View profile
        </button>
        {/*<p className="mt-4 text-gray-500">Sat 12:15</p>
        <img
          src="https://images.unsplash.com/photo-1592189305845-42c5f8cd4f01"
          alt="Message Image"
          className="w-32 h-32 mt-4"
        /> */}
      </div>
    </div>
  );
}
