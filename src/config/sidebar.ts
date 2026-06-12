import {
  BookOpen,
  FolderTree,
  LayoutGrid,
  Shield,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },

  {
    title: "Academic Levels",
    href: "/academic-levels",
    icon: FolderTree,
  },

  {
    title: "Subject Assignments",
    href: "/subject-assignments",
    icon: BookOpen,
  },

  {
    title: "EXAMs",
    href: "/exams",
    icon: Shield,
  },

  {
    title: "Admins",
    href: "/admins",
    icon: Shield,
  },
];