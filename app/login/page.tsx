import { LoginForm } from "@/components/view/login.view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS eBelanja - Login",
  description: "Silahkan login dengan akun admin anda untuk melanjutkan.",
};

export default function LoginPage() {
  return <LoginForm />;
}
