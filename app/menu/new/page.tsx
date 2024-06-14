"use client";
import SelectDate from "@/components/Select/SelectDate";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuType } from "@/types/MenuType";
import { GetDayList } from "@/utils/shared";
import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const getDayOfWeek = (date: string) => {
  const days = GetDayList();
  const dayIndex = new Date(date).getDay();
  return days[dayIndex];
};

const CreateMenu: NextPage = () => {
  const [menu, setMenu] = useState({
    meal: "",
    day: "",
    date: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setMenu((prevMenu) => ({
      ...prevMenu,
      [field]: value,
      ...(field === "date" && { day: getDayOfWeek(value) }),
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/menu/new", menu);
      console.log("Reservation created successfully!");
      setMenu({
        date: "",
        day: "",
        meal: "",
      });
      fetchMenu();
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

  const [menuData, setMenuData] = useState<MenuType[]>([]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("/api/menu");
      setMenuData(response.data.data);
    } catch (error) {
      console.error("An error occurred while fetching menu data.", error);
    }
  };
  useEffect(() => {
    fetchMenu();
  }, []);

  const addedDates = menuData.map((menu) => menu.date);
  console.log(addedDates);

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <div className="flex flex-col">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>ADD A NEW MENU</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="meal" className="py-1">
                    Meal Name
                  </Label>
                  <Input
                    type="text"
                    name="meal"
                    value={menu.meal}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <SelectDate
                      onDateSelect={(date) => handleSelectChange("date", date)}
                      selectedDate={menu.date}
                      excludedDates={addedDates}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="day" className="py-1">
                    Day
                  </Label>
                  <Input type="text" name="day" value={menu.day} readOnly />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-6">
              <Button type="submit" className="flex flex-col justify-center">
                ADD MENU
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CreateMenu;
