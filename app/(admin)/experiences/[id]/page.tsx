import { fetchCollections } from "@/lib/collection/fetch-collection";
import FormEditExperience from "./FormDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default async function DetailExperiencePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { experience } = await fetchCollections("experience", { id });
  if (!experience.data) {
    notFound();
  }

  return (
    <main className="flex flex-col justify-center  w-full mx-auto mt-10 space-y-6">
      {/* <FormEditExperience data={experience.data} /> */}
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row w-full gap-1 items-center">
            <Link href={"/experiences"}>
              <Button className="" variant={"ghost"}>
                <ChevronLeftCircle />
              </Button>
            </Link>
            <p className="text-xl md:text-xl lg:text-2xl">
              Edit pengalaman kamu
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormEditExperience data={experience.data} />
        </CardContent>
      </Card>
    </main>
  );
}
