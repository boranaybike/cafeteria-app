"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { showMessage } from "@/utils/messageHandler";

interface SelectMenuProps {
  onMenuChange: (menuId: string) => void;
  selectedMenu: string;
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  onMenuChange,
  selectedMenu,
}) => {
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get("/api/menu");
        setMenus(response.data.data);
      } catch (error) {
        showMessage("Error fetching menus", "error");
        console.error("Failed to fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <div>
      <Label htmlFor="menu">Select Menu</Label>
      <Select onValueChange={onMenuChange} value={selectedMenu}>
        <SelectTrigger value={selectedMenu}>
          <SelectValue placeholder="Meal" />
        </SelectTrigger>
        <SelectContent>
          {menus.map((menu) => (
            <SelectItem key={menu._id} value={menu._id}>
              {menu.meal} - {menu.day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectMenu;
