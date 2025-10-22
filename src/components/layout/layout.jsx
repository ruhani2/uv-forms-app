import Sidebar from "../Sidebar";
import { Box } from "@mui/material";

const drawerWidth = 270;

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar size={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
