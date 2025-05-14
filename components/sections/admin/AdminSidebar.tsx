"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Code2,
  Briefcase,
  Mail,
  Settings,
  LogOut,
  Sparkles,
  ChartSpline,
  UserCogIcon,
  BriefcaseBusiness,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSideMenu } from "@/context/sideMenuContext";
import { Logo } from "@/components/Logo";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ShowDialogLogout from "./profile/ModalLogout";

const menuItems = [
  { icon: User, label: "About", href: "/about" },
  { icon: BriefcaseBusiness, label: "Experience", href: "/experiences" },
  { icon: Briefcase, label: "Projects", href: "/project" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { openMenu } = useSideMenu();
  const router = useRouter();
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  useEffect(() => {
    const currentItem = menuItems.find((item) =>
      pathname.startsWith(item.href)
    );
  }, [pathname]);
  return (
    <div
      className={cn(
        openMenu === "Open" ? "w-64" : "w-20",
        "fixed top-0 left-0 h-screen z-50 p-4 transition-all duration-300 ease-in-out shadow-xl bg-red dark:bg-[#0f0f0f]"
      )}
    >
      {/* Logout modal */}

      {openLogout && (
        <ShowDialogLogout open={openLogout} onOpenChange={setOpenLogout} />
      )}

      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-1 px-2">
        {openMenu === "Open" ? (
          <div className="flex flex-row justify-center items-center w-full gap-2">
            <Logo />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent tracking-wide drop-shadow-sm">
              Dashboard
            </h1>
          </div>
        ) : (
          <Logo />
        )}
      </div>
      <hr className="border border-gray-800 mb-5 mt-5" />
      {/* Main Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <motion.a
            whileTap={{ scale: 0.95 }}
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              "hover:bg-muted/20",
              pathname.startsWith(item.href) && "bg-green-500/20 text-green-500"
            )}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              router.push(item.href);
            }}
          >
            {openMenu === "Open" ? (
              <>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </>
            ) : (
              <item.icon className="w-5 h-5" />
            )}
          </motion.a>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <a
          href={"/profile"}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-muted/20"
        >
          {openMenu === "Open" ? (
            <>
              <UserCogIcon className="w-5 h-5" />
              <span>Profile</span>
            </>
          ) : (
            <UserCogIcon className="w-5 h-5" />
          )}
        </a>
        <button
          onClick={() => setOpenLogout(!openLogout)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-muted/20"
        >
          {openMenu === "Open" ? (
            <>
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </>
          ) : (
            <LogOut className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
