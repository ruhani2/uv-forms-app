import { useSession } from "next-auth/react";

export const useClientAuth = () => {
  const { data: session, status } = useSession();

  return {
    isLoading: status === "loading",
    isLoggedIn: status === "authenticated",
    user: session?.user ?? null,
  };
};
