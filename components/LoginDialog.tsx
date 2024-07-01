"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const LoginDialog: React.FC = () => {
  const [formData, setFormData] = useState({
    card_number: "",
    password: "",
  });

  const { user, login } = useUser();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios.post("/api/auth/signin", formData).then((response) => {
        if (response.status === 200) {
          login(response.data.token);
          console.log("Login successful");
          router.push("/");
        } else {
          console.error("Login failed");
        }
      });
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };
  return (
    <>
      {!user && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">LOGIN</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>LOGIN</DialogTitle>
              <DialogDescription>Lorem ipsum</DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <Label htmlFor="card_number" className="py-1">
                  Card Number
                </Label>
                <Input
                  type="text"
                  name="card_number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="password" className="py-1">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="align-center flex flex-col">
                <Button type="submit" className="flex flex-col justify-center">
                  LOGIN
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default LoginDialog;
