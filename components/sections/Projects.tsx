"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import axios from "axios";
import { Project } from "@/types";
import Link from "next/link";

export default function Projects() {
  const [dataProjects, setDataProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getDataProjects = async () => {
      try {
        const response = await axios.get("/api/projects");
        setDataProjects(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    getDataProjects();
  }, []);

  return (
    <section id="projects" className="py-16 bg-black/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">My Projects</h2>
          <p className="text-muted-foreground mt-2">
            Some of my recent work that Im proud of
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataProjects.map((project: Project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden  border-muted/20 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="flex-grow pt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-gray-600 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-muted/10 p-4">
                  <div className="flex gap-4 w-full">
                    {project.show_github && (
                      <Link href={project.github_url}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </Button>
                      </Link>
                    )}
                    {project.show_demo && (
                      <Link href={project.demo_url}>
                        {" "}
                        <Button
                          size="sm"
                          className="flex-1 gap-2 bg-green-500 hover:bg-green-600"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
