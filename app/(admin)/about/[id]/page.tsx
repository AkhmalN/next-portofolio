import { Suspense } from "react";
import { fetchCollections } from "@/lib/collection/fetch-collection";
import FormDetailAbout from "./Form";

export default async function DetailAboutPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { detailAbout } = await fetchCollections("detailAbout", { id });
  return (
    <main>
      <Suspense>
        <FormDetailAbout data={detailAbout.data} id={id} />
      </Suspense>
    </main>
  );
}
