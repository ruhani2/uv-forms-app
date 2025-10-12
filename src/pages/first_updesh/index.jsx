import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/layout";
import FirstUpdesh from "@/components/forms/FirstUpdesh";

const FirstUpdeshPage = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!router.isReady || typeof window === "undefined") {
      return;
    }

    const storedUser = window.localStorage.getItem("user");
    if (!storedUser) {
      router.replace("/login");
      return;
    }

    setIsReady(true);
  }, [router]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Head>
        <title>First Updesh | UV Forms</title>
      </Head>
      <Layout>
        <FirstUpdesh />
      </Layout>
    </>
  );
};

export default FirstUpdeshPage;
