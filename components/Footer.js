import Link from "next/link";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import Logo from "./Logo";

const socials = [
  { href: "https://x.com", label: "X", Icon: FaXTwitter },
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://github.com", label: "GitHub", Icon: FaGithub },
];

export default function Footer() {
  return (
    <footer className="bg-base-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        {/* About */}
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm opacity-80">
            BookNook is a small online library. Add a book, borrow a book,
            return a book.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <Link href="/" className="hover:text-primary">Home</Link>
            </li>
            <li>
              <Link href="/books" className="hover:text-primary">All Books</Link>
            </li>
            <li>
              <Link href="/add-book" className="hover:text-primary">Add Book</Link>
            </li>
          </ul>
        </div>

        {/* Contact + social */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-primary" /> hello@booknook.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-primary" /> +880 1700-000000
            </li>
            <li className="flex items-center gap-2">
              <FaLocationDot className="text-primary" /> Dhaka, Bangladesh
            </li>
          </ul>

          <div className="mt-5 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="btn btn-circle btn-outline btn-sm hover:btn-primary"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}
