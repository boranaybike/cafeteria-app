"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/home";
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("An error ocurred.", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">LOGIN</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>LOGIN</DialogTitle>
          <DialogDescription>Lorem ipsum</DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label htmlFor="username" className="py-1">
              Card Number
            </Label>
            <Input type="text" name="userName" onChange={handleInputChange} />
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
  );
}
