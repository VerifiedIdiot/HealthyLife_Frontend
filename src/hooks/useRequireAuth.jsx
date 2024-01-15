import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useRequireAuth = (requiredRole) => {
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userRole = "USER"; 

  const isAdmin = userRole === "ADMIN";

  useEffect(() => {
    if (userRole !== requiredRole) {
      setIsUnauthorized(true);
    } else {
      setIsUnauthorized(false);
    }
  }, [userRole, requiredRole]);

  const handleCloseModal = () => {
    setIsUnauthorized(false);
    if (location.state?.from) {
      navigate(location.state.from.pathname);
    } else {
      navigate("/");
    }
  };

  return { isUnauthorized, handleCloseModal, isAdmin };
};

export default useRequireAuth;
