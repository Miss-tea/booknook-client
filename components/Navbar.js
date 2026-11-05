"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { FaBars } from "react-icons/fa6";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import useAuth from "@/hooks/useAuth";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Private links show only when the user is logged in
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeDropdown = () => document.activeElement?.blur();

  const handleLogout = async () => {
    closeDropdown();
    await logout();
    toast.success("You have logged out successfully.");
  };

  const navItems = links.map((link) => (
    <li key={link.href}>
      <Link
        href={link.href}
        onClick={closeDropdown}
        className={
          isActive(link.href) ? "font-semibold text-primary" : "font-medium"
        }
      >
        {link.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 shadow-sm backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        {/* Left: mobile menu + logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBars size={20} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <Logo />
        </div>

        {/* Center: desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navItems}</ul>
        </div>

        {/* Right: theme + auth */}
        <div className="navbar-end gap-2">
          <ThemeToggle />

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  {/* Plain img on purpose: users can paste a photo link from any website */}
                  <img
                    src={user.image || "https://placehold.co/80x80?text=U"}
                    alt={user.name || "User"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content z-10 mt-3 w-56 rounded-box bg-base-100 p-2 shadow"
              >
                <li className="px-3 py-2">
                  <span className="block font-semibold">{user.name}</span>
                  <span className="block text-xs opacity-70">{user.email}</span>
                </li>
                <li>
                  <Link href="/profile" onClick={closeDropdown}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm sm:btn-md">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm sm:btn-md">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}