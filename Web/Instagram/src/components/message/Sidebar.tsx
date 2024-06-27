import { FaInstagram } from "react-icons/fa6";

export default function Sidebar() {
  return (
    <>
      <div className="w-[70px] bg-white border-r border-gray-200 flex flex-col items-center p-4">
        <a href="#" className="my-6">
          <FaInstagram className="w-[24px] h-[24px]" />
        </a>
        <a href="#" className="mb-4"></a>
        <a href="#" className="mb-4"></a>
        <a href="#" className="mb-4"></a>
        <a href="#" className="mb-4"></a>
        <a href="#" className="mb-4"></a>
        <a href="#" className="mb-4"></a>
        <a href="#" className="mb-4"></a>
        <a href="#" className="mt-auto"></a>
        <a href="#" className="mt-4"></a>
      </div>
    </>
  );
}
