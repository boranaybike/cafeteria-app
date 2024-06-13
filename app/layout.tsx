"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  Home,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
  PawPrint,
  LogOut,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const inter = Inter({ subsets: ["latin"] });
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
interface tokenPayload extends JwtPayload {
  first_name: string;
  last_name: string;
  role: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("user") || "";
    if (token) {
      const user = jwtDecode<tokenPayload>(token);
      setUserRole(user.role);
      setUserName(user.first_name);
      setUserSurname(user.last_name);
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {userRole === "employee" ? (
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
                    <Avatar className="flex items-center">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h3 className="px-3">
                      {userName} {userSurname}
                    </h3>
                  </div>
                  <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                      href="/menu"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Home className="h-4 w-4" />
                      Menu
                    </Link>
                    <Link
                      href="/booking"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Package className="h-4 w-4" />
                      Booking
                    </Link>
                    <Link
                      href="/card"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Users className="h-4 w-4" />
                      Card
                    </Link>
                    <Link
                      href="/movements"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Activity className="h-4 w-4" />
                      Movements
                    </Link>
                  </nav>
                  <div className="grid mt-32 pt-72 gap-2 px-2 lg:px-4">
                    <Link
                      href="/menu"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold"
                      >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">ASAT CAFETERIA</span>
                      </Link>
                      <Link
                        href="/menu"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <Home className="h-5 w-5" />
                        Menu
                      </Link>
                      <Link
                        href="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Booking
                      </Link>
                      <Link
                        href="#"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <Package className="h-5 w-5" />
                        Card
                      </Link>
                    </nav>
                  </SheetContent>
                </Sheet>
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
              </main>
            </div>
          </div>
        ) : (
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        )}
      </body>
    </html>
  );
}
