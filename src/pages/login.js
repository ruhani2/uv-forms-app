import { useEffect } from "react";
import { useRouter } from "next/router";
import Login from "@/features/auth/Login";
import { useClientAuth } from "@/hooks/useClientAuth";

export default function LoginPage() {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useClientAuth();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace("/");
    }
  }, [isLoading, isLoggedIn, router]);

  if (!isLoading && isLoggedIn) {
    return null;
  }

  return <Login />;
}
