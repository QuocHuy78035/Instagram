export default function Button(body: { isLoading: boolean; name: string }) {
  return (
    <button
      type="submit"
      className="w-full h-8 bg-[#0099e6] text-white rounded font-medium transition duration-200 text-[14px] mt-2"
    >
      {body.isLoading ? <div className="loader"></div> : `${body.name}`}
    </button>
  );
}

