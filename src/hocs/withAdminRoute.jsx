// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// ** React Imports
import React, { useEffect, useContext } from "react";

// ** Components imports
import Spinner from "../components/common/Spinner";

// ** Context imports
import { AuthContext } from "../context/AuthContext";

const withAdminRoute = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useContext(AuthContext);

    const router = useRouter();

    console.log("THE USER IS:", user, loading);

    useEffect(() => {
      if (!loading && (!user || !user.isSuperAdmin)) {
        router.push("/");
      }
    }, [user, loading]);

    if (loading || !user || !user.isSuperAdmin) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminRoute;
