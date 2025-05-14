"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Smile } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";
import { ProjectList } from "@/components/sections/admin/projects/ProjectList";

interface IExperienceProps {
  data: Project[];
}

export default function ProjectSection({ data }: IExperienceProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="w-full flex flex-row justify-between items-center">
            <div>
              <h2>Project Saya</h2>
            </div>
            <div>
              <Link href={"/project/add"}>
                <Button size={"sm"}>
                  <Plus className="mr-2 h-4 w-4" />
                  Project
                </Button>
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.length === 0 ? (
            <div className="flex items-center justify-center space-x-2 p-6 border border-gray-500 rounded-lg shadow-sm">
              <Smile className="w-6 h-6 text-gray-500" />
              <span className="text-sm text-gray-600">
                Kamu belum menambahkan project, yuk mulai tambahkan!
              </span>
            </div>
          ) : (
            <ProjectList projects={data} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
