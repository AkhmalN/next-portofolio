"use client";

import { motion } from "framer-motion";
import {
  Code,
  Layout,
  Database,
  BrainCircuit,
  Smartphone,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlobGradient from "../ui/BlobGradient";

const expertiseItems = [
  {
    title: "Full Stack Development",
    description:
      "Building complete web applications with both front-end and back-end functionality. Experienced in working with MERN stack and creating robust applications from scratch.",
    icon: <Code className="h-8 w-8 text-green-400" />,
  },
  {
    title: "Web Development",
    description:
      "Creating scalable and modern web applications using the latest front-end and back-end technologies. Experienced in HTML, CSS, JavaScript, and popular frameworks like React and Next.js.",
    icon: <Globe className="h-8 w-8 text-cyan-400" />,
  },
  {
    title: "Mobile Development",
    description:
      "Building cross-platform mobile apps using React Native. Delivering smooth, native-like experiences on both iOS and Android with a single codebase.",
    icon: <Smartphone className="h-8 w-8 text-pink-400" />,
  },
  {
    title: "Responsive UI/UX",
    description:
      "Designing beautiful and responsive user interfaces using modern CSS frameworks. Creating intuitive, accessible designs that provide excellent user experiences across all devices.",
    icon: <Layout className="h-8 w-8 text-blue-400" />,
  },
  {
    title: "Database Management",
    description:
      "Working with SQL and NoSQL databases to create efficient data models. Implementing secure data access patterns and optimizing queries for performance.",
    icon: <Database className="h-8 w-8 text-purple-400" />,
  },
  {
    title: "Problem Solving",
    description:
      "Approaching complex technical challenges with structured thinking. Breaking down problems into manageable components and implementing elegant solutions.",
    icon: <BrainCircuit className="h-8 w-8 text-orange-400" />,
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-16 relative">
      <BlobGradient className="absolute -bottom-10 right-10 w-48 h-48 -translate-x-1/2 -translate-y-1/2" />
      <BlobGradient className="absolute top-56 left-20 w-48 h-48 -translate-x-1/2 -translate-y-1/2" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">My Expertise</h2>
          <p className="text-muted-foreground mt-2">
            Specialized skills and knowledge areas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {expertiseItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-muted/20 hover:border-green-500/50 transition-all duration-300 h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  {item.icon}
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
