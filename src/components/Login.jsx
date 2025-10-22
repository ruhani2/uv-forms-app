import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "../schema/loginSchema";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(loginValidationSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data) => {
    // Set role as admin if uid is Test123, else user
    let role;
    if (data.uid === "Branch Secretary") {
      role = "branch_secretary";
    } else if (data.uid === "Centre Incharge") {
      role = "centre_incharge";
    } else {
      role = "admin";
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: data.uid,
          role,
          branch: "Faridabad",
          centre: "Central Satsang Dayalbagh",
        })
      );
      localStorage.setItem("role", role);
      localStorage.setItem("isLoggedIn", "true");
    }
    router.replace("/first_updesh/register");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.100",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: 350, p: 2 }}>
        <CardHeader
          title={
            <Typography variant="h5" align="center">
              Login
            </Typography>
          }
        />
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="uid"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="UID"
                    fullWidth
                    margin="normal"
                    size="small"
                    required
                    autoComplete="uid"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    size="small"
                    required
                    autoComplete="current-password"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, bgcolor: "#1E3765" }}
              >
                Login
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
