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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../login/Login";
import { ROUTES } from "../../router/path";
import { useAuth } from "../../context/AuthCountext";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const checkEmailExists = async (email: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/users?email=${email}`);
      return res.data.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handelRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;

    if (!name) {
      setNameError("Required");
      valid = false;
    } else {
      setNameError("");
    }
    if (!email) {
      setEmailError("Required!");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPassError("Required!");
      valid = false;
    } else {
      setPassError("");
    }

    if (valid) {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setEmailError("Email already exists!");
        return;
      }
    }

    if (name && email && password) {
      try {
        const res = await axios.post(`${BASE_URL}/users`, {
          id: Date.now(),
          name,
          email,
          password,
        });
        if (res) {
          signIn()
          navigate(ROUTES.signIn);
        }
        setName("");
        setEmail("");
        setPassword("");
        return res;
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="h-screen">
      <div className="w-full h-screen bg-gradient-to-t from-slate-500 to-transparent">
        <div className="w-full h-screen bg-gradient-to-b from-orange-800/100 via-orange-400/100 to-transparent">
          <div className="w-full h-screen bg-slate-600 bg-opacity-35 flex justify-center items-center">
            <div className="background-img w-1/3 h-4/5 mb-auto">
              <Box
                bgcolor="text.disabled"
                sx={{ color: "text.secondary", height: "100%", width: 1 }}
              >
                <form
                  onSubmit={handelRegister}
                  className="flex flex-col justify-around items-center h-full py-6"
                >
                  <Typography
                    variant="h4"
                    className="text-gray-300"
                    fontWeight="bold"
                  >
                    Sign Up
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={3}>
                    <ThemeProvider theme={customTheme}>
                      <FormControl fullWidth>
                        <TextField
                          id="standard-search"
                          label="Username"
                          type="text"
                          variant="standard"
                          error={!!nameError}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          sx={{
                            input: {
                              color: "#d1d5db",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#d1d5db",
                            },
                          }}
                        />
                        {nameError && (
                          <FormHelperText sx={{ color: "red" }}>
                            {nameError}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          id="standard-search"
                          label="Email"
                          type="email"
                          variant="standard"
                          error={!!emailError}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          sx={{
                            input: {
                              color: "#d1d5db",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#d1d5db",
                            },
                          }}
                        />
                        {emailError && (
                          <FormHelperText sx={{ color: "red" }}>
                            {emailError}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          id="standard-search"
                          label="Password"
                          type="password"
                          variant="standard"
                          error={!!passError}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          sx={{
                            input: {
                              color: "#d1d5db",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#d1d5db",
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
                    Sign up
                  </Button>
                  <Typography className="text-gray-300" fontSize="15px">
                    Already have an account?{" "}
                    <Link
                      to="/sign-in"
                      className="text-blue-500 underline text-sm cursor-pointer"
                    >
                      sign in
                    </Link>
                  </Typography>
                </form>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
