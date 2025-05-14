"use client";

import { useState, useEffect } from "react";
import Header from "./sections/Header";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Expertise from "./sections/Expertise";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Sidebar from "./sections/Sidebar";
import ProfilePreview from "./sections/ProfilePreview";
import ToggleMenu from "./ui/ToggleMenu";
import ProfileCard from "./sections/ProfileCard";

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-row justify-normal ">
        {/* Left Sidebar - Navigation */}
        <div className="hidden md:block ">
          <ProfilePreview />
        </div>
        <ToggleMenu />
        {/* Main Content */}
        <div className="flex-1 min-h-screen w-auto ml-0 md:ml-52">
          {/* <Header /> */}
          <main className="px-10">
            <ProfileCard />
            <About />
            <Skills />
            <Expertise />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>

        {/* Right Sidebar - Profile Preview */}
        <Sidebar />
      </div>
    </div>
  );
}
