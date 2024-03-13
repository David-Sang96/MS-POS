import BackofficeLayout from "@/components/BackofficeLayout";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <BackofficeLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "92%",
        }}
      >
        <Button
          sx={{
            color: "#EEEEEE",
            bgcolor: "#222831",
            "&:hover": { bgcolor: "#240A34" },
          }}
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Log In with Google
        </Button>
      </Box>
    </BackofficeLayout>
  );
};

export default Login;
