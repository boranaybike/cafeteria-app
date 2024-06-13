import { getAmountList } from "@/utils/shared";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  onAmountSelect: (amount: string) => void;
  selectedAmount: string;
}

const SelectAmount: React.FC<Props> = ({ selectedAmount, onAmountSelect }) => {
  const amounts = getAmountList();
  return (
    <div>
      <Label htmlFor="date">Select Amount</Label>
      <Select onValueChange={onAmountSelect} value={selectedAmount}>
        <SelectTrigger>
          <SelectValue placeholder="Amount" />
        </SelectTrigger>
        <SelectContent>
          {amounts.map((amount) => (
            <SelectItem key={amount} value={amount}>
              {amount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectAmount;
