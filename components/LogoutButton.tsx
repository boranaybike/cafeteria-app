import axios from "axios";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/signout");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return <button onClick={handleLogout}>LOGOUT</button>;
};

export default LogoutButton;
