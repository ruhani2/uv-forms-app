import "@/styles/globals.css";
import "@/styles/index.css";
import "@/styles/App.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps?.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
