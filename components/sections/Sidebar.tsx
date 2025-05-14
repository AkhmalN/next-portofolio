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
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSideMenu } from "@/context/sideMenuContext";
import axios from "axios";
import { Experience, Project } from "@/types";

const menuItems = [
  { icon: User, label: "About", href: "#about" },
  { icon: Code2, label: "Skills", href: "#skills" },
  { icon: Sparkles, label: "Expertise", href: "#expertise" },
  { icon: Briefcase, label: "Projects", href: "#projects" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

const bottomMenuItems = [
  // { icon: Settings, label: "Settings", href: "#" },
  { icon: LogOut, label: "Login Admin", href: "/about" },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("About");
  const { openMenu } = useSideMenu();

  return (
    <div
      className={`${
        openMenu === "Open" ? "w-72" : "hidden"
      } min-h-screen  border-r border-muted/20 transition-all duration-300 ease-in-out`}
    >
      <div
        className={` ${
          openMenu === "Open" ? "w-72" : "hidden"
        } fixed top-0 right-0 p-4 min-h-screen transition-all duration-300 ease-in-out bg-black `}
      >
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="relative w-10 h-10 mx-1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full" />
            <Image
              src="https://media.licdn.com/dms/image/v2/D5603AQE0zMyb9nndcg/profile-displayphoto-shrink_800_800/B56ZXZ3PpJGUAg-/0/1743116894077?e=1750896000&v=beta&t=HdEOEcZ8geFaJQIoZz2yK35QFTyDLohgMAI2cUMUGIU"
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full object-cover border-2 border-muted/20"
            />
          </div>
          {openMenu === "Open" ? (
            <div>
              <h3 className="font-semibold">Akhmal Novanda</h3>
              <p className="text-sm text-muted-foreground">
                Web & Mobile Developer
              </p>
            </div>
          ) : null}
        </div>

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
                activeItem === item.label && "bg-green-500/20 text-green-500"
              )}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setActiveItem(item.label);
                const targetId = item.href.replace("#", "");
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: "smooth" });
                }
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
          {bottomMenuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-muted/20"
            >
              {openMenu === "Open" ? (
                <>
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
