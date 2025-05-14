import { Suspense } from "react";
import ExperienceSection from "./list";
import { fetchCollections } from "@/lib/collection/fetch-collection";
import Loading from "./loading";

export default async function ExperiencePage({
  searchParams,
}: {
  searchParams: { page: string; size: string };
}) {
  const { experiences } = await fetchCollections("experiences", {});
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ExperienceSection data={experiences} />
      </Suspense>
    </main>
  );
}
