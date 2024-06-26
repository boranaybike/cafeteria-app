import { GetRoleList } from "@/utils/shared";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  onRoleSelect: (Role: string) => void;
  selectedRole: string;
}

const SelectRole: React.FC<Props> = ({ selectedRole, onRoleSelect }) => {
  const roles = GetRoleList();
  return (
    <div>
      <Label htmlFor="date">Select Role</Label>
      <Select onValueChange={onRoleSelect} value={selectedRole}>
        <SelectTrigger>
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectRole;
