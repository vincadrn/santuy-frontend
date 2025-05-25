import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/auth/useLogout";

export default function LogoutPage() {
  const { status: status } = useLogout();
  const navigate = useNavigate();

  if (status == "success") {
    navigate('/login');
  }

  return (
    <>
    {status == "pending" ? 'Logging out ...' : ''}
    </>
  );
}
