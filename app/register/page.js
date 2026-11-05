import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";
import Spinner from "@/components/Spinner";

export const metadata = {
  title: "BookNook | Register",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <RegisterForm />
    </Suspense>
  );
}