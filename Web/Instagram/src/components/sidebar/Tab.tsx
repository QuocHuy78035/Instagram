import { IconType } from "react-icons";
import Tooltip from "./Tooltip";

export default function Tab(body: {
  message?: string;
  onClick: (e) => void;
  style?: object;
  Icon?: IconType;
  avatar?: JSX.Element;
}) {
  return (
    <Tooltip message={body.message}>
      <button
        className="w-[48px] h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none"
        onClick={body.onClick}
        style={body.style}
      >
        {body.Icon && !body.avatar ? (
          <body.Icon className="w-[24px] h-[24px] mx-auto" />
        ) : (
          ""
        )}
        {body.avatar && !body.Icon ? body.avatar : ""}
      </button>
    </Tooltip>
  );
}
