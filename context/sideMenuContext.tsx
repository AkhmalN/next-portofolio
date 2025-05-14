import React, { createContext, useContext, useState } from "react";

type SideMenuType = "Open" | "Close";

interface IContextSideMenu {
  openMenu: SideMenuType;
  toggleChange: () => void;
}

const SideMenuContext = createContext<IContextSideMenu | undefined>(undefined);

export function useSideMenu() {
  const context = useContext(SideMenuContext);
  if (context === undefined) {
    throw new Error("useSideMenu must be used wihtin SideMenuProvider");
  }

  return context;
}

interface IChildrenProvider {
  children: React.ReactNode;
}

export function SideMenuProvider({ children }: IChildrenProvider) {
  const [openMenu, setOpenMenu] = useState<SideMenuType>("Close");

  const toggleChange = () => {
    setOpenMenu((prevAction) => (prevAction === "Open" ? "Close" : "Open"));
  };

  return (
    <SideMenuContext.Provider value={{ openMenu, toggleChange }}>
      {children}
    </SideMenuContext.Provider>
  );
}
