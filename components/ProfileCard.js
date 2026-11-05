"use client";

import PrivateRoute from "./PrivateRoute";
import useAuth from "@/hooks/useAuth";

function ProfileContent() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl bg-base-100 p-8 text-center shadow-xl">
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            {/* Plain img on purpose: the photo link can come from any website */}
            <img
              src={user.image || "https://placehold.co/200x200?text=U"}
              alt={user.name || "User"}
            />
          </div>
        </div>
        <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
        <p className="opacity-70">{user.email}</p>
        <p className="mt-4 text-sm opacity-70">
          You are a member of BookNook. Add books, borrow books and return them
          anytime.
        </p>
      </div>
    </div>
  );
}

export default function ProfileCard() {
  return (
    <PrivateRoute>
      <ProfileContent />
    </PrivateRoute>
  );
}
