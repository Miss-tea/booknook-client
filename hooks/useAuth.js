"use client";

import { authClient } from "@/lib/auth-client";

export default function useAuth() {
  const { data: session, isPending } = authClient.useSession();

  const logout = async () => {
    await authClient.signOut();
  };

  return {
    user: session?.user || null,
    loading: isPending,
    logout,
  };
}