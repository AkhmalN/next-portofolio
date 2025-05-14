"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Profile } from "@/types";
import {
  Calendar,
  Linkedin,
  LocateFixedIcon,
  Mail,
  MapPinCheck,
  PenSquare,
  Save,
  ScrollText,
  Sparkles,
  UserCheck2Icon,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { TbLocationCheck, TbUserStar } from "react-icons/tb";
import { toast } from "react-toastify";
import ShowSkillDialog from "../experiences/add/SkillDialog";
import { SimpleButton } from "@/components/ui/SimpleButton";
import Cookies from "js-cookie";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function FormProfile({ data }: { data: Profile }) {
  const isSkillSelected = useRef<boolean>(false);
  const [openSkills, setOpenSkills] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<Profile, "password">>({
    full_name: data.full_name,
    role: data.role,
    image_url: data.image_url,
    linkedin: data.linkedin,
    github: data.github,
    address: data.address,
    birthday: data.birthday,
    user_id: data.user_id,
    username: data.username,
    email: data.email,
    born_location: data.born_location,
    skills: data.skills,
  });
  const [previewImage, setPreviewImage] = useState<string>(data.image_url);
  const [recordSkill, setRecordSkill] = useState<string>("");
  const [shakeIcon, setShakeIcon] = useState<{
    skill: boolean;
    description: boolean;
  }>({
    skill: false,
    description: false,
  });

  const [searchResult, setSearchResult] = useState<
    { Skill: string; Category: string; SubCategory: string }[]
  >([]);

  // form change input element and textarea element
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "skill") {
      formData.skills.push(value);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleOpenFilePicker = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Open file picker");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file.size > MAX_FILE_SIZE) {
          toast.warn("Ukuran file terlalu besar. Maksimum 10MB.");
          setPreviewImage("");
          return;
        }

        setPreviewImage(URL.createObjectURL(file));
      }
    };
    fileInput.click();
  };

  // Add new skill to state
  const handleNewSkill = (e: React.FormEvent) => {
    e.preventDefault();

    if (recordSkill.trim() !== "") {
      const skillExists = formData.skills.some(
        (skill) => skill.toLowerCase() === recordSkill.toLowerCase()
      );

      if (skillExists) {
        toast.warn("Skill sudah ada dalam daftar");
      } else {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, recordSkill],
        }));

        setRecordSkill(""); // Reset input skill
        setShakeIcon((prev) => ({ ...prev, skill: true }));
        setTimeout(() => {
          setShakeIcon((prev) => ({ ...prev, skill: false }));
        }, 500);
      }
    }
  };

  // Auto complete skill
  const onAutocomplete = async (record: string) => {
    try {
      const response = await fetch(`/api/skills?&search=${record}`);
      const result = await response.json();
      setSearchResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle skill selection
  const handleSkillSelect = (item: { Skill: string }) => {
    setRecordSkill(item.Skill);
    setSearchResult([]);
    isSkillSelected.current = true;
    setTimeout(() => {
      isSkillSelected.current = false;
    }, 1000);
  };

  // Handle form skill submission
  useEffect(() => {
    if (recordSkill && !isSkillSelected.current) {
      onAutocomplete(recordSkill);
    } else {
      setSearchResult([]);
    }
  }, [recordSkill]);

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formToSubmit = new FormData();
      formToSubmit.append("image", previewImage);
      formToSubmit.append("role", formData.role);
      formToSubmit.append("username", formData.username);
      formToSubmit.append("email", formData.email);
      formToSubmit.append("full_name", formData.full_name);
      formToSubmit.append("birthday", formData.birthday);
      formToSubmit.append("born_location", formData.born_location);
      formToSubmit.append("address", formData.address);
      formToSubmit.append("linkedin", formData.linkedin);
      formToSubmit.append("github", formData.github);
      formToSubmit.append("skills", JSON.stringify(formData.skills));
      formToSubmit.append("user_id", formData.user_id);

      const token = Cookies.get("access_token");
      const response = await fetch(`/api/profile/${data._id}`, {
        method: "PUT",
        body: formToSubmit,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast.success("Profile updated successfully");
      } else {
        const errorResponse = await response.json();
        toast.error(`Error: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent>
      <div className="space-y-1 w-full flex flex-col items-center justify-center mt-5 relative">
        <Button
          className="absolute bottom-1/4 right-1/3  rounded-full p-2 z-50 flex flex-row gap-2 items-center"
          onClick={handleOpenFilePicker}
        >
          <span className="text-sm hidden sm:inline">Update image</span>
          <PenSquare size={20} />
        </Button>
        <Image
          src={previewImage}
          alt="Avatar"
          width={400}
          height={200}
          priority
          className="rounded-full w-52 h-52 mb-3 transition-transform duration-300 transform scale-100 hover:scale-105 relative"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="role"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <TbUserStar size={18} /> <span className="ml-1">Role</span>
        </label>
        <Input
          id="role"
          type="text"
          name="role"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.role}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="username"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <UserCheck2Icon size={18} /> <span className="ml-1">Username</span>
        </label>
        <Input
          id="username"
          type="text"
          name="username"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="email"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <Mail size={18} /> <span className="ml-1">Email</span>
        </label>
        <Input
          id="email"
          type="text"
          name="email"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="full_name"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <UserCheck2Icon size={18} />{" "}
          <span className="ml-1">Nama lengkap</span>
        </label>
        <Input
          id="full_name"
          type="text"
          name="full_name"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.full_name}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="birthday"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <Calendar size={18} /> <span className="ml-1">Tanggal Lahir</span>
        </label>
        <Input
          id="birthday"
          type="date"
          name="birthday"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.birthday}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="born_location"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <MapPinCheck size={18} /> <span className="ml-1">Tempat Lahir</span>
        </label>
        <Input
          id="born_location"
          type="text"
          name="born_location"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.born_location}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="address"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <TbLocationCheck size={18} /> <span className="ml-1">Alamat</span>
        </label>
        <Textarea
          id="address"
          name="address"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="linkedin"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <Linkedin size={18} /> <span className="ml-1">Linkedin</span>
        </label>
        <Input
          id="linkedin"
          type="text"
          name="linkedin"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.linkedin}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="github"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <FaGithub size={18} /> <span className="ml-1">Github</span>
        </label>
        <Input
          id="github"
          type="text"
          name="github"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.github}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="skill"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <Sparkles size={18} /> <span>Skill</span>
        </label>
        <Input
          placeholder={`Enter the skills you acquired`}
          id="skill"
          name="skills"
          value={recordSkill}
          onChange={(e) => setRecordSkill(e.target.value)}
          autoComplete="off"
          autoCapitalize="on"
          required={data.skills.length === 0}
        />
        {recordSkill && data.skills.length > 0 && (
          <ul className="border border-input mt-2 p-0 list-none">
            {searchResult.map((item, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:dark:bg-gray-500/50"
                onClick={() => handleSkillSelect(item)}
              >
                <span className="font-semibold">{item.Skill}</span> -{" "}
                {item.Category}
              </li>
            ))}
          </ul>
        )}

        <div className="w-auto flex flex-row items-center gap-2">
          <SimpleButton
            type="button"
            variant="outline"
            className="mt-2"
            onClick={handleNewSkill}
          >
            + Skill
          </SimpleButton>
          <SimpleButton
            type="button"
            variant="outline"
            className={`mt-2 ${shakeIcon.skill ? "animate-shake" : ""}`}
            size={"icon"}
            disabled={data.skills.length === 0}
            onClick={() => setOpenSkills(true)}
          >
            <ScrollText />
          </SimpleButton>
        </div>
      </div>

      <div className="w-full flex justify-end gap-2">
        <Button
          type="submit"
          className="w-auto"
          onClick={handleEditProfile}
          disabled={isLoading}
          loading={isLoading}
        >
          <Save size={18} />
          <span className="text-sm hidden md:block"> Profil</span>
        </Button>
      </div>

      {openSkills && (
        <ShowSkillDialog
          open={openSkills}
          onOpenChange={setOpenSkills}
          skills={formData.skills}
        />
      )}
    </CardContent>
  );
}
