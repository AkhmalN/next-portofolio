"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { ExperienceList } from "@/components/sections/admin/experiences/ExperienceList";
import Link from "next/link";
import { useRef } from "react";

interface IExperienceProps {
  data: any;
}

export default function ExperienceSection({ data }: IExperienceProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="w-full flex flex-row justify-between items-center">
            <div>
              <h2>Pengalaman Saya</h2>
            </div>
            <div>
              <Link href={"/experiences/add"}>
                <Button size={"sm"}>
                  <Plus className="mr-2 h-4 w-4" />
                  Pengalaman
                </Button>
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ExperienceList data={data.data} />
        </CardContent>
      </Card>
    </div>
  );
}
