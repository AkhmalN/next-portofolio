"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSideMenu } from "@/context/sideMenuContext";
import { ThemeToggleButton } from "@/components/ui/toggleTheme";

export default function AdminHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { toggleChange } = useSideMenu();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        " z-50 transition-all duration-300 w-full  px-4 py-4 fixed top-0 bg-white dark:bg-black"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between space-x-6 w-full">
          <div className="flex flex-row items-center">
            <Button
              variant={"outline"}
              className="border border-green-500"
              onClick={toggleChange}
            >
              <Menu />
            </Button>{" "}
            <h1 className="mx-5">Admin Dashboard</h1>
          </div>
          {/* <div className=" flex flex-row justify-end">
            <ThemeToggleButton />
          </div> */}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu onClick={toggleChange} />
            </Button>
          </SheetTrigger>
        </Sheet>
      </div>
    </header>
  );
}
