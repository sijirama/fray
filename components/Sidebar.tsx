"use client";
import { HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

const routes = [
  {
    href: "/", // Change empty string to "/" for the home route
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/workflows", // Add leading slashes to paths
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "/credentials", // Add leading slashes to paths
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
];

function DesktopSidebar() {
  const pathName = usePathname();

  // Improved active route detection logic
  const activeRoute =
    routes.find((route) => pathName === route.href) ||
    routes.find(
      (route) => route.href !== "/" && pathName.startsWith(route.href),
    ) ||
    routes[0];

  return (
    <div
      className="hidden relative md:block min-w-[280px] max-w-[280px]
			h-screen overflow-hidden w-full bg-primary/5
			dark:bg-secondary/30 dark:text-foreground
			text-muted-foreground border-r-2 border-separate
		"
    >
      <div className="flex items-center justify-start gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>
      <div className="p-2">TODO CREDITS</div>
      <div className="flex flex-col p-2 gap-1">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? "sidebarActiveItem"
                  : "sidebarItem",
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const pathName = usePathname();

  // Use the same improved logic for mobile
  const activeRoute =
    routes.find((route) => pathName === route.href) ||
    routes.find(
      (route) => route.href !== "/" && pathName.startsWith(route.href),
    ) ||
    routes[0];

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8 ">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="" variant={"ghost"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] space-y-4 "
            side={"left"}
          >
            <Logo />
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  href={route.href}
                  key={route.href}
                  className={buttonVariants({
                    variant:
                      activeRoute.href === route.href
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                  onClick={() => {
                    setOpen((prev) => !prev);
                  }}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default DesktopSidebar;
