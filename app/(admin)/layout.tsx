"use client";

import React from "react";
import AdminHeader from "@/components/sections/admin/AdminHeader";
import AdminSidebar from "@/components/sections/admin/AdminSidebar";
import { SideMenuProvider, useSideMenu } from "@/context/sideMenuContext";
import Footer from "@/components/sections/Footer";
import { cn } from "@/lib/utils";
import { ThemeToggleButton } from "@/components/ui/toggleTheme";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Pastikan ini juga diimport

interface AdminRootProps {
  children: React.ReactNode;
}

function AdminContent({ children }: AdminRootProps) {
  const { openMenu } = useSideMenu();

  return (
    <div className="flex flex-row justify-normal relative">
      <AdminSidebar />

      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen w-full transition-all duration-300",
          openMenu === "Open" ? "pl-64" : "pl-20"
        )}
      >
        <AdminHeader />
        <ThemeToggleButton />

        <main className="px-10 mt-24 flex flex-col justify-between h-[85vh] w-full">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: AdminRootProps) {
  return (
    <PrimeReactProvider>
      <SideMenuProvider>
        <ToastContainer />
        <AdminContent>{children}</AdminContent>
      </SideMenuProvider>
    </PrimeReactProvider>
  );
}
