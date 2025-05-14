"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Experience } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import {
  Building,
  CalendarArrowDown,
  CalendarArrowUp,
  NotebookPen,
  Save,
  ScrollText,
  Sparkles,
  User,
} from "lucide-react";
import ShowSkillDialog from "./SkillDialog";
import ShowDescriptionDialog from "./DescriptionDialog";
import { toast } from "react-toastify";

export default function FormAddExperience() {
  const isSkillSelected = useRef<boolean>(false);

  const [formData, setFormData] = useState<Omit<Experience, "_id">>({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: [],
    skills: [],
  });

  const [searchResult, setSearchResult] = useState<
    { Skill: string; Category: string; SubCategory: string }[]
  >([]);

  const isNotValidInput =
    !formData.role ||
    !formData.company ||
    !formData.startDate ||
    !formData.endDate ||
    formData.description.length < 1 ||
    formData.skills.length < 1;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [recordSkill, setRecordSkill] = useState<string>("");
  const [recordDescription, setRecordDescription] = useState<string>("");

  const [openSkills, setOpenSkills] = useState<boolean>(false);
  const [openDescriptions, setOpenDescriptions] = useState<boolean>(false);

  const [shakeIcon, setShakeIcon] = useState<{
    skill: boolean;
    description: boolean;
  }>({
    skill: false,
    description: false,
  });

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

  // Add new description to state
  const handleNewDescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (recordDescription.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        description: [...prev.description, recordDescription],
      }));
      setRecordDescription("");
      setShakeIcon((prev) => ({ ...prev, description: true }));
      setTimeout(() => {
        setShakeIcon((prev) => ({ ...prev, description: false }));
      }, 500);
    }
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

  const onAutocomplete = async (record: string) => {
    try {
      const response = await fetch(`/api/skills?&search=${record}`);
      const result = await response.json();
      setSearchResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkillSelect = (item: { Skill: string }) => {
    setRecordSkill(item.Skill);
    setSearchResult([]);
    isSkillSelected.current = true;
    setTimeout(() => {
      isSkillSelected.current = false;
    }, 1000);
  };

  useEffect(() => {
    if (recordSkill && !isSkillSelected.current) {
      onAutocomplete(recordSkill);
    } else {
      setSearchResult([]);
    }
  }, [recordSkill]);

  return (
    <>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="role"
            className="text-sm font-medium flex flex-row items-center gap-1 my-3"
          >
            <User size={18} /> <span>Role</span>
          </label>
          <Input
            id="role"
            type="text"
            name="role"
            placeholder="enter your previous job position"
            value={formData.role}
            onChange={handleChange}
            autoComplete="off"
            autoCapitalize="on"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="company"
            className="text-sm font-medium flex flex-row items-center gap-1 my-3"
          >
            <Building size={18} /> <span>Company</span>
          </label>
          <Input
            id="company"
            type="text"
            name="company"
            placeholder="Enter your company name"
            value={formData.company}
            onChange={handleChange}
            autoComplete="off"
            autoCapitalize="on"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="startDate"
            className="text-sm font-medium flex flex-row items-center gap-1 my-3"
          >
            <CalendarArrowUp size={18} /> <span>Start Date</span>
          </label>
          <Input
            id="startDate"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="endDate"
            className="text-sm font-medium flex flex-row items-center gap-1 my-3"
          >
            <CalendarArrowDown size={18} /> <span>End Date</span>
          </label>
          <Input
            id="endDate"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            min={formData.startDate}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="description"
            className="text-sm font-medium flex flex-row items-center gap-1 my-3"
          >
            <NotebookPen size={18} /> <span>Description</span>
          </label>
          <Textarea
            id="description"
            placeholder={`enter a description of the work you do`}
            name="descriptions"
            value={recordDescription}
            onChange={(e) => setRecordDescription(e.target.value)}
          />
          <div className="w-auto flex flex-row items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={handleNewDescription}
            >
              + Description
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`mt-2 ${shakeIcon.description ? "animate-shake" : ""}`}
              size={"icon"}
              disabled={formData.description.length === 0}
              onClick={() => setOpenDescriptions(true)}
            >
              <NotebookPen />
            </Button>
          </div>
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
            required={formData.skills.length === 0}
          />
          {recordSkill && searchResult.length > 0 && (
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
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={handleNewSkill}
            >
              + Skill
            </Button>
            <Button
              type="button"
              variant="outline"
              className={`mt-2 ${shakeIcon.skill ? "animate-shake" : ""}`}
              size={"icon"}
              disabled={formData.skills.length === 0}
              onClick={() => setOpenSkills(true)}
            >
              <ScrollText />
            </Button>

            <Input
              id="description"
              type="hidden"
              name="description"
              defaultValue={formData.description}
            />
            <Input
              id="skillsArray"
              type="hidden"
              name="skillsArray"
              defaultValue={formData.skills}
            />
          </div>
        </div>

        {openDescriptions && (
          <ShowDescriptionDialog
            open={openDescriptions}
            onOpenChange={setOpenDescriptions}
            descriptions={formData.description}
          />
        )}
        {openSkills && (
          <ShowSkillDialog
            open={openSkills}
            onOpenChange={setOpenSkills}
            skills={formData.skills}
          />
        )}

        <div className="w-full flex justify-end">
          <Button
            type="submit"
            className="w-auto"
            disabled={isNotValidInput || isLoading}
            loading={isLoading}
          >
            <Save size={18} />
            <span className="text-sm hidden md:block"> Pengalaman</span>
          </Button>
        </div>
      </CardContent>
    </>
  );
}
