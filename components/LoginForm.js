"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect } from "@/lib/redirect";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    try {
      const { error: loginError } = await authClient.signIn.email({
        email,
        password,
      });

      if (loginError) {
        const message =
          loginError.message || "Wrong email or password. Please try again.";
        setError(message);
        toast.error(message);
        setLoading(false);
        return;
      }

      toast.success("Welcome back! You are logged in.");
      router.push(redirectTo);
      router.refresh();
    } catch (loginError) {
      const message =
        loginError instanceof Error && loginError.message
          ? loginError.message
          : "Login failed. Please try again.";
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast("Password reset is coming soon. Please contact support for help.", {
      icon: "🔑",
    });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-primary">Login</h1>
        <p className="mb-6 mt-2 text-center text-sm opacity-70">
          Welcome back to BookNook. Log in to borrow and share books.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Your password"
                className="input input-bordered w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="divider my-6">OR</div>

        <GoogleButton redirectTo={redirectTo} />

        <p className="mt-6 text-center text-sm">
          New to BookNook?{" "}
          <Link
            href={
              redirectTo === "/"
                ? "/register"
                : `/register?redirect=${encodeURIComponent(redirectTo)}`
            }
            className="font-semibold text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
