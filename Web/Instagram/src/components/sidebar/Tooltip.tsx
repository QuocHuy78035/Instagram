export default function Tooltip(body: {
  message?: string;
  children: JSX.Element;
}) {
  return (
    <div className="group relative flex items-center justify-center">
      {body.children}
      <div className="absolute left-[51px] ml-auto mr-auto scale-0 transform rounded-lg px-3 py-2 transition-all duration-500 group-hover:scale-100 z-[1000000]">
        <div
          className="flex items-center flex-row-reverse"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 3px",
          }}
        >
          <div className="rounded bg-white p-2 text-center text-[14px] text-black">
            {body.message ? body.message : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
