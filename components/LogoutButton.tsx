import { useUser } from "@/context/UserContext";
import axios from "axios";

const LogoutButton: React.FC = () => {
  const { logout } = useUser();
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/signout");
      logout();
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  return <button onClick={handleLogout}>LOGOUT</button>;
};

export default LogoutButton;
