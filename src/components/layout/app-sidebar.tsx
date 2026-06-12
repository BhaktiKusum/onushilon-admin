"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { sidebarItems } from "@/config/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { LogoutButton } from "./logout-button";

export function AppSidebar() {
  const pathname =
    usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-xl font-bold">
            Onushilon
          </h2>

          <p className="text-xs text-muted-foreground">
            Admin Panel
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <SidebarMenuItem
                  key={
                    item.href
                  }
                >
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname ===
                      item.href
                    }
                  >
                    <Link
                      href={
                        item.href
                      }
                    >
                      <Icon />

                      <span>
                        {
                          item.title
                        }
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            },
          )}

          <div className="border-t p-4">
    <LogoutButton />
  </div>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}