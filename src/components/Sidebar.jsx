import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Box,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar(props) {
  const router = useRouter();
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("isLoggedIn");
    }
    router.push("/login");
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const storedUser = window.localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setRole(parsed?.role ?? null);
      } else {
        setRole(null);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      setRole(null);
    }
  }, [router.asPath]);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: props.size,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: props.size,
          boxSizing: "border-box",
          backgroundColor: "#1E3765",
          color: "#fff",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemButton>
            <ListItemText primary="Home" />
          </ListItemButton>
          {role === "admin" ? (
            <ListItemButton
              component={Link}
              href="/bhandara"
              selected={router.pathname === "/bhandara"}
              sx={{
                color: "#fff",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#2E4A7D",
                },
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "#2E4A7D",
                  color: "#fff",
                },
              }}
            >
              <ListItemText primary="Bhandara" />
            </ListItemButton>
          ) : null}

          {/* Disabled Parent Item */}
          <ListItemButton disabled>
            <ListItemText primary="Forms" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            href="/first_updesh"
            selected={router.pathname === "/first_updesh"}
            sx={{
              pl: 4,
              color: "#fff",
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "#2E4A7D",
              },
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "#2E4A7D",
                color: "#fff",
              },
            }}
          >
            <ListItemText primary="S&D Forms" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            href="/first_updesh/register"
            selected={router.pathname === "/first_updesh/register"}
            sx={{
              pl: 8,
              color: "#fff",
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "#2E4A7D",
              },
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "#2E4A7D",
                color: "#fff",
              },
            }}
          >
            <ListItemText primary="New Registration" />
          </ListItemButton>

          <ListItemButton
            onClick={handleLogout}
            sx={{
              color: "#fff",
              textDecoration: "none",
              "&:hover": { backgroundColor: "#2E4A7D" },
            }}
          >
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
