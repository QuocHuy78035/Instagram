export default function Tooltip({ message, children }) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div className="absolute z-[99999] left-[51px] ml-auto mr-auto scale-0 transform rounded-lg px-3 py-2 transition-all duration-500 group-hover:scale-100">
        <div
          className="flex items-center flex-row-reverse"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 3px",
          }}
        >
          <div className="rounded bg-white p-2 text-center text-[14px] text-black">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
