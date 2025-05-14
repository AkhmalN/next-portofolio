"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormAddAbout from "./FormAdd";
import { createAbout } from "@/lib/action/about/createAbout";

export default function FormAdd() {
  const router = useRouter();
  const handleFormSubmit = async (formData: FormData) => {
    const result = await createAbout(formData);
    if (result.success) {
      toast.success(result.message);
      router.push("/about");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <main className="flex flex-col justify-center  w-full mx-auto mt-10 space-y-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row w-full gap-1 items-center">
            <Link href={"/about"}>
              <Button className="" variant={"ghost"}>
                <ChevronLeftCircle />
              </Button>
            </Link>
            <p className="text-xl md:text-xl lg:text-2xl">Ringkasan Pribadi</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            action={async (formData: FormData) => {
              await handleFormSubmit(formData);
            }}
          >
            <FormAddAbout />
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
