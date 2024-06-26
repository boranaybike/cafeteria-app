"use client";
import Link from "next/link";
import {
  Menu,
  Package,
  ShoppingCart,
  PawPrint,
  LogOut,
  Activity,
  CircleUserRound,
  PersonStanding,
  CookingPot,
  SquareActivity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LogoutButton from "./LogoutButton";
import { useUser } from "../context/UserContext";

const SideBar: React.FC = () => {
  const { user } = useUser();

  return (
    <>
      {user && (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <PawPrint className="h-6 w-6" />
                  <span>ASAT CAFETERIA</span>
                </Link>
              </div>
              <div className="flex-1">
                <div className="flex px-6 py-6 items-center align-center m-auto">
                  <CircleUserRound className="h-7 w-7" />
                  <h3 className="px-3">
                    {user.first_name} {user.last_name}
                  </h3>
                </div>
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <CookingPot className="h-4 w-4" />
                    Menu
                  </Link>
                  {user.role === "employee" ? (
                    <>
                      <Link
                        href="/booking"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        <Package className="h-4 w-4" />
                        Booking
                      </Link>
                      <Link
                        href="/movements"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        <SquareActivity className="h-4 w-4" />
                        Movements
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/bookings"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        <Package className="h-4 w-4" />
                        Bookings
                      </Link>
                      <Link
                        href="/personnel"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        <PersonStanding className="h-4 w-4" />
                        Personnel
                      </Link>
                    </>
                  )}
                </nav>
                <div className="grid mt-32 pt-80 gap-2 px-2 lg:px-4">
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg mx-3 my-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <LogOut className="h-4 w-4" />
                    <LogoutButton />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg">
                    <div className="flex items-center align-center pt-6 pb-8">
                      <CircleUserRound className="h-7 w-7" />
                      <h3 className="px-3">
                        {user.first_name} {user.last_name}
                      </h3>
                    </div>
                    <Link
                      href="/"
                      className="flex items-center gap-4 rounded-lg mx-3 my-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <CookingPot className="h-4 w-4" />
                      Menu
                    </Link>
                    {user.role === "employee" ? (
                      <>
                        <Link
                          href="/booking"
                          className="flex items-center gap-4 rounded-lg mx-3 my-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Booking
                        </Link>
                        <Link
                          href="/movements"
                          className="flex items-center gap-4 rounded-lg mx-3 my-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          <Activity className="h-4 w-4" />
                          Movements
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/bookings"
                          className="flex items-center gap-4 rounded-lg mx-3 my-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          <Package className="h-4 w-4" />
                          Bookings
                        </Link>
                        <Link
                          href="/personnel"
                          className="flex items-center gap-4 rounded-lg mx-3 my-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          <Package className="h-4 w-4" />
                          Bookings
                        </Link>
                      </>
                    )}
                  </nav>
                  <div className="grid mt-32 pt-72 gap-2">
                    <Link
                      href="/"
                      className="flex items-center gap-3 rounded-lg mx-3 my-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <LogOut className="h-4 w-4" />
                      <LogoutButton />
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </header>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
