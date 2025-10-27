import { useState } from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const DRAWER_WIDTH = 270;
const COLLAPSED_WIDTH = 80;

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const sidebarWidth = isSidebarCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        size={sidebarWidth}
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: "100%",
          transition: "margin 0.2s ease",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
