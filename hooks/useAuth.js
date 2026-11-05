"use client";
export default function useAuth() {
  return {
    user: null,
    loading: false,
    logout: async () => {},
  };
}