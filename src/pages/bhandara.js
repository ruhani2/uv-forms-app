import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout/Layout";
import Bhandara from "@/features/bhandara/Bhandara";
import { useClientAuth } from "@/hooks/useClientAuth";

const BhandaraPage = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn, user } = useClientAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.replace("/login");
      } else if (user?.role !== "admin") {
        router.replace("/");
      }
    }
  }, [isLoading, isLoggedIn, user, router]);

  if (
    isLoading ||
    !isLoggedIn ||
    (isLoggedIn && user?.role !== "admin")
  ) {
    return null;
  }

  return (
    <Layout>
      <Bhandara />
    </Layout>
  );
};

export default BhandaraPage;
