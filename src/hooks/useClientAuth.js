import { useEffect, useState } from "react";

const parseUser = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const useClientAuth = () => {
  const [state, setState] = useState({
    isLoading: true,
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedUser = parseUser(localStorage.getItem("user"));
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true" && !!storedUser;

    setState({
      isLoading: false,
      isLoggedIn,
      user: storedUser,
    });
  }, []);

  return state;
};
