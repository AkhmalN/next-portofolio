import { fetchCollections } from "@/lib/collection/fetch-collection";
// import FormEditExperience from "./FormDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import FormEditProject from "./FormEditProject";
import { toast } from "react-toastify";
import { editProject } from "@/lib/action/project/editProject";

export default async function DetailProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { project } = await fetchCollections("project", { id });
  if (!project.data) {
    notFound();
  }

  return (
    <main className="flex flex-col justify-center  w-full mx-auto mt-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row w-full gap-1 items-center">
            <Link href={"/project"}>
              <Button className="" variant={"ghost"}>
                <ChevronLeftCircle />
              </Button>
            </Link>
            <p className="text-xl md:text-xl lg:text-2xl">Edit project kamu</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormEditProject {...project.data} />
        </CardContent>
      </Card>
    </main>
  );
}
