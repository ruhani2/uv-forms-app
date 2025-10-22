import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

export default function FirstUpdesh() {
  const router = useRouter();

  const createFormButton = () => {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 2000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "center",
          px: 2,
          backgroundColor: "#1E3765",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        <IconButton
          color="inherit"
          onClick={() => router.push("/first_updesh/register")}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <AddIcon />
            <Typography>Create Form</Typography>
          </Box>
        </IconButton>
      </Box>
    );
  };

  return <Box>{createFormButton()}</Box>;
}
