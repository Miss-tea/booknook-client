"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Spinner from "./Spinner";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  // While the session loads, show the spinner (so a reload never bounces you to Login)
  if (loading || !user) {
    return <Spinner label="Checking your account..." />;
  }

  return children;
}