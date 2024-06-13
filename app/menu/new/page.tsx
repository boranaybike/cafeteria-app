"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NextPage } from "next";
import React, { useState } from "react";

const CreateMenu: NextPage = () => {
  const [menu, setMenu] = useState({
    meal: "",
    day: "",
    date: new Date().getDate(),
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/menu/new", {
        method: "POST",
        body: JSON.stringify(menu),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("An error ocurred.", error);
    }
  };
  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Label htmlFor="meal" className="py-1">
            Meal Name
          </Label>
          <Input type="text" name="meal" onChange={handleInputChange} />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="day" className="py-1">
            Day
          </Label>
          <Input type="string" name="day" onChange={handleInputChange} />
        </div>
        <div className="align-center flex flex-col">
          <Button type="submit" className="flex flex-col justify-center">
            ADD
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateMenu;
