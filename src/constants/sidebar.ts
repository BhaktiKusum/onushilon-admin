import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Academic Levels",
    href: "/academic-levels",
    icon: GraduationCap,
  },

  {
    title: "Subject Assignments",
    href: "/subject-assignments",
    icon: BookOpen,
  },

  {
    title: "Students",
    href: "/students",
    icon: Users,
  },

  {
    title: "Admins",
    href: "/admins",
    icon: Users,
  },
];