import { useUser } from "@/context/UserContext";
import { showMessage } from "@/utils/messageHandler";
import axios from "axios";

const LogoutButton: React.FC = () => {
  const { logout } = useUser();
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/signout");
      logout();
      showMessage("Logout successful", "success");
    } catch (error) {
      console.error("An error occurred: ", error);
      showMessage("Logout failed", "error");
    }
  };

  return <button onClick={handleLogout}>LOGOUT</button>;
};

export default LogoutButton;
