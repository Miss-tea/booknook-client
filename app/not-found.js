import Link from "next/link";

export const metadata = {
  title: "BookNook | Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">This page is not on our shelf</h2>
      <p className="mt-2 max-w-md opacity-70">
        The page you are looking for does not exist or has been moved. Let's get
        you back to the library.
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}