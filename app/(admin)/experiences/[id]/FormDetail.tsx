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
  Trash,
  User,
} from "lucide-react";
import { dateParser } from "@/lib/format";
import { useRouter } from "next/navigation";
import { updateExperience } from "@/lib/action/experience/updateExperience";
import ShowDialogDelete from "./DeleteExperience";
import ShowDescriptionDialog from "../add/DescriptionDialog";
import ShowSkillDialog from "../add/SkillDialog";
import { SimpleButton } from "@/components/ui/SimpleButton";
import { toast } from "react-toastify";

interface IFormEdit {
  data: Experience;
}

export default function FormEditExperience({ data }: IFormEdit) {
  const router = useRouter();
  const isSkillSelected = useRef<boolean>(false);

  const [formData, setFormData] = useState<
    Omit<Experience, "_id" | "description" | "skills">
  >({
    role: data?.role,
    company: data?.company,
    startDate: dateParser(data?.startDate),
    endDate: dateParser(data?.endDate),
  });

  const [arrayDesc, setArrayDesc] = useState<string[]>(
    data?.description.map((desc) => desc)
  );

  const [arraySkill, setArraySkill] = useState<string[]>(
    data?.skills.map((skill) => skill)
  );

  const [isLoading, setIsLoading] = useState<{
    submit: boolean;
    delete: boolean;
  }>({ submit: false, delete: false });

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

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [searchResult, setSearchResult] = useState<
    { Skill: string; Category: string; SubCategory: string }[]
  >([]);

  // form change input element and textarea element
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new description to state
  const handleNewDescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (recordDescription.trim() !== "") {
      setArrayDesc((prev) => [...prev, recordDescription]);
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
      const skillExists = arraySkill.some(
        (skill) => skill.toLowerCase() === recordSkill.toLowerCase()
      );

      if (skillExists) {
        toast.warn("Skill sudah ada dalam daftar.");
      } else {
        setArraySkill((prev) => [...prev, recordSkill]);

        setRecordSkill("");
        setShakeIcon((prev) => ({ ...prev, skill: true }));
        setTimeout(() => {
          setShakeIcon((prev) => ({ ...prev, skill: false }));
        }, 500);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, submit: true }));
    const result = await updateExperience(
      formData,
      arrayDesc,
      arraySkill,
      data._id
    );
    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        router.push("/experiences");
        router.refresh();
      }, 2000);
    } else {
      toast.warn(result.message);
    }
    setIsLoading((prev) => ({ ...prev, submit: false }));
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
            <SimpleButton
              type="button"
              variant="outline"
              className="mt-2"
              onClick={handleNewDescription}
              disabled={false}
              loading={false}
            >
              + Description
            </SimpleButton>
            <SimpleButton
              type="button"
              variant="outline"
              className={`mt-2 ${shakeIcon.description ? "animate-shake" : ""}`}
              size={"icon"}
              disabled={arrayDesc.length === 0}
              onClick={() => setOpenDescriptions(true)}
            >
              <NotebookPen />
            </SimpleButton>
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
            required={arraySkill.length === 0}
          />
          {recordSkill && searchResult.length > 0 && (
            <ul className="border border-input mt-2 p-0 list-none max-h-32 overflow-y-auto rounded-md bg-white dark:bg-gray-500">
              {searchResult.map((item, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:dark:bg-gray-700/50 hover:bg-gray-100"
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
              disabled={arraySkill.length === 0}
              onClick={() => setOpenSkills(true)}
            >
              <ScrollText />
            </SimpleButton>

            <Input
              id="description"
              type="hidden"
              name="description"
              defaultValue={arrayDesc}
            />
            <Input
              id="skillsArray"
              type="hidden"
              name="skillsArray"
              defaultValue={arraySkill}
            />
          </div>
        </div>

        {openDialog && (
          <ShowDialogDelete
            open={openDialog}
            onOpenChange={setOpenDialog}
            id={data._id}
          />
        )}
        {openDescriptions && (
          <ShowDescriptionDialog
            open={openDescriptions}
            onOpenChange={setOpenDescriptions}
            descriptions={arrayDesc}
          />
        )}
        {openSkills && (
          <ShowSkillDialog
            open={openSkills}
            onOpenChange={setOpenSkills}
            skills={arraySkill}
          />
        )}

        <div className="w-full flex justify-end gap-2">
          <Button
            type="button"
            className="w-auto z-10 bg-red-500 hover:bg-red-400"
            loading={isLoading.delete}
            disabled={isLoading.delete}
            onClick={() => setOpenDialog(true)}
          >
            <Trash size={18} className="text-white" />
            <span className="text-sm hidden md:block text-white">
              Pengalaman
            </span>
          </Button>
          <Button
            type="submit"
            className="w-auto"
            onClick={handleFormSubmit}
            disabled={isLoading.submit}
            loading={isLoading.submit}
          >
            <Save size={18} />
            <span className="text-sm hidden md:block"> Pengalaman</span>
          </Button>
        </div>
      </CardContent>
    </>
  );
}
