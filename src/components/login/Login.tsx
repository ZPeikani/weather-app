import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { customTheme } from "../../theme/Theme";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/path";
import { useAuth } from "../../context/AuthCountext";

export const BASE_URL = "http://localhost:3000";
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const { signIn } = useAuth();
  const handelSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      try {
        const res = await axios.get(`${BASE_URL}/users`, {
          params: { email, password },
        });
        if (res.data.length > 0) {
          signIn();
          navigate(ROUTES.home);
          setEmail("");
          setPassword("");
        } else {
          setGeneralError("Invalid email or password");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!email) {
      setEmailError("Required!");
    } else {
      setEmailError("");
    }
    if (!password) {
      setPassError("Required!");
    } else {
      setPassError("");
    }
  };
  return (
    <div className="h-screen">
      <div className="w-full h-screen bg-gradient-to-t from-slate-500 to-transparent">
        <div className="w-full h-screen bg-gradient-to-b from-orange-800/100 via-orange-400/100 to-transparent">
          <div className="w-full h-screen bg-slate-600 bg-opacity-35 flex justify-center items-center">
            <div className="background-login w-1/3 h-4/5 mb-auto">
              <Box
                bgcolor="text.disabled"
                sx={{ color: "text.secondary", height: "100%", width: 1 }}
              >
                <form
                  onSubmit={handelSubmit}
                  className="flex flex-col justify-center items-center gap-10 h-full py-6"
                >
                  <Typography
                    variant="h4"
                    className="text-white"
                    fontWeight="bold"
                  >
                    Sign In
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={3}
                    marginBottom={2}
                  >
                    {generalError && (
                      <Typography color="error">{generalError}</Typography>
                    )}
                    <ThemeProvider theme={customTheme}>
                      <FormControl fullWidth>
                        <TextField
                          id="standard-search"
                          label="Email"
                          type="email"
                          variant="standard"
                          error={!!emailError}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          sx={{
                            input: {
                              color: "white",
                            },
                            "& .MuiInputLabel-root": {
                              color: "white",
                            },
                          }}
                        />
                        {emailError && (
                          <FormHelperText sx={{ color: "red" }}>
                            {emailError}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl>
                        <TextField
                          id="standard-search"
                          label="Password"
                          type="password"
                          variant="standard"
                          error={!!passError}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          sx={{
                            input: {
                              color: "white",
                            },
                            "& .MuiInputLabel-root": {
                              color: "white",
                            },
                          }}
                          color="info"
                        />
                        {passError && (
                          <FormHelperText sx={{ color: "red" }}>
                            {passError}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </ThemeProvider>
                  </Box>
                  <Button variant="contained" type="submit">
                    Sign in
                  </Button>
                </form>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
