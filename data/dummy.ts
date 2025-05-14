import { Project } from "@/types";

export const dummyExperience = [
  {
    id: 1,
    position: "Software Engineer",
    company: "PT Inovasi Teknologi Maju",
    startDate: "Agt 2024",
    endDate: "Des 2024",
    description: [
      "Bertanggung jawab dalam pengembangan aplikasi web dan mobile menggunakan React dan Node.js. Aktif dalam perencanaan sprint, code review, dan implementasi fitur baru.",
      "Bertanggung jawab dalam pengembangan aplikasi web dan mobile menggunakan React dan Node.js. Aktif dalam perencanaan sprint, code review, dan implementasi fitur baru.",
    ],
    skills: [
      "React",
      "Node.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Git",
      "Tailwind CSS",
      "Next.js",
    ],
  },
];
export const dummyProjects: Project[] = [
  {
    _id: "64b1e345a7b2c8d9e0f12345",
    title: "Aplikasi Manajemen Tugas",
    description:
      "Aplikasi web sederhana untuk mengelola tugas sehari-hari dengan fitur penambahan, pengeditan, dan penghapusan tugas.",
    image:
      "https://img.freepik.com/free-vector/to-do-list-concept-illustration_114360-5378.jpg?w=740&t=st=1714533487~exp=1714534087~hmac=a1e3b2c7d9f8a0b1c6d2e9f5a8b3c4d6e7f8a9b0c1d2e3f4g5h6i7j8k9l0m1n2",
    tags: ["React", "JavaScript", "UI/UX"],
    demoUrl: "https://task-manager-demo.com",
    githubUrl: "https://github.com/user/task-manager",
    category: "Web Development",
  },
  {
    _id: "64b1e345a7b2c8d9e0f12347",
    title: "Blog Pribadi dengan Next.js",
    description:
      "Sebuah blog pribadi yang dibangun menggunakan framework Next.js dengan fitur posting, kategori, dan pencarian.",
    image:
      "https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1477.jpg?w=740&t=st=1714533540~exp=1714534140~hmac=c3a2b1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2",
    tags: ["Next.js", "React", "Tailwind CSS"],
    demoUrl: "https://my-personal-blog.com",
    githubUrl: "https://github.com/user/personal-blog",
    category: "Web Development",
  },
  {
    _id: "64b1e345a7b2c8d9e0f12348",
    title: "Aplikasi Mobile Pencatat Keuangan",
    description:
      "Aplikasi mobile sederhana untuk mencatat pemasukan dan pengeluaran keuangan pribadi.",
    image:
      "https://img.freepik.com/free-vector/mobile-banking-concept-illustration_114360-1187.jpg?w=740&t=st=1714533566~exp=1714534166~hmac=d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6",
    tags: ["React Native", "Mobile App", "UI"],
    category: "Mobile Development",
  },
];
