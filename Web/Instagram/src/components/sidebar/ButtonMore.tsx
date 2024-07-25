import { HiBars3 } from "react-icons/hi2";
import useOpenNavigateMore from "../../zustand/useOpenNavigateMore";

export default function ButtonMore(body: { hasText: boolean }) {
  const { isOpenNavigateMore, setIsOpenNavigateMore } = useOpenNavigateMore();
  return (
    <button
      className={`btn__more my-[13px] ${
        body.hasText ? "flex w-full" : "w-[48px]"
      } h-[48px] hover:bg-[rgb(239,239,239)] rounded-md outline-none`}
      onClick={function () {
        setIsOpenNavigateMore(!isOpenNavigateMore);
      }}
      style={{
        fontWeight: `${isOpenNavigateMore ? "bold" : "normal"}`,
      }}
    >
      <HiBars3
        className={`w-[24px] h-[24px] ${
          body.hasText ? "ms-[10px] my-auto" : "mx-auto"
        }`}
      />
      {body.hasText ? <div className="ms-[10px] my-auto">More</div> : ""}
    </button>
  );
}
