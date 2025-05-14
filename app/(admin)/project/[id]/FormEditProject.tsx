"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useRef, startTransition } from "react";
import {
  ArrowDownAZIcon,
  BriefcaseBusiness,
  FileWarningIcon,
  Link,
  NotebookIcon,
  OctagonX,
  Save,
  TagsIcon,
  Trash,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { TbCategory2, TbWorldShare } from "react-icons/tb";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";
import { Switch } from "@/components/ui/switch";
import { PiWarningCircle } from "react-icons/pi";
import { SimpleButton } from "@/components/ui/SimpleButton";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function FormEditProject(data: Project) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<{
    submit: boolean;
    delete: boolean;
  }>({
    submit: false,
    delete: false,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<Omit<Project, "_id" | "tags">>({
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    demo_url: data.demo_url,
    github_url: data.github_url,
    category: data.category,
    show_demo: data.show_demo,
    show_github: data.show_github,
  });

  const [checkPublish, setCheckPublish] = useState(() => ({
    demo: data.show_demo,
    github: data.show_github,
  }));

  const [arrayTags, setArrayTags] = useState<string[]>(data.tags);
  const [recordTags, setRecordTags] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>(
    formData.imageUrl || ""
  );

  const [editImage, setEditImage] = useState<boolean>(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile));
      setSelectedImageFile(selectedFile);
    }
  };

  const clearImage = () => {
    setPreviewImage("");
    setSelectedImageFile(null);
    setEditImage(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddNewTags = (e: React.FormEvent) => {
    e.preventDefault();
    if (recordTags.trim() !== "") {
      setArrayTags((prev) => [...prev, recordTags]);
      setRecordTags("");
    }
  };

  const handleDeleteTags = (tagToRemove: string) => {
    setArrayTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleToggle =
    (key: keyof typeof checkPublish) => (checked: boolean) => {
      setCheckPublish((prev) => ({
        ...prev,
        [key]: checked,
      }));
    };

  const handleDeleteProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, delete: true }));
    try {
      const response = await fetch(`/api/projects/${data._id}`, {
        method: "DELETE",
        body: JSON.stringify({
          imageUrl: formData.imageUrl,
        }),
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });

      if (response.ok) {
        toast.success("Project berhasil dihapus!");

        startTransition(() => {
          router.refresh();
          router.push("/project");
        });
      } else {
        toast.warn("Terjadi kesalahan server.");
      }
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, submit: true }));
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("demo_url", formData.demo_url);
      formDataToSubmit.append("github_url", formData.github_url);
      formDataToSubmit.append("category", formData.category);
      formDataToSubmit.append("show_demo", checkPublish.demo.toString());
      formDataToSubmit.append("show_github", checkPublish.github.toString());
      formDataToSubmit.append("tags", JSON.stringify(arrayTags));

      if (selectedImageFile) {
        formDataToSubmit.append("image", selectedImageFile);
      } else {
        formDataToSubmit.append("imageUrl", formData.imageUrl);
      }

      const response = await fetch(`/api/projects/${data._id}`, {
        method: "PUT",
        body: formDataToSubmit,
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      if (response.ok) {
        toast.success("Project berhasil diperbarui!");

        startTransition(() => {
          router.refresh();
          router.push("/project");
        });
      } else {
        toast.warn("Terjadi kesalahan server.");
      }
    } catch (error) {
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  return (
    <CardContent className="space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="title"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <BriefcaseBusiness size={18} /> <span>Title</span>
        </label>
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="enter your previous project title"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="description"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <NotebookIcon size={18} /> <span>Description</span>
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter your project description"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="image"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <NotebookIcon size={18} /> <span>Project Documentation</span>
        </label>
        {editImage ? (
          <Input
            ref={fileInputRef}
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={selectImage}
          />
        ) : (
          <input type="hidden" name="imageUrl" value={formData.imageUrl} />
        )}

        {previewImage && (
          <div className="mt-4">
            {!editImage && (
              <p className="text-xs font-normal flex flex-row gap-1 items-center text-gray-300 mt-2">
                <PiWarningCircle size={15} className="text-orange-300" />
                <span>
                  Hapus image saat ini jika ingin mengubah nya menjadi terbaru
                </span>
              </p>
            )}

            <div className="relative w-auto mt-2">
              <Image
                src={previewImage}
                alt="Preview"
                style={{ objectFit: "cover" }}
                className="rounded-md"
                width={300}
                height={300}
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 left-64 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                <Trash size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="demo_url"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <TbWorldShare size={18} /> <span>Demo Url</span>
        </label>
        <div className="flex flex-row items-center gap-2">
          <Switch
            onCheckedChange={handleToggle("demo")}
            checked={checkPublish.demo}
          />
          <p className="my-2">Show demo?</p>
        </div>
        {checkPublish.demo && (
          <Input
            id="demo_url"
            type="text"
            name="demo_url"
            placeholder="insert demo url so people can see it"
            autoComplete="off"
            autoCapitalize="on"
            required
            value={formData.demo_url}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, demo_url: e.target.value }))
            }
          />
        )}

        <input
          type="hidden"
          name="show_demo"
          value={checkPublish.demo.toString()}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="github_url"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <FaGithub size={18} /> <span>Github Url</span>
        </label>
        <div className="flex flex-row items-center gap-2">
          <Switch
            onCheckedChange={handleToggle("github")}
            checked={checkPublish.github}
          />
          <p className="my-2">Show github?</p>
        </div>
        {checkPublish.github && (
          <Input
            id="github_url"
            type="text"
            name="github_url"
            placeholder="enter the github url of your project repository"
            autoComplete="off"
            autoCapitalize="on"
            required
            value={formData.github_url}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, github_url: e.target.value }))
            }
          />
        )}

        <input
          type="hidden"
          name="show_github"
          value={checkPublish.github.toString()}
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="category"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <TbCategory2 size={18} /> <span>Project Category</span>
        </label>
        <Input
          id="category"
          type="text"
          name="category"
          placeholder="enter the project category to classification"
          autoComplete="off"
          autoCapitalize="on"
          required
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="input_tags"
          className="text-sm font-medium flex flex-row items-center gap-1 my-3"
        >
          <TagsIcon size={18} /> <span>Tags</span>
        </label>
        <Input
          placeholder={`Enter the tags you want to use`}
          id="input_tags"
          name="input_tags"
          value={recordTags}
          onChange={(e) => setRecordTags(e.target.value)}
          autoComplete="off"
          autoCapitalize="on"
          required={arrayTags.length === 0}
        />

        <Card className="py-1">
          <CardContent className="flex flex-row flex-wrap py-1">
            {arrayTags.length === 0 ? (
              <div className=" px-2 py-1 w-48 flex flex-row items-center gap-1 relative">
                <FileWarningIcon size={15} className="text-red-400" />
                <span className="text-red-400 text-sm">No tags added</span>
              </div>
            ) : (
              arrayTags.map((tag, index) => (
                <Badge
                  variant={"secondary"}
                  key={index}
                  className="mx-1 my-1 py-3 rounded-lg px-4 relative"
                >
                  {index + 1}. {tag}
                  <button
                    type="button"
                    onClick={() => handleDeleteTags(tag)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                  >
                    x
                  </button>
                </Badge>
              ))
            )}
          </CardContent>
        </Card>

        <div className="w-auto flex flex-row items-center gap-2">
          <SimpleButton
            type="button"
            variant="outline"
            className="mt-2"
            onClick={handleAddNewTags}
          >
            + Tags
          </SimpleButton>
        </div>
      </div>

      <Input id="tags" type="hidden" name="tags" value={arrayTags} />

      <div className="w-full flex justify-end gap-2">
        <Button
          type="submit"
          className="w-auto bg-red-500 hover:bg-red-400 text-white"
          onClick={handleDeleteProject}
          disabled={isLoading.delete}
          loading={isLoading.delete}
        >
          <Trash size={18} />
          <span className="text-sm hidden md:block"> project</span>
        </Button>
        <Button
          type="submit"
          className="w-auto"
          onClick={handleSubmitProject}
          disabled={isLoading.submit}
          loading={isLoading.submit}
        >
          <Save size={18} />
          <span className="text-sm hidden md:block"> project</span>
        </Button>
      </div>
    </CardContent>
  );
}
