import { Suspense } from "react";
import { fetchCollections } from "@/lib/collection/fetch-collection";
import Loading from "./loading";
import ProjectSection from "./List";

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: { page: string; size: string };
}) {
  const { projects } = await fetchCollections("projects", {});
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ProjectSection data={projects.data} />
      </Suspense>
    </main>
  );
}
