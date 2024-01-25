import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");

  console.log(Email);

  let navigate = useNavigate();

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    if (!Email) {
      alert("Please provide a valid email adress.");
      return;
    }
    if (!Password) {
      alert("Please provide a valid Password");
      return;
    }
    try {
      const response = await axios.post(
        "http://104.245.34.253:3300/api/users/login",
        {
          emailAddress: Email,
          password: Password,
        },
        { headers }
      );
      console.log(response.data);

      if (response.data.status) {
        localStorage.setItem("user", JSON.stringify(response.data));
        if (response.data.userType == "customer") {
          navigate("/products");
        } else {
          navigate("/");
        }
      } else {
        alert(response.data.error.message);
      }
    } catch (error: any) {
      alert(error.response.data.error.message);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="main" style={{ paddingTop: "100px" }}>
        <Container
          component="main"
          maxWidth="xs"
          style={{ backgroundColor: "#ffffff" }}
        >
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ color: "#000000" }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => SetEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => SetPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleSubmit(e)}
              >
                Sign In
              </Button>

              <p
                style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  color: "#000000",
                }}
              >
                Copyright &copy; XpacScale
              </p>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
