"use client";
import { NextPage } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { tokenPayload } from "@/types/TokenPayload";

const CardPage: NextPage = () => {
  const [user, setUser] = useState<tokenPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("user") || "";
    if (token) {
      const user = jwtDecode<tokenPayload>(token);
      setUser(user);
    }
  }, []);

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle> {user?.card_number}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">BALANCE: </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {user?.first_name} {user?.last_name}
        </CardFooter>
      </Card>
    </>
  );
};

export default CardPage;
