"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  DownloadCloudIcon,
  HandHelping as HandWaving,
  NotebookText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Project, type About } from "@/types";
import client from "@/lib/axios";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

export default function About() {
  const [typedText, setTypedText] = useState("");
  const [dataAbout, setDataAbout] = useState<About>();
  const fullText = "I am a MERN Stack Developer!";
  const [loading, setLoading] = useState<boolean>(true);
  const [dataProjects, setDataProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);

  useEffect(() => {
    const getDataAbout = async () => {
      try {
        const response = await axios.get("/api/about");
        setDataAbout(response.data.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const getDataProjects = async () => {
      try {
        const response = await axios.get("/api/projects");
        setDataProjects(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDataAbout();
    getDataProjects();
  }, []);

  return (
    <section id="about" className="pt-28 pb-16">
      <div className="fixed top-0 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-yellow-400 via-pink-500 to-red-500 rounded-full blur-2xl opacity-20 animate-spin-slow z-0" />
      <div className=" fixed bottom-0 -right-20 w-[500px] h-[500px] bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse z-0" />
      <div className="container grid md:grid-cols-2 gap-8 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
              Hello, Check This Out!{" "}
              <span>
                <HandWaving className="h-8 w-8 text-yellow-400 animate-bounce" />
              </span>
            </h1>

            <div className="h-8">
              <p className="text-xl md:text-2xl text-green-400 font-mono">
                &lt; {typedText}
                <span className="animate-pulse">|</span> &gt;
              </p>
            </div>
          </div>

          <div>
            {loading ? (
              <>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </>
            ) : (
              <p className="text-muted-foreground text-lg">{dataAbout?.text}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={"https://www.linkedin.com/in/akhmal-novanda-451467238/"}
              target="_blank"
            >
              <Button className="bg-green-500 hover:bg-green-600">
                Follow
              </Button>
            </Link>

            <Link href={"#contact"}>
              <Button
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500/10"
              >
                Contact Me
              </Button>
            </Link>

            <a
              href="https://drive.google.com/file/d/1qFrDjoIWRgWLBNnSB7hMWcxj1jiU8vTu/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500/10"
              >
                CV <DownloadCloudIcon className="mx-1" />
              </Button>
            </a>
          </div>

          <div className="flex items-center gap-8 mt-4">
            <div>
              <p className="text-xl font-bold text-green-400">
                {dataProjects.length}+
              </p>
              <p className="text-sm text-muted-foreground">
                Completed Projects
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-green-400">5+</p>
              <p className="text-sm text-muted-foreground">Freelance Clients</p>
            </div>
            <div>
              <p className="text-xl font-bold text-green-400">3+</p>
              <p className="text-sm text-muted-foreground">
                Years of Experience
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center md:justify-end relative"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full p-1 z-auto">
            <Image
              src="https://media.licdn.com/dms/image/v2/D5603AQE0zMyb9nndcg/profile-displayphoto-shrink_800_800/B56ZXZ3PpJGUAg-/0/1743116894077?e=1750896000&v=beta&t=HdEOEcZ8geFaJQIoZz2yK35QFTyDLohgMAI2cUMUGIU"
              alt="Profile"
              width={320}
              height={320}
              className="rounded-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
