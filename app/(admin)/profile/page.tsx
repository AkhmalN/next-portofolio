import { Suspense } from "react";
import { fetchCollections } from "@/lib/collection/fetch-collection";
import Loading from "./loading";
import ProfilePage from "./Form";

export default async function ExperiencePage({
  searchParams,
}: {
  searchParams: { page: string; size: string };
}) {
  const { profile } = await fetchCollections("profile", {});
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ProfilePage profile={profile.data} />
      </Suspense>
    </main>
  );
}
