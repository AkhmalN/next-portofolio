"use client";

import Image from "next/image";
import { Mail, MapPin, Calendar } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaVuejs,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { SiMongodb } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Experience, Profile, Project } from "@/types";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { monthYearParser } from "@/lib/format";

export const PopulatedSkill = [
  { name: "Reactjs", icon: <FaReact size={16} /> },
  { name: "Nodejs", icon: <FaNodeJs size={16} /> },
  { name: "Vuejs", icon: <FaVuejs size={16} /> },
  { name: "Typescript", icon: <BiLogoTypescript size={16} /> },
  { name: "Mongodb", icon: <SiMongodb size={16} /> },
  { name: "Nextjs", icon: <TbBrandNextjs size={16} /> },
];

export default function ProfileCard() {
  const [dataExperience, setDataExperience] = useState<Experience[]>([]);
  const [dataProjects, setDataProjects] = useState<Project[]>([]);
  const [dataProfile, setDataProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState({
    project: true,
    experience: true,
    profile: true,
  });

  useEffect(() => {
    const getDataProfile = async () => {
      try {
        const response = await axios.get(
          `/api/profile/6821b56b2322821b3b412eb2`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setDataProfile(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading((prev) => ({ ...prev, profile: false }));
      }
    };

    const getDataExperience = async () => {
      try {
        const response = await axios.get("/api/experiences");
        setDataExperience(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading((prev) => ({ ...prev, experience: false }));
      }
    };
    const getDataProjects = async () => {
      try {
        const response = await axios.get("/api/projects");
        setDataProjects(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading((prev) => ({ ...prev, project: false }));
      }
    };

    getDataExperience();
    getDataProjects();
    getDataProfile();

    console.log("profile card mounted");
  }, []);
  return (
    <div className="block md:hidden mt-10">
      <div className=" w-full bg-white dark:bg-card border rounded-xl shadow-md p-6 space-y-6">
        {/* Profile Image */}
        <div className="flex justify-center">
          <Image
            src="https://media.licdn.com/dms/image/v2/D5603AQE0zMyb9nndcg/profile-displayphoto-shrink_800_800/B56ZXZ3PpJGUAg-/0/1743116894077?e=1750896000&v=beta&t=HdEOEcZ8geFaJQIoZz2yK35QFTyDLohgMAI2cUMUGIU"
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
            priority
          />
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            {isLoading.profile ? (
              <Skeleton className="h-6 w-4/4" />
            ) : (
              dataProfile?.username
            )}
          </h2>
          <p className="text-muted-foreground flex items-center justify-center">
            {isLoading.profile ? (
              <Skeleton className="h-6 w-3/4" />
            ) : (
              dataProfile?.role
            )}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-muted/20">
          <div className="text-center">
            <p className="text-lg font-semibold">{dataProjects.length}</p>
            <p className="text-xs text-muted-foreground">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">
              {dataProfile?.skills.length}+
            </p>
            <p className="text-xs text-muted-foreground">Skills</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{dataExperience.length}</p>
            <p className="text-xs text-muted-foreground">Experience</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs">
            <Mail className="w-4 h-4 text-muted-foreground" />
            {isLoading.profile ? (
              <Skeleton className="h-4 w-2/4" />
            ) : (
              <span>{dataProfile?.email}</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            {isLoading.profile ? (
              <Skeleton className="h-4 w-2/4" />
            ) : (
              <span>{dataProfile?.address}</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            {isLoading.profile ? (
              <Skeleton className="h-4 w-2/4" />
            ) : (
              <span>
                {dataProfile?.born_location},{" "}
                {monthYearParser(dataProfile?.birthday)}
              </span>
            )}
          </div>
        </div>

        {/* Social Buttons */}
        <div className="space-y-3 space-x-2">
          <h3 className="font-semibold mb-3">Social Accounts</h3>
          <Link href={`${dataProfile?.linkedin}`} target="_blank">
            <Button className="w-auto bg-green-500 hover:bg-green-600">
              <FaLinkedin />
            </Button>
          </Link>
          <Link href={`${dataProfile?.github}`}>
            <Button variant="outline" className="w-auto">
              <FaGithub className="text-gray-800" />
            </Button>
          </Link>
        </div>

        {/* Top Skills*/}
        <div>
          <h3 className="font-semibold mb-3">Top Skills</h3>
          <div className="flex flex-wrap gap-2">
            {PopulatedSkill.map((skill) => (
              <span
                key={skill.name}
                className="px-2 py-1 text-xs rounded-full bg-muted/20 text-muted-foreground"
              >
                {skill.icon}
              </span>
            ))}
          </div>
        </div>

        {/* Related Skills */}
        <div>
          <h3 className="font-semibold mb-3">Related Skills</h3>
          <div className="flex flex-wrap gap-2">
            {dataProfile?.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-muted/20 text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
