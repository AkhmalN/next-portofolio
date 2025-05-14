import FormProfile from "./FormProfile";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { Profile } from "@/types";

export default async function ProfilePage({ profile }: { profile: Profile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row w-full gap-1 items-center">
          <Link href={"/about"}>
            <Button className="" variant={"ghost"}>
              <ChevronLeftCircle />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl md:text-xl lg:text-2xl">Profile kamu</h2>
            <p className="text-sm text-gray-500">
              Kamu bisa mengubah profi kamu agar terlihat menarik di portofolio
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <FormProfile data={profile} />
    </Card>
  );
}
