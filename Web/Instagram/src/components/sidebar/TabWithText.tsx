import { IconType } from "react-icons";
import { useAuthContext } from "../../context/AuthContext";
import User from "../../interfaces/user.interface";

export default function TabWithText(body: {
  className?: string;
  name: string;
  style?: object;
  onClick: (e) => void;
  Icon?: IconType;
  to?: string;
  avatar?: JSX.Element;
}) {
  const { user } = useAuthContext();
  return (
    <button
      className={`flex w-full h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none ${
        body.className || ""
      }`}
      style={
        body.name === "Home" && !window.location.href.split("/")[3]
          ? {
              fontWeight: "700",
            }
          : body.name === "Search"
          ? body.style
          : body.name === "Profile" &&
            window.location.href.split("/")[4] !== (user as User)?.username
          ? { fontWeight: "400" }
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
