"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useRef, startTransition } from "react";
import {
  BriefcaseBusiness,
  FileWarningIcon,
  NotebookIcon,
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
import { Switch } from "@/components/ui/switch";
import { SimpleButton } from "@/components/ui/SimpleButton";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function FormAddProject() {
  const { token } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    demo_url: string;
    github_url: string;
    description: string;
  }>({
    title: "",
    category: "",
    demo_url: "",
    github_url: "",
    description: "",
  });
  const [recordTags, setRecordTags] = useState<string>("");
  const [arrayTags, setArrayTags] = useState<string[]>([]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [checkPublish, setCheckPublish] = useState<{
    demo: false;
    github: false;
  }>({ demo: false, github: false });
  const [isLoading, setIsloading] = useState<boolean>(false);

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setSelectedImage(selectedFile);
    }

    if (!selectedFile) {
      setPreviewImage("");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.warn("Ukuran file terlalu besar. Maksimum 10MB.");
      event.target.value = "";
      setPreviewImage("");
      return;
    }

    setPreviewImage(URL.createObjectURL(selectedFile));
    console.log("Selected File:", selectedFile);
  };

  const clearImage = () => {
    setPreviewImage("");
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }
      formDataToSend.append("tags", JSON.stringify(arrayTags));
      formDataToSend.append(
        "demo_url",
        checkPublish.demo ? formData.demo_url : ""
      );
      formDataToSend.append(
        "github_url",
        checkPublish.github ? formData.github_url : ""
      );
      formDataToSend.append("category", formData.category);
      formDataToSend.append("show_demo", checkPublish.demo.toString());
      formDataToSend.append("show_github", checkPublish.github.toString());

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.status === 201) {
        // Notify success
        toast.success("Project berhasil ditambahkan!");

        // reset form
        setFormData({
          title: "",
          category: "",
          demo_url: "",
          github_url: "",
          description: "",
        });
        setArrayTags([]);
        setRecordTags("");
        setSelectedImage(null);
        setPreviewImage("");
        setCheckPublish({ demo: false, github: false });

        // back to intial page
        startTransition(() => {
          router.refresh();
          router.push("/project");
        });
      } else {
        toast.warn("Terjadi kesalahan server.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan server.");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
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
          <Input
            id="image"
            name="image"
            type="file"
            placeholder="Enter your project documentation"
            autoComplete="off"
            autoCapitalize="on"
            required
            onChange={selectImage}
            accept="image/*"
          />
          {previewImage && (
            <div className="mt-4">
              <h3 className="text-sm font-medium flex flex-row items-center gap-1">
                Preview Image
              </h3>
              <div className="relative w-48 h-48 mt-2">
                <Image
                  src={previewImage}
                  alt="Preview"
                  layout="fill"
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
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
              placeholder="enter the github url of your project reposiroty"
              autoComplete="off"
              autoCapitalize="on"
              required
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

        <div className="w-full flex justify-end">
          <Button
            type="submit"
            className="w-auto"
            loading={isLoading}
            disabled={isLoading}
          >
            <Save size={18} />
            <span className="text-sm hidden md:block"> project</span>
          </Button>
        </div>
      </CardContent>
    </form>
  );
}
