// hooks/useProtectedRoute.js
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

const useProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  return { user, loading };
};

export default useProtectedRoute;
