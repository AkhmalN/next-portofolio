import { Button } from "@/components/ui/button";
import { experienceRange } from "@/lib/format";
import { Building, PenBox, Smile } from "lucide-react"; // Tambahkan ikon Smiley
import Link from "next/link";
import React from "react";

interface IExperienceData {
  _id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
}

type TExperienceProps = {
  data: IExperienceData[];
};

export const ExperienceList: React.FC<TExperienceProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center space-x-2 p-6 border border-gray-200 rounded-lg shadow-sm">
        <Smile className="w-6 h-6 text-gray-500" />
        <span className="text-sm text-gray-600">
          Kamu belum menambahkan pengalaman, yuk mulai tambahkan!
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {data.map((exp) => (
        <Link href={`/experiences/${exp._id}`} key={exp._id} className="">
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 my-5">
            <div className="mb-2">
              <div className="w-full flex flex-row justify-between">
                <h3 className="text-xl font-semibold ">{exp.role}</h3>
                {/* <Link href={`/experiences/${exp._id}`}>
                <Button size={"icon"}>
                  <PenBox size={17} />
                </Button>
              </Link> */}
              </div>
              <div className="flex flex-wrap w-full items-center text-sm text-gray-500 mt-1">
                <Building className="w-4 h-4 mr-1" />
                <span>{exp.company}</span>
                <span className="mx-2">|</span>
                <span>{experienceRange(exp.startDate, exp.endDate)}</span>
              </div>
            </div>
            {exp.description.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-3">
                {exp.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            )}

            {exp.skills && exp.skills.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">
                  Skills:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium px-3 py-1 rounded-full shadow-sm bg-gray-500 text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};
