"use client";

import Portfolio from "@/components/Portfolio";
import { SideMenuProvider } from "@/context/sideMenuContext";

export default function Home() {
  return (
    <SideMenuProvider>
      <Portfolio />
    </SideMenuProvider>
  );
}
