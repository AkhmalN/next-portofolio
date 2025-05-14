"use client";

import { About } from "@/types";
import { useRouter } from "next/navigation";
import { editProject } from "@/lib/action/project/editProject";
import { toast } from "react-toastify";
import FormEditAbout from "./FormEdit";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { editAbout } from "@/lib/action/about/editAbout";

export default function FormDetailAbout({
  data,
  id,
}: {
  data: About;
  id: string;
}) {
  const router = useRouter();
  const handleFormSubmit = async (formData: FormData) => {
    const result = await editAbout(formData, id);
    if (result.success) {
      toast.success(result.message);
      router.push("/about");
    } else {
      toast.error(result.message);
    }
  };
  return (
    <form
      action={async (formData: FormData) => {
        await handleFormSubmit(formData);
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row w-full gap-1 items-center">
            <Link href={"/about"}>
              <Button className="" variant={"ghost"}>
                <ChevronLeftCircle />
              </Button>
            </Link>
            <p className="text-xl md:text-xl lg:text-2xl">
              Ubah ringkasan pribadi
            </p>
          </CardTitle>
        </CardHeader>
        <FormEditAbout {...data} />
      </Card>
    </form>
  );
}
