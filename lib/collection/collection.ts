export const collections = {
  about: "/api/about",
  detailAbout: "/api/about/[id]",
  experiences: "/api/experiences",
  experience: "/api/experiences/[id]",
  projects: "/api/projects",
  project: "/api/projects/[id]",
  profile: "/api/profile",
} as const;

export type Collections = typeof collections;
