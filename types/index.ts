export interface Project {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demo_url: string;
  github_url: string;
  category: string;
  show_demo: boolean;
  show_github: boolean;
}

export interface Skill {
  _id?: string;
  name: string;
  icon: string;
  category: string;
  proficiency: number; // 1-5
}

export interface About {
  _id?: string;
  text: string;
  updatedAt: string;
}

export interface Profile {
  _id?: string;
  full_name: string;
  role: string;
  image_url: string;
  linkedin: string;
  github: string;
  address: string;
  birthday: string;
  skills: string[];
  user_id: string;
  username: string;
  email: string;
  password: string;
  born_location: string;
}

export interface Experience {
  _id?: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
}

export interface Contact {
  _id?: string;
  email: string;
  phone?: string;
  location?: string;
  available: boolean;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  hashedPassword: string;
}
export interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  // ... tambahkan properti lain yang mungkin ada
}
