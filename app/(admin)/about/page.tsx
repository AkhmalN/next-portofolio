import { Suspense } from "react";
import FormAbout from "./[id]/Form";
import { fetchCollections } from "@/lib/collection/fetch-collection";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit3Icon, Plus, Smile } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "./loading";

export default async function AboutManagePage({
  searchParams,
}: {
  searchParams: { page: string; size: string };
}) {
  const { about } = await fetchCollections("about", {});
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-row justify-end w-full mb-5">
          {!about.data[0] ||
            (!about.data[0].text && (
              <Link href={"/about/add"}>
                <Button className="flex flex-row w-auto items-center">
                  <Plus />
                  <span>Ringkasan pribadi</span>
                </Button>
              </Link>
            ))}
        </div>
        {about.data.length === 0 || !about.data[0].text ? (
          <Card className="w-full">
            <CardContent className="flex flex-row items-center gap-2 p-6 justify-center">
              <p>Ringkasan diri kamu kosong nih, tambahkan yuk</p> <Smile />
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full">
            <CardHeader className="flex justify-between items-center relative">
              <Link
                href={`/about/${about.data[0]._id}`}
                className="absolute right-0 top-0"
              >
                <Button variant="outline" size="sm">
                  <Edit3Icon />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-3">
              <Card className="p-0">
                <p className="mt-4 px-3 py-2">{about.data[0].text}</p>
              </Card>
              <p className="text-sm text-gray-500 mt-5">
                Diperbarui pada:{" "}
                {new Date(about.data[0].updatedAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        )}
      </Suspense>
    </main>
  );
}
