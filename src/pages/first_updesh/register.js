import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout/Layout";
import FirstUpdeshRegistration from "@/features/firstUpdesh/registration/FirstUpdeshRegistration";
import { useClientAuth } from "@/hooks/useClientAuth";

const FirstUpdeshRegistrationPage = () => {
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
      <FirstUpdeshRegistration />
    </Layout>
  );
};

export default FirstUpdeshRegistrationPage;
