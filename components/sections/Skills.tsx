"use client";

import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiMongodb,
  SiTypescript,
  SiNextdotjs,
  SiMysql,
  SiVuedotjs,
  SiJira,
  SiTrello,
} from "react-icons/si";

const skills = [
  {
    name: "HTML",
    color: "#e34f26",
    icon: <FaHtml5 size={48} color="#e34f26" />,
  },
  {
    name: "CSS",
    color: "#264de4",
    icon: <FaCss3Alt size={48} color="#264de4" />,
  },
  {
    name: "JavaScript",
    color: "#f7df1e",
    icon: <FaJs size={48} color="#f7df1e" />,
  },
  {
    name: "React & Native",
    color: "#61dafb",
    icon: <FaReact size={48} color="#61dafb" />,
  },
  {
    name: "Node.js",
    color: "#339933",
    icon: <FaNodeJs size={48} color="#339933" />,
  },
  {
    name: "MongoDB",
    color: "#47a248",
    icon: <SiMongodb size={48} color="#47a248" />,
  },
  {
    name: "TypeScript",
    color: "#3178c6",
    icon: <SiTypescript size={48} color="#3178c6" />,
  },
  {
    name: "Next.js",
    color: "#ffffff",
    icon: <SiNextdotjs size={48} color="#ffffff" />,
  },
  {
    name: "Vue.js",
    color: "#ffffff",
    icon: <SiVuedotjs size={48} color="#47a248" />,
  },
  {
    name: "MySql",
    color: "#ffffff",
    icon: <SiMysql size={48} color="#3178c6" />,
  },
  {
    name: "Jira",
    color: "#ffffff",
    icon: <SiJira size={48} color="#3178c6" />,
  },
  {
    name: "Trello",
    color: "#ffffff",
    icon: <SiTrello size={48} color="#3178c6" />,
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 bg-black/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">Skills & Competencies</h2>
          <p className="text-muted-foreground mt-2">
            My technical skills and tools I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="mb-2">{skill.icon}</div>
              <span className="text-white font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
