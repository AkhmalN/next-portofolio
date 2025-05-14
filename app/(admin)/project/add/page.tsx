"use client";

import FormAddProject from "./FormAddProject";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";

export default function FormExperiencePage() {
  return (
    <main className="flex flex-col justify-center  w-full mx-auto mt-10 space-y-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row w-full gap-1 items-center">
            <Link href={"/project"}>
              <Button className="" variant={"ghost"}>
                <ChevronLeftCircle />
              </Button>
            </Link>
            <p className="text-xl md:text-xl lg:text-2xl">
              Tambah project baru
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormAddProject />
        </CardContent>
      </Card>
    </main>
  );
}
