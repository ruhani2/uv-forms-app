import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/layout";
import Bhandara from "@/components/Bhandara";

const BhandaraPage = () => {
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

    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.role !== "admin") {
        router.replace("/first_updesh");
        return;
      }
    } catch (error) {
      console.error("Failed to parse stored user", error);
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
        <title>Bhandara | UV Forms</title>
      </Head>
      <Layout>
        <Bhandara />
      </Layout>
    </>
  );
};

export default BhandaraPage;
