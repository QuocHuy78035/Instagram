import { useAuthContext } from "../../context/AuthContext";

export default function Avatar(body: { hasText: boolean }) {
  const { user } = useAuthContext();
  return (
    <img
      src={typeof user !== "string" ? user?.avatar : ""}
      className={`w-[24px] h-[24px] ${
        body.hasText ? "ms-[10px] my-auto" : "mx-auto"
      } rounded-full`}
    />
  );
}
