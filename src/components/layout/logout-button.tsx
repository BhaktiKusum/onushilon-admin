"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export function LogoutButton() {
  const router = useRouter();



const handleLogout = () => {
  Cookies.remove(
    "accessToken",
  );

  window.location.href =
    "/login";
};

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={
        handleLogout
      }
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}