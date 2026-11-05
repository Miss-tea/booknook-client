"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect } from "@/lib/redirect";

export default function GoogleButton({ redirectTo = "/" }) {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: getSafeRedirect(redirectTo),
      });

      if (error) {
        toast.error(error.message || "Google login failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Google login failed. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      disabled={loading}
      className="btn btn-outline w-full"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <FcGoogle size={22} />
      )}
      Continue with Google
    </button>
  );
}
