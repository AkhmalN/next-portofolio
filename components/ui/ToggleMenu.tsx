import { useSideMenu } from "@/context/sideMenuContext";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ToggleMenu: React.FC = () => {
  const { openMenu, toggleChange } = useSideMenu();

  return (
    <button
      onClick={toggleChange}
      className={`p-1 rounded-md border border-green-600 text-white hover:bg-green-800 transition-all duration-200 top-7 ease-in-out z-30 ${
        openMenu === "Open" ? "right-72" : "right-10"
      } fixed`}
      aria-label={openMenu ? "Close" : "Open"}
    >
      {openMenu === "Open" ? (
        <ChevronRight className="w-5 h-5 transition-all duration-300" />
      ) : (
        <div className="w-20 flex flex-row items-center">
          <ChevronLeft className="w-5 h-5 transition-all duration-300" />
          <p>Menu</p>
        </div>
      )}
    </button>
  );
};

export default ToggleMenu;
