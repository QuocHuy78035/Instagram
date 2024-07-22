import { useParams } from "react-router-dom";
import SidebarSetting from "../components/setting/SidebarSetting";
import Sidebar from "../components/Sidebar";
import EditProfile from "../components/setting/EditProfile";

export default function PageSetting() {
  const params = useParams();
  return (
    <div className="bg-gray-50 flex h-screen relative">
      <Sidebar isFullContent={true} />
      <SidebarSetting />
      {params.mode === "edit" ? <EditProfile /> : ""}
    </div>
  );
}
