import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout/Layout";
import FirstUpdesh from "@/features/firstUpdesh/FirstUpdesh";
import { useClientAuth } from "@/hooks/useClientAuth";

const FirstUpdeshPage = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useClientAuth();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading || !isLoggedIn) {
    return null;
  }

  return (
    <Layout>
      <FirstUpdesh />
    </Layout>
  );
};

export default FirstUpdeshPage;
