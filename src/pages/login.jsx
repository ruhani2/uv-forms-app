import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Login from "@/components/Login";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || typeof window === "undefined") {
      return;
    }
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      router.replace("/first_updesh");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Login | UV Forms</title>
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;
