import { LoginForm } from "@/components/view/login.view";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "POS eBelanja - Login",
  description: "Silahkan login dengan akun admin anda untuk melanjutkan.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
