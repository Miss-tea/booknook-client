"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaCircleCheck, FaCircleXmark, FaEye, FaEyeSlash } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect } from "@/lib/redirect";
import GoogleButton from "./GoogleButton";

// The three password rules from the project
const passwordRules = [
  { label: "At least 6 characters", test: (p) => p.length >= 6 },
  { label: "One uppercase letter (A-Z)", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter (a-z)", test: (p) => /[a-z]/.test(p) },
];

function validatePassword(password) {
  if (password.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must have at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must have at least one lowercase letter.";
  return "";
}

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim();
    const photo = form.get("photo").trim();

    // Do not register with an invalid password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      toast.error(passwordError);
      return;
    }

    setLoading(true);
    const { error: registerError } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
    });

    if (registerError) {
      const message = registerError.message || "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    toast.success("Account created! Please log in.");
    const safe = getSafeRedirect(redirectParam);
    router.push(safe === "/" ? "/login" : `/login?redirect=${encodeURIComponent(safe)}`);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-primary">Register</h1>
        <p className="mb-6 mt-2 text-center text-sm opacity-70">
          Create your BookNook account in less than a minute.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              className="input input-bordered w-full"
            />
          </div>

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
            <label className="mb-1 block text-sm font-medium" htmlFor="photo">
              Photo URL
            </label>
            <input
              id="photo"
              name="photo"
              type="url"
              required
              placeholder="https://example.com/my-photo.jpg"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="input input-bordered w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Live checklist */}
            <ul className="mt-2 space-y-1 text-xs">
              {passwordRules.map((rule) => {
                const ok = rule.test(password);
                return (
                  <li
                    key={rule.label}
                    className={`flex items-center gap-2 ${ok ? "text-success" : "opacity-60"}`}
                  >
                    {ok ? <FaCircleCheck /> : <FaCircleXmark />}
                    {rule.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {error && (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="divider my-6">OR</div>

        {/* Google register sends the user to Home, as the project asks */}
        <GoogleButton redirectTo="/" />

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href={
              redirectParam
                ? `/login?redirect=${encodeURIComponent(getSafeRedirect(redirectParam))}`
                : "/login"
            }
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}