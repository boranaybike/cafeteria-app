"use client";
import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectRole from "@/components/Select/SelectRole";
import { Button } from "@/components/ui/button";

const NewPersonnel: NextPage = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    role: "",
  });
  const [cardNumber, setCardNumber] = useState("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", user);
      setCardNumber(response.data.user.card_number);
      setUser({
        first_name: "",
        last_name: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error("Error adding personnel: ", error);
    }
  };
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <div className="flex flex-col">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>ADD A NEW PERSONNEL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="first_name" className="py-1">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="last_name" className="py-1">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <SelectRole
                      onRoleSelect={(role) => handleSelectChange("role", role)}
                      selectedRole={user.role}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="password" className="py-1">
                    Password
                  </Label>
                  <Input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-6">
              <Button type="submit" className="flex flex-col justify-center">
                ADD PERSONNEL
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
      <div className="w-full ">Card Number: {cardNumber}</div>
    </>
  );
};

export default NewPersonnel;
