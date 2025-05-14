"use client";

import FormAddExperience from "./formAddExperience";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { createExperience } from "@/lib/action/experience/createExperience";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function FormExperiencePage() {
  const router = useRouter();
  const handleFormSubmit = async (formData: FormData) => {
    const result = await createExperience(formData);

    if (result.success) {
      toast.success(result.message);
      router.push("/experiences");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <main className="flex flex-col justify-center  w-full mx-auto mt-10 space-y-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row w-full gap-1 items-center">
            <Link href={"/experiences"}>
              <Button className="" variant={"ghost"}>
                <ChevronLeftCircle />
              </Button>
            </Link>
            <p className="text-xl md:text-xl lg:text-2xl">
              Tambah Pengalaman Baru
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            action={async (formData: FormData) => {
              await handleFormSubmit(formData);
            }}
          >
            <FormAddExperience />
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
