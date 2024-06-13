import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { format, addDays } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  onDateSelect: (date: string) => void;
  selectedDate: string;
  excludedDates: string[]; // Yeni prop
}

const SelectDate: React.FC<Props> = ({
  onDateSelect,
  selectedDate,
  excludedDates,
}) => {
  const [dates, setDates] = useState<string[]>([]);
  const availableDates = dates.filter((date) => !excludedDates.includes(date));

  useEffect(() => {
    const generateDates = () => {
      const datesArray = [];
      const today = new Date();
      for (let i = 0; i < 10; i++) {
        datesArray.push(format(addDays(today, i), "yyyy-MM-dd"));
      }
      setDates(datesArray);
    };

    generateDates();
  }, []);

  return (
    <div>
      <Label htmlFor="date">Select Date</Label>
      <Select onValueChange={onDateSelect} value={selectedDate}>
        <SelectTrigger>
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          {availableDates.map((date) => (
            <SelectItem key={date} value={date}>
              {date}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDate;
