import React from "react";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { TbWorldSearch } from "react-icons/tb";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/project/${project._id}`);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer border border-gray-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={project.imageUrl}
          alt={project.title}
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 transform scale-100 hover:scale-105"
          priority
          width={700}
          height={700}
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-300">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 dark:text-gray-500">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-end mt-2">
          <div>
            {project.show_demo && (
              <Link
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
              >
                <Button
                  variant="default"
                  size="sm"
                  className="mr-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <TbWorldSearch className="mr-2 h-4 w-4" />
                  Demo
                </Button>
              </Link>
            )}
            {project.show_github && (
              <Link
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
              >
                <Button variant="outline" size="sm">
                  <FaGithub className="mr-2 h-4 w-4" />
                  Github
                </Button>
              </Link>
            )}
          </div>
          <div className="absolute top-2 right-3 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full shadow text-xs font-medium text-gray-800 dark:text-gray-200 backdrop-blur-sm">
            {project.category}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard project={project} key={project._id} />
      ))}
    </div>
  );
};
