import { IconType } from "react-icons";

export default function TabWithText(body: {
  name: string;
  style?: object;
  onClick: (e) => void;
  Icon?: IconType;
  to: string;
  avatar?: JSX.Element;
}) {
  return (
    <button
      className="flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
      style={
        body.name === "Search"
          ? body.style
          : {
              fontWeight: `${
                window.location.href.split("/")[3] === body.to ? "700" : "400"
              }`,
            }
      }
      onClick={body.onClick}
    >
      {body.Icon && !body.avatar ? (
        <body.Icon className="w-[24px] h-[24px] ms-[10px] my-auto" />
      ) : (
        ""
      )}
      {body.avatar && !body.Icon ? body.avatar : ""}
      <div className="ms-[10px] my-auto">{body.name}</div>
    </button>
  );
}
