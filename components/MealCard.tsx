import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/UserContext";

const MealCard: React.FC = () => {
  const { user } = useUser();
  return (
    <div>
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
    </div>
  );
};
export default MealCard;
